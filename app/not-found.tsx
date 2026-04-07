import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center space-y-4">
      <h1 className="text-4xl font-medium text-zinc-900 dark:text-zinc-100">
        404
      </h1>
      <p className="text-zinc-600 dark:text-zinc-400">
        This page could not be found.
      </p>
      <Link
        href="/"
        className="text-sm text-zinc-500 underline transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
      >
        Go back home
      </Link>
    </div>
  )
}
