import { Check, X } from 'lucide-react';
import EyebrowText from './shared/EyebrowText';

const ROWS = [
  {
    feature: 'המלצות מותאמות אישית',
    scentory: true,
    fragrantica: false,
    store: 'דעת המוכר',
  },
  {
    feature: 'הסבר "למה" לכל המלצה',
    scentory: true,
    fragrantica: false,
    store: false,
  },
  {
    feature: 'השוואת מחירים בין חנויות',
    scentory: true,
    fragrantica: false,
    store: false,
  },
  {
    feature: 'קטלוג מלא בעברית',
    scentory: true,
    fragrantica: false,
    store: true,
  },
  {
    feature: 'קולקציה אישית + יומן',
    scentory: true,
    fragrantica: true,
    store: false,
  },
];

function Cell({ value }: { value: boolean | string }) {
  if (typeof value === 'string') {
    return (
      <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{value}</span>
    );
  }
  if (value) {
    return <Check size={14} color="var(--gold)" strokeWidth={2.5} />;
  }
  return <X size={14} color="var(--text-faint)" strokeWidth={2} />;
}

export default function ComparisonTable() {
  return (
    <section
      style={{
        background: 'var(--bg-secondary)',
        padding: 'clamp(36px, 5vw, 52px) clamp(20px, 4vw, 32px)',
      }}
    >
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <EyebrowText>למה לא חנות?</EyebrowText>
          <h2
            style={{
              fontSize: 'clamp(20px, 3vw, 24px)',
              fontWeight: 600,
              color: 'var(--text-primary)',
              marginTop: 10,
              letterSpacing: '-0.3px',
            }}
          >
            SCENTORY מול האלטרנטיבות
            <span style={{ color: 'var(--gold)' }}>.</span>
          </h2>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              tableLayout: 'fixed',
            }}
          >
            <colgroup>
              <col style={{ width: '40%' }} />
              <col style={{ width: '20%' }} />
              <col style={{ width: '20%' }} />
              <col style={{ width: '20%' }} />
            </colgroup>

            <thead>
              <tr>
                <th
                  style={{
                    padding: '10px 16px',
                    textAlign: 'right',
                    fontSize: 10,
                    fontWeight: 500,
                    color: 'var(--text-muted)',
                    borderBottom: '1px solid var(--border-default)',
                  }}
                />
                {/* SCENTORY - highlighted */}
                <th
                  style={{
                    padding: '10px 16px',
                    textAlign: 'center',
                    fontSize: 11,
                    fontWeight: 600,
                    color: 'var(--gold)',
                    background: 'rgba(201,169,97,0.04)',
                    border: '1px solid rgba(201,169,97,0.1)',
                    borderBottom: 'none',
                    borderRadius: '8px 8px 0 0',
                  }}
                >
                  SCENTORY
                </th>
                <th
                  style={{
                    padding: '10px 16px',
                    textAlign: 'center',
                    fontSize: 11,
                    fontWeight: 500,
                    color: 'var(--text-muted)',
                    borderBottom: '1px solid var(--border-default)',
                  }}
                >
                  Fragrantica
                </th>
                <th
                  style={{
                    padding: '10px 16px',
                    textAlign: 'center',
                    fontSize: 11,
                    fontWeight: 500,
                    color: 'var(--text-muted)',
                    borderBottom: '1px solid var(--border-default)',
                  }}
                >
                  חנות בקניון
                </th>
              </tr>
            </thead>

            <tbody>
              {ROWS.map((row, i) => (
                <tr key={row.feature}>
                  <td
                    style={{
                      padding: '12px 16px',
                      fontSize: 12,
                      color: 'var(--text-secondary)',
                      borderBottom:
                        i < ROWS.length - 1
                          ? '1px solid var(--border-subtle)'
                          : 'none',
                    }}
                  >
                    {row.feature}
                  </td>

                  {/* SCENTORY */}
                  <td
                    style={{
                      padding: '12px 16px',
                      textAlign: 'center',
                      background: 'rgba(201,169,97,0.04)',
                      borderLeft: '1px solid rgba(201,169,97,0.1)',
                      borderRight: '1px solid rgba(201,169,97,0.1)',
                      borderBottom:
                        i < ROWS.length - 1
                          ? '1px solid rgba(201,169,97,0.06)'
                          : '1px solid rgba(201,169,97,0.1)',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <Cell value={row.scentory} />
                    </div>
                  </td>

                  <td
                    style={{
                      padding: '12px 16px',
                      textAlign: 'center',
                      borderBottom:
                        i < ROWS.length - 1
                          ? '1px solid var(--border-subtle)'
                          : 'none',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <Cell value={row.fragrantica} />
                    </div>
                  </td>

                  <td
                    style={{
                      padding: '12px 16px',
                      textAlign: 'center',
                      borderBottom:
                        i < ROWS.length - 1
                          ? '1px solid var(--border-subtle)'
                          : 'none',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <Cell value={row.store} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
