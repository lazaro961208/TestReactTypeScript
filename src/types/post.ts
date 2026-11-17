export interface Post {
  userId: number
  id: number
  title: string
  body: string
  localId?: string
}

export interface CreatePostInput {
  userId: number
  title: string
  body: string
}
