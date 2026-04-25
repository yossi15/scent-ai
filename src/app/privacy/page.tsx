import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'מדיניות פרטיות | SCENTORY',
  description: 'מדיניות הפרטיות של SCENTORY — איך אנחנו אוספים, משתמשים ושומרים על המידע שלך, בהתאם ל-GDPR ולחוק הגנת הפרטיות בישראל.',
  alternates: { canonical: '/privacy' },
};

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
            <h2 className="font-serif text-lg text-ink font-semibold mb-2">1. בקרת מידע (Data Controller)</h2>
            <p>SCENTORY (&ldquo;אנחנו&rdquo;, &ldquo;שלנו&rdquo;) הוא בעל הבקרה על המידע האישי שאתה מספק. ליצירת קשר בנושאי פרטיות:
            <a href="mailto:privacy@scentory.co.il" className="text-gold hover:underline" dir="ltr"> privacy@scentory.co.il</a></p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-ink font-semibold mb-2">2. איזה מידע אנחנו אוספים</h2>
            <ul className="list-disc pr-5 space-y-1">
              <li><strong>פרטי חשבון</strong> — שם ואימייל מתהליך ההרשמה (דרך Clerk).</li>
              <li><strong>העדפות בשמים</strong> — תשובות מהשאלון, רשימת אוסף, יומן ריחות.</li>
              <li><strong>נתוני רכישה</strong> — היסטוריית הזמנות (תהליך התשלום עצמו ב-Stripe).</li>
              <li><strong>נתוני שימוש טכניים</strong> — IP, סוג דפדפן, פעולות באתר (לצורכי ניטור ואבטחה).</li>
              <li><strong>תוכן שאתה משתף</strong> — בקשות דגימה, פניות תמיכה.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-lg text-ink font-semibold mb-2">3. בסיס משפטי לעיבוד (GDPR Art. 6)</h2>
            <ul className="list-disc pr-5 space-y-1">
              <li><strong>ביצוע חוזה</strong> — לספק לך את שירות המנוי.</li>
              <li><strong>הסכמה</strong> — לדיוור שיווקי וניתוח העדפות מתקדם (ניתן לבטל בכל עת).</li>
              <li><strong>אינטרס לגיטימי</strong> — שיפור השירות, מניעת הונאות, אבטחה.</li>
              <li><strong>חובה חוקית</strong> — שמירת חשבוניות לצורכי מס.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-lg text-ink font-semibold mb-2">4. למה אנחנו משתמשים במידע</h2>
            <p>למתן השירות (אספקת דגימות, גישה לקטלוג), לשיפור המלצות ה-AI, לעיבוד תשלומים, ליצירת קשר במידת הצורך, ולמילוי חובות חוקיות.</p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-ink font-semibold mb-2">5. צדדים שלישיים ומעבדי משנה</h2>
            <p>אנחנו עובדים עם ספקי שירות מהימנים שעומדים בתקני אבטחה מחמירים:</p>
            <ul className="list-disc pr-5 space-y-1 mt-2">
              <li><strong>Clerk</strong> — אימות והזדהות (ארה&quot;ב, SOC 2)</li>
              <li><strong>Stripe</strong> — תשלומים בלבד (PCI-DSS Level 1)</li>
              <li><strong>Supabase</strong> — אחסון נתונים (אזור EU)</li>
              <li><strong>Anthropic</strong> — מנוע AI להמלצות (לא נשמר מידע אישי מזהה)</li>
              <li><strong>Resend</strong> — שירות שליחת אימיילים</li>
              <li><strong>Vercel</strong> — אירוח האתר</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-lg text-ink font-semibold mb-2">6. העברות מחוץ ל-EEA</h2>
            <p>חלק מהספקים שלנו (Anthropic, Clerk, Vercel) ממוקמים בארה&quot;ב. ההעברות מתבצעות בהתאם ל-Standard Contractual Clauses (SCCs) של האיחוד האירופי.</p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-ink font-semibold mb-2">7. תקופת שמירה</h2>
            <p>נתוני חשבון נשמרים כל עוד החשבון פעיל ועד 24 חודשים מיום סיום המנוי. חשבוניות נשמרות 7 שנים בהתאם לדין הישראלי. נתוני שימוש טכניים — עד 12 חודשים.</p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-ink font-semibold mb-2">8. הזכויות שלך (GDPR Art. 15-22)</h2>
            <ul className="list-disc pr-5 space-y-1">
              <li><strong>זכות עיון</strong> — לקבל עותק מהמידע שלך.</li>
              <li><strong>זכות תיקון</strong> — לעדכן מידע שגוי.</li>
              <li><strong>זכות מחיקה (&ldquo;להישכח&rdquo;)</strong> — למחוק את המידע שלך.</li>
              <li><strong>זכות הגבלת עיבוד</strong> — לעצור עיבוד במצבים מסוימים.</li>
              <li><strong>זכות ניידות</strong> — לקבל את המידע בפורמט מובנה (JSON/CSV).</li>
              <li><strong>זכות התנגדות</strong> — לדיוור שיווקי וקבלת החלטות אוטומטית.</li>
              <li><strong>זכות לבטל הסכמה</strong> בכל עת, ללא השפעה על עיבוד שכבר בוצע.</li>
            </ul>
            <p className="mt-2">למימוש זכויות: <a href="mailto:privacy@scentory.co.il" className="text-gold hover:underline" dir="ltr">privacy@scentory.co.il</a>. נשיב תוך 30 יום.</p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-ink font-semibold mb-2">9. החלטות אוטומטיות ו-AI</h2>
            <p>השירות שלנו משתמש ב-AI (Anthropic Claude) להפקת המלצות בשמים אישיות בהתבסס על תשובותיך לשאלון. ההמלצות אינן מחייבות ואין להן השפעה משפטית. תמיד תוכל לדחות המלצה או לבחור בעצמך.</p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-ink font-semibold mb-2">10. אבטחה</h2>
            <p>כל התקשורת מוצפנת ב-TLS/HTTPS. סיסמאות מאוחסנות אצל Clerk בלבד עם hashing חזק. פרטי תשלום מאוחסנים אצל Stripe בלבד — לא אצלנו. גישה לנתונים מוגבלת לאנשי צוות מורשים בלבד.</p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-ink font-semibold mb-2">11. עוגיות (Cookies)</h2>
            <p>אנחנו משתמשים בעוגיות הכרחיות בלבד — לתפעול האתר ולשמירת מצב התחברות. אין עוגיות פרסום צד שלישי או מעקב חוצה אתרים.</p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-ink font-semibold mb-2">12. קטינים</h2>
            <p>השירות מיועד לבני 18 ומעלה. איננו אוספים ביודעין מידע מקטינים.</p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-ink font-semibold mb-2">13. הגשת תלונה</h2>
            <p>אם אתה תושב EU, באפשרותך להגיש תלונה לרשות הגנת המידע במדינתך. בישראל — לרשות להגנת הפרטיות:
            <a href="https://www.gov.il/he/departments/the_privacy_protection_authority" className="text-gold hover:underline" target="_blank" rel="noopener"> gov.il</a></p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-ink font-semibold mb-2">14. שינויים במדיניות</h2>
            <p>אנחנו עשויים לעדכן את המדיניות מעת לעת. שינויים מהותיים יישלחו אליך באימייל לפחות 30 יום מראש.</p>
          </section>

        </div>
      </article>
    </main>
  );
}
