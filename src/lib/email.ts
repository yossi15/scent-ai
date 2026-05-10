import { Resend } from 'resend';

function getResend(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) { console.warn('Missing RESEND_API_KEY'); return null; }
  return new Resend(apiKey);
}

const TIER_NAMES: Record<string, string> = {
  discovery: 'גילוי',
  collector:  'אספן',
  expert:     'מומחה',
};

export async function sendSampleConfirmation({
  to,
  name,
  fragranceName,
  brand,
}: {
  to: string;
  name: string | null;
  fragranceName: string;
  brand?: string | null;
}): Promise<void> {
  const resend = getResend();
  if (!resend) return;
  const greeting = name ? `שלום ${name},` : 'שלום,';
  await resend.emails.send({
    from: 'SCENTORY <noreply@scentory.co.il>',
    to,
    subject: `בקשת דגימה התקבלה — ${fragranceName}`,
    html: `<div dir="rtl" style="font-family:sans-serif;max-width:480px;margin:auto;padding:32px;color:#1a1714;"><h2 style="font-family:serif">SCENTORY</h2><p>${greeting}</p><p>קיבלנו את בקשתך לדגימה של <strong>${fragranceName}</strong>.</p><p>ניצור איתך קשר בהקדם.</p></div>`,
  });
}

export async function sendWaitlistConfirmation({
  to,
  name,
}: {
  to: string;
  name: string | null;
}): Promise<void> {
  const resend = getResend();
  if (!resend) return;
  const greeting = name ? `שלום ${name},` : 'שלום,';
  await resend.emails.send({
    from: 'SCENTORY <noreply@scentory.co.il>',
    to,
    subject: 'הצטרפת לרשימת ההמתנה של SCENTORY',
    html: `<div dir="rtl" style="font-family:sans-serif;max-width:480px;margin:auto;padding:32px;color:#1a1714;"><h2 style="font-family:serif">SCENTORY</h2><p>${greeting}</p><p>תודה שהצטרפת לרשימת ההמתנה שלנו! נעדכן אותך כשנפתח רישום מלא.</p></div>`,
  });
}

export async function sendSubscriptionConfirmation({
  to,
  name,
  tier,
}: {
  to: string;
  name: string | null;
  tier: string;
}): Promise<void> {
  const resend = getResend();
  if (!resend) return;
  const tierName = TIER_NAMES[tier] ?? tier;
  const greeting = name ? `שלום ${name},` : 'שלום,';

  await resend.emails.send({
    from:    'SCENTORY <noreply@scentory.co.il>',
    to,
    subject: `ברוך הבא לתוכנית ${tierName} — SCENTORY`,
    html: `
      <div dir="rtl" style="font-family: sans-serif; max-width: 480px; margin: auto; padding: 32px; color: #1a1714;">
        <h2 style="font-family: serif; font-size: 24px; margin-bottom: 8px;">SCENTORY</h2>
        <p style="color: #6B6B6B; font-size: 12px; margin-bottom: 24px;">Know your scent.</p>
        <p>${greeting}</p>
        <p>המנוי שלך לתוכנית <strong>${tierName}</strong> הופעל בהצלחה.</p>
        <p>כעת תוכל ליהנות מכל היתרונות הבלעדיים של תוכנית ${tierName}.</p>
        <br/>
        <a href="https://scentory.co.il/dashboard"
           style="display:inline-block;padding:12px 24px;background:#C4A882;color:#0D0D0D;text-decoration:none;border-radius:8px;font-weight:600;">
          לדאשבורד שלי
        </a>
        <br/><br/>
        <p style="color: #9A9A9A; font-size: 11px;">SCENTORY · scentory.co.il</p>
      </div>
    `,
  });
}
