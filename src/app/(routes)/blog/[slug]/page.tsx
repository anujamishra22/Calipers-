import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogCoverUnoptimized } from "@/lib/blog-image";
import { getBlogPostBySlug } from "@/lib/get-blog-posts";
import { normalizeBlogBody, richToPlainText, sanitizeRichHtml } from "@/lib/sanitize-rich-html";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) {
    return { title: "Post not found" };
  }
  return {
    title: post.title,
    description: richToPlainText(post.excerpt),
  };
}

export default async function BlogArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-[var(--container-max)] px-4 py-[var(--section-padding)] md:px-[var(--container-padding)]">
      <Link
        href="/blog"
        className="inline-block text-mono-sm font-bold uppercase tracking-widest text-[var(--color-accent)] hover:underline"
      >
        ← All insights
      </Link>

      <header className="mt-8 border border-[var(--color-void)] bg-white p-6 shadow-[var(--shadow-brutal)] md:p-10">
        <p className="text-mono-sm font-bold uppercase tracking-widest text-[var(--color-accent)]">
          {post.category}
        </p>
        <h1 className="mt-4 text-display-sm leading-[1.08] text-[var(--color-void)]">{post.title}</h1>
        <div className="mt-6 flex flex-wrap gap-4 border-t border-[var(--color-gray-200)] pt-4 text-mono-sm text-[var(--color-void)]/70">
          <span>{post.readTime}</span>
        </div>
      </header>

      <div className="relative mt-10 aspect-[21/9] max-h-[420px] w-full overflow-hidden border border-[var(--color-void)] bg-[var(--color-gray-100)]">
        <Image
          src={post.image}
          alt=""
          fill
          unoptimized={blogCoverUnoptimized(post.image)}
          className="object-cover"
          sizes="(max-width: 768px) 100vw, min(var(--container-max), 100vw)"
          priority
        />
      </div>

      <div className="mt-10 max-w-3xl border-l-8 border-[var(--color-accent)] pl-6 md:pl-8">
        <p
          className="text-body-lg text-[var(--color-void)]/85 [&_em]:italic [&_strong]:font-bold [&_.rte-fs-sm]:text-sm [&_.rte-fs-md]:text-base [&_.rte-fs-lg]:text-xl [&_.rte-fs-xl]:text-2xl"
          dangerouslySetInnerHTML={{ __html: sanitizeRichHtml(post.excerpt) }}
        />
      </div>

      <div
        className="blog-rte mt-12 max-w-3xl text-body-lg leading-relaxed text-[var(--color-void)] [&_.rte-fs-sm]:text-sm [&_.rte-fs-md]:text-base [&_.rte-fs-lg]:text-xl [&_.rte-fs-xl]:text-2xl [&_em]:italic [&_strong]:font-bold [&_h2]:mb-4 [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-bold [&_h3]:mb-3 [&_h3]:mt-8 [&_h3]:text-xl [&_h3]:font-bold [&_ol]:my-4 [&_ol]:list-inside [&_ol]:pl-4 [&_ol_li]:ps-1 [&_ol[type='1']]:list-decimal [&_ol[type='a']]:list-[lower-alpha] [&_ol[type='A']]:list-[upper-alpha] [&_ol[type='i']]:list-[lower-roman] [&_ol[type='I']]:list-[upper-roman] [&_ul]:my-4 [&_ul]:list-inside [&_ul]:pl-4 [&_ul_li]:ps-1 [&_ul.rte-ul-circle]:list-[circle] [&_ul.rte-ul-disc]:list-disc [&_ul.rte-ul-square]:list-[square]"
        dangerouslySetInnerHTML={{ __html: normalizeBlogBody(post.content) }}
      />

      <div className="mt-16 border-t border-[var(--color-gray-200)] pt-8">
        <Link href="/blog" className="btn-brutal inline-block">
          ← Back to insights
        </Link>
      </div>
    </article>
  );
}
