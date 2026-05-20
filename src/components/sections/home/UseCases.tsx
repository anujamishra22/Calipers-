"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const tabs = [
  "Banking",
  "Healthcare",
  "E-commerce",
  "Manufacturing",
  "SaaS/Tech",
] as const;

const content: Record<(typeof tabs)[number], { title: string; body: string; metric: string }> = {
  Banking: {
    title: "GenAI & decisioning",
    body: "Assistants and copilots grounded on policy, plus real-time operational insight.",
    metric: "40% shorter handle times",
  },
  Healthcare: {
    title: "Clinical intelligence",
    body: "AI-assisted triage support, structured data pipelines, and ops forecasting.",
    metric: "40% faster insight cycles",
  },
  "E-commerce": {
    title: "Merchandising AI",
    body: "Demand forecasting, recommendation engines, inventory optimization.",
    metric: "3x revenue lift from recommendations",
  },
  Manufacturing: {
    title: "Industrial AI",
    body: "Predictive maintenance, computer vision QA, supply chain optimization.",
    metric: "60% reduction in unplanned downtime",
  },
  "SaaS/Tech": {
    title: "Product engineering",
    body: "AI-native features, CI/CD for models, cloud cost optimization.",
    metric: "5x faster model deployment",
  },
};

export function UseCases() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Banking");
  const c = content[tab];
  const metricParts = (() => {
    const metric = c.metric.trim();
    const suffix = " times";
    if (metric.toLowerCase().endsWith(suffix)) {
      return { top: metric.slice(0, -suffix.length), bottom: "times" };
    }

    return { top: metric, bottom: "" };
  })();

  return (
    <section className="bg-white py-[var(--section-padding)]">
      <div className="mx-auto max-w-[var(--container-max)] px-4 md:px-[var(--container-padding)]">
        <div className="flex flex-wrap gap-2 border-b-[3px] border-[var(--color-void)] pb-2">
          {tabs.map((t) => (
            <button
              key={t}
              type="button"
              suppressHydrationWarning
              onClick={() => setTab(t)}
              className={cn(
                "px-4 py-2 text-mono-sm uppercase tracking-widest transition",
                tab === t
                  ? "border-b-[3px] border-[var(--color-accent)] text-[var(--color-accent)]"
                  : "opacity-60 hover:opacity-100",
              )}
            >
              {t}
            </button>
          ))}
        </div>
        <div
          key={tab}
          className="mt-10 grid gap-6 border border-[var(--color-void)] bg-[var(--color-off-white)] p-6 md:grid-cols-2"
        >
          <div>
            <h3 className="text-display-sm">{c.title}</h3>
            <p className="mt-4 text-body-md opacity-80">{c.body}</p>
            <div className="mt-8 h-24 rounded border border-[var(--color-void)] bg-white p-4">
              <p className="text-mono-sm text-[var(--color-gray-500)]">Flow</p>
              <div className="mt-2 flex items-center gap-2">
                <div className="h-3 flex-1 bg-[var(--color-accent)]" />
                <div className="h-3 w-8 bg-[var(--color-green)]" />
              </div>
            </div>
          </div>
          <div className="flex min-h-[220px] flex-col border-l border-[var(--color-void)] pl-6 md:min-h-[260px]">
            <p className="text-mono-sm font-bold uppercase tracking-widest text-[var(--color-void)]">
              Key metric
            </p>
            <div className="flex flex-1 flex-col items-center justify-center">
              {tab === "Banking" && metricParts.bottom ? (
                <p className="max-w-none text-center !text-[33px] font-bold leading-[1.05] text-[var(--color-accent)] md:!text-[33px]">
                  <span className="block whitespace-nowrap">{metricParts.top}</span>
                  <span className="block">{metricParts.bottom}</span>
                </p>
              ) : (
                <p className="max-w-[14ch] text-center !text-[33px] font-bold leading-[1.05] text-[var(--color-accent)] md:!text-[33px]">
                  {c.metric}
                </p>
              )}
            </div>
            <Link
              href="/case-studies"
              className="inline-flex text-mono-sm font-bold uppercase tracking-widest text-[var(--color-void)] underline-offset-4 hover:underline"
            >
              Case Study →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
