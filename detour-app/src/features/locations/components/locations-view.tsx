'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { DETOUR_DEPOTS } from '@/constants/detour-data';

export function LocationsView() {
  return (
    <div className='flex flex-col gap-6'>
      {/* Header */}
      <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-4'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight text-foreground flex items-center gap-2'>
            <Icons.depot className='size-6 text-foreground' />
            Depot Hubs & Pickup Locations
          </h1>
          <p className='text-sm text-muted-foreground'>
            Regional collection depots, concierge contacts, fleet allocation, and branch capacities.
          </p>
        </div>
        <div className='flex items-center gap-2'>
          <Button variant='outline' size='sm' className='border-border/60'>
            <Icons.adjustments className='size-4 mr-1.5' />
            Sync Inventory
          </Button>
          <Button size='sm' className='bg-foreground text-background hover:bg-foreground/90 font-semibold'>
            <Icons.plus className='size-4 mr-1.5' />
            Add Depot
          </Button>
        </div>
      </div>

      {/* Overview Summary - Clean Monochrome */}
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
        <Card className='p-4 border border-border/70 bg-card'>
          <span className='text-xs text-muted-foreground font-medium'>Active Depots</span>
          <div className='text-2xl font-bold mt-1 text-foreground'>7 Hubs</div>
          <p className='text-[11px] text-muted-foreground mt-0.5'>India & US Pacific Northwest</p>
        </Card>
        <Card className='p-4 border border-border/70 bg-card'>
          <span className='text-xs text-muted-foreground font-medium'>Total Assigned Fleet</span>
          <div className='text-2xl font-bold mt-1 text-foreground'>48 Cars</div>
          <p className='text-[11px] text-muted-foreground mt-0.5'>Across all depot locations</p>
        </Card>
        <Card className='p-4 border border-border/70 bg-card'>
          <span className='text-xs text-muted-foreground font-medium'>Total Active Rentals</span>
          <div className='text-2xl font-bold mt-1 text-foreground'>42 Cars</div>
          <p className='text-[11px] text-muted-foreground mt-0.5'>88.4% Overall Utilization</p>
        </Card>
        <Card className='p-4 border border-border/70 bg-card'>
          <span className='text-xs text-muted-foreground font-medium'>Available in Depot</span>
          <div className='text-2xl font-bold mt-1 text-foreground'>6 Cars</div>
          <p className='text-[11px] text-muted-foreground mt-0.5'>Ready for immediate walk-in</p>
        </Card>
      </div>

      {/* Depots Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        {DETOUR_DEPOTS.map((depot) => {
          const isSoldOut = depot.utilizationRate === 100;
          const isHighDemand = depot.utilizationRate >= 90;

          return (
            <Card
              key={depot.id}
              className='flex flex-col transition-all hover:shadow-md border border-border/70 bg-card shadow-xs'
            >
              <CardHeader className='pb-3'>
                <div className='flex items-start justify-between gap-2'>
                  <div>
                    <CardTitle className='text-base font-bold flex items-center gap-1.5 text-foreground'>
                      <Icons.mapPin className='size-4 text-foreground shrink-0' />
                      {depot.name}
                    </CardTitle>
                    <CardDescription className='text-xs mt-0.5'>{depot.stateCountry}</CardDescription>
                  </div>
                  <span
                    className={`inline-flex items-center text-[10px] px-2 py-0.5 rounded font-semibold shrink-0 ${
                      isSoldOut
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : isHighDemand
                          ? 'bg-amber-600 text-white shadow-xs'
                          : 'bg-zinc-700 dark:bg-zinc-600 text-white shadow-xs'
                    }`}
                  >
                    {depot.badge}
                  </span>
                </div>
              </CardHeader>
              <CardContent className='flex-1 space-y-4 text-xs'>
                <p className='text-muted-foreground line-clamp-2'>{depot.description}</p>

                {/* Utilization Progress Bar - Monochrome Fade */}
                <div className='space-y-1.5'>
                  <div className='flex justify-between font-medium'>
                    <span className='text-muted-foreground'>Fleet Utilization</span>
                    <span className='font-bold tabular-nums text-foreground'>
                      {depot.activeRentals} / {depot.totalFleet} ({depot.utilizationRate}%)
                    </span>
                  </div>
                  <div className='h-2 w-full rounded-full bg-muted/70 overflow-hidden'>
                    <div
                      className='h-full rounded-full bg-foreground transition-all'
                      style={{ width: `${depot.utilizationRate}%` }}
                    />
                  </div>
                </div>

                {/* Contact and Manager */}
                <div className='p-2.5 rounded-lg border border-border/50 bg-muted/20 space-y-1'>
                  <div className='flex items-center gap-1.5 text-muted-foreground'>
                    <Icons.user className='size-3.5 text-foreground shrink-0' />
                    <span>Manager: <strong className='text-foreground'>{depot.manager}</strong></span>
                  </div>
                  <div className='flex items-center gap-1.5 text-muted-foreground'>
                    <Icons.phone className='size-3.5 text-foreground shrink-0' />
                    <span>{depot.phone}</span>
                  </div>
                  <div className='text-[11px] text-muted-foreground pt-0.5 line-clamp-1'>
                    {depot.address}
                  </div>
                </div>
              </CardContent>
              <CardFooter className='border-t border-border/50 pt-3 flex items-center justify-between'>
                <span className='text-xs font-semibold text-muted-foreground'>
                  {depot.availableVehicles > 0 ? (
                    <span className='inline-flex items-center gap-1 text-emerald-500 font-medium'>
                      ● {depot.availableVehicles} available today
                    </span>
                  ) : (
                    <span className='inline-flex items-center gap-1 text-muted-foreground font-medium'>
                      ● Fully booked
                    </span>
                  )}
                </span>
                <Button variant='ghost' size='sm' className='h-7 text-xs text-foreground'>
                  View Fleet →
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
