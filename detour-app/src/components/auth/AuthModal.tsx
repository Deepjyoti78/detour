'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import * as Dialog from '@radix-ui/react-dialog';
import { useBookingStore } from '@/stores/bookingStore';
import { ArrowRight, Eye, EyeOff, X } from 'lucide-react';

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
  const { setProfile } = useBookingStore();

  const handleSubmit = (e: React.FormEvent) => {
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

  const handleSocialAuth = (provider: string) => {
    setProfile({
      name: `${provider} Driver`,
      email: `${provider.toLowerCase()}.driver@example.com`,
    });
    onOpenChange(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        {/* Backdrop: Pure deep black blur (no blue tint) */}
        <Dialog.Overlay className="fixed inset-0 bg-black/80 z-50 animate-fade-in backdrop-blur-md" />

        {/* Modal Window: Clean border and deep shadow with no blue corner blocks */}
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[94%] sm:w-[92%] max-w-4xl max-h-[92vh] overflow-y-auto bg-[#faf2db] border-2 border-[#18274b] shadow-2xl shadow-black/80 focus:outline-none">
          {/* Close Button X (Top right) */}
          <Dialog.Close asChild>
            <button
              type="button"
              className="absolute top-3.5 right-3.5 z-30 p-1.5 border border-[#18274b] bg-[#faf2db] hover:bg-[#fce466] text-[#18274b] cursor-pointer transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </Dialog.Close>

          <div className="grid grid-cols-1 md:grid-cols-2 md:min-h-[520px]">
            {/* Left Column: Form Section */}
            <div className="p-5 sm:p-8 flex flex-col justify-between">
              <div>
                {/* Tabs: Sign up / Sign in - Full Button Highlight (No underline) */}
                <div className="flex items-center gap-2 border-b border-[#a9aa9c]/50 pb-3">
                  <button
                    type="button"
                    onClick={() => setTab('signup')}
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
                    onClick={() => setTab('signin')}
                    className={`px-4 py-1.5 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer border border-[#18274b] ${
                      tab === 'signin'
                        ? 'bg-[#fce466] text-[#18274b] shadow-[2px_2px_0px_#18274b]'
                        : 'bg-[#faf2db] text-[#47516a] hover:bg-[#18274b]/10'
                    }`}
                  >
                    Sign in
                  </button>
                </div>

                {/* Heading */}
                <Dialog.Title className="font-['Anton',sans-serif] text-4xl sm:text-5xl text-[#18274b] tracking-tight mt-6 mb-2">
                  {tab === 'signup' ? 'CREATE AN ACCOUNT.' : 'WELCOME BACK.'}
                </Dialog.Title>

                <Dialog.Description className="text-xs sm:text-sm text-[#47516a] mb-6 leading-relaxed">
                  Save a name and email for your demo rentals on this device.
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

                  {/* Primary Submit Button in Signal Yellow */}
                  <button
                    type="submit"
                    className="btn-tactile-yellow py-3.5 px-5 mt-2 text-sm font-bold flex items-center justify-between group cursor-pointer normal-case"
                  >
                    <span>{tab === 'signup' ? 'Create account' : 'Sign in'}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </form>

                {/* Or continue with divider */}
                <div className="relative flex items-center justify-center my-4">
                  <div className="border-t border-[#a9aa9c]/60 w-full" />
                  <span className="bg-[#faf2db] px-3 text-[11px] text-[#47516a] font-bold uppercase tracking-wider whitespace-nowrap">
                    or continue with
                  </span>
                  <div className="border-t border-[#a9aa9c]/60 w-full" />
                </div>

                {/* Social Login Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => handleSocialAuth('GitHub')}
                    className="border border-[#18274b] bg-[#faf2db] p-2.5 text-xs font-bold flex items-center justify-center gap-2 hover:bg-[#fce466] transition-colors cursor-pointer text-[#18274b]"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    <span>GitHub</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSocialAuth('Google')}
                    className="border border-[#18274b] bg-[#faf2db] p-2.5 text-xs font-bold flex items-center justify-center gap-2 hover:bg-[#fce466] transition-colors cursor-pointer text-[#18274b]"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
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
                    <span>Google</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Landscape Visual Showcase (Image 3 match) */}
            <div className="hidden md:flex flex-col border-l-2 border-[#18274b] bg-[#203a78]">
              {/* Landscape photo */}
              <div className="relative flex-1 min-h-[360px] overflow-hidden">
                <Image
                  src="/assets/gorge-landscape.jpg"
                  alt="Columbia River Gorge scenic landscape view"
                  fill
                  className="object-cover"
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
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
