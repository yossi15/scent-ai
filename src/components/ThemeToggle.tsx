'use client';

import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { getTheme, toggleTheme, onThemeChange, type Theme } from '@/lib/theme';

interface Props {
  /** Render as a compact icon-only button (navbar) or as a labeled row (widget panel) */
  variant?: 'icon' | 'row';
}

export default function ThemeToggle({ variant = 'icon' }: Props) {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    setTheme(getTheme());
    return onThemeChange(setTheme);
  }, []);

  const handleToggle = () => {
    const next = toggleTheme();
    setTheme(next);
  };

  const isDark = theme === 'dark';

  if (variant === 'row') {
    return (
      <button
        onClick={handleToggle}
        aria-pressed={isDark}
        aria-label={isDark ? 'עבור למצב בהיר' : 'עבור למצב כהה'}
        style={{
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
          background: isDark ? 'var(--ink)' : 'transparent',
          color: isDark ? '#FFFFFF' : 'var(--ink)',
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {isDark ? <Moon size={13} /> : <Sun size={13} />}
          מצב {isDark ? 'כהה' : 'בהיר'}
        </span>
        <span style={{ fontSize: '10px', opacity: 0.55 }}>{isDark ? 'פעיל' : 'כבוי'}</span>
      </button>
    );
  }

  // icon variant — used in Navbar
  return (
    <button
      onClick={handleToggle}
      aria-label={isDark ? 'עבור למצב בהיר' : 'עבור למצב כהה'}
      title={isDark ? 'מצב בהיר' : 'מצב כהה'}
      style={{
        width: '44px',
        height: '44px',
        borderRadius: '50%',
        border: '1px solid var(--border)',
        background: 'transparent',
        color: 'var(--ink)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'background 0.2s, border-color 0.2s',
        flexShrink: 0,
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.background = 'var(--gold-faint)';
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--gold-border)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.background = 'transparent';
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
      }}
    >
      {isDark ? <Sun size={15} /> : <Moon size={15} />}
    </button>
  );
}
