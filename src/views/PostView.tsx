import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPost, getComments } from "../api/posts";
import Loading from "../components/Loading";
import ErrorBanner from "../components/ErrorBanner";

export default function PostView() {
  const { id } = useParams();
  const {
    data: post,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["post", id],
    queryFn: () => getPost(id!),
    enabled: !!id,
  });

  const { data: comments, isLoading: commentsLoading } = useQuery({
    queryKey: ["comments", id],
    queryFn: () => getComments(id!),
    enabled: !!id,
  });

  if (isLoading) return <Loading label="Loading post…" />;
  if (isError) return <ErrorBanner message={(error as Error).message} />;

  return (
    <div className="space-y-6">
      <Link to="/" className="text-sm text-slate-500 hover:underline">
        ← Back
      </Link>
      <article className="bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold">{post?.title}</h1>
        <div className="mt-2 text-sm text-slate-400">
          {post?.published_date
            ? new Date(post.published_date).toLocaleString()
            : "Unpublished"}
        </div>
        <div className="mt-4 text-slate-700 whitespace-pre-wrap">
          {post?.content}
        </div>
      </article>

      <section>
        <h3 className="text-lg font-semibold">Comments</h3>
        <div className="mt-3 space-y-3">
          {commentsLoading ? (
            <Loading label="Loading comments…" />
          ) : comments && comments.length > 0 ? (
            comments.map((c) => (
              <div key={c.id} className="bg-white p-3 rounded shadow-sm">
                <div className="text-sm font-medium">{c.author}</div>
                <div className="text-sm text-slate-600">
                  {new Date(c.created_at).toLocaleString()}
                </div>
                <p className="mt-2 text-slate-700">{c.content}</p>
              </div>
            ))
          ) : (
            <div className="text-sm text-slate-500">No comments yet.</div>
          )}
        </div>
      </section>
    </div>
  );
}
