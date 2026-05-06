'use client';

const items = [
  { icon: '🚚', text: 'משלוח מאובטח בישראל' },
  { icon: '↩', text: 'ביטול מנוי בכל עת' },
  { icon: '✓', text: '100% בשמים מקוריים' },
  { icon: '💬', text: 'תמיכה בעברית' },
];

export default function TrustBar() {
  return (
    <div className="border-y border-[#EBEBEB]" style={{ background: '#F5F3EF' }}>
      <div className="max-w-5xl mx-auto px-6 py-4 flex flex-wrap justify-center gap-x-10 gap-y-2">
        {items.map(item => (
          <span key={item.text} className="flex items-center gap-2 text-[11px] tracking-[0.08em] font-sans text-[#666]">
            <span className="text-[#C4A882] text-sm">{item.icon}</span>
            {item.text}
          </span>
        ))}
      </div>
    </div>
  );
}
