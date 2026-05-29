/**
 * Shared theme utility — single source of truth for light/dark mode.
 * Both ThemeToggle and AccessibilityWidget import from here.
 */

export type Theme = 'light' | 'dark';

const KEY = 'scentory-theme';
const EVENT = 'scent-theme-change';

export function getTheme(): Theme {
  if (typeof window === 'undefined') return 'dark';
  return (localStorage.getItem(KEY) as Theme | null) ?? 'dark';
}

export function setTheme(theme: Theme): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(KEY, theme);
  document.documentElement.setAttribute('data-theme', theme);
  // Broadcast to other components on the same page
  window.dispatchEvent(new CustomEvent(EVENT, { detail: theme }));
}

export function toggleTheme(): Theme {
  const next: Theme = getTheme() === 'dark' ? 'light' : 'dark';
  setTheme(next);
  return next;
}

/** Subscribe to theme changes (ThemeToggle ↔ AccessibilityWidget sync) */
export function onThemeChange(cb: (theme: Theme) => void): () => void {
  const handler = (e: Event) => cb((e as CustomEvent<Theme>).detail);
  window.addEventListener(EVENT, handler);
  return () => window.removeEventListener(EVENT, handler);
}
