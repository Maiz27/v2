import type { Metadata, Viewport } from 'next';
import { STIX_Two_Text, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import MotionGate from '@/components/motion/MotionGate';
import RouteTransition from '@/components/transitions/RouteTransition';
import ScrollToTop from '@/components/ui/ScrollToTop';
import { INITIAL_MOTION_STATE } from '@/lib/motion';
import { OWNER } from '@/lib/site';
import './globals.css';

const stixTwo = STIX_Two_Text({
  subsets: ['latin'],
  variable: '--font-stix-two',
});

const plexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-plex-sans',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  // 700 included: mono elements use font-bold (masthead name, index numbers),
  // and without the real face the browser synthesizes a smeared bold.
  weight: ['400', '500', '700'],
  variable: '--font-plex-mono',
});

export const viewport: Viewport = {
  // --color-paper (oklch 16% 0.012 240) in sRGB, for browser chrome.
  themeColor: '#090e12',
};

// Static fallback only: every route defines its own generateMetadata (driven
// by the Sanity `metadata` document for that slug), which Next merges over
// this. A layout-level Sanity fetch here would just be a second, discarded
// round trip on every navigation.
export const metadata: Metadata = {
  title: OWNER.name,
  description: `${OWNER.name}, ${OWNER.role}.`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang='en'
      data-motion={INITIAL_MOTION_STATE}
      data-scroll-behavior='smooth'
      className={`${stixTwo.variable} ${plexSans.variable} ${plexMono.variable}`}
    >
      <body className='ledger-body min-h-dvh'>
        <MotionGate />
        <RouteTransition />
        {children}
        <ScrollToTop />
        <SpeedInsights />
      </body>
    </html>
  );
}
