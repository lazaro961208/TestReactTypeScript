import type { User } from '../types'

const API_URL = 'https://jsonplaceholder.typicode.com'

export async function getUsers(signal?: AbortSignal): Promise<User[]> {
  const response = await fetch(`${API_URL}/users`, { signal })

  if (!response.ok) {
    throw new Error('No se pudieron cargar los usuarios.')
  }

  return response.json() as Promise<User[]>
}
