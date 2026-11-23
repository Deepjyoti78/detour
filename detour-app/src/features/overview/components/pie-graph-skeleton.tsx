import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export function PieGraphSkeleton() {
  return (
    <Card className='flex h-full flex-col border border-border/70 bg-card shadow-xs'>
      <CardHeader className='pb-3'>
        <div className='flex items-center justify-between'>
          <Skeleton className='h-5 w-36' />
          <Skeleton className='h-4 w-16' />
        </div>
        <Skeleton className='h-3.5 w-48 mt-1' />
      </CardHeader>
      <CardContent className='flex-1 flex flex-col justify-between pt-0 pb-4'>
        <div className='flex flex-col lg:flex-row items-center gap-4 justify-between'>
          <div className='grid grid-cols-10 gap-1.5 p-2 rounded-lg bg-muted/20 border border-border/40'>
            {Array.from({ length: 50 }).map((_, i) => (
              <Skeleton key={i} className='size-5 sm:size-6 rounded-[3px]' />
            ))}
          </div>
          <div className='flex flex-col gap-2 w-full lg:w-44'>
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className='h-8 w-full rounded-md' />
            ))}
          </div>
        </div>
        <div className='mt-3 pt-2.5 border-t border-border/50'>
          <Skeleton className='h-4 w-full' />
        </div>
      </CardContent>
    </Card>
  );
}
