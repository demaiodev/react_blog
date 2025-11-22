import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "../api/posts";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import ErrorBanner from "../components/ErrorBanner";
import { MIN_POST_LENGTH } from "../config";
import { Link } from "react-router-dom";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const qc = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (payload: { title: string; content: string }) =>
      createPost(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["posts"] });
      navigate("/");
    },
  });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    mutation.mutate({ title, content });
  }

  return (
    <section className="mx-auto">
      <Link to="/" className="text-sm text-slate-800 hover:underline">
        ← Back
      </Link>
      <h2 className="text-xl font-semibold my-6">Create Post</h2>
      <form
        onSubmit={onSubmit}
        className="bg-white p-6 rounded shadow space-y-4"
      >
        {mutation.status === "pending" || false ? (
          <Loading label="Creating post…" />
        ) : (
          <>
            <div>
              <label
                className="block text-sm font-medium text-slate-700"
                htmlFor="post-title"
              >
                Title
              </label>
              <input
                id="post-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 block w-full border rounded px-3 py-2"
                required
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-slate-700"
                htmlFor="post-content"
              >
                Content
              </label>
              <textarea
                id="post-content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="mt-1 block w-full border rounded px-3 py-2 h-40"
                minLength={MIN_POST_LENGTH}
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                type="submit"
                className="bg-slate-800 text-white px-4 py-2 rounded"
              >
                Create
              </button>
              <button
                type="button"
                className="text-slate-600 px-3 py-2"
                onClick={() => navigate("/")}
              >
                Cancel
              </button>
            </div>
            {mutation.isError && <ErrorBanner message="Error creating post." />}
          </>
        )}
      </form>
    </section>
  );
}
