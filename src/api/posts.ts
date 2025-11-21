import { API_BASE } from "../config";

export type Post = {
  id: number;
  title: string;
  content: string;
  published_date?: string | null;
  comments: Comment[];
};

export type Comment = {
  id: number;
  post: number;
  author_name: string;
  text: string;
  created_date: string;
  flagged: boolean;
};

async function handleResp(res: Response) {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || res.statusText);
  }
  return res.json();
}

export async function getPosts(): Promise<Post[]> {
  const res = await fetch(`${API_BASE}/api/posts/`);
  return handleResp(res);
}

export async function getPost(id: string | number): Promise<Post> {
  const res = await fetch(`${API_BASE}/api/posts/${id}/`);
  return handleResp(res);
}

export async function createPost(payload: { title: string; content: string }) {
  const res = await fetch(`${API_BASE}/api/posts/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleResp(res);
}

export async function createComment(payload: {
  author: string;
  comment: string;
  postId: number;
}) {
  const res = await fetch(`${API_BASE}/api/comments/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      post_id: payload.postId,
      author_name: payload.author,
      text: payload.comment,
    }),
  });
  return handleResp(res);
}

export default {
  getPosts,
  getPost,
  createPost,
};
