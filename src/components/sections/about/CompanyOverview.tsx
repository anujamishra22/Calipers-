import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TerminalLottie } from "@/components/sections/about/TerminalLottie";
import { NoiseOverlay } from "@/components/ui/NoiseOverlay";

export function CompanyOverview() {
  return (
    <section className="relative flex min-h-[calc(100dvh-64px)] overflow-hidden border-b-[3px] border-[var(--color-void)] bg-[#05060a] py-20 text-white md:py-24">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_-10%,rgba(0,71,255,0.18),transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,71,255,0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,71,255,0.4) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
        aria-hidden
      />
      <NoiseOverlay />
      <div className="relative mx-auto grid w-full max-w-[var(--container-max)] items-center gap-10 px-4 md:px-[var(--container-padding)] lg:grid-cols-2 lg:gap-8 xl:gap-12">
        <div className="flex min-w-0 flex-col justify-center max-w-4xl lg:max-w-none lg:pr-4 xl:pr-8">
          <div className="flex flex-col">
            <p className="text-mono-sm font-medium uppercase tracking-[0.2em] text-[#0047FF]">
              About Calipers
            </p>
            <span
              className="mt-2 block h-0.5 w-10 rounded-full bg-[var(--color-accent)] shadow-[0_0_12px_rgba(0,71,255,0.8)]"
              aria-hidden
            />
            <h1 className="mt-4 text-3xl font-bold leading-[1.06] text-white md:mt-5 md:text-5xl">
              We build AI systems that deliver{" "}
              <span className="text-[#0047FF] drop-shadow-[0_0_24px_rgba(0,71,255,0.45)]">
                real
              </span>{" "}
              <span className="text-[#0047FF] drop-shadow-[0_0_24px_rgba(0,71,255,0.45)]">
                impact.
              </span>
            </h1>
            <p className="mt-3 text-body-md text-white/75 md:mt-4 md:text-body-lg">
              We are a software and AI product company focused on GenAI, applied
              machine learning, and the full stack that ships them to production.
            </p>
            <p className="mt-2 hidden text-body-md text-white/75 md:block md:text-body-lg">
              From strategy through production, we partner with your team to
              design, build, and operate intelligent products that scale with your
              business—not slide decks.
            </p>
            <Link
              href="/services"
              className="group mt-4 inline-flex w-fit items-center gap-3 rounded-full border border-[var(--color-accent)] bg-transparent px-4 py-2 text-[11px] font-medium uppercase tracking-wider text-white shadow-[0_0_20px_rgba(0,71,255,0.15)] transition-colors hover:bg-[rgba(0,71,255,0.12)] md:mt-5 md:px-5 md:py-3 md:text-mono-sm"
            >
              <span>See how we build systems</span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--color-accent)] bg-[rgba(0,71,255,0.15)] text-[var(--color-accent)] transition-transform group-hover:translate-x-0.5 md:h-9 md:w-9">
                <ArrowRight className="h-4 w-4" aria-hidden />
              </span>
            </Link>
          </div>
        </div>
        <div className="flex min-w-0 items-center justify-center lg:pl-4 xl:pl-8">
          <TerminalLottie />
        </div>
      </div>
    </section>
  );
}
