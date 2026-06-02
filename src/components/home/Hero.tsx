'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';

const SUGGESTIONS = [
  'Baccarat Rouge 540',
  'Tobacco Vanille',
  'Aventus',
  'עוד לא מצאתי אחד',
];

export default function Hero() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [ackText, setAckText] = useState('');
  const [ackVisible, setAckVisible] = useState(false);

  function beginConsult(value: string) {
    const v = value.trim();
    if (!v) { inputRef.current?.focus(); return; }
    if (inputRef.current) inputRef.current.value = v;

    if (v === 'עוד לא מצאתי אחד') {
      if (inputRef.current) inputRef.current.value = '';
      setAckText('אין בעיה. נתחיל מאפס — תשע שאלות, ונכיר אותך מהריח הראשון.');
    } else {
      setAckText(`״${v}״ — נקודת פתיחה יפה. נבנה את הפרופיל שלך סביב מה שאתה כבר אוהב.`);
    }
    setAckVisible(true);
  }

  return (
    <section className="hero-consult-section">
      {/* quiet overhead wash */}
      <div className="hero-consult-bg" aria-hidden="true" />

      {/* vertical folio label */}
      <div className="hero-rail-label" aria-hidden="true">
        A FRAGRANCE CONSULTATION
      </div>

      <div className="hero-consult-inner">
        <div className="hero-consult-block">
          {/* small-caps folio */}
          <span className="hero-folio">ההתייעצות מתחילה כאן</span>

          {/* large serif invitation */}
          <h1 className="hero-invite">
            בוא נתחיל מהבושם{' '}
            <span className="hero-invite-soft">שאתה לובש עכשיו.</span>
          </h1>

          {/* the actual first step */}
          <div className="hero-step">
            <div className="hero-field">
              <input
                ref={inputRef}
                type="text"
                autoComplete="off"
                placeholder="הקלד בושם שאתה אוהב…"
                aria-label="הבושם שאתה לובש עכשיו"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    beginConsult(inputRef.current?.value ?? '');
                  }
                }}
              />
              <Link
                href="/quiz"
                className="hero-field-btn"
                aria-label="התחל שאלון"
                title="התחל שאלון"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
              </Link>
            </div>

            <div className="hero-suggest">
              <span className="hero-suggest-lead">או אולי</span>
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  className="hero-suggest-btn"
                  onClick={() => beginConsult(s)}
                >
                  {s}
                </button>
              ))}
            </div>

            <p className={`hero-ack${ackVisible ? ' show' : ''}`}>
              {ackText}
            </p>
          </div>

          <span className="hero-meta-label">תשע שאלות · שלוש דקות</span>
        </div>
      </div>
    </section>
  );
}
