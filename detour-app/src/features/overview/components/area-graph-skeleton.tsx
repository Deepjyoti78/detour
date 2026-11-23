import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export function AreaGraphSkeleton() {
  return (
    <Card className='border border-border/70 bg-card shadow-xs'>
      <CardHeader className='pb-3'>
        <div className='flex items-center justify-between'>
          <Skeleton className='h-5 w-52' />
          <Skeleton className='h-8 w-44 rounded-lg' />
        </div>
        <Skeleton className='h-3.5 w-64 mt-1' />
      </CardHeader>
      <CardContent className='pt-1 pb-3'>
        <div className='flex items-end justify-between gap-1 pt-3 pb-2 px-3 rounded-lg bg-muted/20 border border-border/40'>
          {Array.from({ length: 15 }).map((_, i) => (
            <div key={i} className='flex-1 flex flex-col items-center gap-1'>
              <div className='flex flex-col gap-[2px] items-center'>
                {Array.from({ length: 10 }).map((_, j) => (
                  <Skeleton key={j} className='size-2.5 aspect-square rounded-[1.5px]' />
                ))}
              </div>
              <Skeleton className='h-2.5 w-3 mt-1' />
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
