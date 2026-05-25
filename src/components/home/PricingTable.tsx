'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import EyebrowText from './shared/EyebrowText';

const ease = [0.22, 1, 0.36, 1] as const;

const ROWS = [
  {
    feature: 'גישה לקולקציה',
    discovery: true,
    collector: true,
    expert: true,
  },
  {
    feature: 'שאלון + פרופיל אישי',
    discovery: true,
    collector: true,
    expert: true,
  },
  {
    feature: 'המלצות AI עם הסבר',
    discovery: '3 לחודש',
    collector: 'ללא הגבלה',
    expert: 'ללא הגבלה',
  },
  {
    feature: 'יומן ריחות אישי',
    discovery: false,
    collector: true,
    expert: true,
  },
  {
    feature: 'ייעוץ אישי חודשי',
    discovery: false,
    collector: false,
    expert: true,
  },
  {
    feature: 'הנחות בלעדיות',
    discovery: false,
    collector: false,
    expert: true,
  },
];

type CellValue = boolean | string;

function Cell({ value }: { value: CellValue }) {
  if (typeof value === 'string') {
    return (
      <span style={{ fontSize: 11, color: 'var(--text-secondary)', fontWeight: 500 }}>
        {value}
      </span>
    );
  }
  if (value) return <Check size={14} color="var(--gold)" strokeWidth={2.5} />;
  return <X size={14} color="var(--text-faint)" strokeWidth={2} />;
}

const PLANS = [
  { key: 'discovery', label: 'גילוי', price: '49', highlighted: false },
  { key: 'collector', label: 'אספן', price: '99', highlighted: true },
  { key: 'expert', label: 'מומחה', price: '199', highlighted: false },
] as const;

export default function PricingTable() {
  return (
    <section
      id="pricing"
      style={{
        background: 'var(--bg-primary)',
        padding: 'clamp(36px, 5vw, 52px) clamp(20px, 4vw, 32px)',
      }}
    >
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease }}
          style={{ textAlign: 'center', marginBottom: 12 }}
        >
          <EyebrowText>המסלולים</EyebrowText>
          <h2
            style={{
              fontSize: 'clamp(20px, 3vw, 24px)',
              fontWeight: 600,
              color: 'var(--text-primary)',
              marginTop: 10,
              letterSpacing: '-0.3px',
            }}
          >
            בחר את הרמה שלך
            <span style={{ color: 'var(--gold)' }}>.</span>
          </h2>
          <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 8 }}>
            7 ימי ניסיון · ללא כרטיס אשראי · ביטול בכל עת
          </p>
        </motion.div>

        {/* Desktop Table */}
        <div className="hidden md:block" style={{ overflowX: 'auto', marginTop: 28 }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              tableLayout: 'fixed',
            }}
          >
            <colgroup>
              <col style={{ width: '35%' }} />
              <col style={{ width: '21.7%' }} />
              <col style={{ width: '21.7%' }} />
              <col style={{ width: '21.6%' }} />
            </colgroup>

            <thead>
              <tr>
                <th
                  style={{
                    padding: '12px 16px',
                    borderBottom: '1px solid var(--border-default)',
                  }}
                />
                {PLANS.map((plan) => (
                  <th
                    key={plan.key}
                    style={{
                      padding: '14px 16px',
                      textAlign: 'center',
                      position: 'relative',
                      background: plan.highlighted
                        ? 'rgba(201,169,97,0.05)'
                        : 'transparent',
                      border: plan.highlighted
                        ? '1px solid rgba(201,169,97,0.15)'
                        : 'none',
                      borderBottom: 'none',
                      borderRadius: plan.highlighted ? '8px 8px 0 0' : 0,
                    }}
                  >
                    {/* Tiny "Popular" badge */}
                    {plan.highlighted && (
                      <div
                        style={{
                          position: 'absolute',
                          top: 6,
                          left: 8,
                          background: 'var(--gold)',
                          color: '#050505',
                          fontSize: 7,
                          fontWeight: 700,
                          padding: '1px 5px',
                          borderRadius: 4,
                          lineHeight: 1.5,
                        }}
                      >
                        פופולרי
                      </div>
                    )}
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: plan.highlighted
                          ? 'var(--gold)'
                          : 'var(--text-secondary)',
                        marginBottom: 4,
                      }}
                    >
                      {plan.label}
                    </div>
                    <div
                      style={{
                        fontSize: 20,
                        fontWeight: 700,
                        color: 'var(--text-primary)',
                      }}
                    >
                      {plan.price}
                      <span style={{ fontSize: 11, fontWeight: 400, color: 'var(--text-muted)' }}>
                        &#8362;/חודש
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {ROWS.map((row, i) => (
                <tr key={row.feature}>
                  <td
                    style={{
                      padding: '11px 16px',
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

                  {PLANS.map((plan) => {
                    const value = row[plan.key] as CellValue;
                    return (
                      <td
                        key={plan.key}
                        style={{
                          padding: '11px 16px',
                          textAlign: 'center',
                          background: plan.highlighted
                            ? 'rgba(201,169,97,0.04)'
                            : 'transparent',
                          borderLeft: plan.highlighted
                            ? '1px solid rgba(201,169,97,0.1)'
                            : 'none',
                          borderRight: plan.highlighted
                            ? '1px solid rgba(201,169,97,0.1)'
                            : 'none',
                          borderBottom:
                            i < ROWS.length - 1
                              ? plan.highlighted
                                ? '1px solid rgba(201,169,97,0.06)'
                                : '1px solid var(--border-subtle)'
                              : plan.highlighted
                              ? '1px solid rgba(201,169,97,0.1)'
                              : 'none',
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                          <Cell value={value} />
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}

              {/* CTA Row */}
              <tr>
                <td style={{ padding: '16px 16px 4px' }} />
                {PLANS.map((plan) => (
                  <td
                    key={plan.key}
                    style={{
                      padding: '16px 16px 4px',
                      textAlign: 'center',
                      background: plan.highlighted
                        ? 'rgba(201,169,97,0.04)'
                        : 'transparent',
                      borderLeft: plan.highlighted
                        ? '1px solid rgba(201,169,97,0.1)'
                        : 'none',
                      borderRight: plan.highlighted
                        ? '1px solid rgba(201,169,97,0.1)'
                        : 'none',
                      borderBottom: plan.highlighted
                        ? '1px solid rgba(201,169,97,0.1)'
                        : 'none',
                      borderRadius: plan.highlighted ? '0 0 8px 8px' : 0,
                    }}
                  >
                    <Link
                      href="/quiz"
                      style={{
                        display: 'inline-block',
                        fontSize: 12,
                        fontWeight: 500,
                        padding: '8px 20px',
                        borderRadius: 6,
                        textDecoration: 'none',
                        background: plan.highlighted
                          ? 'var(--gold)'
                          : 'rgba(255,255,255,0.06)',
                        color: plan.highlighted
                          ? '#050505'
                          : 'var(--text-secondary)',
                        border: plan.highlighted
                          ? 'none'
                          : '1px solid var(--border-default)',
                        transition: 'opacity 0.2s',
                      }}
                    >
                      התחל
                    </Link>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Mobile: stacked cards */}
        <div
          className="md:hidden"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            marginTop: 24,
          }}
        >
          {PLANS.map((plan) => (
            <div
              key={plan.key}
              style={{
                border: plan.highlighted
                  ? '2px solid var(--gold)'
                  : '1px solid var(--border-default)',
                borderRadius: 12,
                padding: 18,
                background: plan.highlighted
                  ? 'rgba(201,169,97,0.04)'
                  : 'var(--bg-card)',
                position: 'relative',
              }}
            >
              {plan.highlighted && (
                <div
                  style={{
                    position: 'absolute',
                    top: 10,
                    left: 10,
                    background: 'var(--gold)',
                    color: '#050505',
                    fontSize: 7,
                    fontWeight: 700,
                    padding: '2px 6px',
                    borderRadius: 4,
                  }}
                >
                  פופולרי
                </div>
              )}

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 14,
                }}
              >
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 600,
                    color: plan.highlighted ? 'var(--gold)' : 'var(--text-primary)',
                  }}
                >
                  {plan.label}
                </div>
                <div>
                  <span
                    style={{
                      fontSize: 22,
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                    }}
                  >
                    {plan.price}
                  </span>
                  <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                    &#8362;/חודש
                  </span>
                </div>
              </div>

              <div
                style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}
              >
                {ROWS.map((row) => {
                  const val = row[plan.key] as CellValue;
                  return (
                    <div
                      key={row.feature}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <span style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>
                        {row.feature}
                      </span>
                      <Cell value={val} />
                    </div>
                  );
                })}
              </div>

              <Link
                href="/quiz"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  fontSize: 13,
                  fontWeight: 500,
                  padding: '10px 0',
                  borderRadius: 6,
                  textDecoration: 'none',
                  background: plan.highlighted
                    ? 'var(--gold)'
                    : 'rgba(255,255,255,0.06)',
                  color: plan.highlighted ? '#050505' : 'var(--text-secondary)',
                  border: plan.highlighted ? 'none' : '1px solid var(--border-default)',
                }}
              >
                התחל
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
