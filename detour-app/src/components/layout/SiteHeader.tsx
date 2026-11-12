'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useBookingStore } from '@/stores/bookingStore';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import AuthModal from '@/components/auth/AuthModal';

export default function SiteHeader() {
  const pathname = usePathname();
  const { profile, clearProfile } = useBookingStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const isHome = pathname === '/';

  const navLinks = [
    { label: 'Explore', href: '/explore', matches: ['/explore', '/route'] },
    { label: 'Fleet', href: '/fleet', matches: ['/fleet', '/car', '/compare'] },
    { label: 'Locations', href: '/locations', matches: ['/locations', '/pickup-guide'] },
    { label: 'My booking', href: '/my-booking', matches: ['/my-booking', '/confirmation'] },
  ];

  return (
    <>
      <header
        className={`z-40 w-full transition-colors ${
          isHome
            ? mobileOpen
              ? 'fixed top-0 inset-x-0 bg-[#faf2db] text-[#18274b] border-b border-[#a9aa9c] shadow-lg'
              : 'absolute top-0 inset-x-0 bg-transparent border-none'
            : 'relative bg-[#faf2db] text-[#18274b] border-b border-[#a9aa9c]'
        }`}
      >
        <div className="w-[90%] max-w-7xl mx-auto flex items-center justify-between gap-6 py-3.5 md:py-4">
          {/* Brand */}
          <Link
            href="/"
            className={`inline-flex items-center gap-2.5 font-['Anton',sans-serif] text-2xl md:text-3xl tracking-wider transition-opacity hover:opacity-90 ${
              isHome ? (mobileOpen ? 'text-[#18274b]' : 'text-[#faf2db]') : 'text-[#18274b]'
            }`}
          >
            <svg className="w-8 h-6 md:w-9 md:h-7" viewBox="0 0 46 35" fill="none" aria-hidden="true">
              <path
                d="M4 32V17C4 12.6 7.6 9 12 9H40M32 2L41 9L32 16M13 32V21C13 18.8 14.8 17 17 17H26"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinejoin="miter"
              />
            </svg>
            DETOUR
          </Link>

          {/* Desktop Nav - In Home it's the exact Paper Cream Box from Image 2 */}
          <nav
            className={`hidden md:flex items-center gap-6 font-bold text-sm tracking-wide ${
              isHome
                ? 'bg-[#faf2db] text-[#18274b] px-4 py-2 border border-[#a9aa9c] shadow-[3px_3px_0px_#18274b]'
                : 'text-[#18274b]'
            }`}
          >
            {navLinks.map((link) => {
              const isActive = link.matches.some((m) => pathname.startsWith(m));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 transition-all font-bold text-xs uppercase tracking-wider border ${
                    isActive
                      ? 'bg-[#18274b] text-[#faf2db] border-[#18274b] shadow-[2px_2px_0px_#18274b]'
                      : 'text-[#18274b] border-transparent hover:bg-[#18274b]/15'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            {profile ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="px-3.5 py-1.5 border border-[#18274b] text-xs uppercase tracking-wider font-bold bg-[#faf2db] text-[#18274b] hover:bg-[#fce466] transition-colors cursor-pointer inline-flex items-center gap-1.5"
                >
                  <span>{profile.name}</span>
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-1.5 w-36 bg-[#faf2db] border-2 border-[#18274b] shadow-[4px_4px_0px_#18274b] py-1 z-50">
                    <button
                      type="button"
                      onClick={() => {
                        clearProfile();
                        setUserMenuOpen(false);
                      }}
                      className="w-full text-left px-3.5 py-2 text-xs font-bold text-[#18274b] hover:bg-[#fce466] cursor-pointer"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setAuthModalOpen(true)}
                className="px-3.5 py-1.5 border border-[#18274b] text-xs uppercase tracking-wider font-bold hover:bg-[#18274b] hover:text-[#faf2db] transition-colors inline-flex items-center gap-1 cursor-pointer"
              >
                <span>Sign in</span> <span aria-hidden="true">↗</span>
              </button>
            )}
          </nav>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`md:hidden p-2 border rounded-none focus:outline-none transition-colors ${
              isHome
                ? mobileOpen
                  ? 'text-[#18274b] border-[#18274b] bg-[#faf2db]'
                  : 'text-[#faf2db] border-[#faf2db] bg-[#18274b]/60'
                : 'text-[#18274b] border-[#18274b] bg-[#faf2db]'
            }`}
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Drawer */}
        {mobileOpen && (
          <div className="md:hidden border-t border-[#a9aa9c] bg-[#faf2db] text-[#18274b] px-[5%] py-4 flex flex-col gap-2.5 shadow-[0_8px_16px_rgba(0,0,0,0.2)]">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="py-2.5 px-3 text-base font-bold border-b border-[#a9aa9c]/30 text-[#18274b] hover:bg-[#18274b]/10 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2">
              {profile ? (
                <div className="flex items-center justify-between py-2 border-t border-[#a9aa9c]/30">
                  <span className="font-bold text-sm text-[#18274b] uppercase tracking-wider">
                    {profile.name}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      clearProfile();
                      setMobileOpen(false);
                    }}
                    className="text-xs font-bold uppercase px-3 py-1.5 bg-[#18274b] text-[#faf2db] hover:bg-[#203a78] border border-[#18274b] cursor-pointer transition-colors"
                  >
                    Sign out
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    setAuthModalOpen(true);
                  }}
                  className="block w-full text-center py-3 border border-[#18274b] font-bold text-sm bg-[#18274b] text-[#faf2db] hover:bg-[#203a78] shadow-[2px_2px_0px_#18274b] cursor-pointer transition-colors"
                >
                  Sign in ↗
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Auth Pop-up Modal (Matching Image 3) */}
      <AuthModal
        open={authModalOpen}
        onOpenChange={setAuthModalOpen}
        defaultTab="signup"
      />
    </>
  );
}
