import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import CookieBanner from '@/components/CookieBanner';
import AccessibilityWidget from '@/components/AccessibilityWidget';
import ThemeBodySync from '@/components/ThemeBodySync';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://scentory.co.il'),
  title: 'SCENTORY | Know your scent.',
  description: 'SCENTORY - פלטפורמת AI לגילוי בשמים. תשע שאלות. ניתוח מעל 1,000 בשמים. עשר התאמות אישיות עם הסבר למה.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'SCENTORY | Know your scent.',
    description: 'SCENTORY - פלטפורמת AI לגילוי בשמים. שמור את האוסף שלך, קבל המלצות חכמות, וקנה דרכנו.',
    siteName: 'SCENTORY',
    type: 'website',
    locale: 'he_IL',
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SCENTORY | Know your scent.',
    description: 'SCENTORY - פלטפורמת AI לגילוי בשמים.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: '#c9a961',
          colorText: '#f5f5f5',
          colorBackground: '#131313',
          colorInputBackground: '#1a1a1a',
          borderRadius: '8px',
          fontFamily: 'Heebo, system-ui, sans-serif',
        },
        elements: {
          formButtonPrimary:
            'bg-gradient-to-br from-[#96793a] to-[#b08d45] hover:from-[#b08d45] hover:to-[#c9a85c] shadow-sm',
          card: 'shadow-md border border-black/[0.05]',
          headerTitle: 'font-serif',
        },
      }}
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      signInFallbackRedirectUrl="/"
      signUpFallbackRedirectUrl="/"
      afterSignOutUrl="/"
    >
      <html lang="he" dir="rtl" className="h-full antialiased" suppressHydrationWarning>
        <head>
          {/* Critical theme variables — defined early so they're never missing */}
          <style dangerouslySetInnerHTML={{ __html: `
            :root{--bg-primary:#050505;--nav-bg:rgba(5,5,5,.95);--nav-bg-scrolled:rgba(5,5,5,.97);}
            html:not(.dark){--bg-primary:#faf9f7;--nav-bg:rgba(250,249,247,.95);--nav-bg-scrolled:rgba(250,249,247,.97);}
            html,body{background:#050505;}
            html:not(.dark),html:not(.dark) body{background:#faf9f7;}
          ` }} />
          <script
            // Avoid FOUC: apply stored theme before React mounts (default = dark)
            dangerouslySetInnerHTML={{
              __html: `(function(){try{var t=localStorage.getItem('scent-ai-theme')||'dark';if(t==='dark'){document.documentElement.classList.add('dark');}}catch(e){}})();`,
            }}
          />
        </head>
        <body className="min-h-full flex flex-col">
          <ThemeBodySync />
          <a href="#main-content" className="skip-to-content">דלג לתוכן הראשי</a>
          {children}
          <CookieBanner />
          <AccessibilityWidget />
        </body>
      </html>
    </ClerkProvider>
  );
}
