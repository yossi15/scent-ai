'use client';

import { useEffect } from 'react';

/**
 * Sets background colour on both <html> and <body> directly via inline-style JS
 * so it always matches the active theme regardless of CSS variable issues.
 * Inline styles beat any stylesheet rule (highest cascade priority).
 */
export default function ThemeBodySync() {
  useEffect(() => {
    const update = () => {
      const dark = document.documentElement.getAttribute('data-theme') !== 'light';
      const colour = dark ? '#050505' : '#faf9f7';
      document.documentElement.style.backgroundColor = colour;
      document.body.style.backgroundColor = colour;
    };

    update();

    const obs = new MutationObserver(update);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => obs.disconnect();
  }, []);

  return null;
}
