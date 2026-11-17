import type { Post } from '../types'

import { PostCard } from './PostCard'

interface PostListProps {
  posts: Post[]
}

export function PostList({ posts }: PostListProps) {
  if (posts.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-950/40 px-6 py-12 text-center">
        <p className="font-semibold text-slate-200">Todavía no hay publicaciones</p>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Usa el formulario anterior para crear la primera.
        </p>
      </div>
    )
  }

  return (
    <ul className="min-w-0 space-y-4" aria-label="Publicaciones del usuario seleccionado">
      {posts.map((post) => (
        <li key={post.localId ?? `remote-${post.id}`}>
          <PostCard post={post} />
        </li>
      ))}
    </ul>
  )
}
