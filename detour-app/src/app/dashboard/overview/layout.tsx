import PageContainer from '@/components/layout/page-container';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardFooter
} from '@/components/ui/card';
import { Icons } from '@/components/icons';
import React from 'react';
import Link from 'next/link';

export default function OverViewLayout({
  sales,
  pie_stats,
  bar_stats,
  area_stats
}: {
  sales: React.ReactNode;
  pie_stats: React.ReactNode;
  bar_stats: React.ReactNode;
  area_stats: React.ReactNode;
}) {
  return (
    <PageContainer>
      <div className='flex flex-1 flex-col gap-5'>
        {/* Header with Title and Operations Controls */}
        <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/60 pb-4'>
          <div>
            <div className='flex items-center gap-2.5'>
              <div className='bg-muted text-foreground p-2 rounded-lg border border-border/60'>
                <Icons.car className='size-5' />
              </div>
              <div>
                <h1 className='text-2xl font-bold tracking-tight text-foreground'>Detour Fleet Command</h1>
                <p className='text-xs text-muted-foreground'>
                  Live Operations, Fleet Telemetry & Rental Reservations across 7 Regional Hubs
                </p>
              </div>
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <Link
              href='/dashboard/locations'
              className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'border-border/60 text-xs')}
            >
              <Icons.mapPin className='size-3.5 mr-1.5' />
              Depots (7)
            </Link>
            <Link
              href='/dashboard/routes'
              className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'border-border/60 text-xs')}
            >
              <Icons.route className='size-3.5 mr-1.5' />
              Scenic Routes
            </Link>
            <Link
              href='/dashboard/bookings'
              className={cn(buttonVariants({ size: 'sm' }), 'bg-foreground text-background hover:bg-foreground/90 text-xs font-semibold')}
            >
              <Icons.calendarCheck className='size-3.5 mr-1.5' />
              New Reservation
            </Link>
          </div>
        </div>

        {/* Live Depot Utilization Ticker - Clean Monochrome */}
        <div className='flex items-center gap-2 overflow-x-auto py-1 text-xs text-muted-foreground no-scrollbar'>
          <span className='font-semibold text-foreground shrink-0 flex items-center gap-1.5'>
            <span className='size-2 rounded-full bg-emerald-500' />
            Live Depots:
          </span>
          <span className='bg-muted/40 border border-border/40 px-2 py-1 rounded-md shrink-0 text-foreground'>
            Mumbai: <strong className='font-mono'>10/12 Active (83%)</strong>
          </span>
          <span className='bg-muted/40 border border-border/40 px-2 py-1 rounded-md shrink-0 text-foreground'>
            Delhi NCR: <strong className='font-mono'>9/10 Active (90%)</strong>
          </span>
          <span className='bg-muted/40 border border-border/40 px-2 py-1 rounded-md shrink-0 text-foreground'>
            Bengaluru: <strong className='font-mono'>7/8 Active (88%)</strong>
          </span>
          <span className='inline-flex items-center gap-1 bg-emerald-600 text-white font-semibold px-2 py-1 rounded-md shrink-0 text-[11px] shadow-xs'>
            Goa: 8/8 (100% Sold Out)
          </span>
          <span className='bg-muted/40 border border-border/40 px-2 py-1 rounded-md shrink-0 text-foreground'>
            Jaipur: <strong className='font-mono'>5/6 Active (83%)</strong>
          </span>
          <span className='bg-muted/40 border border-border/40 px-2 py-1 rounded-md shrink-0 text-foreground'>
            Portland: <strong className='font-mono'>7/8 Active (88%)</strong>
          </span>
        </div>

        {/* Primary KPI Stats Cards - Sleek Monochrome with Solid Contrast Badges */}
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
          {/* Card 1: Fleet Utilization */}
          <Card className='@container/card border border-border/70 bg-gradient-to-b from-card to-card/60 shadow-xs'>
            <CardHeader className='pb-2'>
              <CardDescription className='flex items-center justify-between text-xs text-muted-foreground font-medium'>
                <span>Fleet Utilization Rate</span>
                <Icons.gauge className='size-4 text-muted-foreground/70' />
              </CardDescription>
              <CardTitle className='text-3xl font-bold tabular-nums text-foreground tracking-tight'>
                88.4%
              </CardTitle>
              <CardAction>
                <span className='inline-flex items-center gap-1 rounded-md bg-emerald-600 px-2 py-0.5 text-xs font-semibold text-white shadow-xs'>
                  <Icons.trendingUp className='size-3 text-white' />
                  +6.2%
                </span>
              </CardAction>
            </CardHeader>
            <CardFooter className='flex-col items-start gap-1 text-xs pt-1'>
              <div className='flex gap-1.5 font-medium text-foreground'>
                <span>42 of 48 Vehicles on Road</span>
              </div>
              <div className='text-muted-foreground'>Peak scenic weekend demand active</div>
            </CardFooter>
          </Card>

          {/* Card 2: Rental Revenue */}
          <Card className='@container/card border border-border/70 bg-gradient-to-b from-card to-card/60 shadow-xs'>
            <CardHeader className='pb-2'>
              <CardDescription className='flex items-center justify-between text-xs text-muted-foreground font-medium'>
                <span>Monthly Rental Revenue</span>
                <Icons.receipt className='size-4 text-muted-foreground/70' />
              </CardDescription>
              <CardTitle className='text-3xl font-bold tabular-nums text-foreground tracking-tight'>
                $148,920
              </CardTitle>
              <CardAction>
                <span className='inline-flex items-center gap-1 rounded-md bg-emerald-600 px-2 py-0.5 text-xs font-semibold text-white shadow-xs'>
                  <Icons.trendingUp className='size-3 text-white' />
                  +18.4% YoY
                </span>
              </CardAction>
            </CardHeader>
            <CardFooter className='flex-col items-start gap-1 text-xs pt-1'>
              <div className='flex gap-1.5 font-medium text-foreground'>
                <span>Avg. Trip: $385 / 3.4 days</span>
              </div>
              <div className='text-muted-foreground'>Includes 12.5% depot service fee</div>
            </CardFooter>
          </Card>

          {/* Card 3: Active Trips */}
          <Card className='@container/card border border-border/70 bg-gradient-to-b from-card to-card/60 shadow-xs'>
            <CardHeader className='pb-2'>
              <CardDescription className='flex items-center justify-between text-xs text-muted-foreground font-medium'>
                <span>Active Trips on Road</span>
                <Icons.steeringWheel className='size-4 text-muted-foreground/70' />
              </CardDescription>
              <CardTitle className='text-2xl lg:text-3xl font-bold tabular-nums text-foreground tracking-tight whitespace-nowrap'>
                36 Trips
              </CardTitle>
              <CardAction>
                <span className='inline-flex items-center rounded-md bg-blue-600 px-2 py-0.5 text-xs font-semibold text-white shadow-xs'>
                  8 Returns Today
                </span>
              </CardAction>
            </CardHeader>
            <CardFooter className='flex-col items-start gap-1 text-xs pt-1'>
              <div className='flex gap-1.5 font-medium text-foreground'>
                <span>14 Scenic Drive packages</span>
              </div>
              <div className='text-muted-foreground'>Zero telemetry incidents reported</div>
            </CardFooter>
          </Card>

          {/* Card 4: Fleet Readiness */}
          <Card className='@container/card border border-border/70 bg-gradient-to-b from-card to-card/60 shadow-xs'>
            <CardHeader className='pb-2'>
              <CardDescription className='flex items-center justify-between text-xs text-muted-foreground font-medium'>
                <span>Fleet Readiness & Health</span>
                <Icons.shieldCheck className='size-4 text-muted-foreground/70' />
              </CardDescription>
              <CardTitle className='text-3xl font-bold tabular-nums text-foreground tracking-tight'>
                98.2%
              </CardTitle>
              <CardAction>
                <span className='inline-flex items-center rounded-md bg-amber-600 px-2 py-0.5 text-xs font-semibold text-white shadow-xs'>
                  2 In Service
                </span>
              </CardAction>
            </CardHeader>
            <CardFooter className='flex-col items-start gap-1 text-xs pt-1'>
              <div className='flex gap-1.5 font-medium text-foreground'>
                <span>All Pre-drive Safety Checks Valid</span>
              </div>
              <div className='text-muted-foreground'>Scheduled oil & tire maintenance</div>
            </CardFooter>
          </Card>
        </div>

        {/* Visual Analytics Grid */}
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7'>
          <div className='col-span-4'>{area_stats}</div>
          <div className='col-span-4 md:col-span-3'>{sales}</div>
          <div className='col-span-4'>{bar_stats}</div>
          <div className='col-span-4 min-h-0 md:col-span-3'>{pie_stats}</div>
        </div>
      </div>
    </PageContainer>
  );
}
