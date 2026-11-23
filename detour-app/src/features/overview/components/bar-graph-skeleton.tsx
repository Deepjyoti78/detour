import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export function BarGraphSkeleton() {
  return (
    <Card className='border border-border/70 bg-card shadow-xs'>
      <CardHeader className='pb-3'>
        <div className='flex items-center justify-between'>
          <Skeleton className='h-5 w-48' />
          <Skeleton className='h-4 w-32' />
        </div>
        <Skeleton className='h-3.5 w-64 mt-1' />
      </CardHeader>
      <CardContent className='pt-2 pb-4'>
        <div className='flex items-end justify-between gap-3 pt-4 pb-2 px-3 rounded-lg bg-muted/15 border border-border/40'>
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className='flex-1 flex flex-col items-center gap-1.5'>
              <Skeleton className='h-3 w-6' />
              <div className='w-full max-w-[34px] flex flex-col gap-1 py-1'>
                {Array.from({ length: 10 }).map((_, j) => (
                  <Skeleton key={j} className='h-2.5 w-full rounded-[2px]' />
                ))}
              </div>
              <Skeleton className='h-3.5 w-12 mt-1' />
            </div>
          ))}
        </div>
        <div className='mt-3 pt-2.5 border-t border-border/50'>
          <Skeleton className='h-4 w-full' />
        </div>
      </CardContent>
    </Card>
  );
}
