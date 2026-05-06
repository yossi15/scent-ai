import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'הסיפור שלנו | SCENTORY',
  description: 'למה נבנה SCENTORY — הסיפור מאחורי פלטפורמת גילוי הבשמים החכמה.',
};

export default function AboutPage() {
  return (
    <main dir="rtl">
      <Navbar />

      <article className="pt-28 pb-24 px-6 max-w-2xl mx-auto">

        {/* Eyebrow */}
        <p className="text-[10px] tracking-[0.35em] uppercase font-sans text-[#999] mb-8 text-center">
          THE STORY
        </p>

        <h1 className="font-serif text-5xl md:text-6xl font-light text-[#1a1a1a] leading-[1.05] mb-10 text-center">
          למה בנינו<br />את SCENTORY
        </h1>

        <div className="space-y-6 font-hebrew text-[15px] text-[#3D3D3D] leading-[1.9]">

          <p>
            שמי יוסי. אני מורה למדעי המחשב וסייבר, ומאז גיל אמצע ה-20 אני אוסף בשמים.
            לא בצורה מזדמנת — אוסף בגובה עיניים, קטלוג ידני, טיולים לחנויות בשמים בחו&quot;ל
            רק כדי לנסות בקבוק חדש.
          </p>

          <p>
            הבעיה ששמעתי שוב ושוב — מחברים, מתלמידים, מאנשים שהריח עצר אותם ברחוב
            ושאלו &ldquo;מה אתה עונה?&rdquo; — היא תמיד אותה בעיה:
          </p>

          <blockquote className="border-r-2 border-[#C4A882] pr-5 py-1 text-[#666] font-light italic my-8">
            &ldquo;אני לא יודע בכלל מאיפה להתחיל. יש כל כך הרבה, וכולם נשמעים אותו דבר.&rdquo;
          </blockquote>

          <p>
            שוק הבשמים בישראל מלא בפרסום, בהמלצות שיווקיות, ובאנשי מכירות שמנסים לסגור
            עסקה — לא לעזור לך למצוא מה שנכון לך. ואם אתה לא מכיר את ה-DNA של עצמך,
            קל מאוד לקנות בושם יקר שלא מדבר אליך.
          </p>

          <p>
            ב-2025 החלטתי לשלב שני עולמות: הידע הטכנולוגי שלי עם התשוקה לבשמים.
            SCENTORY נבנה כדי לתת לכל אחד את הכלים שרק אספנים ותיקים מכירים —
            להבין מה ה-DNA הריחני שלך, לבנות אוסף שמספר סיפור, ולגלות בשמים שלא ידעת
            שקיימים.
          </p>

          <p>
            המאגר שלנו כולל 745+ בשמים מ-115+ בתי בושם — מהמסלים הגדולים ועד ניש קיצוני.
            כל בושם תועד ידנית: נוטות, פרופיל ריחני, עצימות, חזיקה, ומחיר עדכני בשקלים.
            אין שיתופי פעולה מסחריים. ההמלצות מגיעות מהאלגוריתם — לא מהמשכורת של ספק.
          </p>

          <p className="text-[#666] text-sm">
            יוסי זריהן, מייסד SCENTORY<br />
            תל אביב, 2025
          </p>

        </div>

        {/* Vision box */}
        <div
          className="mt-14 p-8 border border-[#E0D8CC]"
          style={{ background: '#FAF8F5', borderRadius: '2px' }}
        >
          <p className="text-[10px] tracking-[0.25em] uppercase font-sans text-[#C4A882] mb-3">
            החזון
          </p>
          <p className="font-serif text-2xl font-light text-[#1a1a1a] leading-snug">
            עולם שבו כל אחד מוצא את<br />חתימת הריח שלו.
          </p>
          <p className="font-hebrew text-sm text-[#666] mt-4 leading-relaxed">
            לא רק בושם יפה — אלא ביטוי ריחני שמספר מי אתה,
            שנבחר בכוונה ולא בלחץ של פרסומת.
          </p>
        </div>

        {/* Back CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="text-[11px] tracking-[0.15em] uppercase font-sans text-[#999] hover:text-[#1a1a1a] transition-colors"
          >
            ← חזרה לדף הבית
          </Link>
        </div>

      </article>

      <Footer />
    </main>
  );
}
