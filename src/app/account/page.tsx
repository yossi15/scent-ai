'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useUser } from '@clerk/nextjs';
import {
  User, Crown, Calendar, AlertCircle, Loader2,
  ArrowLeft, Settings, XCircle, RotateCcw, CheckCircle2,
} from 'lucide-react';
import { subscriptionTiers } from '@/data/fragrances';

type SubInfo = {
  tier: string | null;
  status: string | null;
  currentPeriodEnd: string | null;
  cancelAtPeriodEnd: boolean;
};

const tierHebrewName: Record<string, string> = {
  discovery: 'גילוי',
  collector: 'אספן',
  expert:    'מומחה',
};

function formatDate(iso: string | null): string {
  if (!iso) return '—';
  try {
    return new Date(iso).toLocaleDateString('he-IL', {
      year: 'numeric', month: 'long', day: 'numeric',
    });
  } catch { return '—'; }
}

const statusLabel: Record<string, { text: string; color: string }> = {
  active:               { text: 'פעיל',          color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
  trialing:             { text: 'תקופת ניסיון',   color: 'text-blue-600 bg-blue-50 border-blue-200' },
  past_due:             { text: 'תשלום נכשל',     color: 'text-amber-600 bg-amber-50 border-amber-200' },
  canceled:             { text: 'בוטל',           color: 'text-red-600 bg-red-50 border-red-200' },
  incomplete:           { text: 'לא הושלם',       color: 'text-amber-600 bg-amber-50 border-amber-200' },
  incomplete_expired:   { text: 'פג תוקף',        color: 'text-red-600 bg-red-50 border-red-200' },
  unpaid:               { text: 'לא שולם',        color: 'text-red-600 bg-red-50 border-red-200' },
};

export default function AccountPage() {
  const router = useRouter();
  const { isLoaded, isSignedIn, user } = useUser();
  const [sub, setSub]               = useState<SubInfo | null>(null);
  const [loading, setLoading]       = useState(true);
  const [actionLoading, setAction]  = useState<'cancel' | 'resume' | 'portal' | null>(null);
  const [error, setError]           = useState<string | null>(null);
  const [showConfirm, setConfirm]   = useState(false);

  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn) { router.push('/sign-in'); return; }
    fetch('/api/subscription')
      .then(r => r.ok ? r.json() : Promise.reject(new Error('Failed to fetch subscription')))
      .then(setSub)
      .catch(() => setError('שגיאה בטעינת המנוי'))
      .finally(() => setLoading(false));
  }, [isLoaded, isSignedIn, router]);

  const refresh = async () => {
    const r = await fetch('/api/subscription');
    if (r.ok) setSub(await r.json());
  };

  const handleCancel = async (resume: boolean) => {
    setError(null);
    setAction(resume ? 'resume' : 'cancel');
    try {
      const r = await fetch('/api/subscription/cancel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resume }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error ?? 'Action failed');
      await refresh();
      setConfirm(false);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'משהו השתבש');
    } finally {
      setAction(null);
    }
  };

  const openPortal = async () => {
    setError(null);
    setAction('portal');
    try {
      const r = await fetch('/api/customer-portal', { method: 'POST' });
      const data = await r.json();
      if (!r.ok || !data.url) throw new Error(data.error ?? 'Portal failed');
      window.location.href = data.url;
    } catch (e) {
      setError(e instanceof Error ? e.message : 'משהו השתבש');
      setAction(null);
    }
  };

  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-gold animate-spin" />
      </div>
    );
  }

  const hasSub = !!sub?.tier && sub.status !== null;
  const tierIdx = sub?.tier ? subscriptionTiers.findIndex(t => t.id === sub.tier) : -1;
  const tierData = tierIdx >= 0 ? subscriptionTiers[tierIdx] : null;
  const tierHe   = sub?.tier ? tierHebrewName[sub.tier] : '—';
  const statusInfo = sub?.status ? statusLabel[sub.status] ?? { text: sub.status, color: 'text-ink-muted bg-bg-secondary border-black/10' } : null;
  const isActive = sub?.status === 'active' || sub?.status === 'trialing';

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 bg-bg-primary">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link href="/" className="inline-flex items-center gap-1 text-ink-muted hover:text-gold text-xs font-hebrew mb-4">
            <ArrowLeft className="w-3.5 h-3.5" /> חזרה לדף הבית
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-gold-faint flex items-center justify-center">
              <User className="w-6 h-6 text-gold" />
            </div>
            <div>
              <h1 className="font-serif text-3xl text-ink font-bold">החשבון שלי</h1>
              {user?.primaryEmailAddress?.emailAddress && (
                <p className="text-ink-muted text-sm font-sans" dir="ltr">
                  {user.primaryEmailAddress.emailAddress}
                </p>
              )}
            </div>
          </div>
        </motion.div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm font-hebrew rounded-lg p-3 mb-6 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {error}
          </div>
        )}

        {/* Subscription card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card p-6 md:p-8 mb-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <Crown className="w-5 h-5 text-gold" />
            <h2 className="font-serif text-xl text-ink font-semibold">המנוי שלי</h2>
          </div>

          {!hasSub ? (
            <div className="text-center py-8">
              <p className="text-ink-muted text-sm font-hebrew mb-4">אין לך מנוי פעיל כרגע</p>
              <Link href="/#subscribe" className="btn-gold inline-flex items-center gap-2 px-6 py-3 text-sm font-hebrew rounded-lg">
                בחר חבילה <ArrowLeft className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Tier + Status */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-bg-secondary rounded-xl p-4">
                  <p className="text-ink-muted text-[11px] font-hebrew font-medium mb-1">החבילה שלך</p>
                  <p className="font-serif text-2xl text-ink font-bold">{tierHe}</p>
                  {tierData && (
                    <p className="text-ink-faint text-xs font-sans mt-1" dir="ltr">
                      ₪{tierData.price}/month
                    </p>
                  )}
                </div>
                <div className="bg-bg-secondary rounded-xl p-4">
                  <p className="text-ink-muted text-[11px] font-hebrew font-medium mb-1">סטטוס</p>
                  {statusInfo && (
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-hebrew font-medium border ${statusInfo.color}`}>
                      {sub?.status === 'active' && <CheckCircle2 className="w-3 h-3" />}
                      {statusInfo.text}
                    </span>
                  )}
                </div>
              </div>

              {/* Renewal date */}
              <div className="bg-bg-secondary rounded-xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gold-faint flex items-center justify-center shrink-0">
                  <Calendar className="w-4 h-4 text-gold" />
                </div>
                <div className="flex-1">
                  <p className="text-ink-muted text-[11px] font-hebrew font-medium">
                    {sub?.cancelAtPeriodEnd ? 'תאריך סיום המנוי' : 'תאריך החידוש הבא'}
                  </p>
                  <p className="text-ink font-serif text-base font-semibold">
                    {formatDate(sub?.currentPeriodEnd ?? null)}
                  </p>
                </div>
              </div>

              {/* Cancel notice */}
              {sub?.cancelAtPeriodEnd && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <p className="text-amber-800 text-sm font-hebrew flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                    <span>המנוי שלך יבוטל בתאריך הנ&quot;ל. עד אז תיהנה מכל ההטבות.</span>
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={openPortal}
                  disabled={actionLoading !== null}
                  className="btn-outline flex-1 py-3 text-sm font-hebrew flex items-center justify-center gap-2 rounded-lg disabled:opacity-60"
                >
                  {actionLoading === 'portal'
                    ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    : <Settings className="w-3.5 h-3.5" />}
                  ניהול חיוב ופרטים
                </button>

                {isActive && !sub?.cancelAtPeriodEnd && (
                  <button
                    onClick={() => setConfirm(true)}
                    disabled={actionLoading !== null}
                    className="flex-1 py-3 text-sm font-hebrew rounded-lg border border-red-200 text-red-600 hover:bg-red-50 flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    בטל מנוי
                  </button>
                )}

                {sub?.cancelAtPeriodEnd && (
                  <button
                    onClick={() => handleCancel(true)}
                    disabled={actionLoading !== null}
                    className="flex-1 py-3 text-sm font-hebrew rounded-lg border border-emerald-200 text-emerald-700 hover:bg-emerald-50 flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    {actionLoading === 'resume'
                      ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      : <RotateCcw className="w-3.5 h-3.5" />}
                    חידוש המנוי
                  </button>
                )}
              </div>
            </div>
          )}
        </motion.div>

        {/* Quick links */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid sm:grid-cols-2 gap-3"
        >
          <Link href="/dashboard" className="card p-4 flex items-center gap-3 hover:border-gold transition-colors">
            <div className="w-10 h-10 rounded-lg bg-gold-faint flex items-center justify-center">
              <Crown className="w-4 h-4 text-gold" />
            </div>
            <div>
              <p className="font-serif text-sm text-ink font-semibold">הדשבורד שלי</p>
              <p className="text-ink-faint text-[11px] font-hebrew">קולקציה ויומן</p>
            </div>
          </Link>
          <Link href="/#subscribe" className="card p-4 flex items-center gap-3 hover:border-gold transition-colors">
            <div className="w-10 h-10 rounded-lg bg-gold-faint flex items-center justify-center">
              <Calendar className="w-4 h-4 text-gold" />
            </div>
            <div>
              <p className="font-serif text-sm text-ink font-semibold">חבילות מנוי</p>
              <p className="text-ink-faint text-[11px] font-hebrew">השווה ושדרג</p>
            </div>
          </Link>
        </motion.div>

        {/* Confirm cancel modal */}
        {showConfirm && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-bg-primary rounded-2xl p-6 max-w-md w-full shadow-xl"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                </div>
                <h3 className="font-serif text-lg text-ink font-bold">לבטל את המנוי?</h3>
              </div>
              <p className="text-ink-muted text-sm font-hebrew mb-6">
                המנוי יישאר פעיל עד {formatDate(sub?.currentPeriodEnd ?? null)}.
                לא יחויבו דמי מנוי נוספים. ניתן לחדש בכל עת לפני סיום התקופה.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setConfirm(false)}
                  disabled={actionLoading !== null}
                  className="flex-1 py-2.5 text-sm font-hebrew rounded-lg btn-outline"
                >
                  השאר את המנוי
                </button>
                <button
                  onClick={() => handleCancel(false)}
                  disabled={actionLoading !== null}
                  className="flex-1 py-2.5 text-sm font-hebrew rounded-lg bg-red-600 text-white hover:bg-red-700 flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {actionLoading === 'cancel' && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  כן, בטל
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
