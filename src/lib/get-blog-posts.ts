import { cache } from "react";
import type { BlogPost } from "@/types";

export const BLOG_API_DEFAULT = "http://localhost:4000";

type ApiBlogRow = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  coverImage: string | null;
  readTime: string;
  publishedAt: string | null;
  createdAt: string;
};

/** Full post from GET /api/blogs/:slug */
export type ApiBlogDetail = ApiBlogRow & {
  content: string;
};

export type BlogPostDetail = BlogPost & {
  content: string;
};

type ApiListResponse = {
  data: ApiBlogRow[];
};

/** Admin uploads return `/uploads/...` (API origin). Next/Image would otherwise request the Next app and 404. */
const IMAGE_FALLBACK =
  "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80";

function resolveBlogImageUrl(
  coverImage: string | null | undefined,
  apiOrigin: string,
): string {
  const trimmed = typeof coverImage === "string" ? coverImage.trim() : "";
  if (!trimmed) return IMAGE_FALLBACK;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  if (trimmed.startsWith("/uploads") || trimmed.startsWith("uploads/")) {
    const path = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
    return `${apiOrigin}${path}`;
  }
  return trimmed;
}

function mapRow(row: ApiBlogRow, apiOrigin: string): BlogPost {
  const dt = row.publishedAt ?? row.createdAt;
  const date =
    typeof dt === "string"
      ? dt.slice(0, 10)
      : new Date(dt).toISOString().slice(0, 10);
  return {
    slug: row.slug,
    title: row.title,
    category: row.category,
    excerpt: row.excerpt,
    readTime: row.readTime,
    image: resolveBlogImageUrl(row.coverImage, apiOrigin),
    date,
  };
}

function mapDetail(row: ApiBlogDetail, apiOrigin: string): BlogPostDetail {
  return {
    ...mapRow(row, apiOrigin),
    content: row.content,
  };
}

function apiBase(): string {
  return (process.env.BLOG_API_URL ?? BLOG_API_DEFAULT).replace(/\/$/, "");
}

async function staticFallback(slug: string): Promise<BlogPostDetail | null> {
  const { blogPosts } = await import("@/data/blog");
  const p = blogPosts.find((b) => b.slug === slug);
  if (!p) return null;
  return { ...p, content: p.excerpt };
}

export const getBlogPostBySlug = cache(async (slug: string): Promise<BlogPostDetail | null> => {
  const base = apiBase();
  try {
    const res = await fetch(`${base}/api/blogs/${encodeURIComponent(slug)}`, {
      next: { revalidate: 0 },
    });
    if (res.status === 404) {
      return staticFallback(slug);
    }
    if (!res.ok) throw new Error(`Blog API ${res.status}`);
    const row = (await res.json()) as ApiBlogDetail;
    return mapDetail(row, base);
  } catch {
    return staticFallback(slug);
  }
});

/**
 * Loads published posts from the CMS API (backend). Falls back to static data if the API is unreachable.
 */
export async function getBlogPosts(): Promise<BlogPost[]> {
  const base = apiBase();
  try {
    const res = await fetch(`${base}/api/blogs?page=1&pageSize=100`, {
      next: { revalidate: 0 },
    });
    if (!res.ok) throw new Error(`Blog API ${res.status}`);
    const json = (await res.json()) as ApiListResponse;
    if (!Array.isArray(json.data)) return [];
    return json.data.map((row) => mapRow(row, base));
  } catch {
    const { blogPosts } = await import("@/data/blog");
    return blogPosts;
  }
}
