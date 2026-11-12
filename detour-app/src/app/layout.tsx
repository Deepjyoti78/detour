import type { Metadata } from 'next';
import { Suspense } from 'react';
import './globals.css';
import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';

export const metadata: Metadata = {
  title: 'Detour Car Rental | Scenic Drives & Classic Road Trips',
  description: 'Self-drive car rental demo specializing in curated scenic drives across India.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#faf2db] text-[#18274b] min-h-screen flex flex-col font-['HK',sans-serif]">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-5 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#fce466] focus:text-[#18274b] focus:font-bold border border-[#18274b]"
        >
          Skip to main content
        </a>
        <Suspense fallback={<header className="border-b border-[#a9aa9c] bg-[#faf2db] min-h-[89px]" />}>
          <SiteHeader />
        </Suspense>
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
