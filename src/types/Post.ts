import type { Comment } from "./Comment";

export type Post = {
  id: number;
  title: string;
  content: string;
  published_date?: string | null;
  comments: Comment[];
};
