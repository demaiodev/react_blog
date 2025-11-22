import { useState } from "react";
import type { Post } from "../types/Post";
import PostCard from "./PostCard";
import { DEFAULT_LAYOUT_TYPE, DEFAULT_SORT_TYPE } from "../config";
import LayoutSwitcher from "./LayoutSwitcher";

import type { SortTypes } from "../types/SortTypes";
import type { LayoutTypes } from "../types/LayoutTypes";

export default function PostList({ posts }: { posts: Post[] }) {
  const [sort, setSort] = useState<SortTypes>(DEFAULT_SORT_TYPE);
  const [layout, setLayout] = useState<LayoutTypes>(DEFAULT_LAYOUT_TYPE);

  const sorted = [...posts].sort((a, b) => {
    const da = a.published_date ? Date.parse(a.published_date) : 0;
    const db = b.published_date ? Date.parse(b.published_date) : 0;
    return sort === "new" ? db - da : da - db;
  });

  return (
    <section className="">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 mb-6">
        <h2 className="text-xl font-semibold">Posts</h2>
        <div className="flex items-center gap-4 w-full sm:w-auto">
          {/* Layout Switcher */}
          <LayoutSwitcher layout={layout} setLayout={setLayout} />

          {/* Sort */}
          <div className="flex items-center gap-2">
            <label className="text-sm text-slate-600 whitespace-nowrap">
              Sort by:
            </label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as "new" | "old")}
              className="border rounded px-2 py-1 text-sm bg-white"
            >
              <option value="new">Newest</option>
              <option value="old">Oldest</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid Layout */}
      {layout === "grid" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sorted.map((p) => (
            <PostCard key={p.id} post={p} />
          ))}
        </div>
      )}

      {/* List Layout */}
      {layout === "list" && (
        <div className="grid grid-cols-1 gap-6">
          {sorted.map((p) => (
            <PostCard key={p.id} post={p} />
          ))}
        </div>
      )}
    </section>
  );
}
