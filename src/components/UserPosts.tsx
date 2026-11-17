import { usePostsByUser } from '../hooks'
import type { User } from '../types'
import { PostList } from './PostList'

interface UserPostsProps {
  user: User | null
}

export function UserPosts({ user }: UserPostsProps) {
  const { data: posts = [], isPending, isError } = usePostsByUser(user?.id ?? null)

  if (!user) {
    return (
      <section aria-labelledby="posts-heading">
        <h2 id="posts-heading" className="text-2xl font-bold text-slate-100">
          Publicaciones
        </h2>
        <div className="mt-4 rounded-xl border border-dashed border-slate-700 bg-slate-900/60 px-6 py-12 text-center">
          <p className="font-medium text-slate-200">Selecciona un usuario</p>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Sus publicaciones aparecerán en este espacio.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section aria-labelledby="posts-heading">
      <h2 id="posts-heading" className="text-2xl font-bold text-slate-100">
        Publicaciones de {user.name}
      </h2>

      <div className="mt-4" aria-live="polite">
        {isPending && (
          <p className="rounded-xl bg-slate-900 px-6 py-10 text-center text-slate-300">
            Cargando publicaciones…
          </p>
        )}

        {isError && (
          <p
            role="alert"
            className="rounded-xl border border-red-900 bg-red-950/50 px-6 py-4 text-red-200"
          >
            No se pudieron cargar las publicaciones. Inténtalo de nuevo más tarde.
          </p>
        )}

        {!isPending && !isError && <PostList posts={posts} />}
      </div>
    </section>
  )
}
