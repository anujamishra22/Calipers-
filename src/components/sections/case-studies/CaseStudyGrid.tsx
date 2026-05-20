"use client";

import { useMemo, useState } from "react";
import { caseStudyCards } from "@/data/case-studies";
import { CaseStudyCard } from "./CaseStudyCard";

const filters = ["All", "BFSI", "Healthcare", "Manufacturing", "E-commerce", "SaaS"] as const;

export function CaseStudyGrid() {
  const [f, setF] = useState<(typeof filters)[number]>("All");
  const list = useMemo(() => {
    if (f === "All") return caseStudyCards;
    return caseStudyCards.filter((c) => c.industry === f || (f === "SaaS" && c.industry === "SaaS"));
  }, [f]);

  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-2">
        {filters.map((tag) => (
          <button
            key={tag}
            type="button"
            suppressHydrationWarning
            onClick={() => setF(tag)}
            className={`border-2 border-[var(--color-void)] px-4 py-2 text-mono-sm uppercase ${
              f === tag ? "bg-[var(--color-void)] text-white" : "bg-white"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {list.map((study) => (
          <CaseStudyCard key={study.slug} study={study} />
        ))}
      </div>
    </div>
  );
}
