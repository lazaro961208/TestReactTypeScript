interface ErrorStateProps {
  title: string
  message: string
  onRetry: () => void
  isRetrying?: boolean
}

export function ErrorState({
  title,
  message,
  onRetry,
  isRetrying = false,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className="rounded-xl border border-red-900/80 bg-red-950/40 p-5 text-red-100"
    >
      <div className="flex items-start gap-3">
        <span
          aria-hidden="true"
          className="flex size-9 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-lg font-semibold text-red-300"
        >
          !
        </span>
        <div className="min-w-0">
          <p className="font-semibold">{title}</p>
          <p className="mt-1 text-sm leading-6 text-red-200/80">{message}</p>
        </div>
      </div>

      <button
        type="button"
        onClick={onRetry}
        disabled={isRetrying}
        className="mt-4 inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-red-700 bg-red-950 px-4 py-2 text-sm font-semibold text-red-100 transition hover:border-red-500 hover:bg-red-900/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isRetrying && (
          <span
            aria-hidden="true"
            className="size-3.5 animate-spin rounded-full border-2 border-red-300/40 border-t-red-100 motion-reduce:animate-none"
          />
        )}
        {isRetrying ? 'Reintentando…' : 'Reintentar'}
      </button>
    </div>
  )
}
