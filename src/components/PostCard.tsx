import { Link } from "react-router-dom";
import type { Post } from "../api/posts";

function excerpt(content: string) {
  return content.length > 160 ? content.slice(0, 157) + "..." : content;
}

export default function PostCard({ post }: { post: Post }) {
  return (
    <article className="bg-white rounded-lg shadow-sm hover:shadow-lg transition border p-4 flex flex-col">
      <Link to={`/posts/${post.id}`} className="block flex-1">
        <h3 className="text-lg font-semibold text-slate-900">{post.title}</h3>
        <p className="mt-3 text-sm text-slate-600 leading-relaxed">
          {excerpt(post.content)}
        </p>
      </Link>

      <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
        <div>
          {post.published_date
            ? new Date(post.published_date).toLocaleString()
            : "Unpublished"}
        </div>
        <div className="text-slate-500">Read →</div>
      </div>
    </article>
  );
}
