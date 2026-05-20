import type { BlogPost } from "@/types";
import { BlogCard } from "./BlogCard";

export function BlogGrid({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) {
    return (
      <p className="text-body-sm text-[var(--color-void)]/70">No posts yet. Check back soon.</p>
    );
  }
  const [featured, ...rest] = posts;
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="md:col-span-3">
        <BlogCard post={featured} featured />
      </div>
      {rest.map((p) => (
        <BlogCard key={p.slug} post={p} />
      ))}
    </div>
  );
}
