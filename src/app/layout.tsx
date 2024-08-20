import type { Metadata, Viewport } from 'next';
import Left from '@/components/aside/Left';
import Right from '@/components/aside/Right';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import { MobileScrollToTop } from '@/components/aside/ScrollToTop';
import { IsClientCtxProvider } from '@/lib/context/IsClientContext';
import { ToastProvider } from '@/lib/context/ToastContext';
import { getPageMetadata } from '@/lib/utilities';
import './globals.css';

export const metadata = getPageMetadata('home');
export const viewport: Viewport = {
  themeColor: '#96b7e3',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className='bg-background text-copy flex'>
        <IsClientCtxProvider>
          <ToastProvider>
            <Left />
            <div className='w-full mx-auto md:max-w-2xl lg:max-w-4xl xl:max-w-full xl:border-x xl:border-border'>
              <Header />
              {children}
              <Footer />
              <MobileScrollToTop />
            </div>
            <Right />
          </ToastProvider>
        </IsClientCtxProvider>
      </body>
    </html>
  );
}
