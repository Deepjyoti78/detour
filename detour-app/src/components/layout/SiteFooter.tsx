'use client';

import Link from 'next/link';
import { motion } from 'motion/react';

export default function SiteFooter() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="bg-[#203a78] text-[#faf2db] mt-auto"
    >
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <Link
          href="/"
          className="inline-flex items-center gap-3 font-['Anton',sans-serif] text-2xl tracking-wider hover:opacity-90 transition-opacity"
        >
          <svg className="w-8 h-6 text-[#faf2db]" viewBox="0 0 46 35" fill="none" aria-hidden="true">
            <path
              d="M4 32V17C4 12.6 7.6 9 12 9H40M32 2L41 9L32 16M13 32V21C13 18.8 14.8 17 17 17H26"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinejoin="miter"
            />
          </svg>
          DETOUR
        </Link>

        <nav className="flex flex-wrap items-center justify-center gap-3 text-sm font-bold">
          <Link href="/explore" className="px-2.5 py-1 hover:bg-[#faf2db]/15 transition-colors">Explore</Link>
          <Link href="/fleet" className="px-2.5 py-1 hover:bg-[#faf2db]/15 transition-colors">Fleet</Link>
          <Link href="/locations" className="px-2.5 py-1 hover:bg-[#faf2db]/15 transition-colors">Locations</Link>
          <Link href="/my-booking" className="px-2.5 py-1 hover:bg-[#faf2db]/15 transition-colors">My booking</Link>
          <Link href="/faq" className="px-2.5 py-1 hover:bg-[#faf2db]/15 transition-colors">Rental FAQ</Link>
        </nav>

        <span className="text-[#d8e3fb] text-xs uppercase tracking-wider">
          Self-Drive Car Rental · Demo
        </span>
      </div>
    </motion.footer>
  );
}
