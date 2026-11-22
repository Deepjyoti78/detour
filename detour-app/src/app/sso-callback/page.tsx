'use client';

import { HandleSSOCallback } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function SSOCallbackPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#faf2db] flex flex-col items-center justify-center p-6 text-[#18274b]">
      <div className="border-2 border-[#18274b] bg-[#faf2db] p-8 shadow-[6px_6px_0px_#18274b] max-w-sm w-full text-center">
        <h2 className="font-['Anton',sans-serif] text-2xl tracking-wide mb-3">
          VERIFYING GOOGLE ACCOUNT...
        </h2>
        <p className="text-xs text-[#47516a] mb-6">
          Completing sign-in for Detour.
        </p>
        <HandleSSOCallback
          navigateToApp={({ decorateUrl }) => {
            const url = decorateUrl('/');
            if (url.startsWith('http')) {
              window.location.href = url;
            } else {
              router.push(url);
            }
          }}
          navigateToSignIn={() => router.push('/')}
          navigateToSignUp={() => router.push('/')}
        />
      </div>
    </div>
  );
}
