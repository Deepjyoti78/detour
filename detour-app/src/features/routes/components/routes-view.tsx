'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Icons } from '@/components/icons';
import { DETOUR_SCENIC_ROUTES } from '@/constants/detour-data';
import Image from 'next/image';

export function RoutesView() {
  return (
    <div className='flex flex-col gap-6'>
      {/* Header */}
      <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight flex items-center gap-2'>
            <Icons.route className='size-6 text-primary' />
            Scenic Drives & Trip Itineraries
          </h1>
          <p className='text-sm text-muted-foreground'>
            Handpicked scenic self-drive road trips with waypoints, scenic stops, and matching vehicles.
          </p>
        </div>
        <div className='flex items-center gap-2'>
          <Button variant='outline' size='sm' onClick={() => window.print()}>
            <Icons.upload className='size-4 mr-1.5 rotate-180' />
            Print Trip Pack
          </Button>
          <Button size='sm'>
            <Icons.plus className='size-4 mr-1.5' />
            Create Drive Route
          </Button>
        </div>
      </div>

      {/* Routes Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {DETOUR_SCENIC_ROUTES.map((route) => (
          <Card key={route.id} className='overflow-hidden flex flex-col hover:shadow-lg transition-all border-border/80'>
            <div className='relative h-48 w-full bg-muted'>
              <Image
                src={route.image}
                alt={route.name}
                fill
                className='object-cover'
                sizes='(max-width: 768px) 100vw, 400px'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent' />
              <div className='absolute bottom-3 left-3 right-3 text-white'>
                <div className='flex items-center justify-between'>
                  <Badge variant='outline' className='bg-black/50 text-white border-white/30 text-[10px]'>
                    {route.region}
                  </Badge>
                  <span className='text-xs font-semibold bg-primary/90 text-primary-foreground px-2 py-0.5 rounded'>
                    {route.distanceKm} km • {route.durationHours}
                  </span>
                </div>
                <h3 className='text-lg font-bold mt-1 leading-tight text-white drop-shadow'>
                  {route.name}
                </h3>
              </div>
            </div>

            <CardContent className='flex-1 p-4 space-y-4 text-xs'>
              <p className='text-muted-foreground'>{route.highlight}</p>

              {/* Recommended Fleet */}
              <div className='p-2.5 rounded-lg border bg-muted/30 flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <Icons.car className='size-4 text-primary shrink-0' />
                  <span className='text-muted-foreground'>Recommended Car:</span>
                </div>
                <span className='font-bold text-foreground'>{route.recommendedCar}</span>
              </div>

              {/* Waypoint Stops */}
              <div className='space-y-2'>
                <span className='font-semibold text-muted-foreground uppercase text-[10px] tracking-wider flex items-center gap-1'>
                  <Icons.compass className='size-3 text-primary' />
                  Key Itinerary Stops ({route.stops.length})
                </span>
                <div className='space-y-2 relative pl-3 border-l border-primary/30 ml-1'>
                  {route.stops.map((stop, i) => (
                    <div key={i} className='relative'>
                      <div className='absolute -left-[17px] top-1 size-2 rounded-full bg-primary' />
                      <p className='font-semibold text-foreground text-xs'>{stop.name}</p>
                      <p className='text-muted-foreground text-[11px]'>{stop.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>

            <CardFooter className='border-t p-3 bg-muted/10 flex items-center justify-between'>
              <span className='text-[11px] text-muted-foreground font-mono'>
                Route ID: {route.id}
              </span>
              <Button size='sm' variant='default' className='h-8 text-xs'>
                <Icons.calendarCheck className='size-3.5 mr-1.5' />
                Book This Drive
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
