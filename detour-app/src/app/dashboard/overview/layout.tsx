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

// Mini Equalizer Sparkline matching Halden KPI cards
function MiniBlockSparkline({
  heights,
  activeColor = 'bg-emerald-500'
}: {
  heights: number[];
  activeColor?: string;
}) {
  return (
    <div className='flex items-end gap-[2px] h-7 px-1.5 py-1 rounded-md bg-muted/40 border border-border/40'>
      {heights.map((h, colIdx) => (
        <div key={colIdx} className='w-1.5 flex flex-col justify-end gap-[1.5px] h-full'>
          {Array.from({ length: 4 }).map((_, cellIdx) => {
            // 4 cells high: cell 0 is top, cell 3 is bottom
            const isFilled = 3 - cellIdx < h;
            return (
              <div
                key={cellIdx}
                className={cn(
                  'h-1 w-full rounded-[1px] transition-colors',
                  isFilled ? activeColor : 'bg-muted/60 dark:bg-muted/40'
                )}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

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

        {/* Primary KPI Stats Cards with Mini Block Sparklines (Halden Style) */}
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
          {/* Card 1: Fleet Utilization */}
          <Card className='@container/card border border-border/70 bg-gradient-to-b from-card to-card/60 shadow-xs'>
            <CardHeader className='pb-2'>
              <CardDescription className='flex items-center justify-between text-xs text-muted-foreground font-medium'>
                <span>Fleet Utilization Rate</span>
                <Icons.gauge className='size-4 text-muted-foreground/70' />
              </CardDescription>
              <div className='flex items-baseline justify-between mt-1'>
                <CardTitle className='text-3xl font-bold tabular-nums text-foreground tracking-tight'>
                  88.4%
                </CardTitle>
                <MiniBlockSparkline heights={[2, 3, 3, 4, 4]} activeColor='bg-emerald-500' />
              </div>
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
              <div className='flex items-baseline justify-between mt-1'>
                <CardTitle className='text-3xl font-bold tabular-nums text-foreground tracking-tight'>
                  $148,920
                </CardTitle>
                <MiniBlockSparkline heights={[2, 2, 3, 3, 4]} activeColor='bg-amber-500' />
              </div>
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
              <div className='flex items-baseline justify-between mt-1'>
                <CardTitle className='text-2xl lg:text-3xl font-bold tabular-nums text-foreground tracking-tight whitespace-nowrap'>
                  36 Trips
                </CardTitle>
                <MiniBlockSparkline heights={[3, 3, 4, 3, 4]} activeColor='bg-blue-500' />
              </div>
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
              <div className='flex items-baseline justify-between mt-1'>
                <CardTitle className='text-3xl font-bold tabular-nums text-foreground tracking-tight'>
                  98.2%
                </CardTitle>
                <MiniBlockSparkline heights={[4, 4, 4, 3, 4]} activeColor='bg-emerald-500' />
              </div>
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

        {/* Fleet Dispatch Queue Strip matching Halden decision queue in image 1 & 2 */}
        <div className='p-3.5 rounded-lg border border-border/70 bg-card shadow-xs transition-colors'>
          <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2'>
            <div className='flex items-center gap-2'>
              <span className='size-2 rounded-full bg-emerald-500 animate-pulse' />
              <span className='text-sm font-semibold text-foreground tracking-tight'>
                Fleet Dispatch Queue
              </span>
              <span className='font-mono text-xs text-muted-foreground'>
                48 vehicles · 42 on road · 6 in depot
              </span>
            </div>
            <Link
              href='/dashboard/bookings'
              className={cn(
                buttonVariants({ variant: 'outline', size: 'sm' }),
                'h-7 text-xs border-border/60 hover:bg-muted font-medium'
              )}
            >
              Start Dispatch Review
            </Link>
          </div>

          {/* Continuous Row of Discrete Square Blocks */}
          <div className='flex items-center gap-[3px] py-1.5 overflow-x-auto no-scrollbar'>
            {/* 4 urgent return checks pending (coral red) */}
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={`urgent-${i}`}
                className='h-3 flex-1 min-w-[8px] max-w-[15px] rounded-[2px] bg-rose-500 hover:bg-rose-400 transition-colors shadow-xs cursor-pointer'
                title='Return Check Pending (Overdue)'
              />
            ))}
            {/* 8 due within 3h / departing soon (amber) */}
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={`warn-${i}`}
                className='h-3 flex-1 min-w-[8px] max-w-[15px] rounded-[2px] bg-amber-500 hover:bg-amber-400 transition-colors shadow-xs cursor-pointer'
                title='Due within 3h (Departure Prep)'
              />
            ))}
            {/* 30 active on-track on road (emerald) */}
            {Array.from({ length: 30 }).map((_, i) => (
              <div
                key={`track-${i}`}
                className='h-3 flex-1 min-w-[8px] max-w-[15px] rounded-[2px] bg-emerald-500/90 dark:bg-emerald-400 hover:bg-emerald-300 transition-colors shadow-xs cursor-pointer'
                title='On Road (Active Telemetry)'
              />
            ))}
            {/* 6 ready in depot (zinc/muted) */}
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={`depot-${i}`}
                className='h-3 flex-1 min-w-[8px] max-w-[15px] rounded-[2px] bg-zinc-400/80 dark:bg-zinc-700/80 hover:bg-zinc-400 transition-colors border border-border/40 cursor-pointer'
                title='Standby in Depot'
              />
            ))}
          </div>

          {/* Legend Strip matching image 1 & 2 */}
          <div className='flex flex-wrap items-center gap-4 text-xs pt-1 text-muted-foreground'>
            <span className='flex items-center gap-1.5'>
              <span className='size-2.5 rounded-[2px] bg-rose-500' />
              <strong className='font-mono font-semibold text-foreground'>4</strong> return checks pending
            </span>
            <span className='flex items-center gap-1.5'>
              <span className='size-2.5 rounded-[2px] bg-amber-500' />
              <strong className='font-mono font-semibold text-foreground'>8</strong> departing within 3h
            </span>
            <span className='flex items-center gap-1.5'>
              <span className='size-2.5 rounded-[2px] bg-emerald-500' />
              <strong className='font-mono font-semibold text-foreground'>30</strong> on track on road
            </span>
            <span className='flex items-center gap-1.5'>
              <span className='size-2.5 rounded-[2px] bg-zinc-400 dark:bg-zinc-700' />
              <strong className='font-mono font-semibold text-foreground'>6</strong> standby in depot
            </span>
          </div>
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
