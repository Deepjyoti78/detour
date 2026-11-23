'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';

interface DepotData {
  id: string;
  name: string;
  region: string;
  totalCapacity: number;
  onRoad: number;
  inDepot: number;
  route: string;
  revenueToday: number;
}

const DEPOT_DATA: DepotData[] = [
  { id: 'mumbai', name: 'Mumbai', region: 'West Coast', totalCapacity: 12, onRoad: 10, inDepot: 2, route: 'Lonavala & Western Ghats', revenueToday: 1450 },
  { id: 'delhi', name: 'Delhi NCR', region: 'North Plains', totalCapacity: 10, onRoad: 9, inDepot: 1, route: 'Taj Expressway & Neemrana', revenueToday: 1280 },
  { id: 'bengaluru', name: 'Bengaluru', region: 'South Hub', totalCapacity: 8, onRoad: 7, inDepot: 1, route: 'Coorg Hills & Mysore Heritage', revenueToday: 1120 },
  { id: 'goa', name: 'Goa', region: 'Coastal Hub', totalCapacity: 8, onRoad: 8, inDepot: 0, route: 'South Goa Beach Circuit', revenueToday: 1390 },
  { id: 'jaipur', name: 'Jaipur', region: 'Desert Circuit', totalCapacity: 6, onRoad: 5, inDepot: 1, route: 'Shekhawati Havelis & Thar', revenueToday: 820 },
  { id: 'portland', name: 'Portland', region: 'Pacific NW', totalCapacity: 8, onRoad: 7, inDepot: 1, route: 'Columbia Gorge & Mt Hood', revenueToday: 1190 },
  { id: 'hyderabad', name: 'Hyderabad', region: 'Deccan', totalCapacity: 6, onRoad: 4, inDepot: 2, route: 'Ananthagiri Hills Loop', revenueToday: 680 }
];

export function BarGraph() {
  const [hoveredDepot, setHoveredDepot] = useState<DepotData | null>(null);
  const [selectedDepot, setSelectedDepot] = useState<string | null>(null);

  // Maximum capacity across depots to align grid heights
  const maxCapacity = 14;

  const totalOnRoad = DEPOT_DATA.reduce((acc, d) => acc + d.onRoad, 0);
  const totalCapacity = DEPOT_DATA.reduce((acc, d) => acc + d.totalCapacity, 0);
  const avgUtilization = ((totalOnRoad / totalCapacity) * 100).toFixed(1);

  return (
    <Card className='border border-border/70 bg-card shadow-xs transition-colors'>
      <CardHeader className='pb-3'>
        <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-2'>
          <div>
            <CardTitle className='flex items-center gap-2 text-foreground text-sm font-semibold tracking-tight'>
              <Icons.mapPin className='size-4 text-foreground/80' />
              Depot Hub Fleet Distribution
              <span className='ml-1 inline-flex items-center gap-1 rounded-md bg-emerald-600/90 text-white px-2 py-0.5 text-[11px] font-semibold shadow-xs'>
                <Icons.trendingUp className='size-3' />
                {avgUtilization}% Average Utilization
              </span>
            </CardTitle>
            <CardDescription className='text-xs text-muted-foreground'>
              Equalizer block matrix of active rentals vs available vehicles by regional hub
            </CardDescription>
          </div>

          {/* Legend Strip matching the reference screenshot */}
          <div className='flex items-center gap-3 text-xs'>
            <div className='flex items-center gap-1.5'>
              <span className='size-2.5 rounded-[2px] bg-emerald-500 shadow-xs' />
              <span className='text-muted-foreground text-[11px] font-medium'>On Road (Active)</span>
            </div>
            <div className='flex items-center gap-1.5'>
              <span className='size-2.5 rounded-[2px] bg-zinc-400 dark:bg-zinc-600 shadow-xs' />
              <span className='text-muted-foreground text-[11px] font-medium'>In Depot (Available)</span>
            </div>
            <div className='flex items-center gap-1.5'>
              <span className='size-2.5 rounded-[2px] border border-dashed border-border/60 bg-muted/20' />
              <span className='text-muted-foreground text-[11px] font-medium'>Unallocated</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className='pt-2 pb-4'>
        {/* Equalizer Tower Matrix */}
        <div className='relative flex items-end justify-between gap-2 sm:gap-4 pt-4 pb-2 px-1 sm:px-3 rounded-lg bg-muted/15 border border-border/40'>
          {/* Subtle dotted baseline & threshold line */}
          <div className='absolute left-3 right-3 top-[30%] border-t border-dashed border-border/40 pointer-events-none' />

          {DEPOT_DATA.map((depot) => {
            const isHovered = (hoveredDepot?.id === depot.id) || (selectedDepot === depot.id);
            const utilization = Math.round((depot.onRoad / depot.totalCapacity) * 100);
            const isSoldOut = depot.onRoad === depot.totalCapacity;

            // Render array of blocks from top (maxCapacity) down to 1
            const blocks = Array.from({ length: maxCapacity }, (_, i) => {
              const blockIndexFromBottom = i + 1; // 1 to 14
              const isOverCapacity = blockIndexFromBottom > depot.totalCapacity;
              const isOnRoad = blockIndexFromBottom <= depot.onRoad;
              const isInDepot = !isOnRoad && blockIndexFromBottom <= depot.totalCapacity;

              return {
                index: blockIndexFromBottom,
                isOverCapacity,
                isOnRoad,
                isInDepot
              };
            }).reverse(); // Stack visual: top is highest index

            return (
              <div
                key={depot.id}
                className={cn(
                  'flex-1 flex flex-col items-center group cursor-pointer transition-all duration-150 p-1 rounded-md',
                  isHovered ? 'bg-muted/60 ring-1 ring-border/80' : 'hover:bg-muted/30'
                )}
                onMouseEnter={() => setHoveredDepot(depot)}
                onMouseLeave={() => setHoveredDepot(null)}
                onClick={() => setSelectedDepot(selectedDepot === depot.id ? null : depot.id)}
              >
                {/* Top Quick Utilization Badge */}
                <span
                  className={cn(
                    'font-mono text-[10px] font-semibold mb-1.5 transition-colors',
                    isSoldOut
                      ? 'text-emerald-600 dark:text-emerald-400 font-bold'
                      : 'text-muted-foreground group-hover:text-foreground'
                  )}
                >
                  {utilization}%
                </span>

                {/* Stack of Discrete Blocks (Equalizer Column) */}
                <div className='w-full max-w-[34px] flex flex-col gap-[3px] py-1'>
                  {blocks.map(({ index, isOverCapacity, isOnRoad, isInDepot }) => {
                    if (isOverCapacity) {
                      return (
                        <div
                          key={index}
                          className='h-2.5 w-full rounded-[2px] border border-dashed border-border/20 bg-transparent opacity-10'
                        />
                      );
                    }
                    if (isOnRoad) {
                      return (
                        <div
                          key={index}
                          className={cn(
                            'h-2.5 w-full rounded-[2px] transition-all duration-150 shadow-xs',
                            isSoldOut
                              ? 'bg-emerald-500 hover:bg-emerald-400'
                              : 'bg-emerald-500 dark:bg-emerald-400 hover:bg-emerald-300',
                            isHovered && 'scale-105 brightness-110'
                          )}
                        />
                      );
                    }
                    if (isInDepot) {
                      return (
                        <div
                          key={index}
                          className={cn(
                            'h-2.5 w-full rounded-[2px] transition-all duration-150 bg-zinc-400/80 dark:bg-zinc-600 hover:bg-zinc-400 border border-zinc-500/30',
                            isHovered && 'scale-105'
                          )}
                        />
                      );
                    }
                    return null;
                  })}
                </div>

                {/* Depot Label at Bottom */}
                <div className='mt-2 text-center w-full'>
                  <span className='block text-xs font-semibold text-foreground truncate'>
                    {depot.name}
                  </span>
                  <span className='block font-mono text-[10px] text-muted-foreground'>
                    {depot.onRoad}/{depot.totalCapacity}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic Telemetry & Inspection Bar */}
        <div className='mt-3 pt-2.5 border-t border-border/50 min-h-[46px] flex items-center justify-between text-xs'>
          {hoveredDepot ? (
            <div className='flex items-center justify-between w-full animate-in fade-in duration-100'>
              <div className='flex items-center gap-2'>
                <span className='size-2 rounded-full bg-emerald-500' />
                <span className='font-bold text-foreground'>{hoveredDepot.name} Regional Hub</span>
                <span className='text-muted-foreground font-mono text-[11px]'>({hoveredDepot.region})</span>
              </div>
              <div className='flex items-center gap-3 font-mono text-[11px]'>
                <span className='text-muted-foreground'>
                  Primary: <strong className='text-foreground'>{hoveredDepot.route}</strong>
                </span>
                <span className='bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-bold'>
                  {hoveredDepot.onRoad} Rented · {hoveredDepot.inDepot} Available
                </span>
                <span className='font-bold text-foreground'>
                  +${hoveredDepot.revenueToday} today
                </span>
              </div>
            </div>
          ) : (
            <div className='flex items-center justify-between w-full text-muted-foreground text-[11px]'>
              <span className='flex items-center gap-1.5'>
                <Icons.info className='size-3.5 text-muted-foreground/70' />
                Each column block represents 1 vehicle in the depot fleet capacity. Hover to view hub operations.
              </span>
              <span className='font-mono text-[10px] font-semibold text-emerald-600 dark:text-emerald-400'>
                Goa Hub Sold Out (100%)
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
