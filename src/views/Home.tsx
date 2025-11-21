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
      {isLoading && <Loading label="Loading posts…" />}
      {isError && <ErrorBanner message={(error as Error).message} />}

      {!isLoading && !isError && <PostList posts={data ?? []} />}
    </div>
  );
}
