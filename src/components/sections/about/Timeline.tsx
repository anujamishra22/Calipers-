"use client";

import { useEffect } from "react";
import { timeline } from "@/data/timeline";
import { drawLine, prefersReducedMotion } from "@/lib/animations";

export function Timeline() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    // Smoothly draw while scrolling through the section.
    drawLine(
      "[data-timeline-line]",
      "[data-timeline-trigger]",
      "top bottom",
      // Extend the scroll distance so the draw feels slower.
      "bottom+=600 top",
      2.5,
    );
  }, []);

  return (
    <section
      data-timeline-trigger
      className="bg-[var(--color-off-white)] py-[var(--section-padding)]"
    >
      <div className="mx-auto max-w-[900px] px-4 md:px-[var(--container-padding)]">
        <p className="text-mono-sm font-bold uppercase tracking-widest">
          Timeline
        </p>
        <div className="relative mt-16">
          <div
            data-timeline-line
            className="absolute left-4 top-0 h-full w-[3px] bg-[var(--color-accent)] md:left-1/2 md:-translate-x-1/2"
          />
          <div className="space-y-12">
            {timeline.map((item, i) => (
              <div
                key={`${item.year}-${item.event}`}
                className={`relative flex flex-col gap-4 md:w-1/2 ${
                  i % 2 === 0 ? "md:pr-12 md:text-right" : "md:ml-auto md:pl-12"
                }`}
              >
                <h3 className="text-xl font-bold">{item.event}</h3>
                <p className="text-body-sm opacity-80">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
