import {
  Lightbulb,
  Eye,
  Code2,
  Heart,
  Gauge,
  Users,
} from "lucide-react";
import { BentoCard } from "@/components/ui/BentoCard";

const values = [
  {
    title: "Intelligence First",
    desc: "Every decision, data-backed",
    icon: Lightbulb,
  },
  {
    title: "Radical Transparency",
    desc: "No black boxes in AI or business",
    icon: Eye,
  },
  {
    title: "Craft & quality",
    desc: "Tests, reviews, and observable systems by default.",
    icon: Code2,
  },
  {
    title: "Customer Obsession",
    desc: "Your success is our metric",
    icon: Heart,
  },
  {
    title: "Move Fast, Stay Precise",
    desc: "Speed without sacrificing accuracy",
    icon: Gauge,
  },
  {
    title: "Human + AI Collaboration",
    desc: "AI amplifies, never replaces",
    icon: Users,
  },
];

export function Values() {
  return (
    <section className="border-t-[3px] border-[var(--color-void)] bg-white py-[var(--section-padding)]">
      <div className="mx-auto max-w-[var(--container-max)] px-4 md:px-[var(--container-padding)]">
        <p className="text-mono-sm font-bold uppercase tracking-widest">
          Values
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {values.map((v) => (
            <BentoCard key={v.title} grid={false} className="h-full">
              <v.icon className="h-8 w-8 text-[var(--color-accent)]" />
              <h3 className="mt-4 text-lg font-bold">{v.title}</h3>
              <p className="mt-2 text-body-sm opacity-70">{v.desc}</p>
            </BentoCard>
          ))}
        </div>
      </div>
    </section>
  );
}
