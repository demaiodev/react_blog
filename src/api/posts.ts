import { API_BASE } from "../config";

export type Post = {
  id: number;
  title: string;
  content: string;
  published_date?: string | null;
};

export type Comment = {
  id: number;
  post: number;
  author: string;
  content: string;
  created_at: string;
};

async function handleResp(res: Response) {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || res.statusText);
  }
  return res.json();
}

export function getPosts(): Promise<Post[]> {
  return fetch(`${API_BASE}/api/posts/`).then(handleResp);
}

export function getPost(id: string | number): Promise<Post> {
  return fetch(`${API_BASE}/api/posts/${id}/`).then(handleResp);
}

export function getComments(postId: string | number): Promise<Comment[]> {
  return fetch(`${API_BASE}/api/posts/${postId}/comments/`).then(handleResp);
}

export function createPost(payload: { title: string; content: string }) {
  return fetch(`${API_BASE}/api/posts/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).then(handleResp);
}

export default {
  getPosts,
  getPost,
  getComments,
  createPost,
};
