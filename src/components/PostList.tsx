import { useState } from "react";
import type { Post } from "../api/posts";
import PostCard from "./PostCard";

export default function PostList({ posts }: { posts: Post[] }) {
  const [sort, setSort] = useState<"new" | "old">("new");

  const sorted = [...posts].sort((a, b) => {
    const da = a.published_date ? Date.parse(a.published_date) : 0;
    const db = b.published_date ? Date.parse(b.published_date) : 0;
    return sort === "new" ? db - da : da - db;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Posts</h2>
        <div className="flex items-center gap-2">
          <label className="text-sm text-slate-600">Sort:</label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as "new" | "old")}
            className="border rounded px-3 py-1 text-sm bg-white"
          >
            <option value="new">Newest</option>
            <option value="old">Oldest</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sorted.map((p) => (
          <PostCard key={p.id} post={p} />
        ))}
      </div>
    </div>
  );
}
