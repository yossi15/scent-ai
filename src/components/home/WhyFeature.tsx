import { Check, Sparkles } from 'lucide-react';
import EyebrowText from './shared/EyebrowText';

const BOTTLE_SVG = (
  <svg width="20" height="34" viewBox="0 0 20 34" fill="none">
    <rect x="7" y="0" width="6" height="4" rx="1" fill="rgba(201,169,97,0.55)" />
    <rect x="2" y="4" width="16" height="27" rx="3" fill="rgba(201,169,97,0.28)" />
    <rect x="5" y="7" width="10" height="4" rx="1.5" fill="rgba(201,169,97,0.45)" />
    <rect x="6" y="14" width="8" height="0.8" rx="0.4" fill="rgba(201,169,97,0.2)" />
    <rect x="6" y="17" width="8" height="0.8" rx="0.4" fill="rgba(201,169,97,0.15)" />
  </svg>
);

const PERKS = [
  'הסבר מבוסס על תשובות שלך',
  'השוואה לאוסף הקיים',
  'השוואת מחירים בין חנויות',
];

export default function WhyFeature() {
  return (
    <section
      style={{
        background: 'var(--bg-secondary)',
        padding: 'clamp(36px, 5vw, 52px) clamp(20px, 4vw, 32px)',
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'clamp(32px, 5vw, 48px)',
          alignItems: 'center',
        }}
      >
        {/* Right col: Text */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <EyebrowText>הפיצ&#39;ר המוביל</EyebrowText>

          <h2
            style={{
              fontSize: 'clamp(20px, 3vw, 26px)',
              fontWeight: 600,
              color: 'var(--text-primary)',
              lineHeight: 1.3,
              margin: 0,
              letterSpacing: '-0.3px',
            }}
          >
            לא רק{' '}
            <span style={{ color: 'var(--gold)' }}>מה</span>.
            <br />
            גם{' '}
            <span style={{ color: 'var(--gold)' }}>למה</span>.
          </h2>

          <p
            style={{
              fontSize: 14,
              color: 'var(--text-tertiary)',
              lineHeight: 1.65,
              margin: 0,
              maxWidth: 340,
            }}
          >
            כל המלצה באה עם הסבר אישי שמתייחס לתשובות שלך ולאוסף
            הקיים. לא המלצה סתמית. סיבה.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {PERKS.map((perk) => (
              <div
                key={perk}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    background: 'rgba(201,169,97,0.1)',
                    border: '1px solid rgba(201,169,97,0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Check size={10} color="var(--gold)" strokeWidth={2.5} />
                </div>
                <span
                  style={{
                    fontSize: 13,
                    color: 'var(--text-secondary)',
                  }}
                >
                  {perk}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Left col: Card */}
        <div>
          <div
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-default)',
              borderRadius: 16,
              padding: 18,
              maxWidth: 340,
            }}
          >
            {/* Fragrance card */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                marginBottom: 14,
                paddingBottom: 14,
                borderBottom: '1px solid var(--border-subtle)',
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 64,
                  borderRadius: 10,
                  background:
                    'linear-gradient(160deg, rgba(201,169,97,0.3), rgba(201,169,97,0.07))',
                  border: '1px solid rgba(201,169,97,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {BOTTLE_SVG}
              </div>

              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 9, color: 'var(--text-muted)', marginBottom: 3 }}>
                  MFK
                </p>
                <p
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    marginBottom: 5,
                    lineHeight: 1.3,
                  }}
                >
                  Baccarat Rouge 540
                </p>
                <span
                  style={{
                    fontSize: 9,
                    fontWeight: 700,
                    background: 'var(--gold)',
                    color: '#050505',
                    padding: '3px 8px',
                    borderRadius: 100,
                  }}
                >
                  96% התאמה
                </span>
              </div>
            </div>

            {/* "Why" card */}
            <div
              style={{
                background: 'rgba(201,169,97,0.05)',
                borderRight: '2px solid var(--gold)',
                borderRadius: 8,
                padding: '12px 14px',
                marginBottom: 14,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  marginBottom: 8,
                }}
              >
                <Sparkles size={11} color="var(--gold)" />
                <span
                  style={{
                    fontSize: 10,
                    color: 'var(--gold)',
                    fontWeight: 600,
                    letterSpacing: '0.03em',
                  }}
                >
                  למה זה אתה
                </span>
              </div>
              <p
                style={{
                  fontSize: 11,
                  color: 'var(--text-tertiary)',
                  lineHeight: 1.65,
                  margin: 0,
                }}
              >
                בחרת ב&quot;חמים ועוטף&quot; עם אמברה. דומה ל-Tobacco Vanille
                שכבר באוסף שלך, אבל יותר אוורירי. עמידות 10+ שעות שביקשת.
              </p>
            </div>

            {/* Price row */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: 10,
                    color: 'var(--text-muted)',
                    marginLeft: 4,
                  }}
                >
                  החל מ-
                </span>
                <span
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: 'var(--gold)',
                  }}
                >
                  1,580&#8362;
                </span>
              </div>
              <span
                style={{
                  fontSize: 10,
                  color: 'var(--text-tertiary)',
                  cursor: 'pointer',
                  borderBottom: '1px solid var(--border-gold)',
                }}
              >
                3 חנויות הושוו &#8592;
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
