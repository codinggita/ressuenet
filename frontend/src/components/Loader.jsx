export function Spinner({ size = 'md', label = 'Loading...' }) {
  const sizes = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-[3px]',
    lg: 'h-12 w-12 border-4',
  };

  return (
    <div className="flex items-center justify-center gap-3 text-on-surface-variant">
      <div className={`${sizes[size]} animate-spin rounded-full border-primary/20 border-t-primary`} />
      {label ? <span className="text-sm font-semibold">{label}</span> : null}
    </div>
  );
}

export function PageLoader({ label = 'Loading page...' }) {
  return (
    <div className="flex min-h-[50vh] items-center justify-center px-4">
      <Spinner size="lg" label={label} />
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-outline-variant/10 bg-white p-4 shadow-sm">
      <div className="mb-4 aspect-[4/3] rounded-xl bg-surface-container-high" />
      <div className="mb-2 h-4 w-2/3 rounded bg-surface-container-high" />
      <div className="mb-4 h-3 w-1/2 rounded bg-surface-container-high" />
      <div className="h-10 rounded-xl bg-surface-container-high" />
    </div>
  );
}
