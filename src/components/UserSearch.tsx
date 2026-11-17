interface UserSearchProps {
  value: string
  onChange: (value: string) => void
}

export function UserSearch({ value, onChange }: UserSearchProps) {
  return (
    <div className="space-y-2">
      <label htmlFor="user-search" className="block text-sm font-semibold text-slate-200">
        Buscar por nombre
      </label>
      <div className="relative">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-500"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <input
          id="user-search"
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Ej. Leanne Graham"
          autoComplete="off"
          className="min-h-11 w-full rounded-xl border border-slate-700 bg-slate-950/80 py-2.5 pl-10 pr-4 text-slate-100 outline-none transition placeholder:text-slate-600 hover:border-slate-600 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
        />
      </div>
    </div>
  )
}
