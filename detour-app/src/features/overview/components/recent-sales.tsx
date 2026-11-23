'use client';

import React from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { DETOUR_BOOKINGS } from '@/constants/detour-data';
import Image from 'next/image';
import Link from 'next/link';
import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';

export function RecentRentals() {
  const dispatchItems = [
    {
      id: 'dsp-1',
      due: '1h 20m to return',
      dueStatus: 'urgent',
      customer: 'Arjun Mehta',
      vehicle: 'Porsche 356 Speedster',
      plate: 'MH-01-CS-1958',
      route: 'Lonavala & Western Ghats',
      amount: '$435.00',
      action: 'Prep Return Bay'
    },
    {
      id: 'dsp-2',
      due: '3h 45m to return',
      dueStatus: 'warning',
      customer: 'Rohan Sharma',
      vehicle: 'Ford Mustang Fastback',
      plate: 'DL-03-FA-1967',
      route: 'Taj Scenic Expressway',
      amount: '$390.00',
      action: 'Fuel & Safety Check'
    },
    {
      id: 'dsp-3',
      due: 'On Road (Day 2 of 4)',
      dueStatus: 'normal',
      customer: 'Priya Nambiar',
      vehicle: 'Land Rover Defender 90',
      plate: 'DL-01-LR-2024',
      route: 'Leh-Manali Alpine Loop',
      amount: '$640.00',
      action: 'Telemetry Active'
    },
    {
      id: 'dsp-4',
      due: 'On Road (Day 1 of 3)',
      dueStatus: 'normal',
      customer: 'Siddharth Roy',
      vehicle: 'Alfa Romeo Spider',
      plate: 'GA-02-SP-1972',
      route: 'South Goa Coastal Pass',
      amount: '$375.00',
      action: 'Telemetry Active'
    },
    {
      id: 'dsp-5',
      due: 'Departing in 40m',
      dueStatus: 'departure',
      customer: 'Vikram Joshi',
      vehicle: 'Porsche Taycan 4S Cross',
      plate: 'MH-01-PT-2024',
      route: 'Mumbai-Pune Expressway',
      amount: '$570.00',
      action: 'Key Handover Ready'
    }
  ];

  return (
    <Card className='h-full flex flex-col border border-border/70 bg-card shadow-xs transition-colors'>
      <CardHeader className='pb-3'>
        <div className='flex items-center justify-between'>
          <CardTitle className='text-sm font-semibold tracking-tight text-foreground flex items-center gap-2'>
            <Icons.clock className='size-4 text-foreground/80' />
            Live Dispatch & Returns
          </CardTitle>
          <Link
            href='/dashboard/bookings'
            className='text-[11px] font-mono font-medium text-muted-foreground hover:text-foreground bg-muted/50 border border-border/50 px-2 py-0.5 rounded transition-colors flex items-center gap-1'
          >
            <span>All Bookings</span>
            <span>↗</span>
          </Link>
        </div>
        <CardDescription className='text-xs text-muted-foreground'>
          Real-time checkouts, telemetry status, and bay assignments
        </CardDescription>
      </CardHeader>

      <CardContent className='flex-1 overflow-y-auto pt-0 pb-3'>
        {/* Table Header Strip matching Halden */}
        <div className='grid grid-cols-12 text-[10px] font-mono uppercase tracking-wider text-muted-foreground/70 pb-2 border-b border-border/40'>
          <div className='col-span-4'>Due / Status</div>
          <div className='col-span-4'>Driver & Vehicle</div>
          <div className='col-span-2 text-right'>Amount</div>
          <div className='col-span-2 text-right'>Action</div>
        </div>

        <div className='divide-y divide-border/30'>
          {dispatchItems.map((item) => (
            <div
              key={item.id}
              className='grid grid-cols-12 items-center py-2.5 text-xs hover:bg-muted/30 -mx-2 px-2 rounded-md transition-colors'
            >
              {/* Due / Status Column */}
              <div className='col-span-4 pr-1'>
                <span
                  className={cn(
                    'font-mono text-[11px] font-semibold block',
                    item.dueStatus === 'urgent' && 'text-rose-500',
                    item.dueStatus === 'warning' && 'text-amber-500',
                    item.dueStatus === 'departure' && 'text-blue-500',
                    item.dueStatus === 'normal' && 'text-emerald-500'
                  )}
                >
                  {item.due}
                </span>
                <span className='text-[10px] text-muted-foreground truncate block'>
                  {item.route}
                </span>
              </div>

              {/* Driver & Vehicle Column */}
              <div className='col-span-4 pr-1'>
                <span className='font-semibold text-foreground truncate block'>
                  {item.customer}
                </span>
                <span className='text-[11px] text-muted-foreground truncate block'>
                  {item.vehicle}{' '}
                  <span className='font-mono text-[9px] opacity-75'>({item.plate.slice(0, 8)})</span>
                </span>
              </div>

              {/* Amount Column */}
              <div className='col-span-2 text-right font-mono font-semibold text-foreground text-[11px]'>
                {item.amount}
              </div>

              {/* Action Column */}
              <div className='col-span-2 text-right'>
                <span
                  className={cn(
                    'inline-block text-[10px] font-mono px-1.5 py-0.5 rounded border leading-tight',
                    item.dueStatus === 'urgent' && 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30',
                    item.dueStatus === 'warning' && 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
                    item.dueStatus === 'departure' && 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30',
                    item.dueStatus === 'normal' && 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                  )}
                >
                  {item.action}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export const RecentSales = RecentRentals;
