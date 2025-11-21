import { Link } from "react-router-dom";
import type { Post } from "../api/posts";

export default function PostCard({ post }: { post: Post }) {
  return (
    <Link to={`/posts/${post.id}`}>
      <article className="bg-white rounded-lg shadow-sm hover:shadow-lg transition space-y-4 p-4 min-h-50 rounded-br-3xl border-gray-300 flex flex-col">
        <h3 className="text-lg font-semibold text-slate-900 line-clamp-2">
          {post.title}
        </h3>
        <div className="flex items-center justify-between text-xs text-slate-500 mt-auto">
          <div>
            {post.published_date
              ? new Date(post.published_date).toLocaleString()
              : ""}
          </div>
          <div className="text-slate-500">Read Post →</div>
        </div>
      </article>
    </Link>
  );
}
