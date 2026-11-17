import type { Post } from '../types'

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="h-full rounded-xl border border-slate-800 bg-slate-900 p-5 shadow-lg shadow-slate-950/20">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-semibold leading-7 text-slate-100 first-letter:uppercase">
          {post.title}
        </h3>
        {post.localId && (
          <span className="shrink-0 rounded-full bg-emerald-950 px-2.5 py-1 text-xs font-medium text-emerald-300">
            Nueva
          </span>
        )}
      </div>
      <p className="mt-3 whitespace-pre-line leading-7 text-slate-300 first-letter:uppercase">
        {post.body}
      </p>
    </article>
  )
}
