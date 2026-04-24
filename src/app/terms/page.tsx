import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = { title: 'תקנון שימוש | SCENTORY' };

export default function TermsPage() {
  return (
    <main className="min-h-screen pt-24 pb-16 px-4 bg-bg-primary">
      <article className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-1 text-ink-muted hover:text-gold text-xs font-hebrew mb-6">
          <ArrowLeft className="w-3.5 h-3.5" /> חזרה לדף הבית
        </Link>
        <h1 className="font-serif text-4xl text-ink font-bold mb-2">תקנון שימוש</h1>
        <p className="text-ink-faint text-xs font-sans mb-8" dir="ltr">Last updated: April 2026</p>

        <div className="space-y-6 text-ink-secondary text-sm font-hebrew leading-relaxed">
          <section>
            <h2 className="font-serif text-lg text-ink font-semibold mb-2">1. כללי</h2>
            <p>השימוש באתר SCENTORY כפוף לתנאי השימוש המפורטים להלן. גלישה ושימוש באתר מהווים הסכמה לתנאים אלה.</p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-ink font-semibold mb-2">2. השירות</h2>
            <p>SCENTORY הוא שירות מנוי לבשמי נישה מבוסס AI. השירות כולל המלצות אישיות, דגימות חודשיות, גישה לקטלוג בשמים וכלים נלווים.</p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-ink font-semibold mb-2">3. מנוי וחיוב</h2>
            <p>החיוב חודשי. ניתן לבטל את המנוי בכל עת דרך עמוד &ldquo;החשבון שלי&rdquo;. ביטול ייכנס לתוקף בסוף תקופת החיוב הנוכחית.</p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-ink font-semibold mb-2">4. החזרים</h2>
            <p>ניתן לבקש החזר תוך 30 יום מתאריך החיוב הראשון. בקשות החזר יש להפנות לכתובת contact@scentory.co.il.</p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-ink font-semibold mb-2">5. קניין רוחני</h2>
            <p>כל הבשמים המוצגים באתר הם סימנים מסחריים של בעליהם. השימוש בשמות ובתמונות הוא לצרכי תיאור והמלצה בלבד.</p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-ink font-semibold mb-2">6. יצירת קשר</h2>
            <p>שאלות ופניות: <a href="mailto:contact@scentory.co.il" className="text-gold hover:underline" dir="ltr">contact@scentory.co.il</a></p>
          </section>
        </div>
      </article>
    </main>
  );
}
