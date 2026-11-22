'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useBookingStore } from '@/stores/bookingStore';
import { ArrowRight, UserPlus } from 'lucide-react';

export default function SignUpPage() {
  const router = useRouter();
  const { setProfile } = useBookingStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setProfile({
      name: name.trim(),
      email: email.trim().toLowerCase(),
    });

    router.push('/my-booking');
  };

  return (
    <div className="w-[90%] max-w-md mx-auto py-16 md:py-24">
      <div className="border-2 border-[#18274b] bg-[#faf2db] p-8 shadow-[8px_8px_0px_#18274b]">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#47516a] mb-2">
          <UserPlus className="w-4 h-4 text-[#203a78]" />
          <span>New Demo Profile</span>
        </div>
        <h1 className="font-['Anton',sans-serif] text-4xl text-[#18274b] tracking-wide mb-2">
          SIGN UP.
        </h1>
        <p className="text-xs text-[#47516a] mb-6 leading-relaxed">
          Create a local demo profile to auto-fill driver details during booking.
        </p>

        <form onSubmit={handleSignUp} className="flex flex-col gap-4">
          <div>
            <label htmlFor="name" className="block text-xs uppercase font-bold text-[#47516a] mb-1.5">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Maya Chen"
              className="w-full bg-[#faf2db] border border-[#18274b] p-3 text-sm font-bold text-[#18274b] rounded-none focus:outline-none focus:ring-2 focus:ring-[#203a78]"
            />
          </div>

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
              placeholder="maya@example.com"
              className="w-full bg-[#faf2db] border border-[#18274b] p-3 text-sm font-bold text-[#18274b] rounded-none focus:outline-none focus:ring-2 focus:ring-[#203a78]"
            />
          </div>

          <button
            type="submit"
            className="btn-tactile-yellow py-3.5 px-6 mt-2 text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Create demo profile</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </form>

        <div className="mt-8 pt-4 border-t border-[#a9aa9c]/60 text-xs text-center text-[#47516a]">
          <span>Already have a profile? </span>
          <Link href="/sign-in" className="font-bold text-[#203a78] hover:bg-[#18274b]/10 px-2 py-1 transition-colors">
            Sign in here →
          </Link>
        </div>
      </div>
    </div>
  );
}
