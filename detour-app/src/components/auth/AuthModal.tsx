'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import * as Dialog from '@radix-ui/react-dialog';
import { useBookingStore } from '@/stores/bookingStore';
import { ArrowRight, Eye, EyeOff, X } from 'lucide-react';
import { useSignIn, useSignUp } from '@clerk/nextjs';
import { motion, AnimatePresence } from 'motion/react';

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultTab?: 'signup' | 'signin';
}

export default function AuthModal({
  open,
  onOpenChange,
  defaultTab = 'signup',
}: AuthModalProps) {
  const [tab, setTab] = useState<'signup' | 'signin'>(defaultTab);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const { setProfile } = useBookingStore();

  const { signIn } = useSignIn();
  const { signUp } = useSignUp();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    const chosenName = tab === 'signup' && name.trim() ? name.trim() : email.split('@')[0];
    const formattedName = chosenName.charAt(0).toUpperCase() + chosenName.slice(1);

    setProfile({
      name: formattedName,
      email: email.trim().toLowerCase(),
    });

    onOpenChange(false);
  };

  const handleGoogleAuth = async () => {
    setAuthError(null);
    setGoogleLoading(true);
    try {
      if (tab === 'signup' && signUp?.sso) {
        const { error } = await signUp.sso({
          strategy: 'oauth_google',
          redirectCallbackUrl: '/sso-callback',
          redirectUrl: '/',
        });
        if (error) {
          throw new Error(error.message || 'Google authentication error');
        }
      } else if (signIn?.sso) {
        const { error } = await signIn.sso({
          strategy: 'oauth_google',
          redirectCallbackUrl: '/sso-callback',
          redirectUrl: '/',
        });
        if (error) {
          throw new Error(error.message || 'Google authentication error');
        }
      }
    } catch (err: any) {
      console.error('Google OAuth error:', err);
      // Fallback: try signIn if available
      try {
        if (signIn?.sso) {
          await signIn.sso({
            strategy: 'oauth_google',
            redirectCallbackUrl: '/sso-callback',
            redirectUrl: '/',
          });
          return;
        }
      } catch (e: any) {
        setAuthError(e?.message || 'Google sign-in could not be initiated.');
      }
      setAuthError(err?.message || 'Google sign-in could not be initiated.');
      setGoogleLoading(false);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            {/* Backdrop: Smooth fade-in deep black blur */}
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="fixed inset-0 bg-black/80 z-50 backdrop-blur-md"
              />
            </Dialog.Overlay>

            {/* Modal Window: Smooth tactile spring/scale entrance with sharp retro shadow */}
            <Dialog.Content asChild>
              <motion.div
                initial={{ opacity: 0, scale: 0.93, y: 22 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 16 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[94%] sm:w-[92%] max-w-4xl max-h-[92vh] overflow-y-auto bg-[#faf2db] border-2 border-[#18274b] shadow-[10px_10px_0px_#18274b] focus:outline-none"
              >
                {/* Close Button X (Top right) */}
                <Dialog.Close asChild>
                  <button
                    type="button"
                    className="absolute top-3.5 right-3.5 z-30 p-1.5 border border-[#18274b] bg-[#faf2db] hover:bg-[#fce466] text-[#18274b] cursor-pointer transition-colors shadow-[2px_2px_0px_#18274b] active:translate-x-0.5 active:translate-y-0.5"
                    aria-label="Close dialog"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </Dialog.Close>

                <div className="grid grid-cols-1 md:grid-cols-2 md:min-h-[520px]">
                  {/* Left Column: Form Section */}
                  <div className="p-5 sm:p-8 flex flex-col justify-between">
                    <div>
                      {/* Tabs: Sign up / Sign in */}
                      <div className="flex items-center gap-2 border-b border-[#a9aa9c]/50 pb-3">
                        <button
                          type="button"
                          onClick={() => {
                            setTab('signup');
                            setAuthError(null);
                          }}
                          className={`px-4 py-1.5 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer border border-[#18274b] ${
                            tab === 'signup'
                              ? 'bg-[#fce466] text-[#18274b] shadow-[2px_2px_0px_#18274b]'
                              : 'bg-[#faf2db] text-[#47516a] hover:bg-[#18274b]/10'
                          }`}
                        >
                          Sign up
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setTab('signin');
                            setAuthError(null);
                          }}
                          className={`px-4 py-1.5 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer border border-[#18274b] ${
                            tab === 'signin'
                              ? 'bg-[#fce466] text-[#18274b] shadow-[2px_2px_0px_#18274b]'
                              : 'bg-[#faf2db] text-[#47516a] hover:bg-[#18274b]/10'
                          }`}
                        >
                          Sign in
                        </button>
                      </div>

                      {/* Animated Tab Content Transition */}
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={tab}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.2, ease: 'easeOut' }}
                        >
                          {/* Heading */}
                          <Dialog.Title className="font-['Anton',sans-serif] text-4xl sm:text-5xl text-[#18274b] tracking-tight mt-6 mb-2">
                            {tab === 'signup' ? 'CREATE AN ACCOUNT.' : 'WELCOME BACK.'}
                          </Dialog.Title>

                          <Dialog.Description className="text-xs sm:text-sm text-[#47516a] mb-6 leading-relaxed">
                            Sign in or create an account to manage bookings and rentals on this device.
                          </Dialog.Description>

                          {/* Form Inputs */}
                          <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
                            {tab === 'signup' && (
                              <div>
                                <label
                                  htmlFor="auth-name"
                                  className="block text-xs font-bold text-[#18274b] mb-1"
                                >
                                  Full name
                                </label>
                                <input
                                  id="auth-name"
                                  type="text"
                                  required
                                  value={name}
                                  onChange={(e) => setName(e.target.value)}
                                  placeholder="Maya Chen"
                                  className="w-full bg-[#faf2db] border border-[#18274b] p-2.5 text-xs sm:text-sm font-bold text-[#18274b] rounded-none focus:outline-none focus:ring-2 focus:ring-[#203a78]"
                                />
                              </div>
                            )}

                            <div>
                              <label
                                htmlFor="auth-email"
                                className="block text-xs font-bold text-[#18274b] mb-1"
                              >
                                Email address
                              </label>
                              <input
                                id="auth-email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="maya@example.com"
                                className="w-full bg-[#faf2db] border border-[#18274b] p-2.5 text-xs sm:text-sm font-bold text-[#18274b] rounded-none focus:outline-none focus:ring-2 focus:ring-[#203a78]"
                              />
                            </div>

                            <div>
                              <label
                                htmlFor="auth-password"
                                className="block text-xs font-bold text-[#18274b] mb-1"
                              >
                                Password
                              </label>
                              <div className="relative">
                                <input
                                  id="auth-password"
                                  type={showPassword ? 'text' : 'password'}
                                  required
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)}
                                  placeholder="Create a password"
                                  className="w-full bg-[#faf2db] border border-[#18274b] p-2.5 pr-10 text-xs sm:text-sm font-bold text-[#18274b] rounded-none focus:outline-none focus:ring-2 focus:ring-[#203a78]"
                                />
                                <button
                                  type="button"
                                  onClick={() => setShowPassword(!showPassword)}
                                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#47516a] hover:text-[#18274b] cursor-pointer"
                                  aria-label="Toggle password visibility"
                                >
                                  {showPassword ? (
                                    <EyeOff className="w-4 h-4" />
                                  ) : (
                                    <Eye className="w-4 h-4" />
                                  )}
                                </button>
                              </div>
                            </div>

                            {/* Primary Submit Button */}
                            <button
                              type="submit"
                              className="btn-tactile-yellow py-3.5 px-5 mt-2 text-sm font-bold flex items-center justify-between group cursor-pointer normal-case text-[#18274b]"
                            >
                              <span>{tab === 'signup' ? 'Create account' : 'Sign in'}</span>
                              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </button>
                          </form>
                        </motion.div>
                      </AnimatePresence>

                      {/* Or continue with divider */}
                      <div className="relative flex items-center justify-center my-4">
                        <div className="border-t border-[#a9aa9c]/60 w-full" />
                        <span className="bg-[#faf2db] px-3 text-[11px] text-[#47516a] font-bold uppercase tracking-wider whitespace-nowrap">
                          or continue with
                        </span>
                        <div className="border-t border-[#a9aa9c]/60 w-full" />
                      </div>

                      {/* Social Login Button: Single Full-Width Google OAuth Button */}
                      <div className="w-full">
                        <button
                          type="button"
                          onClick={handleGoogleAuth}
                          disabled={googleLoading}
                          className="w-full border-2 border-[#18274b] bg-[#faf2db] py-3 px-4 text-xs sm:text-sm font-bold flex items-center justify-center gap-3 hover:bg-[#fce466] shadow-[2px_2px_0px_#18274b] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer text-[#18274b] disabled:opacity-60"
                        >
                          <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                            <path
                              fill="#4285F4"
                              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                            />
                            <path
                              fill="#34A853"
                              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.36 7.33 24 12 24z"
                            />
                            <path
                              fill="#FBBC05"
                              d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.16 0 9.98 0 12s.45 3.84 1.24 5.42l4.04-3.15z"
                            />
                            <path
                              fill="#EA4335"
                              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                            />
                          </svg>
                          <span>{googleLoading ? 'Connecting to Google...' : 'Continue with Google'}</span>
                        </button>
                        {authError && (
                          <p className="mt-2 text-xs text-red-600 font-bold text-center">
                            {authError}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Landscape Visual Showcase */}
                  <div className="hidden md:flex flex-col border-l-2 border-[#18274b] bg-[#203a78]">
                    {/* Landscape photo */}
                    <div className="relative flex-1 min-h-[360px] overflow-hidden">
                      <Image
                        src="/assets/gorge-landscape.jpg"
                        alt="Columbia River Gorge scenic landscape view"
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>

                    {/* Navy Caption Bar at bottom of image */}
                    <div className="p-5 bg-[#203a78] text-[#faf2db] border-t-2 border-[#18274b] flex items-end justify-between gap-4">
                      <div className="min-w-0">
                        <strong className="font-['Anton',sans-serif] text-2xl tracking-wide block text-[#faf2db] whitespace-nowrap">
                          Columbia River Gorge
                        </strong>
                        <span className="text-xs text-[#d8e3fb] block mt-0.5">Illustrative landscape</span>
                      </div>
                      <Link
                        href="/explore"
                        onClick={() => onOpenChange(false)}
                        className="text-xs font-bold text-[#fce466] hover:bg-[#fce466]/20 px-2.5 py-1 border border-transparent hover:border-[#fce466] transition-colors inline-flex items-center gap-1.5 shrink-0 whitespace-nowrap"
                      >
                        <span>Explore drives</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
