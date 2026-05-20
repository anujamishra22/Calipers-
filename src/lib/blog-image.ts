/**
 * CMS covers are served from the API (`…/uploads/…`). The Next.js image
 * optimizer often returns 400 for those URLs in dev (pattern / host quirks).
 * Skipping optimization lets the browser load the URL directly.
 */
export function blogCoverUnoptimized(src: string): boolean {
  return src.includes("/uploads/");
}
