import { useMemo, useState } from 'react'

import { UserList, UserSearch } from './components'
import { useUsers } from './hooks'

function App() {
  const [search, setSearch] = useState('')
  const { data: users = [], isPending, isError } = useUsers()

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
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-slate-100">
      <div className="mx-auto max-w-4xl">
        <header className="max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-sky-400">
            Etapa 2
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Usuarios
          </h1>
          <p className="mt-4 text-lg leading-8 text-slate-300">
            Consulta el directorio y filtra los resultados por nombre.
          </p>
        </header>

        <section className="mt-10" aria-labelledby="users-heading">
          <h2 id="users-heading" className="sr-only">
            Directorio de usuarios
          </h2>

          <UserSearch value={search} onChange={setSearch} />

          <div className="mt-4 flex min-h-6 items-center" aria-live="polite">
            {!isPending && !isError && (
              <p className="text-sm text-slate-400">
                {filteredUsers.length}{' '}
                {filteredUsers.length === 1 ? 'usuario encontrado' : 'usuarios encontrados'}
              </p>
            )}
          </div>

          <div className="mt-4">
            {isPending && (
              <p className="rounded-xl bg-slate-900 px-6 py-10 text-center text-slate-300">
                Cargando usuarios…
              </p>
            )}

            {isError && (
              <p
                role="alert"
                className="rounded-xl border border-red-900 bg-red-950/50 px-6 py-4 text-red-200"
              >
                No se pudieron cargar los usuarios. Inténtalo de nuevo más tarde.
              </p>
            )}

            {!isPending && !isError && <UserList users={filteredUsers} />}
          </div>
        </section>
      </div>
    </main>
  )
}

export default App
