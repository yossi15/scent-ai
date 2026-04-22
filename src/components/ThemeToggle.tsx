'use client';

import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

const KEY = 'scent-ai-theme';

export default function ThemeToggle({ className = '' }: { className?: string }) {
  const [theme, setTheme] = useState<'light' | 'dark' | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(KEY) as 'light' | 'dark' | null;
    const initial =
      stored ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(initial);
    document.documentElement.classList.toggle('dark', initial === 'dark');
  }, []);

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.classList.toggle('dark', next === 'dark');
    localStorage.setItem(KEY, next);
  };

  if (!theme) {
    return <div className={`w-9 h-9 rounded-lg ${className}`} aria-hidden />;
  }

  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? 'עבור למצב יום' : 'עבור למצב לילה'}
      title={isDark ? 'מצב יום' : 'מצב לילה'}
      className={`w-9 h-9 rounded-lg flex items-center justify-center text-ink-muted hover:text-gold hover:bg-gold-faint transition-all duration-300 ${className}`}
    >
      {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  );
}
