import { BentoCard } from "@/components/ui/BentoCard";

const practices = [
  "Automated CI/CD and preview environments",
  "Test-driven development and integration suites",
  "Architecture reviews and technical design docs",
  "Observability: tracing, metrics, and structured logs",
  "Pair programming and async code review",
  "Documentation and handoff kits for every release",
];

export function DeliveryPractices() {
  return (
    <section className="border-t-[3px] border-[var(--color-void)] bg-[var(--color-off-white)] py-[var(--section-padding)]">
      <div className="mx-auto max-w-[var(--container-max)] px-4 md:px-[var(--container-padding)]">
        <p className="text-mono-sm font-bold uppercase tracking-widest">
          How we ship software
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {practices.map((p) => (
            <BentoCard key={p} grid={false}>
              <p className="text-lg font-bold">{p}</p>
              <p className="mt-2 text-body-sm opacity-70">
                Practices we apply across GenAI, application code, and data
                pipelines.
              </p>
            </BentoCard>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap gap-6 border border-[var(--color-void)] bg-white p-6 text-mono-sm font-bold uppercase tracking-widest">
          <span>99.9% SLA targets</span>
          <span>Weekly release cadence</span>
          <span>Transparent roadmaps</span>
          <span>Quarterly stakeholder reviews</span>
        </div>
      </div>
    </section>
  );
}
