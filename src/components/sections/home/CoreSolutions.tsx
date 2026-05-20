"use client";

import {
  Sparkles,
  Bot,
  TrendingUp,
  Code,
  Brain,
  BrainCircuit,
  Cpu,
  Cloud,
  Compass,
} from "lucide-react";
import Link from "next/link";
import { services } from "@/data/services";
import { BentoGrid } from "@/components/ui/BentoGrid";
import { BentoCard } from "@/components/ui/BentoCard";
import { MetricCounter } from "@/components/ui/MetricCounter";

const icons: Record<string, React.ElementType> = {
  Sparkles,
  Bot,
  TrendingUp,
  Code,
  Brain,
  BrainCircuit,
  Cpu,
  Cloud,
  Compass,
};

const cellClass = [
  "col-span-12 md:col-span-5",
  "col-span-12 md:col-span-4",
  "col-span-12 md:col-span-3",
  "col-span-12 md:col-span-3",
  "col-span-12 md:col-span-5",
  "col-span-12 md:col-span-4",
  "col-span-12 md:col-span-7",
  "col-span-12 md:col-span-5",
];

export function CoreSolutions() {
  return (
    <section className="bg-[var(--color-void)] py-8 text-white md:py-10">
      <div className="mx-auto max-w-[var(--container-max)] px-4 md:px-[var(--container-padding)]">
        <h2
          className="text-display-lg uppercase text-white"
          style={{ fontSize: "24px" }}
        >
          7 ways we build intelligent enterprise
        </h2>
        <div className="mt-4 md:mt-5">
          <BentoGrid gap={8}>
            {services.map((s, i) => {
              const Icon = icons[s.icon] ?? Sparkles;
              const statNum = parseFloat(s.stats.value.replace(/[^\d.]/g, ""));
              const hasNum = !Number.isNaN(statNum);
              const suffix = s.stats.value.replace(/[\d.]+/g, "");
              return (
                <div key={s.id} className={`${cellClass[i]} min-w-0`}>
                  <BentoCard
                    grid={false}
                    variant="dark"
                    className="h-full transition-[border-color,box-shadow] hover:border-[var(--color-accent)] hover:shadow-[5px_5px_0_var(--color-accent)] [&>div:last-child]:!p-3.5"
                    labelRight={s.tags.join(" ")}
                  >
                    <div className="flex flex-col gap-1.5 md:flex-row md:items-start md:justify-between">
                      <div>
                        <Icon className="h-6 w-6 text-[var(--color-accent)]" />
                        <h3 className="mt-1.5 text-sm font-semibold text-white md:text-base">
                          {s.title}
                        </h3>
                        <p className="mt-1 max-w-prose text-[12px] leading-snug text-[var(--color-gray-300)]">
                          {s.description.slice(0, 90)}…
                        </p>
                      </div>
                      <div className="text-left md:text-right">
                        <p className="font-[family-name:var(--font-mono)] text-xl font-bold text-[var(--color-accent)] md:text-2xl">
                          {hasNum ? (
                            <MetricCounter
                              end={statNum}
                              suffix={suffix}
                              duration={1.5}
                              decimals={suffix.includes(".") ? 1 : 0}
                            />
                          ) : (
                            s.stats.value
                          )}
                        </p>
                        <p className="text-[10px] uppercase tracking-wider text-[var(--color-gray-400)]">
                          {s.stats.label}
                        </p>
                      </div>
                    </div>
                    <Link
                      href="/services"
                      className="mt-2 inline-block text-[11px] uppercase tracking-wider text-white underline-offset-4 hover:underline"
                    >
                      Learn More →
                    </Link>
                  </BentoCard>
                </div>
              );
            })}
            <div className={`${cellClass[7]} min-w-0`}>
              <BentoCard grid={false} variant="accent" className="h-full [&>div:last-child]:!p-3.5">
                <div className="flex h-full min-h-[110px] flex-col items-center justify-center text-center sm:min-h-[120px]">
                  <p className="max-w-[22ch] text-base font-bold leading-tight text-white md:text-lg">
                    Ready to transform your enterprise?
                  </p>
                  <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/80 md:text-xs">
                    Talk to our experts in 24h
                  </p>
                  <Link
                    href="/contact"
                    className="btn-brutal mt-3 inline-flex items-center justify-center px-5 py-2 text-xs font-bold uppercase tracking-[0.12em] !bg-white !text-black !shadow-[4px_4px_0_#000] sm:px-6"
                  >
                    Get started
                  </Link>
                </div>
              </BentoCard>
            </div>
          </BentoGrid>
        </div>
      </div>
    </section>
  );
}
