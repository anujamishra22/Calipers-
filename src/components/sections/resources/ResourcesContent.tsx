"use client";

import { useState } from "react";
import { BorderButton } from "@/components/ui/BorderButton";

const ebooks = [
  "Enterprise AI Adoption Playbook 2025",
  "Building Production RAG: A Practical Guide",
  "AI ROI Calculator for Mid-Enterprise",
  "Team Playbook for GenAI Releases",
];

const webinars = [
  { title: "GenAI in Production Live", date: "2025-02-12", recorded: false },
  { title: "MLOps Executive Briefing", date: "2025-01-28", recorded: true },
  { title: "MLOps at Enterprise Scale", date: "2025-01-05", recorded: true },
];

const quizQs = [
  "Do you have a centralized feature store?",
  "Are models promoted with automated gates?",
  "Is drift monitored in production?",
  "Do you have human override paths documented?",
  "Are integration tests required before model promotion?",
];

export function ResourcesContent() {
  const [q, setQ] = useState(0);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [employees, setEmployees] = useState("500");
  const [toolCost, setToolCost] = useState("250000");

  const answer = (yes: boolean) => {
    if (yes) setScore((s) => s + 1);
    if (q + 1 >= quizQs.length) setDone(true);
    else setQ((n) => n + 1);
  };

  const projected =
    Math.round(Number(toolCost || 0) * 0.22 + Number(employees || 0) * 120);

  return (
    <div className="space-y-24 py-[var(--section-padding)]">
      <section className="mx-auto max-w-[var(--container-max)] px-4 md:px-[var(--container-padding)]">
        <h2 className="text-display-sm">E-books</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {ebooks.map((t) => (
            <div
              key={t}
              className="flex items-center justify-between gap-4 border border-[var(--color-void)] bg-white p-6"
            >
              <div>
                <p className="text-lg font-bold">{t}</p>
                <p className="mt-2 text-body-sm opacity-70">PDF · Executive summary included</p>
              </div>
              <BorderButton href="#">Download</BorderButton>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[var(--container-max)] px-4 md:px-[var(--container-padding)]">
        <h2 className="text-display-sm">Webinars</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {webinars.map((w) => (
            <div key={w.title} className="border border-[var(--color-void)] bg-[var(--color-off-white)] p-4">
              <div className="flex aspect-video items-center justify-center border border-dashed border-[var(--color-void)] bg-white text-mono-sm">
                Thumbnail
              </div>
              <p className="mt-4 font-bold">{w.title}</p>
              <p className="text-mono-sm opacity-70">{w.date}</p>
              <BorderButton href="#" className="mt-4 !text-xs">
                {w.recorded ? "Watch replay" : "Register"}
              </BorderButton>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[var(--container-max)] px-4 md:px-[var(--container-padding)]">
        <h2 className="text-display-sm">AI Readiness Assessment</h2>
        <div className="mt-6 max-w-xl border-2 border-[var(--color-void)] bg-white p-6">
          {done ? (
            <p className="text-lg font-bold">
              Score {score}/{quizQs.length} — we&apos;ll email a tailored maturity
              map (mock).
            </p>
          ) : (
            <>
              <p className="text-mono-sm text-[var(--color-accent)]">
                Question {q + 1} / {quizQs.length}
              </p>
              <p className="mt-4 text-lg font-medium">{quizQs[q]}</p>
              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  suppressHydrationWarning
                  className="btn-brutal"
                  onClick={() => answer(true)}
                >
                  Yes
                </button>
                <button
                  type="button"
                  suppressHydrationWarning
                  className="btn-brutal-outline"
                  onClick={() => answer(false)}
                >
                  No
                </button>
              </div>
            </>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-[var(--container-max)] px-4 md:px-[var(--container-padding)]">
        <h2 className="text-display-sm">ROI Calculator</h2>
        <div className="mt-6 grid max-w-xl gap-4 border-2 border-[var(--color-void)] bg-white p-6">
          <label className="text-mono-sm font-bold uppercase">
            Company size (employees)
            <input
              suppressHydrationWarning
              className="input-brutal mt-2"
              value={employees}
              onChange={(e) => setEmployees(e.target.value)}
            />
          </label>
          <label className="text-mono-sm font-bold uppercase">
            Annual tooling spend (USD)
            <input
              suppressHydrationWarning
              className="input-brutal mt-2"
              value={toolCost}
              onChange={(e) => setToolCost(e.target.value)}
            />
          </label>
          <p className="border-t border-[var(--color-void)] pt-4 text-xl font-bold">
            Projected savings (illustrative): ${projected.toLocaleString()}
          </p>
        </div>
      </section>
    </div>
  );
}
