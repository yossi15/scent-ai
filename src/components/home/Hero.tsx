import Link from 'next/link';

export default function Hero() {
  return (
    <section className="hero-lux" aria-labelledby="hero-v3-heading">
      <div className="hero-lux-content">
        <h1 id="hero-v3-heading" className="hero-lux-h1">
          בושם לא בוחרים.
          <em className="hero-lux-h1-em">מגלים.</em>
        </h1>
        <div className="hero-lux-rule" aria-hidden="true" />
        <Link href="/quiz" className="hero-lux-cta" aria-label="שאלון ההתאמה של SCENTORY">
          שאלון ההתאמה
        </Link>
      </div>
    </section>
  );
}
