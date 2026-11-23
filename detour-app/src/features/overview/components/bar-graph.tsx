'use client';

import React, { useState, useRef } from 'react';
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
  { id: 'delhi', name: 'Delhi NCR', region: 'North Plains', totalCapacity: 10, onRoad: 9, inDepot: 1, route: 'Taj Scenic Expressway', revenueToday: 1280 },
  { id: 'bengaluru', name: 'Bengaluru', region: 'South Hub', totalCapacity: 8, onRoad: 7, inDepot: 1, route: 'Coorg Hills & Mysore', revenueToday: 1120 },
  { id: 'goa', name: 'Goa', region: 'Coastal Hub', totalCapacity: 8, onRoad: 8, inDepot: 0, route: 'South Goa Beach Circuit', revenueToday: 1390 },
  { id: 'jaipur', name: 'Jaipur', region: 'Desert Circuit', totalCapacity: 6, onRoad: 5, inDepot: 1, route: 'Shekhawati Havelis', revenueToday: 820 },
  { id: 'portland', name: 'Portland', region: 'Pacific NW', totalCapacity: 8, onRoad: 7, inDepot: 1, route: 'Columbia Gorge Loop', revenueToday: 1190 },
  { id: 'hyderabad', name: 'Hyderabad', region: 'Deccan', totalCapacity: 6, onRoad: 4, inDepot: 2, route: 'Ananthagiri Hills', revenueToday: 680 }
];

export function BarGraph() {
  const [hoveredDepot, setHoveredDepot] = useState<DepotData | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const maxCapacity = 13;
  const totalOnRoad = DEPOT_DATA.reduce((acc, d) => acc + d.onRoad, 0);
  const totalCapacity = DEPOT_DATA.reduce((acc, d) => acc + d.totalCapacity, 0);
  const avgUtilization = ((totalOnRoad / totalCapacity) * 100).toFixed(1);

  const handleColumnEnter = (depot: DepotData, e: React.MouseEvent<HTMLDivElement>) => {
    setHoveredDepot(depot);
    if (containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const targetRect = e.currentTarget.getBoundingClientRect();
      setTooltipPos({
        x: targetRect.left - containerRect.left + targetRect.width / 2,
        y: targetRect.top - containerRect.top
      });
    }
  };

  return (
    <Card className='border border-border/70 bg-card shadow-xs transition-colors relative' ref={containerRef}>
      <CardHeader className='pb-3'>
        <div className='flex flex-col gap-2'>
          <div className='flex flex-wrap items-center justify-between gap-2'>
            <CardTitle className='flex items-center gap-2 text-foreground text-sm font-semibold tracking-tight'>
              <Icons.mapPin className='size-4 text-foreground/80' />
              Depot Hub Fleet Distribution
              <span className='inline-flex items-center gap-1 rounded-md bg-zinc-900 text-zinc-100 dark:bg-zinc-100 dark:text-zinc-900 px-2 py-0.5 text-[11px] font-mono font-semibold shadow-xs'>
                <Icons.trendingUp className='size-3' />
                {avgUtilization}% Utilization
              </span>
            </CardTitle>

            {/* Clean Spaced Monochrome Legend */}
            <div className='flex items-center gap-3 text-xs'>
              <div className='flex items-center gap-1.5'>
                <span className='size-2.5 aspect-square rounded-[2px] bg-zinc-900 dark:bg-zinc-100 shadow-xs' />
                <span className='text-muted-foreground text-[11px]'>On Road (Active)</span>
              </div>
              <div className='flex items-center gap-1.5'>
                <span className='size-2.5 aspect-square rounded-[2px] bg-zinc-400 dark:bg-zinc-600 shadow-xs' />
                <span className='text-muted-foreground text-[11px]'>In Depot (Available)</span>
              </div>
              <div className='flex items-center gap-1.5'>
                <span className='size-2.5 aspect-square rounded-[2px] bg-amber-500 shadow-xs' />
                <span className='text-muted-foreground text-[11px]'>Sold Out (100%)</span>
              </div>
            </div>
          </div>

          <CardDescription className='text-xs text-muted-foreground'>
            Equalizer matrix of square blocks representing vehicle slots per regional hub
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className='pt-1 pb-3'>
        {/* Floating Tooltip Card matching Halden popup */}
        {hoveredDepot && tooltipPos && (
          <div
            className='absolute z-50 pointer-events-none transition-all duration-75 -translate-x-1/2 -translate-y-full mb-2'
            style={{ left: `${tooltipPos.x}px`, top: `${tooltipPos.y}px` }}
          >
            <div className='bg-zinc-950 text-zinc-100 border border-zinc-800 shadow-2xl rounded-lg p-2.5 min-w-[200px] text-xs animate-in fade-in zoom-in-95'>
              <div className='flex items-center justify-between border-b border-zinc-800 pb-1 mb-1.5'>
                <span className='font-bold text-white'>{hoveredDepot.name} Regional Hub</span>
                <span className='font-mono text-[10px] text-zinc-400'>{hoveredDepot.region}</span>
              </div>
              <div className='flex items-center justify-between text-[11px] text-zinc-300'>
                <span className='font-semibold text-white'>
                  {Math.round((hoveredDepot.onRoad / hoveredDepot.totalCapacity) * 100)}% Utilization
                </span>
                <span className='font-mono text-zinc-400'>
                  {hoveredDepot.onRoad}/{hoveredDepot.totalCapacity} Cars Active
                </span>
              </div>
              <div className='mt-1.5 pt-1.5 border-t border-zinc-800/80 text-[10px] space-y-1'>
                <div className='text-zinc-400 truncate'>
                  Route: <strong className='text-zinc-200'>{hoveredDepot.route}</strong>
                </div>
                <div className='flex items-center justify-between text-zinc-400 font-mono'>
                  <span>Today's Revenue</span>
                  <span className='font-bold text-white'>+${hoveredDepot.revenueToday}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Equalizer Grid with STRICT SQUARES */}
        <div className='flex items-end justify-between gap-2 sm:gap-4 pt-3 pb-2 px-2 sm:px-4 rounded-lg bg-muted/20 border border-border/40'>
          {DEPOT_DATA.map((depot) => {
            const isHovered = hoveredDepot?.id === depot.id;
            const utilization = Math.round((depot.onRoad / depot.totalCapacity) * 100);
            const isSoldOut = depot.onRoad === depot.totalCapacity;

            const blocks = Array.from({ length: maxCapacity }, (_, i) => {
              const blockIndexFromBottom = i + 1;
              const isOverCapacity = blockIndexFromBottom > depot.totalCapacity;
              const isOnRoad = blockIndexFromBottom <= depot.onRoad;
              const isInDepot = !isOnRoad && blockIndexFromBottom <= depot.totalCapacity;

              return {
                index: blockIndexFromBottom,
                isOverCapacity,
                isOnRoad,
                isInDepot
              };
            }).reverse();

            return (
              <div
                key={depot.id}
                className={cn(
                  'flex-1 flex flex-col items-center group cursor-pointer transition-all duration-100 p-1 rounded-md',
                  isHovered ? 'bg-muted/70 ring-1 ring-border/80' : 'hover:bg-muted/30'
                )}
                onMouseEnter={(e) => handleColumnEnter(depot, e)}
                onMouseLeave={() => setHoveredDepot(null)}
              >
                {/* Quick Utilization Percentage Header */}
                <span
                  className={cn(
                    'font-mono text-[10px] font-semibold mb-1.5 transition-colors',
                    isSoldOut
                      ? 'text-amber-500 font-bold'
                      : 'text-muted-foreground group-hover:text-foreground'
                  )}
                >
                  {utilization}%
                </span>

                {/* Vertical Stack of TRUE SQUARE BLOCKS */}
                <div className='flex flex-col gap-[2.5px] py-1 items-center'>
                  {blocks.map(({ index, isOverCapacity, isOnRoad, isInDepot }) => {
                    if (isOverCapacity) {
                      return (
                        <div
                          key={index}
                          className='size-3 sm:size-3.5 aspect-square rounded-[2px] border border-dashed border-border/20 bg-transparent opacity-10'
                        />
                      );
                    }
                    if (isOnRoad) {
                      return (
                        <div
                          key={index}
                          className={cn(
                            'size-3 sm:size-3.5 aspect-square rounded-[2px] transition-all duration-100 shadow-xs',
                            isSoldOut
                              ? 'bg-amber-500 hover:bg-amber-400'
                              : 'bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-700',
                            isHovered && 'scale-115 brightness-110'
                          )}
                        />
                      );
                    }
                    if (isInDepot) {
                      return (
                        <div
                          key={index}
                          className={cn(
                            'size-3 sm:size-3.5 aspect-square rounded-[2px] transition-all duration-100 bg-zinc-400 dark:bg-zinc-600 hover:bg-zinc-300',
                            isHovered && 'scale-115'
                          )}
                        />
                      );
                    }
                    return null;
                  })}
                </div>

                {/* Clean Bottom Label */}
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

        {/* Bottom persistent info text */}
        <div className='mt-2.5 pt-2 border-t border-border/40 flex items-center justify-between text-[11px] text-muted-foreground'>
          <span className='flex items-center gap-1.5'>
            <Icons.info className='size-3 text-muted-foreground/70' />
            1 block = 1 vehicle. Hover columns to view hub telemetry popover card.
          </span>
          <span className='font-mono text-[10px] font-semibold text-amber-500'>
            Goa Hub Sold Out (100%)
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
