'use client';

import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { DETOUR_BOOKINGS } from '@/constants/detour-data';
import Image from 'next/image';

export function RecentRentals() {
  const statusBadges: Record<string, { label: string; className: string }> = {
    on_road: {
      label: 'On Road',
      className: 'bg-emerald-600 text-white font-semibold shadow-xs'
    },
    pickup_today: {
      label: 'Pickup Today',
      className: 'bg-blue-600 text-white font-semibold shadow-xs'
    },
    return_pending: {
      label: 'Return Due',
      className: 'bg-amber-600 text-white font-semibold shadow-xs'
    },
    confirmed: {
      label: 'Confirmed',
      className: 'bg-zinc-700 dark:bg-zinc-600 text-white font-semibold shadow-xs'
    }
  };

  return (
    <Card className='h-full flex flex-col border border-border/70 bg-card shadow-xs'>
      <CardHeader className='pb-3'>
        <div className='flex items-center justify-between'>
          <CardTitle className='text-base font-semibold text-foreground'>Live Rental Dispatch</CardTitle>
          <span className='text-xs font-mono font-medium text-muted-foreground bg-muted/50 border border-border/50 px-2 py-0.5 rounded'>
            36 Active Trips
          </span>
        </div>
        <CardDescription className='text-xs text-muted-foreground'>
          Recent bookings and vehicles currently on the road
        </CardDescription>
      </CardHeader>
      <CardContent className='flex-1 overflow-y-auto pt-0'>
        <div className='space-y-3'>
          {DETOUR_BOOKINGS.slice(0, 5).map((booking) => {
            const badge = statusBadges[booking.status] || {
              label: booking.status,
              className: 'bg-zinc-700 text-white'
            };

            return (
              <div
                key={booking.id}
                className='flex items-center justify-between gap-3 p-2.5 rounded-lg border border-border/50 bg-muted/20 hover:bg-muted/40 transition-colors'
              >
                <div className='relative size-12 shrink-0 rounded-md overflow-hidden border border-border/60 bg-muted'>
                  <Image
                    src={booking.vehicleImage}
                    alt={booking.vehicleName}
                    fill
                    className='object-cover'
                    sizes='48px'
                  />
                </div>
                <div className='min-w-0 flex-1'>
                  <div className='flex items-center gap-2'>
                    <p className='text-sm font-semibold truncate text-foreground'>{booking.vehicleName}</p>
                    <span className='text-[10px] text-muted-foreground font-mono bg-muted/70 px-1.5 py-0.5 rounded border border-border/40'>
                      {booking.licensePlate}
                    </span>
                  </div>
                  <p className='text-xs text-muted-foreground truncate'>
                    {booking.customerName} • {booking.depotName.split(' ')[0]}
                  </p>
                  <div className='mt-1.5 flex items-center gap-2'>
                    <span className={`inline-flex items-center text-[10px] px-2 py-0.5 rounded leading-none ${badge.className}`}>
                      {badge.label}
                    </span>
                    <span className='text-[10px] text-muted-foreground'>
                      {booking.days} days ({booking.pickupDate.slice(5)})
                    </span>
                  </div>
                </div>
                <div className='text-right shrink-0'>
                  <p className='text-sm font-bold tabular-nums text-foreground'>${booking.totalAmount}</p>
                  <span className='text-[10px] text-muted-foreground'>Total Paid</span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

// Export RecentSales as an alias for parallel route compatibility
export const RecentSales = RecentRentals;
