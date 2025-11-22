import type { LayoutTypes } from "../types/LayoutTypes";
import type { SetStateAction, Dispatch } from "react";

type LayoutSwitcherProps = {
  layout: LayoutTypes;
  setLayout: Dispatch<SetStateAction<LayoutTypes>>;
};

export default function LayoutSwitcher({
  layout,
  setLayout,
}: LayoutSwitcherProps) {
  return (
    <div className="items-center gap-1 bg-slate-100 rounded-lg p-1 hidden md:flex">
      <button
        onClick={() => setLayout("list")}
        className={`p-2 rounded transition border border-slate-300 hover:cursor-pointer ${
          layout === "list"
            ? "bg-white shadow-md text-slate-900"
            : "text-slate-600 hover:text-slate-900"
        }`}
        title="List view"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <button
        onClick={() => setLayout("grid")}
        className={`p-2 rounded transition border border-slate-300 hover:cursor-pointer ${
          layout === "grid"
            ? "bg-white shadow-md text-slate-900"
            : "text-slate-600 hover:text-slate-900"
        }`}
        title="Grid view"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <rect x="3" y="3" width="6" height="6" rx="1" />
          <rect x="11" y="3" width="6" height="6" rx="1" />
          <rect x="3" y="11" width="6" height="6" rx="1" />
          <rect x="11" y="11" width="6" height="6" rx="1" />
        </svg>
      </button>
    </div>
  );
}
