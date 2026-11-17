import type { Post } from '../types'

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="min-w-0 overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/50 p-4 transition hover:border-slate-700 hover:bg-slate-950/80 sm:p-5">
      <div className="flex min-w-0 items-start justify-between gap-4">
        <h3 className="min-w-0 break-words text-base font-bold leading-7 text-slate-100 first-letter:uppercase sm:text-lg">
          {post.title}
        </h3>
        {post.localId && (
          <span className="shrink-0 rounded-full bg-emerald-950 px-2.5 py-1 text-xs font-medium text-emerald-300">
            Nueva
          </span>
        )}
      </div>
      <p className="mt-3 whitespace-pre-line break-words text-sm leading-7 text-slate-400 first-letter:uppercase sm:text-base">
        {post.body}
      </p>
    </article>
  )
}
