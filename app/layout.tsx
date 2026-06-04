import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ComplianceNoticeBanner from '@/components/shared/ComplianceNoticeBanner';
import { CartProvider } from '@/components/shared/CartProvider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-heading',
});

export const metadata: Metadata = {
  title: {
    template: '%s | Australian Prop Money',
    default: 'Australian Prop Money for Film, TV & Creative Productions',
  },
  description: 'Premium Australian-style prop notes designed exclusively for film production, photography, theatre, training simulations and creative projects.',
  openGraph: {
    title: 'Australian Prop Money',
    description: 'Premium Australian-style prop notes for film production, photography, theatre, training simulations and creative projects.',
    url: 'https://australianpropsmoney.com',
    siteName: 'Australian Prop Money',
    locale: 'en_AU',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: 'Australian Prop Money',
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans antialiased bg-gray-50 text-[#1a2942] min-h-screen flex flex-col">
        <CartProvider>
          <ComplianceNoticeBanner />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
