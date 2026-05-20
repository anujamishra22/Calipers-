import Link from "next/link";
import { BentoCard } from "@/components/ui/BentoCard";

const certs = [
  {
    name: "GDPR-aligned delivery",
    scope: "Data minimization, processing agreements, and regional hosting options.",
  },
  {
    name: "Responsible AI",
    scope: "Human review, bias checks, and documented model behavior.",
  },
  {
    name: "Quality assurance",
    scope: "Automated testing, staging gates, and release checklists.",
  },
  {
    name: "Client data ownership",
    scope: "Your prompts, models, and outputs stay in your tenancy by default.",
  },
];

export function Certifications() {
  return (
    <section className="py-[var(--section-padding)]">
      <div className="mx-auto max-w-[var(--container-max)] px-4 md:px-[var(--container-padding)]">
        <p className="text-mono-sm font-bold uppercase tracking-widest">
          Trust & quality
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {certs.map((c) => (
            <BentoCard key={c.name} grid={false} className="h-full">
              <div className="mb-4 inline-block border border-[var(--color-void)] px-3 py-1 text-mono-sm uppercase">
                Commitment
              </div>
              <h2 className="text-xl font-bold">{c.name}</h2>
              <p className="mt-2 text-body-sm opacity-80">{c.scope}</p>
              <Link
                href="/contact"
                className="mt-6 inline-block text-mono-sm font-bold text-[var(--color-accent)]"
              >
                Talk to us →
              </Link>
            </BentoCard>
          ))}
        </div>
      </div>
    </section>
  );
}
