'use client';

import { useState, useEffect, useCallback } from 'react';
import { Accessibility } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

type A11yPrefs = {
  fontSize: 0 | 1 | 2;
  highContrast: boolean;
  highlightLinks: boolean;
};

const DEFAULT: A11yPrefs = { fontSize: 0, highContrast: false, highlightLinks: false };
const LS_KEY = 'scentory-a11y';

export default function AccessibilityWidget() {
  const [open, setOpen] = useState(false);
  const [prefs, setPrefs] = useState<A11yPrefs>(DEFAULT);

  const apply = useCallback((next: A11yPrefs) => {
    setPrefs(next);
    try { localStorage.setItem(LS_KEY, JSON.stringify(next)); } catch {}

    const html = document.documentElement;
    // Font size
    html.classList.remove('a11y-font-1', 'a11y-font-2');
    if (next.fontSize === 1) html.classList.add('a11y-font-1');
    if (next.fontSize === 2) html.classList.add('a11y-font-2');
    // High contrast
    html.classList.toggle('a11y-contrast', next.highContrast);
    // Link highlight
    html.classList.toggle('a11y-links', next.highlightLinks);
  }, []);

  // Load saved prefs on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LS_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as A11yPrefs;
        apply(parsed);
        return;
      }
    } catch {}
    apply(DEFAULT);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggle = (key: 'highContrast' | 'highlightLinks') =>
    apply({ ...prefs, [key]: !prefs[key] });

  const row: React.CSSProperties = {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '8px 10px',
    borderRadius: '8px',
    border: '1px solid var(--border)',
    fontFamily: 'Heebo, sans-serif',
    fontSize: '12px',
    cursor: 'pointer',
    marginBottom: '8px',
    transition: 'background 0.15s',
  };

  return (
    <div className="a11y-widget-root" style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999 }}>
      {/* Floating button */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="תפריט נגישות"
        aria-expanded={open}
        aria-controls="a11y-panel"
        style={{
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          background: 'var(--ink)',
          color: 'var(--bg-primary)',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
        }}
      >
        <Accessibility size={20} />
      </button>

      {/* Panel */}
      {open && (
        <div
          id="a11y-panel"
          role="dialog"
          aria-label="הגדרות נגישות"
          style={{
            position: 'absolute',
            bottom: '56px',
            right: 0,
            width: '224px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-default)',
            borderRadius: '12px',
            boxShadow: 'var(--shadow-lg)',
            padding: '16px',
            direction: 'rtl',
          }}
        >
          <p style={{ fontFamily: 'Heebo, sans-serif', fontWeight: 600, fontSize: '14px', color: 'var(--ink)', marginBottom: '14px' }}>
            הגדרות נגישות
          </p>

          {/* Theme toggle — synced with Navbar ThemeToggle via custom event */}
          <ThemeToggle variant="row" />

          {/* Font size */}
          <p style={{ fontFamily: 'Heebo, sans-serif', fontSize: '12px', color: 'var(--ink-faint)', marginBottom: '6px' }}>גודל טקסט</p>
          <div style={{ display: 'flex', gap: '6px', marginBottom: '12px' }}>
            {(['רגיל', 'גדול', 'גדול מאוד'] as const).map((label, i) => (
              <button
                key={i}
                onClick={() => apply({ ...prefs, fontSize: i as 0 | 1 | 2 })}
                aria-pressed={prefs.fontSize === i}
                style={{
                  flex: 1,
                  padding: '5px 0',
                  borderRadius: '6px',
                  border: '1px solid',
                  borderColor: prefs.fontSize === i ? 'var(--ink)' : 'var(--border)',
                  background: prefs.fontSize === i ? 'var(--ink)' : 'transparent',
                  color: prefs.fontSize === i ? '#FFFFFF' : 'var(--ink-secondary)',
                  fontFamily: 'Heebo, sans-serif',
                  fontSize: '12px',
                  cursor: 'pointer',
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* High contrast */}
          <button
            onClick={() => toggle('highContrast')}
            aria-pressed={prefs.highContrast}
            style={{
              ...row,
              background: prefs.highContrast ? 'var(--ink)' : 'transparent',
              color: prefs.highContrast ? '#FFFFFF' : 'var(--ink)',
            }}
          >
            <span>ניגודיות גבוהה</span>
            <span style={{ fontSize: '12px', opacity: 0.55 }}>{prefs.highContrast ? 'פעיל' : 'כבוי'}</span>
          </button>

          {/* Highlight links */}
          <button
            onClick={() => toggle('highlightLinks')}
            aria-pressed={prefs.highlightLinks}
            style={{
              ...row,
              background: prefs.highlightLinks ? 'var(--ink)' : 'transparent',
              color: prefs.highlightLinks ? '#FFFFFF' : 'var(--ink)',
            }}
          >
            <span>הדגש קישורים</span>
            <span style={{ fontSize: '12px', opacity: 0.55 }}>{prefs.highlightLinks ? 'פעיל' : 'כבוי'}</span>
          </button>

          {/* Reset */}
          <button
            onClick={() => apply(DEFAULT)}
            style={{
              width: '100%',
              padding: '7px',
              borderRadius: '6px',
              border: '1px solid var(--border)',
              background: 'transparent',
              color: 'var(--ink-faint)',
              fontFamily: 'Heebo, sans-serif',
              fontSize: '12px',
              letterSpacing: '0.5px',
              cursor: 'pointer',
            }}
          >
            איפוס
          </button>
        </div>
      )}
    </div>
  );
}
