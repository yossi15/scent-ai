import { Resend } from 'resend';

const FROM = process.env.RESEND_FROM_EMAIL ?? 'noreply@scentory.co.il';
const SITE = 'https://scentory.co.il';

let _client: Resend | null = null;
function client(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  if (!_client) _client = new Resend(key);
  return _client;
}

const baseStyle = `
  body{margin:0;padding:0;background:#F5F3EE;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Heebo,sans-serif;direction:rtl}
  .wrap{max-width:560px;margin:0 auto;padding:32px 16px}
  .card{background:#FFFFFF;border:1px solid #E8E4DC;border-radius:16px;padding:32px;box-shadow:0 4px 16px rgba(13,13,13,0.06)}
  .brand{font-family:Georgia,serif;font-size:28px;letter-spacing:0.45em;padding-right:0.45em;color:#0D0D0D;text-align:center;margin-bottom:8px}
  .sub{text-align:center;font-size:11px;letter-spacing:0.3em;color:#8B7355;text-transform:uppercase;margin-bottom:28px}
  .line{height:1px;background:rgba(196,168,130,0.5);margin:8px auto 24px;max-width:120px}
  h1{color:#0D0D0D;font-family:Georgia,serif;font-size:22px;margin:0 0 16px}
  p{color:#4A4A4A;font-size:15px;line-height:1.7;margin:0 0 14px}
  .cta{display:inline-block;background:#0D0D0D;color:#FFFFFF !important;text-decoration:none;padding:12px 28px;border-radius:8px;font-weight:600;font-size:14px;margin-top:8px}
  .footer{text-align:center;color:#9A9A9A;font-size:11px;margin-top:24px}
  .footer a{color:#8B7355;text-decoration:none}
`;

function shell(inner: string): string {
  return `<!doctype html><html lang="he" dir="rtl"><head><meta charset="utf-8"><style>${baseStyle}</style></head>
    <body><div class="wrap"><div class="card">
      <div class="brand">SCENTORY</div>
      <div class="line"></div>
      <div class="sub">Know your scent.</div>
      ${inner}
      <div class="footer">
        © 2026 SCENTORY · <a href="${SITE}">${SITE.replace('https://','')}</a><br/>
        <a href="${SITE}/privacy">פרטיות</a> · <a href="${SITE}/terms">תקנון</a>
      </div>
    </div></div></body></html>`;
}

export async function sendSampleConfirmation(opts: {
  to: string;
  name?: string | null;
  fragranceName: string;
  brand?: string | null;
}): Promise<void> {
  const r = client();
  if (!r) { console.warn('[email] RESEND_API_KEY missing — skipping send'); return; }

  const greeting = opts.name ? `שלום ${opts.name},` : 'שלום,';
  const brandLine = opts.brand ? ` (${opts.brand})` : '';

  const inner = `
    <h1>נרשמת להתראה ✓</h1>
    <p>${greeting}</p>
    <p>קיבלנו את העניין שלך ב-<strong>${opts.fragranceName}</strong>${brandLine}.
    SCENTORY היא פלטפורמת גילוי בשמים — אנחנו לא מוכרים בקבוקים בעצמנו, אבל
    נעדכן אותך באימייל ברגע שנוסיף את הבושם הזה למאגר או נמצא עליו עסקה אצל אחד מהקמעונאים שלנו.</p>
    <p>בינתיים, אם יש לך שאלות — מוזמן לענות לאימייל הזה.</p>
    <a class="cta" href="${SITE}">חזור לאתר</a>
  `;

  try {
    await r.emails.send({
      from: `SCENTORY <${FROM}>`,
      to: opts.to,
      subject: `נרשמת להתראה — ${opts.fragranceName}`,
      html: shell(inner),
    });
  } catch (err) {
    console.error('[email] sample confirmation failed:', err);
  }
}

export async function sendWaitlistConfirmation(opts: {
  to: string;
  name?: string | null;
}): Promise<void> {
  const r = client();
  if (!r) { console.warn('[email] RESEND_API_KEY missing — skipping send'); return; }

  const greeting = opts.name ? `שלום ${opts.name},` : 'שלום,';

  const inner = `
    <h1>ברוך הבא לרשימת ההמתנה ✓</h1>
    <p>${greeting}</p>
    <p>נרשמת בהצלחה לרשימת ההמתנה של SCENTORY. בקרוב מאוד תקבל גישה ראשונה לשירות המנוי שלנו —
    בשמי נישה אישיים שנבחרים עבורך על ידי AI מתוך מאגר של 151 בשמים מ-43 בתי בושם.</p>
    <p>נעדכן אותך ברגע שהמקום שלך יהיה מוכן.</p>
    <a class="cta" href="${SITE}">בקר באתר</a>
  `;

  try {
    await r.emails.send({
      from: `SCENTORY <${FROM}>`,
      to: opts.to,
      subject: 'ברוך הבא ל-SCENTORY — אישור הרשמה',
      html: shell(inner),
    });
  } catch (err) {
    console.error('[email] waitlist confirmation failed:', err);
  }
}

export async function sendSubscriptionConfirmation(opts: {
  to: string;
  name?: string | null;
  tier: string;
}): Promise<void> {
  const r = client();
  if (!r) { console.warn('[email] RESEND_API_KEY missing — skipping send'); return; }

  const greeting = opts.name ? `שלום ${opts.name},` : 'שלום,';

  const inner = `
    <h1>המנוי שלך פעיל 🎉</h1>
    <p>${greeting}</p>
    <p>תודה שהצטרפת ל-SCENTORY במסלול <strong>${opts.tier}</strong>.
    מעכשיו פתוחות לך כל יכולות הפלטפורמה — אוסף אישי, המלצות AI מתקדמות, השוואת מחירים והתראות.</p>
    <p>אפשר לנהל את המנוי בכל עת מעמוד &ldquo;החשבון שלי&rdquo;.</p>
    <a class="cta" href="${SITE}/account">לחשבון שלי</a>
  `;

  try {
    await r.emails.send({
      from: `SCENTORY <${FROM}>`,
      to: opts.to,
      subject: 'המנוי שלך ל-SCENTORY פעיל 🎉',
      html: shell(inner),
    });
  } catch (err) {
    console.error('[email] subscription confirmation failed:', err);
  }
}
