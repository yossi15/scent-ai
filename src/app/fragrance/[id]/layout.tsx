import type { Metadata } from 'next';
import { fragrances } from '@/data/fragrances';

const SITE = 'https://scentory.co.il';

interface Props {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const fragrance = fragrances.find(f => f.id === Number(id));

  if (!fragrance) {
    return {
      title: 'בושם לא נמצא | SCENTORY',
      description: 'הבושם המבוקש לא נמצא בקולקציה.',
    };
  }

  const title       = `${fragrance.name} by ${fragrance.house} | SCENTORY`;
  const description = `${fragrance.name} של ${fragrance.house} — ${fragrance.description}. ${fragrance.family}, ${fragrance.concentration}, ₪${fragrance.price.toLocaleString()}.`;
  const url         = `${SITE}/fragrance/${fragrance.id}`;
  const image       = fragrance.image;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      locale: 'he_IL',
      siteName: 'SCENTORY',
      images: image ? [{ url: image, width: 375, height: 500, alt: `${fragrance.name} by ${fragrance.house}` }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image ? [image] : [],
    },
  };
}

export async function generateStaticParams() {
  return fragrances.map(f => ({ id: String(f.id) }));
}

export default function FragranceLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
