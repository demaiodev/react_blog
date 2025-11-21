import { useQuery } from "@tanstack/react-query";
import { getFlaggedComments } from "../api/posts";
import Loading from "../components/Loading";
import ErrorBanner from "../components/ErrorBanner";

export default function Moderation() {
  const {
    data: comments,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["flagged-comments"],
    queryFn: getFlaggedComments,
  });

  if (isLoading) return <Loading label="Loading flagged comments…" />;
  if (isError) return <ErrorBanner message={(error as Error).message} />;

  return (
    <div>
      <h1 className="text-xl font-semibold mb-6">Flagged Comments</h1>

      {comments && comments.length !== 0 ? (
        <div className="space-y-4">
          {comments.map((c) => (
            <div key={c.id} className="bg-white p-4 rounded shadow">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-slate-700">
                    {c.author_name}
                  </div>
                  <div className="text-xs text-slate-500">
                    {new Date(c.created_date).toLocaleString()}
                  </div>
                </div>
                <div className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium">
                  Flagged
                </div>
              </div>
              <p className="mt-3 text-slate-700">{c.text}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white p-6 rounded shadow text-center text-slate-500">
          No flagged comments.
        </div>
      )}
    </div>
  );
}
