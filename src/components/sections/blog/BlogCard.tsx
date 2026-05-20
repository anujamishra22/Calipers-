import Image from "next/image";
import Link from "next/link";
import { blogCoverUnoptimized } from "@/lib/blog-image";
import { richToPlainText } from "@/lib/sanitize-rich-html";
import type { BlogPost } from "@/types";

export function BlogCard({ post, featured }: { post: BlogPost; featured?: boolean }) {
  return (
    <article
      id={post.slug}
      className={`group bento-card scroll-mt-24 overflow-hidden border bg-white ${
        featured ? "md:col-span-12" : ""
      }`}
    >
      <div className={`relative ${featured ? "h-72" : "h-48"} overflow-hidden border-b border-[var(--color-void)]`}>
        <Image
          src={post.image}
          alt={post.title}
          fill
          unoptimized={blogCoverUnoptimized(post.image)}
          className="object-cover transition duration-300 group-hover:scale-[1.03]"
          sizes={featured ? "100vw" : "(max-width:768px) 100vw, 33vw"}
        />
        <span className="absolute left-4 top-4 border border-[var(--color-void)] bg-white px-2 py-1 text-mono-sm uppercase">
          {post.category}
        </span>
      </div>
      <div className="p-5">
        <h2 className={`font-bold ${featured ? "text-2xl" : "text-base"}`}>
          <Link href={`/blog/${encodeURIComponent(post.slug)}`}>{post.title}</Link>
        </h2>
        <p className="mt-2 line-clamp-2 text-body-sm opacity-80">{richToPlainText(post.excerpt)}</p>
        <div className="mt-4 flex items-center justify-between border-t border-[var(--color-gray-200)] pt-3 text-mono-sm opacity-70">
          <span>{post.readTime}</span>
          <Link
            href={`/blog/${encodeURIComponent(post.slug)}`}
            className="font-bold text-[var(--color-accent)]"
          >
            Read →
          </Link>
        </div>
      </div>
    </article>
  );
}
