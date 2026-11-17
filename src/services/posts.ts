import type { Post } from '../types'

const API_URL = 'https://jsonplaceholder.typicode.com'

export async function getPostsByUser(
  userId: number,
  signal?: AbortSignal,
): Promise<Post[]> {
  const response = await fetch(`${API_URL}/posts?userId=${userId}`, { signal })

  if (!response.ok) {
    throw new Error('No se pudieron cargar las publicaciones.')
  }

  return response.json() as Promise<Post[]>
}
