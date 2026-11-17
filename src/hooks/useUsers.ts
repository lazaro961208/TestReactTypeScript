import { useQuery } from '@tanstack/react-query'

import { getUsers } from '../services'

const USERS_QUERY_KEY = ['users'] as const

export function useUsers() {
  return useQuery({
    queryKey: USERS_QUERY_KEY,
    queryFn: ({ signal }) => getUsers(signal),
    staleTime: 5 * 60 * 1000,
  })
}
