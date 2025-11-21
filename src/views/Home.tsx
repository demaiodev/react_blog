import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../api/posts";
import PostList from "../components/PostList";
import Loading from "../components/Loading";
import ErrorBanner from "../components/ErrorBanner";

export default function Home() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Latest Posts</h1>
          <p className="text-sm text-slate-500">
            Curated posts from your Django backend (mocked for now).
          </p>
        </div>
      </div>

      {isLoading && <Loading label="Loading posts…" />}
      {isError && <ErrorBanner message={(error as Error).message} />}

      {!isLoading && !isError && <PostList posts={data ?? []} />}
    </div>
  );
}
