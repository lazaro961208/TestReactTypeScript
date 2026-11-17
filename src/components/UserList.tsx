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
      <p className="rounded-xl border border-dashed border-slate-700 bg-slate-900/60 px-6 py-10 text-center text-slate-300">
        No se encontraron usuarios que coincidan con la búsqueda.
      </p>
    )
  }

  return (
    <ul className="grid gap-4 sm:grid-cols-2" aria-label="Lista de usuarios">
      {users.map((user) => {
        const isSelected = selectedUserId === user.id

        return (
          <li
            key={user.id}
            className={`rounded-xl border p-5 shadow-lg shadow-slate-950/20 transition ${
              isSelected
                ? 'border-sky-500 bg-sky-950/40 ring-1 ring-sky-500/40'
                : 'border-slate-800 bg-slate-900'
            }`}
          >
            <button
              type="button"
              onClick={() => onSelectUser(user)}
              aria-pressed={isSelected}
              className="w-full rounded-md text-left outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-4 focus-visible:ring-offset-slate-900"
            >
              <span className="flex items-start justify-between gap-3">
                <span>
                  <span className="block text-lg font-semibold text-slate-100">
                    {user.name}
                  </span>
                  <span className="mt-1 block text-sm text-sky-400">
                    @{user.username}
                  </span>
                </span>
                <span className="rounded-full bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-300">
                  {isSelected ? 'Seleccionado' : 'Ver posts'}
                </span>
              </span>
            </button>
            <a
              href={`mailto:${user.email}`}
              className="mt-4 inline-block break-all text-sm text-slate-300 underline decoration-slate-600 underline-offset-4 transition hover:text-white focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
            >
              {user.email}
            </a>
          </li>
        )
      })}
    </ul>
  )
}
