'use client'

export default function Error({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center space-y-4">
      <h1 className="text-4xl font-medium text-zinc-900 dark:text-zinc-100">
        Oops
      </h1>
      <p className="text-zinc-600 dark:text-zinc-400">
        Something went wrong.
      </p>
      <button
        onClick={reset}
        className="text-sm text-zinc-500 underline transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
      >
        Try again
      </button>
    </div>
  )
}
