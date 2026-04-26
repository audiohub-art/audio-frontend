import type { Post } from "./post";

export type User = {
  id: string,
  name: string,
  createdAt: Date;
  posts: Post[]
}
