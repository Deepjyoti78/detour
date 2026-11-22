'use client';

import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import { Icons } from '@/components/icons';

const chartData = [
  { depot: 'Mumbai', onRoad: 10, inDepot: 2 },
  { depot: 'Delhi', onRoad: 9, inDepot: 1 },
  { depot: 'Bengaluru', onRoad: 7, inDepot: 1 },
  { depot: 'Goa', onRoad: 8, inDepot: 0 },
  { depot: 'Jaipur', onRoad: 5, inDepot: 1 },
  { depot: 'Portland', onRoad: 7, inDepot: 1 },
  { depot: 'Hyderabad', onRoad: 4, inDepot: 2 }
];

const chartConfig = {
  onRoad: {
    label: 'Vehicles on Road (Rented)',
    theme: {
      light: '#09090b',
      dark: '#f4f4f5'
    }
  },
  inDepot: {
    label: 'Available in Depot',
    theme: {
      light: '#71717a',
      dark: '#52525b'
    }
  }
} satisfies ChartConfig;

export function BarGraph() {
  return (
    <Card className='border border-border/70 bg-card shadow-xs'>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div>
            <CardTitle className='flex items-center gap-2 text-foreground'>
              <Icons.depot className='size-5 text-foreground' />
              Depot Hub Fleet Distribution
              <span className='ml-1 inline-flex items-center gap-1 rounded-md bg-emerald-600 px-2 py-0.5 text-xs font-semibold text-white shadow-xs'>
                <Icons.trendingUp className='size-3 text-white' />
                88.4% Average Utilization
              </span>
            </CardTitle>
            <CardDescription className='text-xs text-muted-foreground'>
              Active rentals vs available vehicles by regional hub
            </CardDescription>
          </div>
          <span className='inline-flex items-center rounded-md bg-emerald-600 px-2.5 py-1 text-xs font-semibold text-white shadow-xs'>
            Goa: 100% Full
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} strokeDasharray='3 3' className='stroke-border/50' />
            <XAxis
              dataKey='depot'
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              className='text-xs fill-muted-foreground font-medium'
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  formatter={(value, name) => [
                    `${value} cars`,
                    name === 'onRoad' ? 'On Road (Rented)' : 'Available in Depot'
                  ]}
                />
              }
            />
            <Bar
              dataKey='onRoad'
              fill='var(--color-onRoad, #09090b)'
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey='inDepot'
              fill='var(--color-inDepot, #71717a)'
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
