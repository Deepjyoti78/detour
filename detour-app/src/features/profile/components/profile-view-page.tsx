'use client';

import PageContainer from '@/components/layout/page-container';
import { UserProfile, useUser } from '@clerk/nextjs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from '@/components/icons';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { sanitizeOperatorName, sanitizeOperatorEmail } from '@/components/user-avatar-profile';

export default function ProfileViewPage() {
  const { user, isLoaded } = useUser();

  const operatorName = sanitizeOperatorName(user?.fullName);
  const operatorEmail = sanitizeOperatorEmail(user?.emailAddresses?.[0]?.emailAddress);

  return (
    <PageContainer
      pageTitle='Operator Profile & Credentials'
      pageDescription='Manage personal credentials, security keys, regional hub assignments, and dispatch authorizations.'
    >
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-6 items-start w-full'>
        {/* Left Column: Account Card (Preserving the account card layout & background that user likes) */}
        <div className='lg:col-span-7 w-full'>
          {isLoaded && !user ? (
            /* Demo / Fallback Account Card if not signed in via Clerk */
            <Card className='border border-border/70 bg-card shadow-xs rounded-xl overflow-hidden'>
              <div className='grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border/60'>
                {/* Left tab sidebar */}
                <div className='p-6 bg-muted/20 space-y-4'>
                  <div>
                    <h2 className='text-xl font-bold tracking-tight text-foreground'>Account</h2>
                    <p className='text-xs text-muted-foreground'>Manage your account info.</p>
                  </div>
                  <div className='space-y-1 pt-2'>
                    <div className='flex items-center gap-2 px-3 py-2 rounded-lg bg-background text-foreground font-semibold text-xs border border-border/60 shadow-xs'>
                      <Icons.user className='size-3.5' />
                      <span>Profile</span>
                    </div>
                    <div className='flex items-center gap-2 px-3 py-2 rounded-lg text-muted-foreground font-medium text-xs hover:bg-muted/40 transition-colors'>
                      <Icons.lock className='size-3.5' />
                      <span>Security</span>
                    </div>
                  </div>
                </div>

                {/* Right profile details */}
                <div className='md:col-span-2 p-6 space-y-6'>
                  <h3 className='text-base font-bold text-foreground'>Profile details</h3>
                  
                  <div className='space-y-4 text-xs'>
                    <div className='flex items-center justify-between py-2 border-b border-border/40'>
                      <span className='text-muted-foreground font-medium'>Profile</span>
                      <div className='flex items-center gap-3'>
                        <div className='size-10 rounded-full bg-primary/10 border flex items-center justify-center font-bold text-xs text-primary'>
                          DO
                        </div>
                        <span className='font-semibold text-foreground'>{operatorName}</span>
                      </div>
                    </div>

                    <div className='flex items-center justify-between py-2 border-b border-border/40'>
                      <span className='text-muted-foreground font-medium'>Email addresses</span>
                      <span className='font-mono font-medium text-foreground'>{operatorEmail}</span>
                    </div>

                    <div className='flex items-center justify-between py-2'>
                      <span className='text-muted-foreground font-medium'>Connected accounts</span>
                      <span className='text-muted-foreground'>Detour Single Sign-On (Active)</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ) : (
            /* Live Clerk UserProfile Card with matching theme */
            <UserProfile
              appearance={{
                elements: {
                  rootBox: 'w-full shadow-xs',
                  cardBox: 'w-full shadow-xs border border-border/70 rounded-xl',
                  footer: 'hidden',
                  footerAction: 'hidden',
                  badge: 'hidden',
                  developmentModeBadge: 'hidden'
                }
              }}
            />
          )}
        </div>

        {/* Right Column: Detour Operator Dispatch Status & Hub Authorizations (Completely eliminates emptiness) */}
        <div className='lg:col-span-5 w-full flex flex-col gap-5'>
          {/* Dispatch Assignment & Credentials Card */}
          <Card className='border border-border/70 bg-card shadow-xs'>
            <CardHeader className='pb-3'>
              <div className='flex items-center justify-between'>
                <CardTitle className='text-base font-semibold flex items-center gap-2 text-foreground'>
                  <Icons.shieldCheck className='size-5 text-foreground' />
                  Detour Dispatch Authorization
                </CardTitle>
                <span className='inline-flex items-center gap-1.5 rounded-md bg-emerald-600 px-2.5 py-0.5 text-xs font-semibold text-white shadow-xs'>
                  <span className='size-1.5 rounded-full bg-white animate-pulse' />
                  On Duty
                </span>
              </div>
              <CardDescription className='text-xs text-muted-foreground'>
                Authorized regional operator identity and dispatch permissions
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-3 text-xs'>
              <div className='p-3 rounded-lg border border-border/60 bg-muted/20 space-y-2'>
                <div className='flex items-center justify-between'>
                  <span className='text-muted-foreground font-medium'>Operator Badge ID</span>
                  <span className='font-mono font-bold bg-muted px-2 py-0.5 rounded border border-border/60 text-foreground'>
                    #DTR-OPS-8841
                  </span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-muted-foreground font-medium'>Security Clearance</span>
                  <span className='font-semibold text-foreground'>Level 3 (Fleet Telemetry & Dispatch Override)</span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-muted-foreground font-medium'>Primary Depot Hub</span>
                  <span className='font-semibold text-foreground'>Mumbai Flagship Depot (Hub #1)</span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-muted-foreground font-medium'>Secondary Hub</span>
                  <span className='font-semibold text-foreground'>Goa Coastal Depot (Hub #4)</span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-muted-foreground font-medium'>Active Shift</span>
                  <span className='font-semibold text-foreground'>Scenic Morning Handovers (06:00 – 15:00 IST)</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Operator Performance & Handover Stats */}
          <Card className='border border-border/70 bg-card shadow-xs'>
            <CardHeader className='pb-3'>
              <CardTitle className='text-base font-semibold flex items-center gap-2 text-foreground'>
                <Icons.gauge className='size-5 text-foreground' />
                Dispatch Operations Track Record
              </CardTitle>
              <CardDescription className='text-xs text-muted-foreground'>
                Handover verification metrics and customer drive quality stats
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4 text-xs'>
              <div className='grid grid-cols-2 gap-3'>
                <div className='p-3 rounded-lg border border-border/50 bg-muted/20'>
                  <span className='text-muted-foreground font-medium block'>Vehicle Handovers</span>
                  <span className='text-2xl font-bold tabular-nums text-foreground mt-1 block'>142</span>
                  <span className='text-[10px] text-muted-foreground'>Total checkouts signed</span>
                </div>
                <div className='p-3 rounded-lg border border-border/50 bg-muted/20'>
                  <span className='text-muted-foreground font-medium block'>Supervised Trips</span>
                  <span className='text-2xl font-bold tabular-nums text-foreground mt-1 block'>36</span>
                  <span className='text-[10px] text-muted-foreground'>Currently on road</span>
                </div>
                <div className='p-3 rounded-lg border border-border/50 bg-muted/20'>
                  <span className='text-muted-foreground font-medium block'>Handover Pass Rate</span>
                  <span className='text-2xl font-bold tabular-nums text-foreground mt-1 block'>99.8%</span>
                  <span className='text-[10px] text-muted-foreground'>Zero checklist misses</span>
                </div>
                <div className='p-3 rounded-lg border border-border/50 bg-muted/20'>
                  <span className='text-muted-foreground font-medium block'>Telemetry Alerts</span>
                  <span className='text-2xl font-bold tabular-nums text-foreground mt-1 block'>0</span>
                  <span className='text-[10px] text-muted-foreground'>All systems green</span>
                </div>
              </div>

              {/* Monthly Goal Progress */}
              <div className='space-y-1.5 pt-1'>
                <div className='flex justify-between font-medium text-xs'>
                  <span className='text-muted-foreground'>Monthly Handover Quota</span>
                  <span className='font-bold tabular-nums text-foreground'>142 / 160 (88%)</span>
                </div>
                <div className='h-2 w-full rounded-full bg-muted overflow-hidden'>
                  <div className='h-full rounded-full bg-foreground transition-all' style={{ width: '88%' }} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Depot Links & Concierge Hotline */}
          <Card className='border border-border/70 bg-card shadow-xs'>
            <CardHeader className='pb-3'>
              <CardTitle className='text-base font-semibold flex items-center gap-2 text-foreground'>
                <Icons.phone className='size-5 text-foreground' />
                Concierge Hotline & Quick Access
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-3 text-xs'>
              <div className='p-2.5 rounded-lg border border-border/50 bg-muted/20 flex items-center justify-between'>
                <div className='space-y-0.5'>
                  <span className='font-medium text-foreground block'>24/7 Roadside Telematics Line</span>
                  <span className='text-muted-foreground font-mono text-[11px]'>+91 98200 48821</span>
                </div>
                <span className='inline-flex items-center rounded-md bg-emerald-600 px-2 py-0.5 text-[10px] font-semibold text-white'>
                  Active
                </span>
              </div>

              <div className='grid grid-cols-2 gap-2 pt-1'>
                <Link
                  href='/dashboard/locations'
                  className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'text-xs w-full justify-start')}
                >
                  <Icons.depot className='size-3.5 mr-1.5' />
                  Depots (7)
                </Link>
                <Link
                  href='/dashboard/bookings'
                  className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'text-xs w-full justify-start')}
                >
                  <Icons.calendarCheck className='size-3.5 mr-1.5' />
                  Reservations
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}
