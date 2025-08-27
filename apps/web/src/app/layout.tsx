import type { Viewport } from 'next';
import Left from '@/components/aside/Left';
import Right from '@/components/aside/Right';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import ContextProvider from '@/components/context/ContextProvider';
import PageTransition from '@/components/animationWrappers/PageTransition';
import { MobileScrollToTop } from '@/components/aside/ScrollToTop';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { fetchSanityData } from '@/lib/sanity/client';
import { getTools } from '@/lib/sanity/queries';
import { getDynamicMetaData } from '@/lib/utilities';
import { GetToolsResult } from '@/lib/sanity/types';
import './globals.css';

export const viewport: Viewport = {
  themeColor: '#96b7e3',
};

export async function generateMetadata() {
  const data = await getDynamicMetaData('/');
  return data;
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tools: GetToolsResult[] = await fetchSanityData(getTools);

  return (
    <html lang='en' data-scroll-behavior='smooth'>
      <body className='bg-background text-copy flex'>
        <ContextProvider tools={tools}>
          <Left />
          <div className='w-full mx-auto md:max-w-2xl lg:max-w-4xl xl:max-w-full xl:border-x xl:border-border overflow-hidden'>
            <Header />
            <main>
              <PageTransition>{children}</PageTransition>
            </main>
            <Footer />
            <MobileScrollToTop />
          </div>
          <Right />
        </ContextProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
