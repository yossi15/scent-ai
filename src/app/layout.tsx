import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Scent AI — הבושם הבא שלך, מפוענח",
  description: "פלטפורמת קיור בשמים חכמה מבוססת בינה מלאכותית. גלה את הזהות הריחנית שלך.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
