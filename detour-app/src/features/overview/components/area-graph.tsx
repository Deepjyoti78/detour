'use client';

import React, { useState } from 'react';
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
  highlight?: boolean;
}

// 30 days dataset (matching the 30-day block matrix in image 3)
const THIRTY_DAYS_DATA: DayColumnData[] = [
  // First Fortnight (Days 1 - 15)
  { id: 'd1', dayLabel: '1', dateStr: 'Wed 1 Oct', period: 'first', classicBlocks: 3, touringBlocks: 4, totalBlocks: 7, revenue: 3850, tripsCount: 11 },
  { id: 'd2', dayLabel: '2', dateStr: 'Thu 2 Oct', period: 'first', classicBlocks: 4, touringBlocks: 5, totalBlocks: 9, revenue: 4950, tripsCount: 14 },
  { id: 'd3', dayLabel: '3', dateStr: 'Fri 3 Oct', period: 'first', classicBlocks: 5, touringBlocks: 6, totalBlocks: 11, revenue: 6050, tripsCount: 17, highlight: true },
  { id: 'd4', dayLabel: '4', dateStr: 'Sat 4 Oct', period: 'first', classicBlocks: 6, touringBlocks: 8, totalBlocks: 14, revenue: 7700, tripsCount: 22, highlight: true },
  { id: 'd5', dayLabel: '5', dateStr: 'Sun 5 Oct', period: 'first', classicBlocks: 5, touringBlocks: 7, totalBlocks: 12, revenue: 6600, tripsCount: 19, highlight: true },
  { id: 'd6', dayLabel: '6', dateStr: 'Mon 6 Oct', period: 'first', classicBlocks: 2, touringBlocks: 4, totalBlocks: 6, revenue: 3300, tripsCount: 9 },
  { id: 'd7', dayLabel: '7', dateStr: 'Tue 7 Oct', period: 'first', classicBlocks: 3, touringBlocks: 4, totalBlocks: 7, revenue: 3850, tripsCount: 11 },
  { id: 'd8', dayLabel: '8', dateStr: 'Wed 8 Oct', period: 'first', classicBlocks: 3, touringBlocks: 5, totalBlocks: 8, revenue: 4400, tripsCount: 12 },
  { id: 'd9', dayLabel: '9', dateStr: 'Thu 9 Oct', period: 'first', classicBlocks: 4, touringBlocks: 5, totalBlocks: 9, revenue: 4950, tripsCount: 14 },
  { id: 'd10', dayLabel: '10', dateStr: 'Fri 10 Oct', period: 'first', classicBlocks: 6, touringBlocks: 7, totalBlocks: 13, revenue: 7150, tripsCount: 20, highlight: true },
  { id: 'd11', dayLabel: '11', dateStr: 'Sat 11 Oct', period: 'first', classicBlocks: 7, touringBlocks: 8, totalBlocks: 15, revenue: 8250, tripsCount: 24, highlight: true },
  { id: 'd12', dayLabel: '12', dateStr: 'Sun 12 Oct', period: 'first', classicBlocks: 5, touringBlocks: 8, totalBlocks: 13, revenue: 7150, tripsCount: 21, highlight: true },
  { id: 'd13', dayLabel: '13', dateStr: 'Mon 13 Oct', period: 'first', classicBlocks: 2, touringBlocks: 3, totalBlocks: 5, revenue: 2750, tripsCount: 8 },
  { id: 'd14', dayLabel: '14', dateStr: 'Tue 14 Oct', period: 'first', classicBlocks: 3, touringBlocks: 4, totalBlocks: 7, revenue: 3850, tripsCount: 11 },
  { id: 'd15', dayLabel: '15', dateStr: 'Wed 15 Oct', period: 'first', classicBlocks: 4, touringBlocks: 4, totalBlocks: 8, revenue: 4400, tripsCount: 13 },

  // Second Fortnight (Days 16 - 30)
  { id: 'd16', dayLabel: '16', dateStr: 'Thu 16 Oct', period: 'second', classicBlocks: 4, touringBlocks: 6, totalBlocks: 10, revenue: 5500, tripsCount: 15 },
  { id: 'd17', dayLabel: '17', dateStr: 'Fri 17 Oct', period: 'second', classicBlocks: 6, touringBlocks: 7, totalBlocks: 13, revenue: 7150, tripsCount: 20, highlight: true },
  { id: 'd18', dayLabel: '18', dateStr: 'Sat 18 Oct', period: 'second', classicBlocks: 7, touringBlocks: 9, totalBlocks: 16, revenue: 8800, tripsCount: 26, highlight: true },
  { id: 'd19', dayLabel: '19', dateStr: 'Sun 19 Oct', period: 'second', classicBlocks: 6, touringBlocks: 8, totalBlocks: 14, revenue: 7700, tripsCount: 22, highlight: true },
  { id: 'd20', dayLabel: '20', dateStr: 'Mon 20 Oct', period: 'second', classicBlocks: 2, touringBlocks: 4, totalBlocks: 6, revenue: 3300, tripsCount: 10 },
  { id: 'd21', dayLabel: '21', dateStr: 'Tue 21 Oct', period: 'second', classicBlocks: 3, touringBlocks: 4, totalBlocks: 7, revenue: 3850, tripsCount: 11 },
  { id: 'd22', dayLabel: '22', dateStr: 'Wed 22 Oct', period: 'second', classicBlocks: 4, touringBlocks: 5, totalBlocks: 9, revenue: 4950, tripsCount: 14 },
  { id: 'd23', dayLabel: '23', dateStr: 'Thu 23 Oct', period: 'second', classicBlocks: 4, touringBlocks: 6, totalBlocks: 10, revenue: 5500, tripsCount: 16 },
  { id: 'd24', dayLabel: '24', dateStr: 'Fri 24 Oct', period: 'second', classicBlocks: 5, touringBlocks: 7, totalBlocks: 12, revenue: 6600, tripsCount: 19, highlight: true },
  { id: 'd25', dayLabel: '25', dateStr: 'Sat 25 Oct', period: 'second', classicBlocks: 6, touringBlocks: 8, totalBlocks: 14, revenue: 7700, tripsCount: 23, highlight: true },
  { id: 'd26', dayLabel: '26', dateStr: 'Sun 26 Oct', period: 'second', classicBlocks: 5, touringBlocks: 7, totalBlocks: 12, revenue: 6600, tripsCount: 18, highlight: true },
  { id: 'd27', dayLabel: '27', dateStr: 'Mon 27 Oct', period: 'second', classicBlocks: 2, touringBlocks: 3, totalBlocks: 5, revenue: 2750, tripsCount: 8 },
  { id: 'd28', dayLabel: '28', dateStr: 'Tue 28 Oct', period: 'second', classicBlocks: 3, touringBlocks: 4, totalBlocks: 7, revenue: 3850, tripsCount: 11 },
  { id: 'd29', dayLabel: '29', dateStr: 'Wed 29 Oct', period: 'second', classicBlocks: 4, touringBlocks: 5, totalBlocks: 9, revenue: 4950, tripsCount: 14 },
  { id: 'd30', dayLabel: '30', dateStr: 'Thu 30 Oct', period: 'second', classicBlocks: 5, touringBlocks: 6, totalBlocks: 11, revenue: 6050, tripsCount: 17, highlight: true }
];

export function AreaGraph() {
  const [timeframe, setTimeframe] = useState<'14d' | '30d'>('30d');
  const [hoveredDay, setHoveredDay] = useState<DayColumnData | null>(null);

  const displayData = timeframe === '14d' ? THIRTY_DAYS_DATA.slice(-14) : THIRTY_DAYS_DATA;
  const maxBlocks = 16;

  // Split calculations
  const firstFortnight = THIRTY_DAYS_DATA.filter((d) => d.period === 'first');
  const secondFortnight = THIRTY_DAYS_DATA.filter((d) => d.period === 'second');
  const firstTotal = firstFortnight.reduce((a, b) => a + b.revenue, 0);
  const secondTotal = secondFortnight.reduce((a, b) => a + b.revenue, 0);

  return (
    <Card className='border border-border/70 bg-card shadow-xs transition-colors'>
      <CardHeader className='pb-3'>
        <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-3'>
          <div>
            <CardTitle className='flex items-center gap-2 text-foreground text-sm font-semibold tracking-tight'>
              <Icons.activity className='size-4 text-foreground/80' />
              Fleet Rental Revenue Velocity
              <span className='inline-flex items-center gap-1 rounded-md bg-emerald-600/90 text-white px-2 py-0.5 text-[11px] font-semibold shadow-xs ml-1'>
                <Icons.trendingUp className='size-3' />
                +18.4% YoY
              </span>
            </CardTitle>
            <CardDescription className='text-xs text-muted-foreground'>
              Daily reservation velocity represented as discrete stacked blocks
            </CardDescription>
          </div>

          {/* Timeframe switch tabs matching Halden aesthetic */}
          <div className='flex items-center gap-1 bg-muted/60 p-1 rounded-lg border border-border/50 text-xs'>
            <button
              type='button'
              onClick={() => setTimeframe('14d')}
              className={cn(
                'px-2.5 py-1 rounded-md font-medium transition-all cursor-pointer',
                timeframe === '14d'
                  ? 'bg-background text-foreground shadow-xs'
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
                  ? 'bg-background text-foreground shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              Last 30 days
            </button>
          </div>
        </div>

        {/* Top Summary Badges matching image 1 & 3 */}
        <div className='flex flex-wrap items-center gap-3 sm:gap-6 pt-2 text-xs'>
          <div className='flex items-center gap-2'>
            <span className='size-2.5 rounded-[2px] bg-rose-500 shadow-xs' />
            <span className='text-muted-foreground'>Peak Weekend Drives:</span>
            <strong className='font-mono text-foreground font-semibold'>14 days</strong>
          </div>
          <div className='flex items-center gap-2'>
            <span className='size-2.5 rounded-[2px] bg-amber-500 shadow-xs' />
            <span className='text-muted-foreground'>Touring & 4x4 Tier:</span>
            <strong className='font-mono text-foreground font-semibold'>182 bookings</strong>
          </div>
          <div className='flex items-center gap-2'>
            <span className='size-2.5 rounded-[2px] bg-zinc-400 dark:bg-zinc-600 shadow-xs' />
            <span className='text-muted-foreground'>Classic & Vintage:</span>
            <strong className='font-mono text-foreground font-semibold'>124 bookings</strong>
          </div>
        </div>
      </CardHeader>

      <CardContent className='pt-1 pb-4'>
        {/* The Discrete Stacked Block Histogram Matrix */}
        <div className='relative pt-4 pb-2 px-2 sm:px-3 rounded-lg bg-muted/15 border border-border/40'>
          {/* Target Benchmark Dotted Line across the matrix */}
          <div
            className='absolute left-3 right-3 top-[38%] border-t border-dashed border-amber-500/50 pointer-events-none z-10 flex justify-end pr-2'
          >
            <span className='text-[9px] font-mono font-medium text-amber-500 -mt-3.5 bg-card/80 px-1 rounded'>
              Avg Target $4.8k
            </span>
          </div>

          {/* Block Columns Grid */}
          <div className='flex items-end justify-between gap-[3px] sm:gap-1.5 h-[190px]'>
            {displayData.map((day) => {
              const isHovered = hoveredDay?.id === day.id;

              // Generate array of blocks from top down
              const blockCells = Array.from({ length: maxBlocks }, (_, i) => {
                const cellIndex = i + 1; // 1 to 16
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
                  onMouseEnter={() => setHoveredDay(day)}
                  onMouseLeave={() => setHoveredDay(null)}
                >
                  {/* Vertical Stack of Blocks */}
                  <div className='w-full flex flex-col gap-[2px] sm:gap-[3px]'>
                    {blockCells.map(({ cellIndex, isOver, isTouring, isClassic }) => {
                      if (isOver) {
                        return (
                          <div
                            key={cellIndex}
                            className='h-[8px] sm:h-[9px] w-full rounded-[1.5px] border border-dashed border-border/20 bg-transparent opacity-10'
                          />
                        );
                      }
                      if (isTouring) {
                        return (
                          <div
                            key={cellIndex}
                            className={cn(
                              'h-[8px] sm:h-[9px] w-full rounded-[1.5px] transition-all duration-100 shadow-xs',
                              day.highlight
                                ? 'bg-rose-500 hover:bg-rose-400'
                                : 'bg-amber-500 hover:bg-amber-400',
                              isHovered && 'scale-105 brightness-115'
                            )}
                          />
                        );
                      }
                      if (isClassic) {
                        return (
                          <div
                            key={cellIndex}
                            className={cn(
                              'h-[8px] sm:h-[9px] w-full rounded-[1.5px] transition-all duration-100 bg-zinc-500/80 dark:bg-zinc-600 hover:bg-zinc-400 border border-zinc-500/20',
                              isHovered && 'scale-105'
                            )}
                          />
                        );
                      }
                      return null;
                    })}
                  </div>

                  {/* Day label below column */}
                  <span className='mt-1.5 font-mono text-[9px] sm:text-[10px] text-muted-foreground group-hover:text-foreground'>
                    {day.dayLabel}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Fortnight Sub-period summary brackets (matching image 3) */}
          {timeframe === '30d' && (
            <div className='grid grid-cols-2 gap-4 mt-2 pt-2 border-t border-border/30 text-xs font-mono'>
              <div className='text-left pl-2'>
                <span className='text-muted-foreground text-[10px]'>1 - 15 Oct Fortnight</span>
                <div className='text-foreground font-semibold text-[11px]'>
                  ${firstTotal.toLocaleString()}{' '}
                  <span className='text-[10px] font-normal text-muted-foreground'>142 drives</span>
                </div>
              </div>
              <div className='text-right pr-2'>
                <span className='text-muted-foreground text-[10px]'>16 - 30 Oct Fortnight</span>
                <div className='text-foreground font-semibold text-[11px]'>
                  ${secondTotal.toLocaleString()}{' '}
                  <span className='text-[10px] font-normal text-emerald-500'>+14% velocity</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Dynamic Telemetry Popover Bar */}
        <div className='mt-3 pt-2.5 border-t border-border/50 min-h-[44px] flex items-center justify-between text-xs'>
          {hoveredDay ? (
            <div className='flex items-center justify-between w-full animate-in fade-in duration-100'>
              <div className='flex items-center gap-2'>
                <span
                  className={cn(
                    'size-2 rounded-full',
                    hoveredDay.highlight ? 'bg-rose-500' : 'bg-amber-500'
                  )}
                />
                <span className='font-bold text-foreground'>{hoveredDay.dateStr}</span>
                <span className='text-muted-foreground font-mono text-[11px]'>
                  ({hoveredDay.tripsCount} Active Trips)
                </span>
              </div>
              <div className='flex items-center gap-3 font-mono text-[11px]'>
                <span className='text-muted-foreground'>
                  Blocks: <strong className='text-rose-500'>{hoveredDay.touringBlocks} Touring</strong> +{' '}
                  <strong className='text-zinc-400'>{hoveredDay.classicBlocks} Classic</strong>
                </span>
                <span className='font-bold text-foreground bg-muted/60 px-2 py-0.5 rounded border border-border/50'>
                  ${hoveredDay.revenue.toLocaleString()} Rev
                </span>
              </div>
            </div>
          ) : (
            <div className='flex items-center justify-between w-full text-muted-foreground text-[11px]'>
              <span className='flex items-center gap-1.5'>
                <Icons.info className='size-3.5 text-muted-foreground/70' />
                Each column block represents a $550 revenue tranche. Hover columns to view day telemetry.
              </span>
              <span className='font-mono text-[10px] font-semibold text-emerald-600 dark:text-emerald-400'>
                $148,920 MTD Total
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
