'use client';

import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import { Icons } from '@/components/icons';
import React from 'react';

const chartData = [
  { month: 'January', classic: 8400, touring: 14200 },
  { month: 'February', classic: 11200, touring: 16800 },
  { month: 'March', classic: 14600, touring: 19500 },
  { month: 'April', classic: 17800, touring: 21300 },
  { month: 'May', classic: 21400, touring: 24900 },
  { month: 'June', classic: 26800, touring: 29800 },
  { month: 'July', classic: 29500, touring: 32400 },
  { month: 'August', classic: 31200, touring: 34100 },
  { month: 'September', classic: 24500, touring: 27900 },
  { month: 'October', classic: 21800, touring: 23600 },
  { month: 'November', classic: 23400, touring: 26800 },
  { month: 'December', classic: 28900, touring: 31500 }
];

const chartConfig = {
  classic: {
    label: 'Classic & Scenic Fleet ($)',
    theme: {
      light: '#71717a',
      dark: '#a1a1aa'
    }
  },
  touring: {
    label: 'City & Touring 4x4 ($)',
    theme: {
      light: '#09090b',
      dark: '#ffffff'
    }
  }
} satisfies ChartConfig;

export function AreaGraph() {
  return (
    <Card className='border border-border/70 bg-card shadow-xs'>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div>
            <CardTitle className='flex items-center gap-2 text-foreground'>
              <Icons.car className='size-5 text-foreground' />
              Fleet Rental Revenue Velocity
              <span className='inline-flex items-center gap-1 rounded-md bg-emerald-600 px-2 py-0.5 text-xs font-semibold text-white shadow-xs ml-1'>
                <Icons.trendingUp className='size-3 text-white' />
                +18.4%
              </span>
            </CardTitle>
            <CardDescription className='text-xs text-muted-foreground'>
              Monthly rental revenue across Classic/Scenic and City/Touring categories
            </CardDescription>
          </div>
          <span className='text-xs font-medium text-muted-foreground bg-muted/50 border border-border/50 px-2.5 py-1 rounded-md'>
            All 7 Depots
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart accessibilityLayer data={chartData}>
            <defs>
              <linearGradient id='fade-touring' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='5%' stopColor='var(--color-touring)' stopOpacity={0.25} />
                <stop offset='95%' stopColor='var(--color-touring)' stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id='fade-classic' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='5%' stopColor='var(--color-classic)' stopOpacity={0.18} />
                <stop offset='95%' stopColor='var(--color-classic)' stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray='3 3' className='stroke-border/50' />
            <XAxis
              dataKey='month'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              className='text-xs fill-muted-foreground'
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  formatter={(value, name) => [
                    `$${Number(value).toLocaleString()}`,
                    name === 'classic' ? 'Classic & Scenic' : 'City & Touring'
                  ]}
                />
              }
            />
            <Area
              dataKey='touring'
              type='natural'
              fill='url(#fade-touring)'
              fillOpacity={1}
              stroke='var(--color-touring, #09090b)'
              stackId='a'
              strokeWidth={1.8}
            />
            <Area
              dataKey='classic'
              type='natural'
              fill='url(#fade-classic)'
              fillOpacity={1}
              stroke='var(--color-classic, #71717a)'
              stackId='a'
              strokeWidth={1.8}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
