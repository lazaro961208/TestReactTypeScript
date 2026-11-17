import { usePostsByUser } from '../hooks'
import type { User } from '../types'
import { CreatePostForm } from './CreatePostForm'
import { ErrorState } from './ErrorState'
import { LoadingState } from './LoadingState'
import { PostList } from './PostList'

interface UserPostsProps {
  user: User | null
}

export function UserPosts({ user }: UserPostsProps) {
  const {
    data: posts = [],
    isPending,
    isError,
    isFetching,
    refetch: refetchPosts,
  } = usePostsByUser(user?.id ?? null)

  if (!user) {
    return (
      <section
        aria-labelledby="posts-heading"
        className="flex min-h-[32rem] items-center justify-center overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 shadow-2xl shadow-black/20"
      >
        <div className="max-w-md text-center">
          <span
            aria-hidden="true"
            className="mx-auto flex size-14 items-center justify-center rounded-2xl border border-slate-700 bg-slate-800/80 text-xl font-bold text-sky-400"
          >
            01
          </span>
          <h2 id="posts-heading" className="mt-5 text-2xl font-bold text-white">
            Selecciona un usuario
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-400 sm:text-base">
            Elige un perfil del directorio para consultar sus publicaciones y crear contenido nuevo.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section
      aria-labelledby="posts-heading"
      aria-busy={isPending || isFetching}
      className="min-w-0 overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/60 shadow-2xl shadow-black/20"
    >
      <header className="border-b border-slate-800 px-4 py-5 sm:px-6">
        <div className="flex min-w-0 flex-wrap items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-400">
              Perfil seleccionado
            </p>
            <h2 id="posts-heading" className="mt-1 truncate text-2xl font-bold text-white">
              {user.name}
            </h2>
            <p className="mt-1 truncate text-sm text-slate-400">
              @{user.username} · {user.email}
            </p>
          </div>
          {!isPending && !isError && (
            <span className="shrink-0 rounded-full border border-slate-700 bg-slate-950/60 px-3 py-1.5 text-xs font-semibold text-slate-300">
              {posts.length} {posts.length === 1 ? 'publicación' : 'publicaciones'}
            </span>
          )}
        </div>
      </header>

      <div className="min-w-0 p-4 sm:p-6">
        <CreatePostForm userId={user.id} />

        <div className="mt-8">
          <div className="mb-4 flex items-center justify-between gap-4">
            <h3 className="text-lg font-bold text-white">Publicaciones</h3>
            {isFetching && !isPending && (
              <span className="flex items-center gap-2 text-xs font-medium text-slate-400" role="status">
                <span
                  aria-hidden="true"
                  className="size-3 animate-spin rounded-full border-2 border-slate-600 border-t-sky-400 motion-reduce:animate-none"
                />
                Actualizando
              </span>
            )}
          </div>

          {isPending && (
            <LoadingState label="Cargando publicaciones" rows={3} />
          )}

          {isError && (
            <ErrorState
              title="No pudimos cargar las publicaciones"
              message="La conexión falló o el servicio no está disponible. Puedes intentarlo de nuevo."
              onRetry={() => void refetchPosts()}
              isRetrying={isFetching}
            />
          )}

          {!isPending && !isError && <PostList posts={posts} />}
        </div>
      </div>
    </section>
  )
}
