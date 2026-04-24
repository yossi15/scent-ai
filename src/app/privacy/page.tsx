import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = { title: 'מדיניות פרטיות | SCENTORY' };

export default function PrivacyPage() {
  return (
    <main className="min-h-screen pt-24 pb-16 px-4 bg-bg-primary">
      <article className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-1 text-ink-muted hover:text-gold text-xs font-hebrew mb-6">
          <ArrowLeft className="w-3.5 h-3.5" /> חזרה לדף הבית
        </Link>
        <h1 className="font-serif text-4xl text-ink font-bold mb-2">מדיניות פרטיות</h1>
        <p className="text-ink-faint text-xs font-sans mb-8" dir="ltr">Last updated: April 2026</p>

        <div className="space-y-6 text-ink-secondary text-sm font-hebrew leading-relaxed">
          <section>
            <h2 className="font-serif text-lg text-ink font-semibold mb-2">1. איזה מידע אנחנו אוספים</h2>
            <p>אימייל ושם מתהליך הרשמה (דרך Clerk), העדפות בשמים מהשאלון, היסטוריית רכישות, ונתוני שימוש (פעולות באתר).</p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-ink font-semibold mb-2">2. איך אנחנו משתמשים במידע</h2>
            <p>למתן השירות, לשיפור ההמלצות של ה-AI, לעיבוד תשלומים, וליצירת קשר במידת הצורך.</p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-ink font-semibold mb-2">3. צדדים שלישיים</h2>
            <p>אנחנו עובדים עם ספקי שירות מהימנים: <strong>Clerk</strong> (אימות), <strong>Stripe</strong> (תשלומים), <strong>Anthropic</strong> (מנוע AI), <strong>Supabase</strong> (אחסון נתונים), ו-<strong>Vercel</strong> (אירוח). כולם עומדים בתקני אבטחה מחמירים.</p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-ink font-semibold mb-2">4. אבטחה</h2>
            <p>פרטי תשלום מאוחסנים אצל Stripe בלבד — לא אצלנו. כל התקשורת מוצפנת ב-HTTPS.</p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-ink font-semibold mb-2">5. הזכויות שלך</h2>
            <p>זכות עיון, תיקון ומחיקה של המידע שלך. למימוש זכויות יש לפנות ל-<a href="mailto:contact@scentory.co.il" className="text-gold hover:underline" dir="ltr">contact@scentory.co.il</a>.</p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-ink font-semibold mb-2">6. עוגיות</h2>
            <p>אנחנו משתמשים בעוגיות הכרחיות לתפעול האתר ולשמירת מצב התחברות בלבד. ללא מעקב פרסומי.</p>
          </section>
        </div>
      </article>
    </main>
  );
}
