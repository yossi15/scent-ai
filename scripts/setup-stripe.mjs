// Provision Stripe products + prices + coupons + webhook for SCENTORY tiers.
// Idempotent — safe to re-run; reuses existing items by metadata.scent_tier_id / endpoint URL / coupon code.
//
// Run with:   node scripts/setup-stripe.mjs
// Reads:      STRIPE_SECRET_KEY, NEXT_PUBLIC_APP_URL  from .env.local
// Outputs:    Price IDs + webhook signing secret (to paste into .env.local)

import fs from 'node:fs';
import path from 'node:path';
import Stripe from 'stripe';

// ── Load .env.local manually (no dotenv dependency) ──────────────────────────
const envPath = path.resolve(process.cwd(), '.env.local');
const env = Object.fromEntries(
  fs.readFileSync(envPath, 'utf8')
    .split('\n')
    .filter(l => l.trim() && !l.startsWith('#'))
    .map(l => {
      const idx = l.indexOf('=');
      return [l.slice(0, idx).trim(), l.slice(idx + 1).trim()];
    })
);

const STRIPE_SECRET_KEY = env.STRIPE_SECRET_KEY;
const APP_URL = env.NEXT_PUBLIC_APP_URL;
if (!STRIPE_SECRET_KEY) throw new Error('Missing STRIPE_SECRET_KEY in .env.local');
if (!APP_URL)           throw new Error('Missing NEXT_PUBLIC_APP_URL in .env.local');

const stripe = new Stripe(STRIPE_SECRET_KEY);

const TIERS = [
  { id: 'discovery', name: 'SCENTORY — Discovery', price: 4900 },   // ₪49.00 in agorot
  { id: 'collector', name: 'SCENTORY — Collector', price: 9900 },   // ₪99.00
  { id: 'expert',    name: 'SCENTORY — Expert',    price: 19900 },  // ₪199.00
];

const COUPONS = [
  { code: 'WELCOME20', percent_off: 20, duration: 'once',     name: 'Welcome 20% — first month' },
  { code: 'SCENT50',   percent_off: 50, duration: 'once',     name: 'Scent 50% — first month' },
  { code: 'VIP30',     percent_off: 30, duration: 'forever',  name: 'VIP 30% — lifetime' },
];

// ── Create / reuse a Product per tier ────────────────────────────────────────
async function ensureProduct(tier) {
  // Search by metadata.scent_tier_id
  const search = await stripe.products.search({
    query: `active:'true' AND metadata['scent_tier_id']:'${tier.id}'`,
  });
  if (search.data[0]) {
    console.log(`  · product exists: ${search.data[0].id}`);
    return search.data[0];
  }
  const p = await stripe.products.create({
    name: tier.name,
    metadata: { scent_tier_id: tier.id },
  });
  console.log(`  · created product:  ${p.id}`);
  return p;
}

// ── Create / reuse a recurring monthly Price in ILS ──────────────────────────
async function ensurePrice(product, tier) {
  const prices = await stripe.prices.list({ product: product.id, active: true, limit: 100 });
  const match = prices.data.find(p =>
    p.currency === 'ils' &&
    p.unit_amount === tier.price &&
    p.recurring?.interval === 'month'
  );
  if (match) {
    console.log(`  · price exists:    ${match.id}`);
    return match;
  }
  const created = await stripe.prices.create({
    product: product.id,
    currency: 'ils',
    unit_amount: tier.price,
    recurring: { interval: 'month' },
    metadata: { scent_tier_id: tier.id },
  });
  console.log(`  · created price:   ${created.id}`);
  return created;
}

// ── Create / reuse a webhook endpoint ────────────────────────────────────────
async function ensureWebhook() {
  const url = `${APP_URL}/api/stripe-webhook`;
  const events = [
    'checkout.session.completed',
    'customer.subscription.created',
    'customer.subscription.updated',
    'customer.subscription.deleted',
  ];
  const list = await stripe.webhookEndpoints.list({ limit: 100 });
  const existing = list.data.find(w => w.url === url);
  if (existing) {
    console.log(`\nWebhook exists:        ${existing.id}`);
    console.log(`  · URL:               ${existing.url}`);
    console.log(`  · NOTE: secret is only shown ONCE at creation time.`);
    console.log(`  · If you don't have STRIPE_WEBHOOK_SECRET saved yet, delete this`);
    console.log(`    endpoint in the Stripe dashboard and re-run this script.`);
    return { endpoint: existing, secret: null };
  }
  const created = await stripe.webhookEndpoints.create({
    url,
    enabled_events: events,
    description: 'SCENTORY subscription events',
  });
  console.log(`\nCreated webhook:       ${created.id}`);
  return { endpoint: created, secret: created.secret };
}

// ── Create / reuse a Coupon + Promotion Code per spec ────────────────────────
async function ensureCoupon(spec) {
  // Find by metadata.scent_coupon_code (we tag both the coupon & promo code)
  const couponList = await stripe.coupons.list({ limit: 100 });
  let coupon = couponList.data.find(c => c.metadata?.scent_coupon_code === spec.code);
  if (coupon) {
    console.log(`  · coupon exists:   ${coupon.id}`);
  } else {
    coupon = await stripe.coupons.create({
      percent_off: spec.percent_off,
      duration: spec.duration,
      name: spec.name,
      metadata: { scent_coupon_code: spec.code },
    });
    console.log(`  · created coupon:  ${coupon.id}`);
  }

  // Promo code (the user-facing string)
  const promoList = await stripe.promotionCodes.list({ code: spec.code, limit: 1 });
  let promo = promoList.data[0];
  if (promo) {
    console.log(`  · promo exists:    ${promo.id} (code=${promo.code})`);
  } else {
    promo = await stripe.promotionCodes.create({
      coupon: coupon.id,
      code: spec.code,
      metadata: { scent_coupon_code: spec.code },
    });
    console.log(`  · created promo:   ${promo.id} (code=${promo.code})`);
  }
  return { coupon, promo };
}

// ── Main ─────────────────────────────────────────────────────────────────────
console.log('Setting up Stripe products + prices...\n');

const priceIds = {};
for (const tier of TIERS) {
  console.log(`[${tier.id}]  ${tier.name}  (₪${tier.price / 100}/mo)`);
  const product = await ensureProduct(tier);
  const price   = await ensurePrice(product, tier);
  priceIds[tier.id] = price.id;
  console.log('');
}

console.log('\nSetting up promotion codes...\n');
for (const spec of COUPONS) {
  console.log(`[${spec.code}]  ${spec.percent_off}% off  (${spec.duration})`);
  await ensureCoupon(spec);
  console.log('');
}

const { secret: webhookSecret } = await ensureWebhook();

// ── Append values to .env.local (idempotent — replaces existing lines) ───────
function upsertEnv(key, value) {
  let txt = fs.readFileSync(envPath, 'utf8');
  // Remove any existing assignment OR commented hint for this key
  const re = new RegExp(`^#?\\s*${key}=.*$`, 'm');
  const line = `${key}=${value}`;
  if (re.test(txt)) {
    txt = txt.replace(re, line);
  } else {
    if (!txt.endsWith('\n')) txt += '\n';
    txt += line + '\n';
  }
  fs.writeFileSync(envPath, txt);
}

upsertEnv('NEXT_PUBLIC_STRIPE_PRICE_DISCOVERY', priceIds.discovery);
upsertEnv('NEXT_PUBLIC_STRIPE_PRICE_COLLECTOR', priceIds.collector);
upsertEnv('NEXT_PUBLIC_STRIPE_PRICE_EXPERT',    priceIds.expert);
if (webhookSecret) upsertEnv('STRIPE_WEBHOOK_SECRET', webhookSecret);

console.log('\n──────────────────────────────────────────────────────');
console.log('✓  .env.local updated:');
console.log(`   NEXT_PUBLIC_STRIPE_PRICE_DISCOVERY=${priceIds.discovery}`);
console.log(`   NEXT_PUBLIC_STRIPE_PRICE_COLLECTOR=${priceIds.collector}`);
console.log(`   NEXT_PUBLIC_STRIPE_PRICE_EXPERT=${priceIds.expert}`);
if (webhookSecret) console.log(`   STRIPE_WEBHOOK_SECRET=${webhookSecret}`);
else               console.log('   STRIPE_WEBHOOK_SECRET=(unchanged — webhook already existed)');
console.log('──────────────────────────────────────────────────────');
console.log('Promotion codes provisioned: WELCOME20 / SCENT50 / VIP30');
console.log('Done.  Add these same vars to Vercel project env settings.');
