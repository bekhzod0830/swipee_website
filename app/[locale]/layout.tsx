import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import '../globals.css';

export const metadata: Metadata = {
  title: 'SVΛYP - Discover Your Style',
  description: 'Find perfect outfits with AI-powered visual search and personalized recommendations',
  metadataBase: new URL('https://svaypai.com'),
  openGraph: {
    title: 'SVΛYP - Discover Your Style',
    description: 'Find perfect outfits with AI-powered visual search and personalized recommendations',
    url: 'https://svaypai.com',
    siteName: 'SVΛYP',
    images: [
      {
        url: '/key_point_images/swipe_discovery.png',
        width: 1200,
        height: 630,
        alt: 'SVΛYP - AI-powered fashion discovery',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SVΛYP - Discover Your Style',
    description: 'Find perfect outfits with AI-powered visual search and personalized recommendations',
    images: ['/key_point_images/swipe_discovery.png'],
  },
};

const locales = ['ru', 'en', 'uz'];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  if (!locales.includes(locale as any)) notFound();

  const messages = await getMessages({ locale });

  return (
    <html lang={locale} className="scroll-smooth">
      <body className="antialiased" suppressHydrationWarning>
        <NextIntlClientProvider messages={messages} locale={locale}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
