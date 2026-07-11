import type { Viewport } from 'next';
import { Besley, Source_Serif_4, Fragment_Mono } from 'next/font/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import MotionGate from '@/components/motion/MotionGate';
import RouteTransition from '@/components/transitions/RouteTransition';
import { INITIAL_MOTION_STATE } from '@/lib/motion';
import { getDynamicMetaData } from '@/lib/utilities';
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

export async function generateMetadata() {
  const data = await getDynamicMetaData('/');
  return data;
}

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
