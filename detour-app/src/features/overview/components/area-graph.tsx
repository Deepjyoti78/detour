'use client';

import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';

interface DayColumnData {
  id: string;
  dayLabel: string;
  dateStr: string;
  period: 'first' | 'second';
  classicBlocks: number;
  touringBlocks: number;
  totalBlocks: number;
  revenue: number;
  tripsCount: number;
  isPeak?: boolean;
}

const THIRTY_DAYS_DATA: DayColumnData[] = [
  // First Fortnight (Days 1 - 15)
  { id: 'd1', dayLabel: '1', dateStr: 'Wed 1 Oct', period: 'first', classicBlocks: 3, touringBlocks: 3, totalBlocks: 6, revenue: 3850, tripsCount: 11 },
  { id: 'd2', dayLabel: '2', dateStr: 'Thu 2 Oct', period: 'first', classicBlocks: 3, touringBlocks: 4, totalBlocks: 7, revenue: 4400, tripsCount: 13 },
  { id: 'd3', dayLabel: '3', dateStr: 'Fri 3 Oct', period: 'first', classicBlocks: 4, touringBlocks: 5, totalBlocks: 9, revenue: 5500, tripsCount: 16, isPeak: true },
  { id: 'd4', dayLabel: '4', dateStr: 'Sat 4 Oct', period: 'first', classicBlocks: 5, touringBlocks: 6, totalBlocks: 11, revenue: 6800, tripsCount: 20, isPeak: true },
  { id: 'd5', dayLabel: '5', dateStr: 'Sun 5 Oct', period: 'first', classicBlocks: 4, touringBlocks: 6, totalBlocks: 10, revenue: 6100, tripsCount: 18, isPeak: true },
  { id: 'd6', dayLabel: '6', dateStr: 'Mon 6 Oct', period: 'first', classicBlocks: 2, touringBlocks: 3, totalBlocks: 5, revenue: 3200, tripsCount: 9 },
  { id: 'd7', dayLabel: '7', dateStr: 'Tue 7 Oct', period: 'first', classicBlocks: 3, touringBlocks: 3, totalBlocks: 6, revenue: 3800, tripsCount: 11 },
  { id: 'd8', dayLabel: '8', dateStr: 'Wed 8 Oct', period: 'first', classicBlocks: 3, touringBlocks: 4, totalBlocks: 7, revenue: 4300, tripsCount: 12 },
  { id: 'd9', dayLabel: '9', dateStr: 'Thu 9 Oct', period: 'first', classicBlocks: 4, touringBlocks: 4, totalBlocks: 8, revenue: 4900, tripsCount: 14 },
  { id: 'd10', dayLabel: '10', dateStr: 'Fri 10 Oct', period: 'first', classicBlocks: 5, touringBlocks: 6, totalBlocks: 11, revenue: 6900, tripsCount: 20, isPeak: true },
  { id: 'd11', dayLabel: '11', dateStr: 'Sat 11 Oct', period: 'first', classicBlocks: 5, touringBlocks: 7, totalBlocks: 12, revenue: 7600, tripsCount: 22, isPeak: true },
  { id: 'd12', dayLabel: '12', dateStr: 'Sun 12 Oct', period: 'first', classicBlocks: 4, touringBlocks: 6, totalBlocks: 10, revenue: 6400, tripsCount: 19, isPeak: true },
  { id: 'd13', dayLabel: '13', dateStr: 'Mon 13 Oct', period: 'first', classicBlocks: 2, touringBlocks: 2, totalBlocks: 4, revenue: 2600, tripsCount: 8 },
  { id: 'd14', dayLabel: '14', dateStr: 'Tue 14 Oct', period: 'first', classicBlocks: 3, touringBlocks: 3, totalBlocks: 6, revenue: 3700, tripsCount: 11 },
  { id: 'd15', dayLabel: '15', dateStr: 'Wed 15 Oct', period: 'first', classicBlocks: 3, touringBlocks: 4, totalBlocks: 7, revenue: 4200, tripsCount: 12 },

  // Second Fortnight (Days 16 - 30)
  { id: 'd16', dayLabel: '16', dateStr: 'Thu 16 Oct', period: 'second', classicBlocks: 3, touringBlocks: 5, totalBlocks: 8, revenue: 5100, tripsCount: 15 },
  { id: 'd17', dayLabel: '17', dateStr: 'Fri 17 Oct', period: 'second', classicBlocks: 5, touringBlocks: 6, totalBlocks: 11, revenue: 6900, tripsCount: 20, isPeak: true },
  { id: 'd18', dayLabel: '18', dateStr: 'Sat 18 Oct', period: 'second', classicBlocks: 6, touringBlocks: 7, totalBlocks: 13, revenue: 8400, tripsCount: 25, isPeak: true },
  { id: 'd19', dayLabel: '19', dateStr: 'Sun 19 Oct', period: 'second', classicBlocks: 5, touringBlocks: 6, totalBlocks: 11, revenue: 7200, tripsCount: 21, isPeak: true },
  { id: 'd20', dayLabel: '20', dateStr: 'Mon 20 Oct', period: 'second', classicBlocks: 2, touringBlocks: 3, totalBlocks: 5, revenue: 3200, tripsCount: 9 },
  { id: 'd21', dayLabel: '21', dateStr: 'Tue 21 Oct', period: 'second', classicBlocks: 3, touringBlocks: 3, totalBlocks: 6, revenue: 3800, tripsCount: 11 },
  { id: 'd22', dayLabel: '22', dateStr: 'Wed 22 Oct', period: 'second', classicBlocks: 3, touringBlocks: 4, totalBlocks: 7, revenue: 4400, tripsCount: 13 },
  { id: 'd23', dayLabel: '23', dateStr: 'Thu 23 Oct', period: 'second', classicBlocks: 4, touringBlocks: 5, totalBlocks: 9, revenue: 5600, tripsCount: 16 },
  { id: 'd24', dayLabel: '24', dateStr: 'Fri 24 Oct', period: 'second', classicBlocks: 5, touringBlocks: 6, totalBlocks: 11, revenue: 7000, tripsCount: 20, isPeak: true },
  { id: 'd25', dayLabel: '25', dateStr: 'Sat 25 Oct', period: 'second', classicBlocks: 5, touringBlocks: 7, totalBlocks: 12, revenue: 7800, tripsCount: 23, isPeak: true },
  { id: 'd26', dayLabel: '26', dateStr: 'Sun 26 Oct', period: 'second', classicBlocks: 4, touringBlocks: 6, totalBlocks: 10, revenue: 6500, tripsCount: 19, isPeak: true },
  { id: 'd27', dayLabel: '27', dateStr: 'Mon 27 Oct', period: 'second', classicBlocks: 2, touringBlocks: 3, totalBlocks: 5, revenue: 3100, tripsCount: 9 },
  { id: 'd28', dayLabel: '28', dateStr: 'Tue 28 Oct', period: 'second', classicBlocks: 3, touringBlocks: 3, totalBlocks: 6, revenue: 3700, tripsCount: 11 },
  { id: 'd29', dayLabel: '29', dateStr: 'Wed 29 Oct', period: 'second', classicBlocks: 3, touringBlocks: 4, totalBlocks: 7, revenue: 4300, tripsCount: 13 },
  { id: 'd30', dayLabel: '30', dateStr: 'Thu 30 Oct', period: 'second', classicBlocks: 4, touringBlocks: 5, totalBlocks: 9, revenue: 5800, tripsCount: 17, isPeak: true }
];

export function AreaGraph() {
  const [timeframe, setTimeframe] = useState<'14d' | '30d'>('30d');
  const [hoveredDay, setHoveredDay] = useState<DayColumnData | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const displayData = timeframe === '14d' ? THIRTY_DAYS_DATA.slice(-14) : THIRTY_DAYS_DATA;
  const maxBlocks = 14;

  const handleColumnEnter = (day: DayColumnData, e: React.MouseEvent<HTMLDivElement>) => {
    setHoveredDay(day);
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
        <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-3'>
          <div>
            <CardTitle className='flex items-center gap-2 text-foreground text-sm font-semibold tracking-tight'>
              <Icons.activity className='size-4 text-foreground/80' />
              Fleet Rental Revenue Velocity
              <span className='inline-flex items-center gap-1 rounded-md bg-zinc-900 text-zinc-100 dark:bg-zinc-100 dark:text-zinc-900 px-2 py-0.5 text-[11px] font-mono font-semibold shadow-xs ml-1'>
                <Icons.trendingUp className='size-3' />
                +18.4% YoY
              </span>
            </CardTitle>
            <CardDescription className='text-xs text-muted-foreground'>
              Daily reservation velocity represented as discrete stacked square blocks
            </CardDescription>
          </div>

          {/* Timeframe switch tabs matching Halden aesthetic */}
          <div className='flex items-center gap-1 bg-muted/60 p-1 rounded-lg border border-border/50 text-xs shrink-0'>
            <button
              type='button'
              onClick={() => setTimeframe('14d')}
              className={cn(
                'px-2.5 py-1 rounded-md font-medium transition-all cursor-pointer',
                timeframe === '14d'
                  ? 'bg-background text-foreground shadow-xs font-semibold'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              Last 14 days
            </button>
            <button
              type='button'
              onClick={() => setTimeframe('30d')}
              className={cn(
                'px-2.5 py-1 rounded-md font-medium transition-all cursor-pointer',
                timeframe === '30d'
                  ? 'bg-background text-foreground shadow-xs font-semibold'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              Last 30 days
            </button>
          </div>
        </div>

        {/* Minimal Monochrome Legend Strip (No rainbow) */}
        <div className='flex flex-wrap items-center gap-4 sm:gap-6 pt-2 text-xs'>
          <div className='flex items-center gap-2'>
            <span className='size-2.5 aspect-square rounded-[2px] bg-amber-500 shadow-xs' />
            <span className='text-muted-foreground'>Peak Weekend Velocity</span>
          </div>
          <div className='flex items-center gap-2'>
            <span className='size-2.5 aspect-square rounded-[2px] bg-zinc-900 dark:bg-zinc-100 shadow-xs' />
            <span className='text-muted-foreground'>Touring & 4x4 Tier</span>
          </div>
          <div className='flex items-center gap-2'>
            <span className='size-2.5 aspect-square rounded-[2px] bg-zinc-400 dark:bg-zinc-600 shadow-xs' />
            <span className='text-muted-foreground'>Classic & Vintage</span>
          </div>
          <div className='ml-auto text-[11px] font-mono text-muted-foreground'>
            Benchmark Target: <strong className='text-foreground'>$4.8k/day</strong>
          </div>
        </div>
      </CardHeader>

      <CardContent className='pt-1 pb-3'>
        {/* Floating Tooltip Card matching Halden reference */}
        {hoveredDay && tooltipPos && (
          <div
            className='absolute z-50 pointer-events-none transition-all duration-75 -translate-x-1/2 -translate-y-full mb-2'
            style={{ left: `${tooltipPos.x}px`, top: `${tooltipPos.y}px` }}
          >
            <div className='bg-zinc-950 text-zinc-100 border border-zinc-800 shadow-2xl rounded-lg p-2.5 min-w-[170px] text-xs animate-in fade-in zoom-in-95'>
              <div className='flex items-center justify-between border-b border-zinc-800 pb-1 mb-1.5'>
                <span className='font-bold text-white'>{hoveredDay.dateStr}</span>
                <span className='font-mono text-[10px] text-zinc-400'>{hoveredDay.tripsCount} trips</span>
              </div>
              <div className='text-base font-bold font-mono text-white tabular-nums'>
                ${hoveredDay.revenue.toLocaleString()}
              </div>
              <div className='mt-1.5 pt-1.5 border-t border-zinc-800/80 flex items-center justify-between text-[10px] font-mono'>
                <span className='flex items-center gap-1 text-zinc-300'>
                  <span className='size-1.5 rounded-[1px] bg-zinc-100' />
                  {hoveredDay.touringBlocks} Touring
                </span>
                <span className='flex items-center gap-1 text-zinc-400'>
                  <span className='size-1.5 rounded-[1px] bg-zinc-500' />
                  {hoveredDay.classicBlocks} Classic
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Matrix Container */}
        <div className='relative pt-3 pb-2 px-2 sm:px-3 rounded-lg bg-muted/20 border border-border/40'>
          {/* Subtle Dotted Target Line (Behind columns, non-colliding) */}
          <div className='absolute left-3 right-3 top-[36%] border-t border-dashed border-border/60 pointer-events-none z-0' />

          {/* TRUE SQUARE Block Columns */}
          <div
            className='flex items-end justify-between gap-[2px] sm:gap-1 z-10 relative'
            onMouseLeave={() => setHoveredDay(null)}
          >
            {displayData.map((day) => {
              const isHovered = hoveredDay?.id === day.id;

              // 14 slots high
              const blockCells = Array.from({ length: maxBlocks }, (_, i) => {
                const cellIndex = i + 1; // 1 to 14
                const isOver = cellIndex > day.totalBlocks;
                const isTouring = cellIndex <= day.touringBlocks;
                const isClassic = !isTouring && cellIndex <= day.totalBlocks;

                return {
                  cellIndex,
                  isOver,
                  isTouring,
                  isClassic
                };
              }).reverse();

              return (
                <div
                  key={day.id}
                  className={cn(
                    'flex-1 flex flex-col items-center group cursor-pointer transition-all duration-100 py-1 rounded-[2px]',
                    isHovered ? 'bg-muted/70 ring-1 ring-border/80' : 'hover:bg-muted/30'
                  )}
                  onMouseEnter={(e) => handleColumnEnter(day, e)}
                >
                  {/* Vertical Stack of STRICT SQUARES */}
                  <div className='w-full max-w-[14px] flex flex-col gap-[2px] sm:gap-[3px] items-center'>
                    {blockCells.map(({ cellIndex, isOver, isTouring, isClassic }) => {
                      if (isOver) {
                        return (
                          <div
                            key={cellIndex}
                            className='size-2 sm:size-2.5 aspect-square rounded-[1px] border border-dashed border-border/20 bg-transparent opacity-10'
                          />
                        );
                      }
                      if (isTouring) {
                        return (
                          <div
                            key={cellIndex}
                            className={cn(
                              'size-2 sm:size-2.5 aspect-square rounded-[1.5px] transition-all duration-100 shadow-xs',
                              day.isPeak
                                ? 'bg-amber-500 hover:bg-amber-400'
                                : 'bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-700',
                              isHovered && 'scale-115 brightness-110'
                            )}
                          />
                        );
                      }
                      if (isClassic) {
                        return (
                          <div
                            key={cellIndex}
                            className={cn(
                              'size-2 sm:size-2.5 aspect-square rounded-[1.5px] transition-all duration-100 bg-zinc-400 dark:bg-zinc-600 hover:bg-zinc-300',
                              isHovered && 'scale-115'
                            )}
                          />
                        );
                      }
                      return null;
                    })}
                  </div>

                  {/* Day label below column */}
                  <span className='mt-2 font-mono text-[9px] text-muted-foreground group-hover:text-foreground select-none'>
                    {day.dayLabel}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Fortnight sub-period brackets with clean spacing */}
          {timeframe === '30d' && (
            <div className='grid grid-cols-2 gap-4 mt-2 pt-2 border-t border-border/30 text-xs font-mono'>
              <div className='text-left pl-2'>
                <span className='text-muted-foreground text-[10px] block'>1 - 15 Oct Fortnight</span>
                <span className='text-foreground font-semibold text-[11px]'>
                  $79,200 · 142 drives
                </span>
              </div>
              <div className='text-right pr-2'>
                <span className='text-muted-foreground text-[10px] block'>16 - 30 Oct Fortnight</span>
                <span className='text-foreground font-semibold text-[11px]'>
                  $85,250 · +14% velocity
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Bottom persistent info text */}
        <div className='mt-2.5 pt-2 border-t border-border/40 flex items-center justify-between text-[11px] text-muted-foreground'>
          <span className='flex items-center gap-1.5'>
            <Icons.info className='size-3 text-muted-foreground/70' />
            Each square block represents a $550 reservation tranche. Hover columns to view day popover card.
          </span>
          <span className='font-mono text-[10px] font-semibold text-foreground'>
            $148,920 MTD Total
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
