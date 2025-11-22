import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPost } from "../api/posts";
import Loading from "../components/Loading";
import ErrorBanner from "../components/ErrorBanner";
import CreateComment from "../components/CreateComment";
import { STALE_TIME_MS } from "../config";

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
    staleTime: STALE_TIME_MS,
  });

  if (isLoading) return <Loading label="Loading post…" />;
  if (isError) return <ErrorBanner message={(error as Error).message} />;

  return (
    <section className="space-y-6">
      <Link to="/" className="text-sm text-slate-800 hover:underline">
        ← Back
      </Link>
      <article className="bg-white p-6 rounded shadow-md mt-4">
        <h1 className="text-2xl font-bold">{post?.title}</h1>
        <div className="mt-2 text-sm text-slate-500">
          {post?.published_date
            ? new Date(post.published_date).toLocaleString()
            : "Unpublished"}
        </div>
        <div className="mt-4 text-slate-700 whitespace-pre-wrap">
          {post?.content}
        </div>
      </article>

      <section>
        <h2 className="font-semibold text-lg mb-2">Add a Comment</h2>
        <CreateComment postId={parseInt(id!)} />
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-2">Comments</h3>
        <div className="space-y-3">
          {post && post.comments.length !== 0 ? (
            post.comments.map((c) => (
              <div
                key={c.id}
                className={`p-3 rounded shadow-sm  ${
                  c.flagged ? "bg-red-50 border border-red-600" : "bg-white"
                }`}
              >
                <div className="text-sm font-medium">{c.author_name}</div>
                <div className="text-sm text-slate-600">
                  {new Date(c.created_date).toLocaleString()}
                </div>
                {c.flagged && (
                  <span className="text-red-600 text-xs flex items-center">
                    ⚠ Flagged for review
                  </span>
                )}
                <p className="mt-2 text-slate-700">{c.text}</p>
              </div>
            ))
          ) : (
            <div className="text-sm text-slate-600">No comments yet.</div>
          )}
        </div>
      </section>
    </section>
  );
}
