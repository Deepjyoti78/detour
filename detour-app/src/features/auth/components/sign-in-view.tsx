import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { SignIn as ClerkSignInForm } from '@clerk/nextjs';
import { Metadata } from 'next';
import Link from 'next/link';
import { InteractiveGridPattern } from './interactive-grid';
import { DetourLogoMark } from '@/components/org-switcher';
import { Icons } from '@/components/icons';

export const metadata: Metadata = {
  title: 'Authentication | Detour Car Rental',
  description: 'Sign in to the Detour Car Rental Fleet & Operations Command Portal.'
};

export default function SignInViewPage() {
  return (
    <div className='relative flex min-h-screen flex-col items-center justify-center overflow-hidden md:grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
      <Link
        href='/dashboard/overview'
        className={cn(
          buttonVariants({ variant: 'default' }),
          'absolute top-4 right-4 z-50 shadow-md font-semibold text-xs md:text-sm'
        )}
      >
        <Icons.car className='mr-1.5 size-4' /> Enter Demo Dashboard →
      </Link>
      <div className='relative hidden h-full flex-col p-10 lg:flex dark:border-r'>
        <div className='absolute inset-0 bg-sidebar' />
        <div className='text-sidebar-foreground relative z-20 flex items-center text-xl font-bold tracking-tight'>
          <div className='bg-primary text-primary-foreground p-1.5 rounded-lg mr-2.5'>
            <DetourLogoMark className='size-5' />
          </div>
          DETOUR
        </div>
        <InteractiveGridPattern
          className={cn(
            'mask-[radial-gradient(400px_circle_at_center,white,transparent)]',
            'inset-x-0 inset-y-[0%] h-full skew-y-12'
          )}
        />
        <div className='text-sidebar-foreground relative z-20 mt-auto'>
          <blockquote className='space-y-3 bg-card/60 p-5 rounded-xl border border-border/60 backdrop-blur-sm'>
            <p className='text-base font-medium italic leading-relaxed text-foreground'>
              &ldquo;Detour turns a car rental into an unforgettable road trip. From our vintage roadsters
              cruising the Pacific Coast to rugged 4x4s across mountain passes, every drive is an experience.&rdquo;
            </p>
            <footer className='text-muted-foreground text-xs font-semibold'>
              Detour Car Rental • Fleet Operations & Scenic Drives
            </footer>
          </blockquote>
        </div>
      </div>
      <div className='flex h-full items-center justify-center p-4 lg:p-8'>
        <div className='flex w-full max-w-md flex-col items-center justify-center space-y-6'>
          <div className='flex flex-col space-y-2 text-center lg:hidden'>
            <div className='flex items-center justify-center gap-2 font-bold text-xl'>
              <div className='bg-primary text-primary-foreground p-1 rounded-md'>
                <DetourLogoMark className='size-5' />
              </div>
              DETOUR
            </div>
            <p className='text-xs text-muted-foreground'>
              Fleet Management & Operations Portal
            </p>
          </div>
          <ClerkSignInForm
            appearance={{
              elements: {
                footer: 'hidden',
                footerAction: 'hidden',
                badge: 'hidden',
                developmentModeBadge: 'hidden'
              }
            }}
          />
          <div className='pt-2 text-center'>
            <Link
              href='/dashboard/overview'
              className='text-xs text-primary underline underline-offset-4 hover:text-primary/80 font-medium'
            >
              Skip sign-in & explore Detour Demo Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
