import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createPost } from '../services'
import type { Post } from '../types'
import { postsQueryKey } from './usePostsByUser'

export function useCreatePost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createPost,
    onSuccess: (createdPost, input) => {
      const localPost: Post = {
        ...createdPost,
        userId: input.userId,
        title: input.title,
        body: input.body,
        localId: crypto.randomUUID(),
      }

      queryClient.setQueryData<Post[]>(
        postsQueryKey(input.userId),
        (posts = []) => [localPost, ...posts],
      )
    },
  })
}
