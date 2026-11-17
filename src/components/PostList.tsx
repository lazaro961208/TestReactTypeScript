import type { Post } from '../types'

import { PostCard } from './PostCard'

interface PostListProps {
  posts: Post[]
}

export function PostList({ posts }: PostListProps) {
  if (posts.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-slate-700 bg-slate-900/60 px-6 py-10 text-center text-slate-300">
        Este usuario todavía no tiene publicaciones.
      </p>
    )
  }

  return (
    <ul className="space-y-4" aria-label="Publicaciones del usuario seleccionado">
      {posts.map((post) => (
        <li key={post.localId ?? `remote-${post.id}`}>
          <PostCard post={post} />
        </li>
      ))}
    </ul>
  )
}
