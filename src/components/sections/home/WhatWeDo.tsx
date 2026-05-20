import { Brain, Code2, Bot } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

/** CTA art from `public/cta-architecture-session.png` (copy of user asset). */
function CtaSessionGraphic({ className }: { className?: string }) {
  return (
    <img
      src="/cta-architecture-session.png"
      alt=""
      width={520}
      height={400}
      draggable={false}
      className={cn("block h-auto w-full max-w-full object-contain", className)}
    />
  );
}

/** Chart art from `public/signal-velocity.svg` (copy of user asset). */
function SignalChartGraphic({ className }: { className?: string }) {
  return (
    <img
      src="/signal-velocity.svg"
      alt=""
      width={560}
      height={350}
      draggable={false}
      className={cn("block h-auto w-full max-w-full object-contain", className)}
    />
  );
}

/** GenAI pillar art from `public/genai-brain.png` (copy of user asset). */
function GenAiBrainGraphic({ className }: { className?: string }) {
  return (
    <img
      src="/genai-brain.png"
      alt=""
      width={800}
      height={600}
      draggable={false}
      className={cn("block h-auto w-full max-w-full object-contain", className)}
    />
  );
}

/** Software pillar art from `public/software-illustration.png` (copy of user asset). */
function SoftwareIllustrationGraphic({ className }: { className?: string }) {
  return (
    <img
      src="/software-illustration.png"
      alt=""
      width={800}
      height={600}
      draggable={false}
      className={cn("block h-auto w-full max-w-full object-contain", className)}
    />
  );
}

/** Automation pillar art from `public/automation-illustration.png` (copy of user asset). */
function AutomationIllustrationGraphic({ className }: { className?: string }) {
  return (
    <img
      src="/automation-illustration.png"
      alt=""
      width={800}
      height={600}
      draggable={false}
      className={cn("block h-auto w-full max-w-full object-contain", className)}
    />
  );
}

const pillars = [
  {
    id: "pillar-genai",
    title: "GenAI & AI",
    icon: Brain,
    desc: "LLMs, agents, and retrieval stacks tuned to your domain and quality bar.",
    stat: "94% avg quality",
  },
  {
    id: "pillar-software",
    title: "Software",
    icon: Code2,
    desc: "Full-stack products, APIs, and data pipelines built for iteration.",
    stat: "2× faster releases",
  },
  {
    id: "pillar-automation",
    title: "Automation",
    icon: Bot,
    desc: "Agents orchestrate workflows across IT, HR, and revenue teams.",
    stat: "65% automation",
  },
] as const;

const cellHover =
  "motion-reduce:transition-none motion-reduce:hover:transform-none origin-center transition-[transform,box-shadow] duration-300 ease-out [@media(hover:hover)]:hover:z-[1] [@media(hover:hover)]:hover:scale-[1.012] [@media(hover:hover)]:hover:shadow-[0_20px_44px_-14px_rgba(0,0,0,0.14)]";

export function WhatWeDo() {
  return (
    <section className="relative bg-[var(--color-off-white)] py-8 md:py-12">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-[0.18]" />
      <div className="relative mx-auto max-w-[var(--container-max)] px-4 md:px-[var(--container-padding)]">
        <div className="grid grid-cols-1 border border-[var(--color-void)] md:grid-cols-12">
          {/* Hero */}
          <div
            className={`relative flex min-h-[160px] flex-col justify-between overflow-hidden border-b border-[var(--color-void)] bg-white p-4 sm:p-5 md:col-span-8 md:row-span-2 md:min-h-[180px] md:border-r md:border-b [html[data-theme='dark']_&]:bg-[var(--color-white)] ${cellHover}`}
          >
            <img
              src="/hero-what-we-do.png"
              alt=""
              width={1400}
              height={900}
              draggable={false}
              className="pointer-events-none absolute inset-0 z-0 h-full w-full select-none object-cover object-[58%_100%] [html[data-theme='dark']_&]:opacity-90"
            />

            <div className="relative z-[1] flex min-h-0 flex-1 flex-col justify-between">
              <div className="flex flex-1 gap-3 sm:gap-4">
                <div
                  className="w-1 shrink-0 bg-[#0047ff]"
                  aria-hidden
                />
                <div className="min-w-0 flex-1 pt-0.5">
                  <p className="text-[15px] font-bold leading-[1.3] tracking-tight text-[var(--color-void)] sm:text-base">
                    We design and ship intelligent software - GenAI, classical ML, and the
                    applications that embed them - so teams move from idea to production without
                    sacrificing quality.
                  </p>
                </div>
              </div>
              <div className="relative mt-4 sm:mt-5">
                <Link
                  href="/about"
                  className="text-mono-sm font-bold uppercase tracking-[0.18em] text-[#0047ff] underline-offset-4 transition-opacity hover:opacity-80"
                >
                  Learn more →
                </Link>
              </div>
            </div>
          </div>

          {/* Signal — horizontal card: copy ~40% left, chart ~60% right (reference layout) */}
          <div
            className={`relative flex min-h-[150px] flex-col border-b border-[var(--color-void)] bg-black p-4 pb-3 text-white sm:p-5 sm:pb-4 md:col-span-4 md:col-start-9 md:row-start-1 md:min-h-[140px] md:flex-row md:items-stretch md:gap-0 md:py-4 md:pl-5 md:pr-3 md:pb-4 ${cellHover}`}
          >
            <div className="relative z-[2] flex w-full shrink-0 flex-col justify-center md:basis-[38%] md:max-w-[15rem] md:shrink-0 md:pr-2 lg:max-w-[16.5rem]">
              <p className="text-mono-sm tracking-wide text-white/55">Signal</p>
              <p className="mt-1.5 text-base font-bold leading-[1.15] tracking-tight text-white sm:text-lg">
                Shipping velocity
              </p>
              <p className="mt-1.5 text-body-sm leading-snug text-white/55">
                Releases, evaluations, and product metrics in one rhythm.
              </p>
            </div>

            <div className="relative z-[1] mt-2 flex min-h-[80px] w-full flex-1 items-end justify-end md:mt-0 md:min-h-0 md:pl-1">
              <SignalChartGraphic className="pointer-events-none max-h-[110px] max-w-[min(100%,200px)] shrink-0 md:max-h-[130px] md:max-w-[min(100%,240px)] md:-translate-y-1" />
            </div>
          </div>

          {/* CTA — copy left, 3D calendar/clock PNG right (reference layout) */}
          <div
            className={`relative flex min-h-[150px] flex-col gap-3 overflow-hidden border-b border-[var(--color-void)] bg-[#0047ff] p-4 text-white sm:p-5 md:col-span-4 md:col-start-9 md:row-start-2 md:min-h-[150px] md:flex-row md:items-stretch md:justify-between md:gap-3 md:px-5 md:py-5 ${cellHover}`}
          >
            <svg
              className="pointer-events-none absolute bottom-0 left-[-5%] z-0 h-28 w-[85%] text-white/30 sm:h-32 md:left-0 md:h-36 md:w-[70%]"
              viewBox="0 0 400 100"
              preserveAspectRatio="none"
              aria-hidden
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeWidth="1.25"
                d="M0 78 Q100 38 200 68 T400 48"
              />
              <path
                fill="none"
                stroke="currentColor"
                strokeWidth="0.9"
                opacity="0.65"
                d="M0 90 Q130 52 260 74 T400 58"
              />
            </svg>

            <div className="relative z-[2] flex w-full min-w-0 flex-col justify-between gap-3 md:basis-[52%] md:max-w-[19rem] md:flex-shrink-0 md:pr-2">
              <div>
                <p className="text-mono-sm text-white/80">Next</p>
                <p className="mt-1 text-base font-bold leading-snug text-white sm:text-lg">
                  Book an architecture session
                </p>
                <p className="mt-1.5 text-body-sm leading-snug text-white/80">
                  Align on goals, constraints, and a high-level plan.
                </p>
              </div>
              <Link
                href="/contact"
                className="relative z-[2] inline-flex w-fit items-center gap-2 border-[3px] border-black bg-white px-3 py-2 text-mono-sm font-bold uppercase tracking-wider text-black shadow-[3px_3px_0_0_#000] transition-[transform,box-shadow] duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0_0_#000]"
              >
                Talk to us →
              </Link>
            </div>

            <div className="relative z-[1] mt-1 flex min-h-[100px] w-full flex-1 items-end justify-end md:mt-0 md:min-h-0 md:pl-1">
              <CtaSessionGraphic className="pointer-events-none max-h-[120px] max-w-[min(100%,180px)] shrink-0 object-[right_bottom] sm:max-h-[140px] sm:max-w-[min(100%,200px)] md:max-h-[160px] md:max-w-[min(100%,220px)] md:-translate-y-1" />
            </div>
          </div>

          {/* Pillars — white cards, line icons */}
          {pillars.map((p, i) => (
            <div
              key={p.id}
              className={cn(
                "flex flex-col gap-3 border-b border-[var(--color-void)] bg-white p-4 last:border-b-0 sm:flex-row sm:items-stretch sm:justify-between sm:gap-4 sm:p-5 md:col-span-4 md:min-h-[160px] md:border-b-0",
                i < 2 && "md:border-r",
                "[html[data-theme='dark']_&]:bg-[var(--color-gray-900)]",
                cellHover,
              )}
            >
              <div
                className="flex min-w-0 flex-1 flex-col self-stretch md:max-w-[min(100%,15.5rem)] lg:max-w-[17rem]"
              >
                <p.icon
                  className="h-5 w-5 shrink-0 text-[#0047ff] [html[data-theme='dark']_&]:text-[var(--color-accent)]"
                  strokeWidth={1.15}
                  aria-hidden
                />
                <h3 className="mt-2 text-base font-bold tracking-tight text-[var(--color-void)]">
                  {p.title}
                </h3>
                <p className="mt-1.5 max-w-prose text-body-sm leading-snug text-[var(--color-void)]/65">
                  {p.desc}
                </p>
                <p className="mt-auto pt-2 text-mono-sm font-semibold text-[#0047ff] [html[data-theme='dark']_&]:text-[var(--color-accent)]">
                  {p.stat}
                </p>
              </div>
              {p.id === "pillar-genai" ? (
                <div className="mt-0 flex min-h-[100px] w-full flex-1 items-end justify-end sm:mt-0 sm:min-h-[110px] md:min-h-0 md:pl-2">
                  <GenAiBrainGraphic className="pointer-events-none max-h-[110px] max-w-[min(100%,170px)] shrink-0 sm:max-h-[120px] sm:max-w-[min(100%,190px)] md:max-h-[130px] md:max-w-[min(100%,210px)] md:-translate-y-1" />
                </div>
              ) : p.id === "pillar-software" ? (
                <div className="mt-0 flex min-h-[100px] w-full flex-1 items-end justify-end sm:mt-0 sm:min-h-[110px] md:min-h-0 md:pl-2">
                  <SoftwareIllustrationGraphic className="pointer-events-none max-h-[110px] max-w-[min(100%,160px)] shrink-0 sm:max-h-[120px] sm:max-w-[min(100%,180px)] md:max-h-[130px] md:max-w-[min(100%,200px)] md:-translate-y-1" />
                </div>
              ) : p.id === "pillar-automation" ? (
                <div className="mt-0 flex min-h-[100px] w-full flex-1 items-end justify-end sm:mt-0 sm:min-h-[110px] md:min-h-0 md:pl-2">
                  <AutomationIllustrationGraphic className="pointer-events-none max-h-[110px] max-w-[min(100%,160px)] shrink-0 sm:max-h-[120px] sm:max-w-[min(100%,180px)] md:max-h-[130px] md:max-w-[min(100%,200px)] md:-translate-y-1" />
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
