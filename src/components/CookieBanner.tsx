'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const LS_KEY = 'scentory-cookie-consent';
const EXPIRY_MS = 365 * 24 * 60 * 60 * 1000;

type Saved = { consent: 'all' | 'essential' | 'custom'; expiry: number; analytics: boolean; marketing: boolean };

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showCustom, setShowCustom] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (!raw) { setVisible(true); return; }
      const saved: Saved = JSON.parse(raw);
      if (Date.now() > saved.expiry) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const save = (consent: Saved['consent'], overrides?: { analytics: boolean; marketing: boolean }) => {
    const data: Saved = {
      consent,
      expiry: Date.now() + EXPIRY_MS,
      analytics: overrides?.analytics ?? (consent === 'all'),
      marketing: overrides?.marketing ?? (consent === 'all'),
    };
    try { localStorage.setItem(LS_KEY, JSON.stringify(data)); } catch {}
    setVisible(false);
    setShowCustom(false);
  };

  if (!visible) return null;

  const btnPrimary: React.CSSProperties = {
    padding: '9px 20px',
    borderRadius: '6px',
    background: '#1A1A1A',
    color: '#FFFFFF',
    fontFamily: 'Heebo, sans-serif',
    fontSize: '12px',
    fontWeight: 500,
    border: 'none',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  };

  const btnOutline: React.CSSProperties = {
    padding: '9px 20px',
    borderRadius: '6px',
    background: 'transparent',
    color: '#1A1A1A',
    fontFamily: 'Heebo, sans-serif',
    fontSize: '12px',
    fontWeight: 500,
    border: '1px solid #1A1A1A',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  };

  const btnGhost: React.CSSProperties = {
    padding: '9px 20px',
    borderRadius: '6px',
    background: 'transparent',
    color: '#6B6560',
    fontFamily: 'Heebo, sans-serif',
    fontSize: '12px',
    fontWeight: 400,
    border: '1px solid #E8E4DC',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  };

  return (
    <div
      role="dialog"
      aria-label="הסכמה לשימוש בעוגיות"
      aria-modal="false"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9998,
        background: '#FFFFFF',
        borderTop: '1px solid #E8E4DC',
        boxShadow: '0 -4px 24px rgba(0,0,0,0.06)',
        padding: '20px 24px',
        direction: 'rtl',
      }}
    >
      {!showCustom ? (
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            flexWrap: 'wrap',
          }}
        >
          <p style={{ fontFamily: 'Heebo, sans-serif', fontSize: '13px', color: '#3D3D3D', flex: 1, minWidth: '200px', lineHeight: 1.6 }}>
            אנו משתמשים בעוגיות לשיפור החוויה. למידע נוסף —{' '}
            <Link href="/privacy" style={{ color: '#1A1A1A', textDecoration: 'underline' }}>מדיניות פרטיות</Link>.
          </p>
          <div style={{ display: 'flex', gap: '8px', flexShrink: 0, flexWrap: 'wrap' }}>
            <button onClick={() => save('all')} style={btnPrimary}>אשר הכל</button>
            <button onClick={() => save('essential')} style={btnOutline}>רק חיוניות</button>
            <button onClick={() => setShowCustom(true)} style={btnGhost}>מותאם אישית</button>
          </div>
        </div>
      ) : (
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <p style={{ fontFamily: 'Heebo, sans-serif', fontWeight: 600, fontSize: '14px', color: '#1A1A1A', marginBottom: '12px' }}>
            הגדרות עוגיות
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
            {([
              { key: 'essential', label: 'עוגיות חיוניות', desc: 'נדרשות לתפקוד הבסיסי של האתר — תמיד פעילות', always: true, checked: true },
              { key: 'analytics', label: 'ניתוח ביצועים', desc: 'Google Analytics — מאפשרות לנו לשפר את חוויית השימוש', always: false, checked: analytics },
              { key: 'marketing', label: 'שיווק', desc: 'Meta Pixel — מאפשרות הצגת פרסומות מותאמות', always: false, checked: marketing },
            ] as const).map(({ key, label, desc, always, checked }) => (
              <label
                key={key}
                style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', cursor: always ? 'default' : 'pointer' }}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  disabled={always}
                  onChange={e => {
                    if (key === 'analytics') setAnalytics(e.target.checked);
                    if (key === 'marketing') setMarketing(e.target.checked);
                  }}
                  style={{ marginTop: '3px', accentColor: '#1A1A1A' }}
                />
                <span>
                  <span style={{ fontFamily: 'Heebo, sans-serif', fontSize: '13px', fontWeight: 500, color: '#1A1A1A' }}>
                    {label}
                    {always && <span style={{ marginRight: '6px', fontSize: '10px', color: '#6B6560', fontWeight: 400 }}>תמיד פעיל</span>}
                  </span>
                  <br />
                  <span style={{ fontFamily: 'Heebo, sans-serif', fontSize: '11px', color: '#6B6560' }}>{desc}</span>
                </span>
              </label>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => save('custom', { analytics, marketing })} style={btnPrimary}>שמור העדפות</button>
            <button onClick={() => setShowCustom(false)} style={btnGhost}>חזרה</button>
          </div>
        </div>
      )}
    </div>
  );
}
