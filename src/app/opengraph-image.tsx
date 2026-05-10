import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'SCENTORY - Know your scent.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0D0D0D 0%, #1A1A1A 100%)',
          color: '#F5F3EE',
          fontFamily: 'serif',
        }}
      >
        {/* Decorative circles */}
        <div style={{ position: 'absolute', top: 80, right: 80, width: 280, height: 280, border: '1px solid rgba(196,168,130,0.18)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', bottom: 60, left: 60, width: 200, height: 200, border: '1px solid rgba(196,168,130,0.12)', borderRadius: '50%' }} />

        {/* Bottle silhouette */}
        <svg width="120" height="170" viewBox="0 0 100 140" fill="none" style={{ marginBottom: 30 }}>
          <rect x="38" y="8" width="24" height="12" rx="2" stroke="#C4A882" strokeWidth="1.5" />
          <rect x="36" y="18" width="28" height="6" rx="1" stroke="#C4A882" strokeWidth="1.5" />
          <path d="M44 24 L44 32 L56 32 L56 24" stroke="#C4A882" strokeWidth="1.5" />
          <path d="M30 34 Q22 36 22 48 L22 118 Q22 128 32 128 L68 128 Q78 128 78 118 L78 48 Q78 36 70 34 L30 34 Z" stroke="#C4A882" strokeWidth="1.5" />
          <rect x="32" y="60" width="36" height="40" stroke="#C4A882" strokeWidth="1" opacity="0.5" />
        </svg>

        <div style={{ fontSize: 96, letterSpacing: '0.45em', paddingLeft: '0.45em', fontWeight: 500, color: '#F5F3EE', display: 'flex' }}>
          SCENTORY
        </div>

        <div style={{ width: 360, height: 1, background: 'rgba(196,168,130,0.6)', marginTop: 8, marginBottom: 14 }} />

        <div style={{ fontSize: 22, letterSpacing: '0.3em', color: '#C4A882', textTransform: 'uppercase', display: 'flex' }}>
          Know your scent.
        </div>

        <div style={{ marginTop: 40, fontSize: 26, color: '#9A9A9A', fontStyle: 'italic', display: 'flex' }}>
          Niche fragrance subscription, decoded by AI
        </div>
      </div>
    ),
    { ...size },
  );
}
