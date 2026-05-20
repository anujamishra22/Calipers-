"use client";

import { industries } from "@/data/industries";
import { useState } from "react";
import { Building2, Heart, Cpu, Factory, ShoppingCart } from "lucide-react";
import Link from "next/link";

const icons = [Building2, Heart, ShoppingCart, Factory, Cpu];

export function IndustryGrid() {
  const [active, setActive] = useState(0);
  const ind = industries[active];
  const Icon = icons[active] ?? Building2;

  return (
    <section className="pb-[var(--section-padding)] pt-[calc(var(--section-padding)*0.6)]">
      <div className="mx-auto flex max-w-[var(--container-max)] gap-10 px-4 md:px-[var(--container-padding)]">
        <nav className="hidden w-56 shrink-0 flex-col gap-2 border-r border-[var(--color-void)] pr-4 md:flex">
          {industries.map((item, i) => (
            <button
              key={item.id}
              type="button"
              suppressHydrationWarning
              onClick={() => setActive(i)}
              className={`flex items-center gap-2 border-l-4 px-3 py-2 text-left text-mono-sm uppercase ${
                active === i
                  ? "border-[var(--color-accent)] bg-[var(--color-accent-light)]"
                  : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              {item.short}
            </button>
          ))}
        </nav>
        <div className="min-w-0 flex-1">
          <div className="mb-6 flex flex-wrap gap-2 md:hidden">
            {industries.map((item, i) => (
              <button
                key={item.id}
                type="button"
                suppressHydrationWarning
                onClick={() => setActive(i)}
                className={`border px-3 py-1 text-mono-sm uppercase ${
                  active === i ? "border-[var(--color-accent)]" : ""
                }`}
              >
                {item.short}
              </button>
            ))}
          </div>
          <Icon className="h-10 w-10 text-[var(--color-accent)]" />
          <h1 className="mt-4 text-display-md">{ind.name}</h1>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="border border-[var(--color-void)] bg-white p-6">
              <p className="text-mono-sm font-bold">Challenges</p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-body-sm">
                {ind.challenges.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
            <div className="border border-[var(--color-void)] bg-white p-6">
              <p className="text-mono-sm font-bold">Solutions</p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-body-sm">
                {ind.solutions.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-8 border border-[var(--color-void)] bg-[var(--color-off-white)] p-6">
            <p className="text-mono-sm font-bold">Results</p>
            <ul className="mt-4 space-y-2 text-body-md font-medium">
              {ind.results.map((r) => (
                <li key={r}>→ {r}</li>
              ))}
            </ul>
          </div>
          <Link
            href="/case-studies"
            className="mt-8 inline-block border border-[var(--color-void)] px-4 py-3 text-mono-sm font-bold uppercase hover:bg-[var(--color-void)] hover:text-white"
          >
            Explore case studies
          </Link>
        </div>
      </div>
    </section>
  );
}
