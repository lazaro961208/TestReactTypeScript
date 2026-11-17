import type { User } from '../types'

interface UserListProps {
  users: User[]
}

export function UserList({ users }: UserListProps) {
  if (users.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-slate-700 bg-slate-900/60 px-6 py-10 text-center text-slate-300">
        No se encontraron usuarios que coincidan con la búsqueda.
      </p>
    )
  }

  return (
    <ul className="grid gap-4 sm:grid-cols-2" aria-label="Lista de usuarios">
      {users.map((user) => (
        <li
          key={user.id}
          className="rounded-xl border border-slate-800 bg-slate-900 p-5 shadow-lg shadow-slate-950/20"
        >
          <h2 className="text-lg font-semibold text-slate-100">{user.name}</h2>
          <p className="mt-1 text-sm text-sky-400">@{user.username}</p>
          <a
            href={`mailto:${user.email}`}
            className="mt-4 inline-block break-all text-sm text-slate-300 underline decoration-slate-600 underline-offset-4 transition hover:text-white focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
          >
            {user.email}
          </a>
        </li>
      ))}
    </ul>
  )
}
