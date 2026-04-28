import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'תקנון שימוש | SCENTORY',
  description: 'תנאי השימוש של SCENTORY — פלטפורמת AI לגילוי בשמים.',
  alternates: { canonical: '/terms' },
};

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
            <p>השימוש באתר SCENTORY (&ldquo;האתר&rdquo;, &ldquo;השירות&rdquo;) כפוף לתנאי השימוש המפורטים להלן. גלישה ושימוש מהווים הסכמה לתנאים אלה. אם אינך מסכים — אנא הימנע מלהשתמש בשירות.</p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-ink font-semibold mb-2">2. השירות</h2>
            <p>SCENTORY הוא פלטפורמת AI לגילוי בשמים. השירות מאפשר שמירת אוסף אישי, קבלת המלצות חכמות מבוססות-AI, רכישה דרך האתר וכלים נלווים (שאלון טעמים, רדאר ריחות, יומן). שמורה לנו הזכות לשנות, להוסיף או להסיר תכונות בכל עת.</p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-ink font-semibold mb-2">3. גיל מינימום</h2>
            <p>השימוש מותר לבני 18 ומעלה בלבד. בהרשמה אתה מאשר שאתה בגיל מתאים.</p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-ink font-semibold mb-2">4. חשבון משתמש</h2>
            <p>אתה אחראי לשמור על סודיות פרטי הגישה שלך ועל כל פעילות בחשבונך. עדכן אותנו מיד על שימוש לא מורשה.</p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-ink font-semibold mb-2">5. מנוי וחיוב</h2>
            <p>החיוב הוא חודשי ומתבצע אוטומטית באמצעות Stripe. ניתן לבטל את המנוי בכל עת דרך עמוד &ldquo;החשבון שלי&rdquo;. ביטול ייכנס לתוקף בסוף תקופת החיוב הנוכחית — לא יבוצע חיוב נוסף.</p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-ink font-semibold mb-2">6. ביטול מנוי והחזרים</h2>
            <p>ניתן לבטל את המנוי בכל עת מעמוד &ldquo;החשבון שלי&rdquo;. הביטול ייכנס לתוקף בסוף תקופת החיוב הנוכחית — לא יבוצע חיוב נוסף. בהתאם לחוק הגנת הצרכן הישראלי, ניתן לבקש החזר מלא תוך 14 יום מיום הרכישה הראשון של המנוי. בקשות החזר: <a href="mailto:contact@scentory.co.il" className="text-gold hover:underline" dir="ltr">contact@scentory.co.il</a></p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-ink font-semibold mb-2">7. אופי השירות — אין מכירת מוצרים פיזיים</h2>
            <p>SCENTORY היא פלטפורמת מידע, גילוי והמלצה דיגיטלית בלבד. אנחנו לא מחזיקים מלאי, לא מוכרים בקבוקים או דגימות, ולא שולחים מוצרים פיזיים. רכישת בשמים מתבצעת ישירות מול קמעונאים חיצוניים שאליהם אנחנו מקשרים — SCENTORY אינה צד לעסקה ואינה אחראית למשלוח, להחזרים או לאחריות מוצר.</p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-ink font-semibold mb-2">8. שימוש מותר</h2>
            <p>אסור: ניסיון לפרוץ לאתר, scraping, שימוש בתוכן לצרכים מסחריים ללא רשות, התחזות, פרסום תוכן פוגעני, או הפרעה לפעילות תקינה של השירות.</p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-ink font-semibold mb-2">9. קניין רוחני</h2>
            <p>כל הבשמים המוצגים באתר הם סימנים מסחריים של בעליהם. השימוש בשמות, סמלים ותמונות הוא לצרכי תיאור, השוואה והמלצה בלבד — תחת דיני שימוש הוגן (fair use). תוכן מקורי באתר (טקסטים, עיצוב, קוד, המלצות AI) שייך ל-SCENTORY.</p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-ink font-semibold mb-2">10. הגבלת אחריות</h2>
            <p>השירות מסופק &ldquo;כמות שהוא&rdquo; (AS-IS). המלצות ה-AI הן הצעות בלבד ואינן מתיימרות להיות מקצועיות. איננו אחראים לתגובות אלרגיות, רגישויות או תופעות אחרות שנגרמו משימוש בבשמים. בדוק תמיד רכיבים לפני שימוש.</p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-ink font-semibold mb-2">11. פרטיות</h2>
            <p>השימוש שלך כפוף ל-<Link href="/privacy" className="text-gold hover:underline">מדיניות הפרטיות</Link> שלנו, המהווה חלק בלתי נפרד מתקנון זה.</p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-ink font-semibold mb-2">12. שינויים בתקנון</h2>
            <p>אנחנו רשאים לעדכן את התקנון מעת לעת. שינויים מהותיים יישלחו באימייל לפחות 30 יום מראש. המשך השימוש לאחר שינוי מהווה הסכמה לתנאים החדשים.</p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-ink font-semibold mb-2">13. דין וסמכות שיפוט</h2>
            <p>על תקנון זה יחולו דיני מדינת ישראל. סמכות השיפוט הבלעדית בכל מחלוקת — בבתי המשפט המוסמכים בתל אביב-יפו.</p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-ink font-semibold mb-2">14. יצירת קשר</h2>
            <p>שאלות, פניות ותלונות: <a href="mailto:contact@scentory.co.il" className="text-gold hover:underline" dir="ltr">contact@scentory.co.il</a></p>
          </section>

        </div>
      </article>
    </main>
  );
}
