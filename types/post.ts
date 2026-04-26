import type { User } from "./user"
import type { Audio } from "./audio";

export type Post = {
  id: string;
  title: string;
  description: string | null;
  status: PostStatus;
  createdAt: Date;
  user: User;
  audioFile: Audio;
}

export type PostStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
