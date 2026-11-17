interface UserSearchProps {
  value: string
  onChange: (value: string) => void
}

export function UserSearch({ value, onChange }: UserSearchProps) {
  return (
    <div className="space-y-2">
      <label htmlFor="user-search" className="block text-sm font-medium text-slate-200">
        Buscar por nombre
      </label>
      <input
        id="user-search"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Ej. Leanne Graham"
        autoComplete="off"
        className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/30"
      />
    </div>
  )
}
