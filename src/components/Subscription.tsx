'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Crown, Check, ArrowLeft, Package, Sparkles, Calendar, Loader2, Settings, Tag, X } from 'lucide-react';
import { useUser, SignInButton } from '@clerk/nextjs';
import { subscriptionTiers } from '@/data/fragrances';

// Known promotion codes (must match Stripe). These are validated server-side
// at checkout — the table here is for instant UX feedback only.
const COUPONS: Record<string, { percent: number; label: string }> = {
  WELCOME20: { percent: 20, label: '20% הנחה לחודש ראשון' },
  SCENT50:   { percent: 50, label: '50% הנחה לחודש ראשון' },
  VIP30:     { percent: 30, label: '30% הנחה לכל החיים' },
};

type SubInfo = {
  tier: string | null;
  status: string | null;
  currentPeriodEnd: string | null;
  cancelAtPeriodEnd: boolean;
};

export default function Subscription() {
  const { isLoaded, isSignedIn } = useUser();
  const [loadingTier, setLoadingTier] = useState<string | null>(null);
  const [portalLoading, setPortalLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sub, setSub] = useState<SubInfo | null>(null);

  // Coupon UX
  const [showCouponInput, setShowCouponInput] = useState(false);
  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);

  useEffect(() => {
    if (!isSignedIn) { setSub(null); return; }
    fetch('/api/subscription')
      .then(r => r.ok ? r.json() : null)
      .then(setSub)
      .catch(() => {});
  }, [isSignedIn]);

  const isActive = sub?.status === 'active' || sub?.status === 'trialing';
  const activeTierId = isActive ? sub?.tier : null;

  const applyCoupon = () => {
    const code = couponInput.trim().toUpperCase();
    setCouponError(null);
    if (!code) return;
    if (COUPONS[code]) {
      setAppliedCoupon(code);
    } else {
      setAppliedCoupon(null);
      setCouponError('קוד קופון לא תקין');
    }
  };

  const clearCoupon = () => {
    setAppliedCoupon(null);
    setCouponInput('');
    setCouponError(null);
  };

  const startCheckout = async (tierId: string) => {
    setError(null);
    setLoadingTier(tierId);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier: tierId, couponCode: appliedCoupon ?? undefined }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error ?? 'Checkout failed');
      window.location.href = data.url;
    } catch (e) {
      setError(e instanceof Error ? e.message : 'משהו השתבש');
      setLoadingTier(null);
    }
  };

  const openPortal = async () => {
    setError(null);
    setPortalLoading(true);
    try {
      const res = await fetch('/api/customer-portal', { method: 'POST' });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error ?? 'Portal failed');
      window.location.href = data.url;
    } catch (e) {
      setError(e instanceof Error ? e.message : 'משהו השתבש');
      setPortalLoading(false);
    }
  };

  const couponInfo = appliedCoupon ? COUPONS[appliedCoupon] : null;

  const priceWithDiscount = (price: number) => {
    if (!couponInfo) return null;
    return Math.round(price * (1 - couponInfo.percent / 100));
  };

  return (
    <section id="subscribe" className="py-24 px-4 section-accent">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-gold text-[11px] tracking-[0.2em] uppercase font-sans font-medium mb-2">
            MEMBERSHIP
          </p>
          <h2 className="font-serif text-4xl md:text-5xl gold-text mb-3 font-bold">
            הצטרף למעגל הפנימי
          </h2>
          <p className="text-ink-muted text-sm font-hebrew max-w-md mx-auto font-light">
            בחר את המסלול שלך לשליטה ריחנית עם סלקציה חודשית בקיור AI
          </p>
        </motion.div>

        {/* Active subscription banner */}
        {isActive && activeTierId && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="card-gold p-5 mb-8 text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <Check className="w-5 h-5 text-gold" />
              <span className="font-serif text-xl text-ink font-semibold">
                המנוי שלך פעיל
                {(() => {
                  const t = subscriptionTiers.find(t => t.id === activeTierId);
                  return t ? ` — ${t.name}` : '';
                })()}
              </span>
            </div>
            {sub?.cancelAtPeriodEnd && (
              <p className="text-ink-muted text-xs font-hebrew mb-2">
                המנוי יבוטל בסוף תקופת החיוב הנוכחית
              </p>
            )}
            <button
              onClick={openPortal}
              disabled={portalLoading}
              className="inline-flex items-center gap-1.5 text-gold text-xs font-hebrew hover:underline disabled:opacity-60"
            >
              {portalLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Settings className="w-3.5 h-3.5" />}
              ניהול חיוב ומנוי
            </button>
          </motion.div>
        )}

        {/* Error toast */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-50 border border-red-200 text-red-700 text-sm font-hebrew rounded-lg p-3 mb-6 text-center"
          >
            {error}
          </motion.div>
        )}

        {/* Tier cards */}
        <div className="grid md:grid-cols-3 gap-5 md:gap-6 mb-10 items-stretch">
          {subscriptionTiers.map((tier, i) => {
            const isCurrent = activeTierId === tier.id;
            const isLoading = loadingTier === tier.id;
            const discounted = tier.highlight ? priceWithDiscount(tier.price) : priceWithDiscount(tier.price);

            return (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className={`rounded-2xl p-6 md:p-8 relative transition-all duration-400 flex flex-col ${
                  tier.highlight
                    ? 'bg-bg-card border-2 border-[#C4A882] md:scale-110 shadow-[0_24px_60px_-20px_rgba(196,168,130,0.55)] z-10'
                    : 'card'
                } ${isCurrent ? 'ring-2 ring-gold' : ''}`}
              >
                {tier.highlight && !isCurrent && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#C4A882] text-[#0D0D0D] text-[11px] font-hebrew font-bold px-4 py-1.5 rounded-full shadow-md whitespace-nowrap">
                    ⭐ הכי פופולרי
                  </div>
                )}
                {isCurrent && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-white text-[10px] font-hebrew font-semibold px-4 py-1 rounded-full">
                    המסלול הנוכחי שלך
                  </div>
                )}

                <div className="text-center mb-5">
                  <div className={`w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center ${
                    tier.highlight ? 'bg-[#C4A882]/20' : 'bg-bg-secondary'
                  }`}>
                    <Crown className={`w-5 h-5 ${tier.highlight ? 'text-[#C4A882]' : 'text-ink-faint'}`} />
                  </div>
                  <h3 className="font-serif text-2xl text-ink mb-0.5 font-semibold">{tier.name}</h3>
                  <p className="text-ink-faint text-xs font-hebrew font-light">{tier.tagline}</p>
                </div>

                <div className="text-center mb-6" dir="ltr">
                  {discounted !== null ? (
                    <>
                      <span className="text-ink-faint text-base font-sans line-through ml-1">₪{tier.price}</span>
                      <span className={`font-serif text-4xl font-bold ${tier.highlight ? 'text-[#C4A882]' : 'text-gold'}`}>
                        ₪{discounted}
                      </span>
                    </>
                  ) : (
                    <span className={`font-serif text-4xl font-bold ${tier.highlight ? 'text-[#C4A882]' : 'text-gold'}`}>
                      ₪{tier.price}
                    </span>
                  )}
                  <span className="text-ink-faint text-sm font-sans">/חודש</span>
                  {couponInfo && (
                    <p className="text-[10px] font-hebrew text-[#8B7355] mt-1">{couponInfo.label}</p>
                  )}
                </div>

                <ul className="space-y-2.5 mb-8 flex-1">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center mt-0.5 shrink-0 ${
                        tier.highlight ? 'bg-[#C4A882]/25' : 'bg-gold-faint'
                      }`}>
                        <Check className={`w-2.5 h-2.5 ${tier.highlight ? 'text-[#8B7355]' : 'text-gold'}`} />
                      </div>
                      <span className="text-ink-secondary text-sm font-hebrew font-light">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                {!isLoaded ? (
                  <button disabled className="w-full py-3 text-sm font-hebrew font-medium flex items-center justify-center gap-2 rounded-lg opacity-60 bg-bg-secondary text-ink-muted">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" /> טוען...
                  </button>
                ) : !isSignedIn ? (
                  <SignInButton mode="modal">
                    <button data-cta-dark={tier.highlight ? '' : undefined} className={`w-full py-3 text-sm font-hebrew font-semibold flex items-center justify-center gap-2 rounded-lg transition-all ${
                      tier.highlight
                        ? 'bg-[#0D0D0D] text-white hover:bg-[#1a1a1a] shadow-md'
                        : 'btn-outline'
                    }`}>
                      התחבר להמשך <ArrowLeft className="w-3.5 h-3.5" />
                    </button>
                  </SignInButton>
                ) : isCurrent ? (
                  <button
                    onClick={openPortal}
                    disabled={portalLoading}
                    className="w-full py-3 text-sm font-hebrew font-medium flex items-center justify-center gap-2 rounded-lg bg-gold/10 text-gold border border-gold-border disabled:opacity-60"
                  >
                    {portalLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Settings className="w-3.5 h-3.5" />}
                    ניהול המנוי
                  </button>
                ) : (
                  <button
                    data-cta-dark={tier.highlight ? '' : undefined}
                    onClick={() => startCheckout(tier.id)}
                    disabled={isLoading || loadingTier !== null}
                    className={`w-full py-3 text-sm font-hebrew font-semibold flex items-center justify-center gap-2 rounded-lg transition-all disabled:opacity-60 ${
                      tier.highlight
                        ? 'bg-[#0D0D0D] text-white hover:bg-[#1a1a1a] shadow-md'
                        : 'btn-outline'
                    }`}
                  >
                    {isLoading ? (
                      <><Loader2 className="w-3.5 h-3.5 animate-spin" /> מעביר לתשלום...</>
                    ) : isActive ? (
                      <>החלף לחבילה זו <ArrowLeft className="w-3.5 h-3.5" /></>
                    ) : (
                      <>התחל את המסע <ArrowLeft className="w-3.5 h-3.5" /></>
                    )}
                  </button>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Coupon code section */}
        <div className="max-w-md mx-auto mb-16">
          {!showCouponInput && !appliedCoupon && (
            <button
              onClick={() => setShowCouponInput(true)}
              className="mx-auto flex items-center gap-1.5 text-ink-muted hover:text-gold text-xs font-hebrew transition-colors"
            >
              <Tag className="w-3.5 h-3.5" />
              יש לך קוד קופון?
            </button>
          )}

          {showCouponInput && !appliedCoupon && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="card !p-3 flex items-center gap-2"
            >
              <Tag className="w-4 h-4 text-gold shrink-0" />
              <input
                type="text"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                onKeyDown={(e) => e.key === 'Enter' && applyCoupon()}
                placeholder="הכנס קוד קופון..."
                className="flex-1 bg-transparent text-ink text-sm font-hebrew placeholder:text-ink-faint/60 focus:outline-none uppercase tracking-wider"
                dir="ltr"
              />
              <button
                onClick={applyCoupon}
                className="bg-[#0D0D0D] text-white text-xs font-hebrew font-semibold px-4 py-2 rounded-lg hover:bg-[#1a1a1a] transition-colors"
              >
                החל
              </button>
            </motion.div>
          )}

          {couponError && (
            <p className="text-red-500 text-xs font-hebrew mt-2 text-center">{couponError}</p>
          )}

          {appliedCoupon && couponInfo && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between gap-2 bg-[#C4A882]/10 border border-[#C4A882]/40 rounded-lg px-4 py-2.5"
            >
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#8B7355]" />
                <span className="text-[#8B7355] text-sm font-hebrew font-semibold">
                  {appliedCoupon} פעיל — {couponInfo.label}
                </span>
              </div>
              <button onClick={clearCoupon} aria-label="הסר קופון" className="text-[#8B7355] hover:text-ink p-1">
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          )}
        </div>

        {/* Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="card-gold p-6 md:p-8"
        >
          <div className="flex items-center gap-2 mb-6">
            <Package className="w-4 h-4 text-gold" />
            <h3 className="font-serif text-xl text-ink font-semibold">תצוגה מקדימה — לוח בקרה</h3>
            <span className="mr-auto tag">דוגמא</span>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <div className="bg-bg-secondary rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-4 h-4 text-gold" />
                <span className="text-ink-muted text-[11px] font-hebrew font-medium">משלוח הבא</span>
              </div>
              <p className="text-gold font-serif text-xl font-semibold mb-0.5" dir="ltr">15 April, 2026</p>
              <p className="text-ink-faint text-xs font-hebrew font-light">נותרו 7 ימים</p>
              <div className="mt-3 h-1.5 bg-bg-primary rounded-full overflow-hidden">
                <div className="h-full bg-gold/40 rounded-full transition-all" style={{ width: '73%' }} />
              </div>
            </div>

            <div className="bg-bg-secondary rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-gold" />
                <span className="text-ink-muted text-[11px] font-hebrew font-medium">בחירת AI של החודש</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gold-faint flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="font-serif text-ink text-sm font-semibold" dir="ltr">Side Effect</p>
                  <p className="text-ink-faint text-[11px] font-sans" dir="ltr">Initio</p>
                  <p className="text-gold text-[10px] font-hebrew mt-0.5">דגימת 8מ״ל</p>
                </div>
              </div>
            </div>

            <div className="bg-bg-secondary rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Package className="w-4 h-4 text-gold" />
                <span className="text-ink-muted text-[11px] font-hebrew font-medium">תצוגה מקדימה — אפריל</span>
              </div>
              <div className="space-y-2">
                {[
                  { name: 'Side Effect', house: 'Initio' },
                  { name: 'Grand Soir', house: 'MFK' },
                  { name: 'Naxos', house: 'Xerjoff' },
                  { name: 'Oud for Greatness', house: 'Initio' },
                  { name: 'Ani', house: 'Nishane' },
                ].map((item) => (
                  <div key={item.name} className="flex items-center gap-2" dir="ltr">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                    <span className="text-ink-secondary text-xs font-sans">{item.name}</span>
                    <span className="text-ink-faint text-[10px] font-sans ml-auto">{item.house}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
