interface LoadingStateProps {
  label: string
  rows?: number
}

export function LoadingState({ label, rows = 3 }: LoadingStateProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="rounded-xl border border-slate-800 bg-slate-900/70 p-4"
    >
      <div className="flex items-center gap-3 text-sm font-medium text-slate-300">
        <span
          aria-hidden="true"
          className="size-4 animate-spin rounded-full border-2 border-slate-600 border-t-sky-400 motion-reduce:animate-none"
        />
        {label}
      </div>

      <div className="mt-4 space-y-3" aria-hidden="true">
        {Array.from({ length: rows }, (_, index) => (
          <div
            key={index}
            className="h-20 animate-pulse rounded-lg bg-slate-800/80 motion-reduce:animate-none"
          />
        ))}
      </div>
    </div>
  )
}
