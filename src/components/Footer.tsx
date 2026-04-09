'use client';

import Logo from './Logo';

const footerLinks = [
  { label: 'קולקציה', href: '#collection' },
  { label: 'התאמת חתימה', href: '#match' },
  { label: 'היומן', href: '#diary' },
  { label: 'מנוי', href: '#subscribe' },
];

export default function Footer() {
  return (
    <footer className="border-t border-black/[0.04] py-12 px-4 bg-bg-secondary">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Logo size="sm" />
          <div className="flex gap-6">
            {footerLinks.map((link) => (
              <a key={link.label} href={link.href} className="text-ink-faint hover:text-gold text-xs font-hebrew transition-colors">
                {link.label}
              </a>
            ))}
          </div>
        </div>
        <div className="divider my-6" />
        <p className="text-ink-faint/50 text-[11px] font-hebrew text-center font-light">
          &copy; 2026 Scent AI. כל הבשמים הם סימנים מסחריים של בתי הבושם שלהם.
        </p>
      </div>
    </footer>
  );
}
