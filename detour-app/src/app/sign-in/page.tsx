'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useBookingStore } from '@/stores/bookingStore';
import { ArrowRight, Lock } from 'lucide-react';

function SignInContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextUrl = searchParams.get('next') || '/my-booking';
  const { profile, setProfile } = useBookingStore();

  const [email, setEmail] = useState(profile?.email || '');

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    const name = profile?.email === email.trim() ? profile.name : email.split('@')[0];
    setProfile({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      email: email.trim().toLowerCase(),
    });

    router.push(nextUrl);
  };

  return (
    <div className="w-[90%] max-w-md mx-auto py-16 md:py-24">
      <div className="border-2 border-[#18274b] bg-[#faf2db] p-8 shadow-[8px_8px_0px_#18274b]">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#47516a] mb-2">
          <Lock className="w-4 h-4 text-[#203a78]" />
          <span>Demo Account Access</span>
        </div>
        <h1 className="font-['Anton',sans-serif] text-4xl text-[#18274b] tracking-wide mb-2">
          SIGN IN.
        </h1>
        <p className="text-xs text-[#47516a] mb-6 leading-relaxed">
          Access your saved demo profile, active trips, and confirmed reservations.
        </p>

        <form onSubmit={handleSignIn} className="flex flex-col gap-4">
          <div>
            <label htmlFor="email" className="block text-xs uppercase font-bold text-[#47516a] mb-1.5">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="driver@example.com"
              className="w-full bg-[#faf2db] border border-[#18274b] p-3 text-sm font-bold text-[#18274b] rounded-none focus:outline-none focus:ring-2 focus:ring-[#203a78]"
            />
          </div>

          <button
            type="submit"
            className="btn-tactile-yellow py-3.5 px-6 mt-2 text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Sign in to demo</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </form>

        <div className="mt-8 pt-4 border-t border-[#a9aa9c]/60 text-xs text-center text-[#47516a]">
          <span>New to Detour? </span>
          <Link href="/sign-up" className="font-bold text-[#203a78] hover:bg-[#18274b]/10 px-2 py-1 transition-colors">
            Create a demo profile →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center font-bold">Loading...</div>}>
      <SignInContent />
    </Suspense>
  );
}
