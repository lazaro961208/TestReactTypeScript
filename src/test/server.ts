import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'

import type { CreatePostInput } from '../types'
import { posts, users } from './fixtures'

const API_URL = 'https://jsonplaceholder.typicode.com'

export const handlers = [
  http.get(`${API_URL}/users`, () => HttpResponse.json(users)),
  http.get(`${API_URL}/posts`, ({ request }) => {
    const userId = Number(new URL(request.url).searchParams.get('userId'))

    return HttpResponse.json(posts.filter((post) => post.userId === userId))
  }),
  http.post(`${API_URL}/posts`, async ({ request }) => {
    const input = (await request.json()) as CreatePostInput

    return HttpResponse.json({ id: 101, ...input }, { status: 201 })
  }),
]

export const server = setupServer(...handlers)
