
export const API_BASE =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") || "";

/**
 * Normalize image URLs coming from the backend.
 * - If it's already absolute (starts with http), return as is.
 * - If it's relative, prefix with API_BASE.
 * - If API_BASE is missing, just return the raw path.
 */
export function buildImageUrl(path) {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  if (!API_BASE) return path;
  return `${API_BASE}/${path.replace(/^\/+/, "")}`;
}
