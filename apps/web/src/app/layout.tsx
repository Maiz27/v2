import type { Metadata, Viewport } from 'next';
import { Besley, Source_Serif_4, Fragment_Mono } from 'next/font/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import MotionGate from '@/components/motion/MotionGate';
import RouteTransition from '@/components/transitions/RouteTransition';
import { INITIAL_MOTION_STATE } from '@/lib/motion';
import { OWNER } from '@/lib/site';
import './globals.css';

const besley = Besley({
  subsets: ['latin'],
  variable: '--font-besley',
});

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-source-serif',
});

const fragmentMono = Fragment_Mono({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-fragment-mono',
});

export const viewport: Viewport = {
  themeColor: '#f4f1ea',
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
      className={`${besley.variable} ${sourceSerif.variable} ${fragmentMono.variable}`}
    >
      <body className='ledger-body min-h-dvh'>
        <MotionGate />
        <RouteTransition />
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
