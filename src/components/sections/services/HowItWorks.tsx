"use client";

import { motion } from "framer-motion";

const steps = [
  {
    n: "01",
    title: "ASSESS",
    desc: "Map data, workflows, and automation surfaces with executive alignment.",
  },
  {
    n: "02",
    title: "DESIGN",
    desc: "Architecture, models, integrations, and measurable rollout waves.",
  },
  {
    n: "03",
    title: "BUILD",
    desc: "Ship integrations, pipelines, and releases with observability.",
  },
  {
    n: "04",
    title: "OPTIMIZE",
    desc: "Continuous learning, cost tuning, and reliability in production.",
  },
];

export function HowItWorks() {
  return (
    <section className="border-y-[3px] border-[var(--color-void)] bg-white py-20">
      <div className="mx-auto flex max-w-[var(--container-max)] flex-col gap-8 px-4 md:flex-row md:items-start md:justify-between md:px-[var(--container-padding)]">
        {steps.map((s, i) => (
          <motion.div
            key={s.n}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="flex-1 border-l-4 border-[var(--color-accent)] pl-4"
          >
            <p className="text-[64px] font-bold leading-none text-[var(--color-accent)]">
              {s.n}
            </p>
            <p className="mt-2 text-mono-sm font-bold tracking-[0.2em]">
              {s.title}
            </p>
            <p className="mt-2 text-body-sm opacity-80">{s.desc}</p>
            <span className="mt-4 hidden text-2xl md:block">→</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
