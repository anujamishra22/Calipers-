import { services } from "@/data/services";
import Image from "next/image";
import {
  Sparkles,
  Bot,
  TrendingUp,
  Code,
  Brain,
  Cloud,
  Compass,
} from "lucide-react";
import { BorderButton } from "@/components/ui/BorderButton";

const icons: Record<string, React.ElementType> = {
  Sparkles,
  Bot,
  TrendingUp,
  Code,
  Brain,
  Cloud,
  Compass,
};

const serviceImages: Record<
  string,
  { src: string; alt: string; width: number; height: number }
> = {
  "gen-ai-platform": {
    src: "/images/chatgpt-image-apr-27-2026-045905.png",
    alt: "GenAI platform quality score preview",
    width: 1672,
    height: 941,
  },
  automation: {
    src: "/images/chatgpt-image-apr-27-2026-050324.png",
    alt: "Automation workflow reduction preview",
    width: 1536,
    height: 1024,
  },
  analytics: {
    src: "/images/chatgpt-image-apr-27-2026-050608.png",
    alt: "Forecasting accuracy preview",
    width: 1536,
    height: 1024,
  },
  "ai-software": {
    src: "/images/chatgpt-image-apr-27-2026-052007.png",
    alt: "AI-native software engineering preview",
    width: 1536,
    height: 1024,
  },
  "custom-ai": {
    src: "/images/chatgpt-image-apr-27-2026-053400.png",
    alt: "Custom AI model accuracy preview",
    width: 1536,
    height: 1024,
  },
  cloud: {
    src: "/images/chatgpt-image-apr-27-2026-054110.png",
    alt: "Cloud infrastructure uptime preview",
    width: 1402,
    height: 1122,
  },
  consulting: {
    src: "/images/chatgpt-image-apr-27-2026-055022.png",
    alt: "AI readiness consulting ROI timeline preview",
    width: 1536,
    height: 1024,
  },
};

const visualFrameClass =
  "relative w-full overflow-hidden border-2 border-[var(--color-void)] bg-[var(--color-off-white)] shadow-[var(--shadow-brutal-md)] transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_0_48px_rgba(0,71,255,0.35)]";

const serviceImageClass = "object-cover object-center";

function ServiceVisual({
  serviceId,
  Icon,
  stats,
  priority,
}: {
  serviceId: string;
  Icon: React.ElementType;
  stats: { value: string; label: string };
  priority?: boolean;
}) {
  const image = serviceImages[serviceId];

  if (!image) {
    return (
      <div
        className={`${visualFrameClass} flex min-h-[280px] flex-col items-center justify-center p-8`}
      >
        <Icon className="h-20 w-20 text-[var(--color-accent)]" />
        <p className="mt-6 text-center text-mono-sm">
          {stats.value}
          <br />
          <span className="opacity-70">{stats.label}</span>
        </p>
        <div className="mt-8 h-32 w-full rounded border border-dashed border-[var(--color-gray-400)] bg-white/50" />
      </div>
    );
  }

  return (
    <div
      className={visualFrameClass}
      style={{ aspectRatio: `${image.width} / ${image.height}` }}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className={serviceImageClass}
        priority={priority}
      />
    </div>
  );
}

export function ServiceBlocks() {
  return (
    <section id="services-detail" className="py-[var(--section-padding)]">
      <div className="mx-auto max-w-[var(--container-max)] space-y-24 px-4 md:px-[var(--container-padding)]">
        {services.map((s, i) => {
          const Icon = icons[s.icon] ?? Sparkles;
          const left = i % 2 === 0;
          const content = (
            <div>
              <h2 className="mt-4 text-display-md">{s.title}</h2>
              <p className="mt-4 text-body-lg opacity-80">{s.description}</p>
              <ul className="mt-6 space-y-2 text-body-md">
                {s.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span>▪</span> {f}
                  </li>
                ))}
              </ul>
              <ul className="mt-6 space-y-2 text-mono-sm">
                {s.benefits.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-2">
                {(s.industries ?? []).map((tag) => (
                  <span
                    key={tag}
                    className="border border-[var(--color-void)] px-2 py-1 text-mono-sm uppercase"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {s.process.map((p) => (
                  <div key={p.step} className="border border-[var(--color-void)] p-4">
                    <p className="text-mono-xl text-[var(--color-accent)]">
                      [{p.step}]
                    </p>
                    <p className="mt-2 font-bold">{p.title}</p>
                    <p className="mt-1 text-body-sm opacity-70">{p.detail}</p>
                  </div>
                ))}
              </div>
              <BorderButton href="/contact" className="mt-8">
                GET A CONSULTATION
              </BorderButton>
            </div>
          );
          const visual = (
            <ServiceVisual
              serviceId={s.id}
              Icon={Icon}
              stats={s.stats}
              priority={i === 0}
            />
          );
          return (
            <div
              key={s.id}
              id={s.id}
              className="scroll-mt-24 grid gap-10 md:grid-cols-2 md:items-center"
            >
              {left ? (
                <>
                  {content}
                  {visual}
                </>
              ) : (
                <>
                  <div className="md:order-1">{visual}</div>
                  <div className="md:order-2">{content}</div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
