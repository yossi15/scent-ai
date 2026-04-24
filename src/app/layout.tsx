import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';

export const metadata: Metadata = {
  title: 'Scent AI — הבושם הבא שלך, מפוענח',
  description: 'שירות מנוי לבשמי נישה מבוסס AI. גלה את הזהות הריחנית שלך.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: '#96793a',
          colorText: '#1a1714',
          colorBackground: '#faf8f5',
          colorInputBackground: '#f3efe8',
          borderRadius: '12px',
          fontFamily: 'Heebo, Inter, system-ui, sans-serif',
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
          <script
            // Avoid FOUC: apply theme class before React mounts
            dangerouslySetInnerHTML={{
              __html: `(function(){try{var t=localStorage.getItem('scent-ai-theme');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}if(t==='dark'){document.documentElement.classList.add('dark');}}catch(e){}})();`,
            }}
          />
        </head>
        <body className="min-h-full flex flex-col">
          <a href="#main-content" className="skip-to-content">דלג לתוכן הראשי</a>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
