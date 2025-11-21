import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPost } from "../api/posts";
import Loading from "../components/Loading";
import ErrorBanner from "../components/ErrorBanner";
import CreateComment from "../components/CreateComment";

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

  if (isLoading) return <Loading label="Loading post…" />;
  if (isError) return <ErrorBanner message={(error as Error).message} />;

  return (
    <div className="space-y-6">
      <Link to="/" className="text-sm text-slate-500 hover:underline">
        ← Back
      </Link>
      <article className="bg-white p-6 rounded shadow mt-4">
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
        <h3 className="font-semibold mb-6 text-lg">Add a Comment</h3>
        <CreateComment postId={parseInt(id!)} />
      </section>

      <section>
        <h3 className="text-lg font-semibold">Comments</h3>
        <div className="mt-6 space-y-3">
          {post && post.comments.length !== 0 ? (
            post.comments.map((c) => (
              <div
                key={c.id}
                className={
                  c.flagged
                    ? "bg-white p-3 rounded shadow-sm border border-red-600"
                    : "bg-white p-3 rounded shadow-sm"
                }
              >
                <div className="text-sm font-medium">
                  {c.author_name}{" "}
                  {c.flagged ? <span className="text-red-600">⚠</span> : ""}
                </div>
                <div className="text-sm text-slate-600">
                  {new Date(c.created_date).toLocaleString()}
                </div>
                <p className="mt-2 text-slate-700">{c.text}</p>
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
