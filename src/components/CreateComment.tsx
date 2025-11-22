import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComment } from "../api/posts";
import Loading from "./Loading";
import ErrorBanner from "./ErrorBanner";

interface CreateCommentProps {
  postId: number;
}

export default function CreateComment({ postId }: CreateCommentProps) {
  const [author, setAuthor] = useState("");
  const [comment, setComment] = useState("");
  const qc = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload: {
      author: string;
      comment: string;
      postId: number;
    }) => createComment(payload),
    onSuccess: () => {
      // Refetch the post to get updated comments
      qc.invalidateQueries({ queryKey: ["post"] });
      setAuthor("");
      setComment("");
    },
  });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    mutation.mutate({ author, comment, postId });
  }

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white p-4 rounded shadow space-y-4 text-sm"
    >
      {mutation.isError && <ErrorBanner message="Error posting comment." />}
      {mutation.status === "pending" ? (
        <Loading label="Posting comment…" />
      ) : (
        <>
          <div>
            <label className="block text-sm font-medium text-slate-900">
              Name
            </label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Your name"
              className="mt-1 block w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-900">
              Comment
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="What do you think?"
              className="mt-1 block w-full border rounded px-3 py-2 h-32"
              required
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              type="submit"
              className="bg-slate-600 text-white p-2 rounded-md hover:bg-slate-900 hover:cursor-pointer"
            >
              Post Comment
            </button>
            <button
              type="button"
              className="bg-slate-300 text-slate-900 p-2 rounded-md hover:bg-slate-200 hover:cursor-pointer"
              onClick={() => {
                setAuthor("");
                setComment("");
              }}
            >
              Clear
            </button>
          </div>
        </>
      )}
    </form>
  );
}
