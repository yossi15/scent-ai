'use client';

import { useEffect } from 'react';

/**
 * Sets document.body.style.backgroundColor directly via JS so it always
 * matches the theme, regardless of CSS custom-property loading issues.
 * Inline styles have higher priority than stylesheet rules.
 */
export default function ThemeBodySync() {
  useEffect(() => {
    const update = () => {
      const dark = document.documentElement.classList.contains('dark');
      document.body.style.backgroundColor = dark ? '#050505' : '#faf9f7';
    };

    update();

    const obs = new MutationObserver(update);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);

  return null;
}
