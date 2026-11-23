import type { Metadata, Viewport } from 'next';
import { GeistSans } from 'geist/font/sans';
import './globals.css';

const title = 'Balaji Sivarajan · Product builder · Vancouver';
const description =
  'Fifteen years of shipping software, dealt as 21 cards. Every card is a product, AI system or program I ran, with the call I made and the evidence behind it.';

export const metadata: Metadata = {
  metadataBase: new URL('https://ibalajisivarajan.github.io'),
  title,
  description,
  icons: { icon: '/favicon.svg' },
  openGraph: { title, description, url: '/', siteName: "Bala's Deck", images: ['/og.png'], type: 'website' },
  twitter: { card: 'summary_large_image', title, description, images: ['/og.png'] },
};

export const viewport: Viewport = { themeColor: '#131209' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <body>{children}</body>
    </html>
  );
}
