import { useMemo, useState } from 'react'

import {
  ErrorState,
  LoadingState,
  UserList,
  UserPosts,
  UserSearch,
} from './components'
import { useUsers } from './hooks'
import type { User } from './types'

function App() {
  const [search, setSearch] = useState('')
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const {
    data: users = [],
    isPending,
    isError,
    isFetching,
    refetch: refetchUsers,
  } = useUsers()

  const filteredUsers = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase()

    if (!normalizedSearch) {
      return users
    }

    return users.filter((user) =>
      user.name.toLocaleLowerCase().includes(normalizedSearch),
    )
  }, [search, users])

  return (
    <main className="min-h-screen overflow-x-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none fixed inset-x-0 top-0 h-96 bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.12),transparent_45%)]" />

      <div className="relative mx-auto max-w-[90rem] px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
        <header className="max-w-3xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-sky-400 sm:text-sm">
            Etapa 5 · Experiencia de usuario
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Usuarios y publicaciones
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg sm:leading-8">
            Explora el directorio, consulta publicaciones y comparte contenido desde un único espacio.
          </p>
        </header>

        <div className="mt-8 grid min-w-0 items-start gap-6 lg:grid-cols-[22rem_minmax(0,1fr)] xl:gap-8">
          <aside className="min-w-0 overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/70 shadow-2xl shadow-black/20 backdrop-blur lg:sticky lg:top-4 lg:max-h-[calc(100vh-2rem)] lg:overflow-y-auto">
            <section aria-labelledby="users-heading" className="p-4 sm:p-5">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-400">
                    Personas
                  </p>
                  <h2 id="users-heading" className="mt-1 text-xl font-bold text-white">
                    Directorio
                  </h2>
                </div>
                {!isPending && !isError && (
                  <p
                    className="shrink-0 rounded-full bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-300"
                    aria-live="polite"
                  >
                    {filteredUsers.length} de {users.length}
                  </p>
                )}
              </div>

              <div className="mt-5">
                <UserSearch value={search} onChange={setSearch} />
              </div>

              <div className="mt-5">
                {isPending && (
                  <LoadingState label="Cargando usuarios" rows={4} />
                )}

                {isError && (
                  <ErrorState
                    title="No pudimos cargar los usuarios"
                    message="Comprueba tu conexión y vuelve a intentarlo."
                    onRetry={() => void refetchUsers()}
                    isRetrying={isFetching}
                  />
                )}

                {!isPending && !isError && (
                  <UserList
                    users={filteredUsers}
                    selectedUserId={selectedUser?.id ?? null}
                    onSelectUser={setSelectedUser}
                  />
                )}
              </div>
            </section>
          </aside>

          <div className="min-w-0">
            <UserPosts
              key={selectedUser?.id ?? 'no-user'}
              user={selectedUser}
            />
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
