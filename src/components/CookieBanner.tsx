'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Cookie, X } from 'lucide-react';

const LS_KEY = 'scent-cookie-consent';

type ConsentData = {
  essential: true;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
};

function Toggle({ checked, onChange, disabled }: { checked: boolean; onChange: (v: boolean) => void; disabled?: boolean }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      style={{
        position: 'relative',
        width: 36,
        height: 20,
        borderRadius: 10,
        border: 'none',
        background: checked ? 'var(--gold)' : 'rgba(255,255,255,0.12)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        flexShrink: 0,
        transition: 'background 0.2s',
        padding: 0,
        opacity: disabled ? 0.6 : 1,
      }}
    >
      <span
        style={{
          position: 'absolute',
          top: 3,
          left: checked ? 19 : 3,
          width: 14,
          height: 14,
          borderRadius: '50%',
          background: '#fff',
          transition: 'left 0.2s',
        }}
      />
    </button>
  );
}

export default function CookieBanner() {
  const [visible, setVisible]     = useState(false);
  const [showCustom, setShowCustom] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (!raw) { setVisible(true); return; }
      JSON.parse(raw) as ConsentData;
    } catch {
      setVisible(true);
    }
  }, []);

  const save = (overrides: { analytics: boolean; marketing: boolean }) => {
    const data: ConsentData = {
      essential: true,
      analytics: overrides.analytics,
      marketing: overrides.marketing,
      timestamp: new Date().toISOString(),
    };
    try { localStorage.setItem(LS_KEY, JSON.stringify(data)); } catch {}
    setVisible(false);
    setShowCustom(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="הסכמה לשימוש בעוגיות"
      aria-modal="false"
      style={{
        position: 'fixed',
        bottom: 16,
        right: 16,
        left: 16,
        zIndex: 100,
        maxWidth: 480,
        marginLeft: 'auto',
        background: 'var(--bg-card)',
        border: '1px solid var(--border-gold)',
        borderRadius: 12,
        padding: 16,
        boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
        direction: 'rtl',
      }}
    >
      {!showCustom ? (
        <>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10, gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
              <div style={{
                width: 32, height: 32, borderRadius: 8,
                background: 'rgba(201,169,97,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <Cookie size={15} color="var(--gold)" />
              </div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 3 }}>
                  עוגיות לשיפור החוויה
                </p>
                <p style={{ fontSize: 12, color: 'var(--text-tertiary)', lineHeight: 1.5 }}>
                  הסכמה הופכת את ההמלצות לחכמות יותר.{' '}
                  <Link href="/privacy" style={{ color: 'var(--gold)', textDecoration: 'underline', textUnderlineOffset: '2px' }}>
                    פרטים
                  </Link>
                </p>
              </div>
            </div>
            <button
              onClick={() => save({ analytics: false, marketing: false })}
              aria-label="סגור"
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: 2, flexShrink: 0, minWidth: 44, minHeight: 44 }}
            >
              <X size={14} />
            </button>
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <button
              onClick={() => save({ analytics: true, marketing: true })}
              style={{
                flex: 1, minWidth: 100,
                padding: '9px 14px',
                background: 'var(--gold)',
                color: '#050505',
                border: 'none',
                borderRadius: 6,
                fontSize: 12,
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              מקבל הכל
            </button>
            <button
              onClick={() => save({ analytics: false, marketing: false })}
              style={{
                flex: 1, minWidth: 100,
                padding: '9px 14px',
                background: 'transparent',
                color: 'var(--text-secondary)',
                border: '1px solid var(--border-default)',
                borderRadius: 6,
                fontSize: 12,
                fontWeight: 500,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              חובה בלבד
            </button>
            <button
              onClick={() => setShowCustom(true)}
              style={{
                padding: '9px 14px',
                background: 'transparent',
                color: 'var(--text-muted)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 6,
                fontSize: 12,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              התאמה אישית
            </button>
          </div>
        </>
      ) : (
        <>
          {/* Custom panel */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>
              בחר אילו עוגיות מותר לנו לשמור
            </p>
            <button
              onClick={() => setShowCustom(false)}
              aria-label="חזור"
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: 2, minWidth: 44, minHeight: 44 }}
            >
              <X size={14} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 16 }}>
            {([
              {
                label: 'חובה',
                desc: 'הכרחי לפעולת האתר',
                checked: true,
                disabled: true,
                onChange: () => {},
              },
              {
                label: 'אנליטיקס',
                desc: 'עוזר לנו להבין איך משתמשים באתר',
                checked: analytics,
                disabled: false,
                onChange: setAnalytics,
              },
              {
                label: 'שיווק',
                desc: 'מאפשר לנו לשלוח לך עדכונים רלוונטיים',
                checked: marketing,
                disabled: false,
                onChange: setMarketing,
              },
            ] as const).map((item) => (
              <div
                key={item.label}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}
              >
                <div>
                  <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-primary)', marginBottom: 2 }}>
                    {item.label}
                    {item.disabled && (
                      <span style={{ fontSize: 12, color: 'var(--gold)', marginRight: 6, fontWeight: 400 }}>
                        תמיד פעיל
                      </span>
                    )}
                  </p>
                  <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>{item.desc}</p>
                </div>
                <Toggle
                  checked={item.checked}
                  disabled={item.disabled}
                  onChange={item.onChange as (v: boolean) => void}
                />
              </div>
            ))}
          </div>

          <button
            onClick={() => save({ analytics, marketing })}
            style={{
              width: '100%',
              padding: '10px 0',
              background: 'var(--gold)',
              color: '#050505',
              border: 'none',
              borderRadius: 6,
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            שמור את ההעדפות שלי
          </button>
        </>
      )}
    </div>
  );
}
