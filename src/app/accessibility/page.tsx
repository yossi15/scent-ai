import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'הצהרת נגישות | SCENTORY',
  description: 'הצהרת הנגישות של SCENTORY בהתאם לתקן ישראלי 5568 ורמת התאמה AA של WCAG 2.1.',
};

const heading: React.CSSProperties = {
  fontFamily: '"Cormorant Garamond", Georgia, serif',
  fontWeight: 600,
  color: '#1A1A1A',
};

const body: React.CSSProperties = {
  fontFamily: 'Heebo, Inter, sans-serif',
  fontSize: '15px',
  lineHeight: 1.8,
  color: '#3D3D3D',
};

const section: React.CSSProperties = {
  marginBottom: '36px',
};

export default function AccessibilityPage() {
  return (
    <main id="main-content" style={{ ...body, maxWidth: '760px', margin: '0 auto', padding: '80px 24px 120px' }}>
      <nav aria-label="ניווט חוזר" style={{ marginBottom: '32px' }}>
        <Link href="/" style={{ fontFamily: 'Heebo, sans-serif', fontSize: '13px', color: '#1A1A1A' }}>
          ← חזרה לדף הבית
        </Link>
      </nav>

      <h1 style={{ ...heading, fontSize: '36px', marginBottom: '8px' }}>הצהרת נגישות</h1>
      <p style={{ ...body, fontSize: '13px', color: '#6B6560', marginBottom: '40px' }}>
        עודכן לאחרונה: מאי 2026
      </p>

      <div style={section}>
        <h2 style={{ ...heading, fontSize: '22px', marginBottom: '12px' }}>כללי</h2>
        <p>
          SCENTORY מחויבת לנגישות דיגיטלית, ופועלת להנגשת האתר לאנשים עם מוגבלויות בהתאם לתקן ישראלי
          ת&quot;י 5568, המבוסס על הנחיות WCAG 2.1 ברמת AA. אנו ממשיכים לשפר את הנגישות כחלק
          מפיתוח השוטף.
        </p>
      </div>

      <div style={section}>
        <h2 style={{ ...heading, fontSize: '22px', marginBottom: '12px' }}>מה כלול בהנגשה</h2>
        <ul style={{ paddingRight: '20px', ...body }}>
          <li>ניווט מלא עם מקלדת ועם טכנולוגיות מסייעות (קורא מסך)</li>
          <li>תוכן RTL בעברית עם מבנה סמנטי תקין (landmark, heading, list)</li>
          <li>חלופות טקסטואליות לכל תמונה (alt text)</li>
          <li>יחסי ניגודיות צבע של לפחות 4.5:1 לטקסט גוף</li>
          <li>גודל גופן ניתן להגדלה עד 200% ללא אובדן תוכן</li>
          <li>כפתור &quot;דלג לתוכן&quot; בכניסה לכל עמוד</li>
          <li>וידג&apos;ט נגישות לאפשרויות ניגודיות, גדלי טקסט והדגשת קישורים</li>
          <li>טפסים עם labels מפורשים ושגיאות נגישות</li>
          <li>אנימציות מבוטלות עבור מי שהגדיר prefers-reduced-motion</li>
        </ul>
      </div>

      <div style={section}>
        <h2 style={{ ...heading, fontSize: '22px', marginBottom: '12px' }}>מגבלות ידועות</h2>
        <p>
          חלק מרכיבי צד שלישי (Clerk — מערכת הכניסה, Recharts — גרפים) עשויים להכיל מגבלות
          נגישות שאינן בשליטתנו המלאה. אנו עובדים עם הספקים לשיפור מתמיד.
        </p>
      </div>

      <div style={section}>
        <h2 style={{ ...heading, fontSize: '22px', marginBottom: '12px' }}>פרטי קשר</h2>
        <p>
          נתקלתם בבעיית נגישות? אנחנו כאן לעזור.
        </p>
        <ul style={{ paddingRight: '20px', ...body, marginTop: '8px' }}>
          <li>
            דוא&quot;ל:{' '}
            <a href="mailto:hello@scentory.co.il" style={{ color: '#1A1A1A' }}>
              hello@scentory.co.il
            </a>
          </li>
          <li>נשתדל להשיב תוך 2 ימי עסקים</li>
        </ul>
      </div>

      <div style={section}>
        <h2 style={{ ...heading, fontSize: '22px', marginBottom: '12px' }}>רגולציה</h2>
        <p>
          הצהרה זו מוגשת בהתאם לתיקון מס&apos; 35 לחוק שוויון זכויות לאנשים עם מוגבלות (תשנ&quot;ח-1998)
          ולתקנות הנגישות לשירות (תשע&quot;ג-2013).
        </p>
      </div>
    </main>
  );
}
