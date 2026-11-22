'use client';

import { LabelList, Pie, PieChart } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import { Icons } from '@/components/icons';

const chartData = [
  { category: 'classic', share: 32, fill: 'var(--color-classic, #18181b)' },
  { category: 'city', share: 28, fill: 'var(--color-city, #52525b)' },
  { category: 'touring', share: 24, fill: 'var(--color-touring, #71717a)' },
  { category: 'electric', share: 16, fill: 'var(--color-electric, #a1a1aa)' }
];

const chartConfig = {
  share: {
    label: 'Fleet Share %'
  },
  classic: {
    label: 'Classic & Vintage (32%)',
    theme: {
      light: '#18181b',
      dark: '#f4f4f5'
    }
  },
  city: {
    label: 'City Compact (28%)',
    theme: {
      light: '#52525b',
      dark: '#d4d4d8'
    }
  },
  touring: {
    label: 'Touring & 4x4 (24%)',
    theme: {
      light: '#71717a',
      dark: '#71717a'
    }
  },
  electric: {
    label: 'Electric EV (16%)',
    theme: {
      light: '#a1a1aa',
      dark: '#3f3f46'
    }
  }
} satisfies ChartConfig;

export function PieGraph() {
  return (
    <Card className='flex h-full flex-col border border-border/70 bg-card shadow-xs'>
      <CardHeader className='pb-0'>
        <div className='flex items-center justify-between'>
          <CardTitle className='flex items-center gap-2 text-foreground'>
            <Icons.steeringWheel className='size-5 text-foreground' />
            Fleet Category Share
          </CardTitle>
          <span className='text-xs font-mono font-medium text-muted-foreground bg-muted/50 border border-border/50 px-2 py-0.5 rounded'>
            48 Vehicles
          </span>
        </div>
        <CardDescription className='text-xs text-muted-foreground'>
          Breakdown of active Detour fleet by category
        </CardDescription>
      </CardHeader>
      <CardContent className='flex-1 pb-2'>
        <ChartContainer
          config={chartConfig}
          className='mx-auto aspect-square max-h-[240px]'
        >
          <PieChart>
            <ChartTooltip
              content={
                <ChartTooltipContent
                  nameKey='category'
                  formatter={(value, name) => [
                    `${value}% of Total Fleet`,
                    name === 'classic'
                      ? 'Classic & Vintage'
                      : name === 'city'
                        ? 'City Compact'
                        : name === 'touring'
                          ? 'Touring & 4x4'
                          : 'Electric EV'
                  ]}
                />
              }
            />
            <Pie data={chartData} dataKey='share' nameKey='category' innerRadius={42} stroke='var(--card)' strokeWidth={2}>
              <LabelList
                dataKey='share'
                className='fill-white dark:fill-black font-bold text-xs'
                stroke='none'
                fontSize={11}
                formatter={(val: unknown) => `${String(val)}%`}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
        <div className='mt-2 grid grid-cols-2 gap-2 text-xs'>
          <div className='flex items-center gap-1.5'>
            <span className='size-2.5 rounded-full bg-zinc-900 dark:bg-zinc-100' />
            <span className='text-muted-foreground'>Classic: 15 cars</span>
          </div>
          <div className='flex items-center gap-1.5'>
            <span className='size-2.5 rounded-full bg-zinc-700 dark:bg-zinc-300' />
            <span className='text-muted-foreground'>City: 14 cars</span>
          </div>
          <div className='flex items-center gap-1.5'>
            <span className='size-2.5 rounded-full bg-zinc-500 dark:bg-zinc-500' />
            <span className='text-muted-foreground'>Touring: 11 cars</span>
          </div>
          <div className='flex items-center gap-1.5'>
            <span className='size-2.5 rounded-full bg-zinc-400 dark:bg-zinc-700' />
            <span className='text-muted-foreground'>Electric: 8 cars</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
