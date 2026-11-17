import type { User } from '../types'

interface UserListProps {
  users: User[]
  selectedUserId: number | null
  onSelectUser: (user: User) => void
}

export function UserList({
  users,
  selectedUserId,
  onSelectUser,
}: UserListProps) {
  if (users.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-700 bg-slate-950/40 px-5 py-9 text-center">
        <p className="font-semibold text-slate-200">Sin coincidencias</p>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Prueba con otro nombre o elimina parte de la búsqueda.
        </p>
      </div>
    )
  }

  return (
    <ul className="space-y-2" aria-label="Lista de usuarios">
      {users.map((user) => {
        const isSelected = selectedUserId === user.id

        return (
          <li
            key={user.id}
            className={`min-w-0 rounded-xl border p-3.5 transition ${
              isSelected
                ? 'border-sky-500/80 bg-sky-500/10 shadow-lg shadow-sky-950/20 ring-1 ring-sky-500/30'
                : 'border-slate-800 bg-slate-950/40 hover:border-slate-700 hover:bg-slate-800/60'
            }`}
          >
            <button
              type="button"
              onClick={() => onSelectUser(user)}
              aria-pressed={isSelected}
              className="w-full min-w-0 rounded-lg text-left outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
            >
              <span className="flex items-start justify-between gap-3">
                <span className="min-w-0">
                  <span className="block truncate font-semibold text-slate-100">
                    {user.name}
                  </span>
                  <span className="mt-1 block truncate text-sm text-slate-400">
                    @{user.username}
                  </span>
                </span>
                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${
                    isSelected
                      ? 'bg-sky-400 text-slate-950'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {isSelected ? 'Activo' : 'Ver'}
                </span>
              </span>
            </button>
            <a
              href={`mailto:${user.email}`}
              className="mt-3 block truncate rounded text-xs text-slate-500 transition hover:text-slate-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
              title={user.email}
            >
              {user.email}
            </a>
          </li>
        )
      })}
    </ul>
  )
}
