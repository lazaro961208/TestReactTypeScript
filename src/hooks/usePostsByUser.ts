import { useQuery, useQueryClient } from '@tanstack/react-query'

import { getPostsByUser } from '../services'
import type { Post } from '../types'

export const postsQueryKey = (userId: number | null) =>
  ['posts', userId] as const

export function usePostsByUser(userId: number | null) {
  const queryClient = useQueryClient()

  return useQuery({
    queryKey: postsQueryKey(userId),
    queryFn: async ({ signal }) => {
      if (userId === null) {
        throw new Error('Se necesita un usuario para consultar publicaciones.')
      }

      const remotePosts = await getPostsByUser(userId, signal)
      const cachedPosts =
        queryClient.getQueryData<Post[]>(postsQueryKey(userId)) ?? []
      const localPosts = cachedPosts.filter((post) => post.localId)

      return [...localPosts, ...remotePosts]
    },
    enabled: userId !== null,
    staleTime: 5 * 60 * 1000,
    gcTime: Infinity,
  })
}
