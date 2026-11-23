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
      <CardContent className='pt-1 pb-3'>
        <div className='flex items-end justify-between gap-3 pt-3 pb-2 px-3 rounded-lg bg-muted/20 border border-border/40'>
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className='flex-1 flex flex-col items-center gap-1.5'>
              <Skeleton className='h-3 w-6' />
              <div className='flex flex-col gap-[2.5px] py-1 items-center'>
                {Array.from({ length: 11 }).map((_, j) => (
                  <Skeleton key={j} className='size-3 sm:size-3.5 aspect-square rounded-[2px]' />
                ))}
              </div>
              <Skeleton className='h-3.5 w-12 mt-1' />
            </div>
          ))}
        </div>
        <div className='mt-2.5 pt-2 border-t border-border/40'>
          <Skeleton className='h-4 w-full' />
        </div>
      </CardContent>
    </Card>
  );
}
