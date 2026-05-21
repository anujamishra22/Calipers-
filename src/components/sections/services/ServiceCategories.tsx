"use client";

import Image from "next/image";
import {
  ArrowRight,
  BarChart3,
  Bot,
  Brain,
  Cloud,
  Code,
  Users,
  Wand2,
} from "lucide-react";
import { NoiseOverlay } from "@/components/ui/NoiseOverlay";
import { cn } from "@/lib/utils";

const categories = [
  { display: "GENAI", scrollId: "gen-ai-platform", Icon: Wand2 },
  { display: "AI AUTOMATION", scrollId: "automation", Icon: Bot },
  { display: "ANALYTICS", scrollId: "analytics", Icon: BarChart3 },
  { display: "SOFTWARE", scrollId: "ai-software", Icon: Code },
  { display: "CUSTOM AI", scrollId: "custom-ai", Icon: Brain },
  { display: "CLOUD", scrollId: "cloud", Icon: Cloud },
  { display: "CONSULTING", scrollId: "consulting", Icon: Users },
] as const;

export function ServiceCategories() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative flex min-h-[calc(100dvh-64px)] overflow-hidden border-b-[3px] border-[var(--color-void)] bg-[#05060a] py-20 text-white md:py-24">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_55%_at_70%_0%,rgba(80,60,255,0.12),transparent_50%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,71,255,0.45) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,71,255,0.45) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
        aria-hidden
      />
      <NoiseOverlay />

      <div className="relative mx-auto flex w-full max-w-[var(--container-max)] flex-col justify-center px-4 md:px-[var(--container-padding)]">
        <div className="grid grid-cols-1 items-start gap-3 lg:grid-cols-12 lg:items-center lg:gap-8 xl:gap-10">
          <div className="lg:col-span-5">
            <p className="text-mono-sm font-medium uppercase tracking-[0.2em] text-[#0047FF] md:text-mono-md">
              Our services
            </p>
            <span
              className="mt-2 block h-0.5 w-10 rounded-full bg-[var(--color-accent)] shadow-[0_0_12px_rgba(0,71,255,0.75)]"
              aria-hidden
            />
            <h1 className="mt-2.5 font-[family-name:var(--font-display)] text-[clamp(1.35rem,3.85vw,2.75rem)] font-bold uppercase leading-[1.06] tracking-tight text-white md:mt-3">
              AI &amp; software
              <br />
              <span className="text-[#0047FF] drop-shadow-[0_0_40px_rgba(0,71,255,0.25)]">
                services
              </span>
            </h1>
            <p className="mt-2.5 max-w-xl text-body-md leading-snug text-white/70 md:mt-3.5 md:leading-relaxed lg:text-body-lg">
              Seven practices from GenAI to full-stack delivery. Pick a lane to jump
              into the detail.
            </p>
          </div>

          <div className="relative hidden justify-center lg:col-span-7 lg:flex lg:items-center lg:justify-end">
            <div
              className="pointer-events-none absolute inset-0 -z-10 blur-3xl lg:left-[5%] lg:right-0"
              style={{
                background:
                  "radial-gradient(circle at 58% 42%, rgba(80, 100, 255, 0.35), transparent 58%)",
              }}
              aria-hidden
            />
            <div className="relative isolate mx-auto w-full max-w-[min(100%,408px)] lg:max-w-[min(100%,480px)] xl:max-w-[min(100%,528px)]">
              <div
                className="relative"
                style={{
                  WebkitMaskImage:
                    "radial-gradient(ellipse 92% 88% at 50% 48%, #000 40%, rgba(0,0,0,0.9) 72%, transparent 100%)",
                  maskImage:
                    "radial-gradient(ellipse 92% 88% at 50% 48%, #000 40%, rgba(0,0,0,0.9) 72%, transparent 100%)",
                  WebkitMaskRepeat: "no-repeat",
                  maskRepeat: "no-repeat",
                  WebkitMaskSize: "100% 100%",
                  maskSize: "100% 100%",
                }}
              >
                <Image
                  src="/images/services-hero-isometric.png"
                  alt="Isometric view of Calipers AI and software services hub with connected capability tiles"
                  width={1200}
                  height={800}
                  className="mx-auto h-auto max-h-[240px] w-full max-w-full object-contain object-center brightness-[1.03] contrast-[1.02] saturate-[1.06] drop-shadow-[0_0_40px_rgba(80,100,255,0.22)] transition duration-300 ease-out will-change-transform hover:scale-[1.03] hover:drop-shadow-[0_0_60px_rgba(80,100,255,0.34)] lg:max-h-[288px] xl:max-h-[312px]"
                  priority
                  sizes="(max-width: 1024px) 92vw, 36vw"
                />
              </div>
              <div
                className="pointer-events-none absolute inset-0 z-[1]"
                style={{
                  background:
                    "radial-gradient(ellipse 95% 90% at 50% 50%, transparent 28%, rgba(5,6,10,0.2) 58%, rgba(5,6,10,0.85) 100%)",
                }}
                aria-hidden
              />
            </div>
          </div>
        </div>

        <div
          className="mt-10 flex gap-1 overflow-x-auto pb-3 [-ms-overflow-style:none] [scrollbar-width:none] md:mt-12 md:gap-1.5 md:pb-2 lg:mt-14 lg:grid lg:grid-cols-7 lg:gap-2 lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden"
          role="list"
        >
          {categories.map(({ display, scrollId, Icon }) => (
            <button
              key={scrollId}
              type="button"
              role="listitem"
              suppressHydrationWarning
              onClick={() => scrollTo(scrollId)}
              className={cn(
                "group flex min-w-[88px] flex-1 snap-start flex-col gap-1 rounded-md border p-1.5 text-left transition sm:min-w-[96px] sm:p-2 md:min-w-[118px] md:gap-2 md:p-2 lg:gap-2.5 lg:p-2.5",
                "border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] backdrop-blur-sm",
                "hover:border-[rgba(100,120,255,0.45)] hover:bg-[rgba(255,255,255,0.05)] hover:shadow-[0_0_28px_rgba(80,100,255,0.15)]",
                "lg:min-w-0",
              )}
            >
              <Icon
                className="h-4 w-4 shrink-0 text-[#6b8cff] sm:h-[18px] sm:w-[18px] md:h-5 md:w-5 lg:h-6 lg:w-6"
                strokeWidth={1.5}
                aria-hidden
              />
              <p className="font-[family-name:var(--font-display)] text-[10px] font-bold uppercase leading-tight tracking-wide text-white sm:text-[11px] md:text-xs lg:text-[12px]">
                {display}
              </p>
              <ArrowRight
                className="mt-auto h-3 w-3 text-[var(--color-accent)] transition-transform group-hover:translate-x-0.5 sm:h-3.5 sm:w-3.5"
                aria-hidden
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
