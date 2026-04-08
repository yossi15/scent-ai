'use client';

import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="border-t border-gold/8 py-12 px-4 bg-shell-dark/30">
      <div className="max-w-7xl mx-auto text-center">
        <div className="flex justify-center mb-4">
          <Logo size="sm" />
        </div>
        <p className="text-ink-muted/30 text-xs font-hebrew mb-4 font-light">
          קיור בשמים חכם מבוסס בינה מלאכותית. הבושם הבא שלך, מפוענח.
        </p>
        <div className="flex justify-center gap-6 mb-6">
          {['אודות', 'בתי בושם', 'ז\'ורנל', 'צור קשר'].map((link) => (
            <a
              key={link}
              href="#"
              className="text-ink-muted/30 hover:text-gold text-xs font-hebrew tracking-wide transition-colors"
            >
              {link}
            </a>
          ))}
        </div>
        <div className="gold-line max-w-[80px] mx-auto mb-4" />
        <p className="text-ink-muted/20 text-[10px] font-hebrew font-light">
          &copy; 2026 Scent AI. כל הבשמים הם סימנים מסחריים של בתי הבושם שלהם.
        </p>
      </div>
    </footer>
  );
}
