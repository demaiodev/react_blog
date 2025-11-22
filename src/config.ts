// Central config for API base URL. Can be overridden with Vite env var `VITE_API_BASE`.
export const API_BASE =
  (import.meta.env?.VITE_API_BASE as string) || "http://localhost:8000";

export const STALE_TIME_MS = 1 * 60 * 1000; // 1 minute
export const DEFAULT_SORT_TYPE = "new";
export const DEFAULT_LAYOUT_TYPE = "list";
