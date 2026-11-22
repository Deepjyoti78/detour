export default function DashboardLoading() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-6 md:p-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between pb-4 border-b border-border/60">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-lg bg-muted border border-border/60" />
          <div className="space-y-1.5">
            <div className="h-6 w-48 rounded bg-muted" />
            <div className="h-3.5 w-72 rounded bg-muted/60" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-8 w-24 rounded-md bg-muted" />
          <div className="h-8 w-28 rounded-md bg-muted" />
        </div>
      </div>

      {/* KPI Cards Skeleton */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="rounded-xl border border-border/70 bg-card p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="h-3.5 w-28 rounded bg-muted" />
              <div className="size-4 rounded bg-muted" />
            </div>
            <div className="h-8 w-24 rounded bg-muted" />
            <div className="h-3 w-36 rounded bg-muted/60" />
          </div>
        ))}
      </div>

      {/* Charts Grid Skeleton */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4 h-72 rounded-xl border border-border/70 bg-card p-5" />
        <div className="col-span-4 md:col-span-3 h-72 rounded-xl border border-border/70 bg-card p-5" />
      </div>
    </div>
  );
}
