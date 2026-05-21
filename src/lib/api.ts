/** Backend API origin (contact leads, blog CMS, uploads). */
export function getBackendApiUrl(): string {
  return (
    process.env.NEXT_PUBLIC_API_URL ??
    process.env.BLOG_API_URL ??
    "http://localhost:4000"
  ).replace(/\/$/, "");
}
