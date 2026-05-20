import Link from "next/link";
import type { CaseStudy } from "@/types";
import { cn } from "@/lib/utils";

const industryColor: Record<string, string> = {
  BFSI: "bg-[var(--color-accent)]",
  Healthcare: "bg-[var(--color-green)]",
  Manufacturing: "bg-[var(--color-amber)]",
  "E-commerce": "bg-purple-600",
  SaaS: "bg-slate-600",
};

export function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <article className="bento-card group h-full border bg-white transition hover:shadow-[var(--shadow-brutal-lg)]">
      <div className="p-6">
        <span
          className={cn(
            "raw-badge border-[var(--color-void)] text-white",
            industryColor[study.industry] ?? "bg-gray-700",
          )}
        >
          {study.industry}
        </span>
        <h2 className="mt-4 text-xl font-bold">{study.headline}</h2>
        <p className="mt-2 text-body-sm opacity-80">{study.client}</p>
        <p className="mt-4 text-mono-sm opacity-70">{study.challenge}</p>
        <p className="mt-6 font-[family-name:var(--font-mono)] text-4xl font-bold text-[var(--color-accent)]">
          {study.metric}
        </p>
        <p className="text-mono-sm">{study.metricLabel}</p>
        <Link
          href={`/case-studies#${study.slug}`}
          className="mt-6 inline-block text-mono-sm font-bold uppercase underline-offset-4 group-hover:underline"
        >
          Read Case Study →
        </Link>
      </div>
    </article>
  );
}
