import { useQuery } from '@tanstack/react-query'

import { getPostsByUser } from '../services'

export function usePostsByUser(userId: number | null) {
  return useQuery({
    queryKey: ['posts', userId],
    queryFn: ({ signal }) => {
      if (userId === null) {
        throw new Error('Se necesita un usuario para consultar publicaciones.')
      }

      return getPostsByUser(userId, signal)
    },
    enabled: userId !== null,
    staleTime: 5 * 60 * 1000,
  })
}
