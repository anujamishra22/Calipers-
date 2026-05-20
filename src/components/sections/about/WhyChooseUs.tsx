import { BentoCard } from "@/components/ui/BentoCard";
import { Zap, Layers, LineChart } from "lucide-react";
const items = [
  {
    title: "Outcome velocity",
    body: "From pilot to production with measurable KPIs every sprint.",
    icon: Zap,
  },
  {
    title: "Engineering discipline",
    body: "CI/CD, environments, and release hygiene built for AI workloads.",
    icon: Layers,
  },
  {
    title: "Transparent AI",
    body: "Evaluation harnesses, traces, and human oversight where it matters.",
    icon: LineChart,
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-[var(--section-padding)]">
      <div className="mx-auto max-w-[var(--container-max)] px-4 md:px-[var(--container-padding)]">
        <p className="text-mono-sm font-bold uppercase tracking-widest">
          Why Calipers
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {items.map((it) => (
            <div key={it.title} className="col-span-12 md:col-span-1">
              <BentoCard grid={false} className="h-full">
                <it.icon className="h-8 w-8 text-[var(--color-accent)]" />
                <h3 className="mt-4 text-xl font-bold">{it.title}</h3>
                <p className="mt-2 text-body-sm opacity-80">{it.body}</p>
              </BentoCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
