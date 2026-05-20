import type { Metadata } from "next";
import { BlogGrid } from "@/components/sections/blog/BlogGrid";
import { getBlogPosts } from "@/lib/get-blog-posts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articles on GenAI, MLOps, software engineering, and enterprise AI strategy.",
};

export default async function BlogPage() {
  const posts = await getBlogPosts();
  return (
    <div className="mx-auto max-w-[var(--container-max)] px-4 pb-[var(--section-padding)] pt-8 md:px-[var(--container-padding)] md:pt-10">
      <h1 className="text-display-md">Insights</h1>
      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_280px]">
        <BlogGrid posts={posts} />
        <aside className="space-y-8 border-t border-[var(--color-void)] pt-8 lg:border-t-0 lg:border-l lg:pl-8 lg:pt-0">
          <div>
            <p className="text-mono-sm font-bold uppercase">Categories</p>
            <ul className="mt-3 space-y-2 text-body-sm">
              {["Engineering", "AI/ML", "Cloud", "Strategy"].map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-mono-sm font-bold uppercase">Newsletter</p>
            <input
              suppressHydrationWarning
              className="input-brutal mt-3"
              placeholder="Email"
              aria-label="Newsletter email"
            />
            <button
              type="button"
              suppressHydrationWarning
              className="btn-brutal mt-3 w-full text-xs"
            >
              Join
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
