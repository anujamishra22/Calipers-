"use client";

import { motion } from "framer-motion";
import { BorderButton } from "@/components/ui/BorderButton";
import { GridLines } from "@/components/ui/GridLines";

const letters = (s: string) => s.split("");

const HERO_VIDEO_SRC = "/videos/hero-bg.mp4";

export function Hero() {
  return (
    <section className="relative flex min-h-[100dvh] flex-col overflow-hidden bg-[var(--color-gray-900)] text-white">
      {/* Background video (file: public/videos/hero-bg.mp4) */}
      <div className="absolute inset-0 z-0">
        <video
          className="h-full min-h-full w-full min-w-full object-cover object-center"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden
        >
          <source src={HERO_VIDEO_SRC} type="video/mp4" />
        </video>
      </div>
      {/* Readability scrim */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_75%_55%_at_50%_42%,rgba(10,10,8,0.25)_0%,rgba(10,10,8,0.78)_55%,rgba(10,10,8,0.92)_100%)]"
        aria-hidden
      />
      <GridLines className="pointer-events-none absolute inset-0 z-[2] opacity-[0.06]" />

      <div className="relative z-[3] mx-auto flex w-full max-w-[var(--container-max)] flex-1 flex-col px-4 pb-20 pt-20 md:px-[var(--container-padding)] md:pt-24">
        <div className="flex flex-1 flex-col justify-center">
            <motion.div
              className="flex flex-wrap items-baseline"
              initial="hidden"
              animate="show"
              variants={{
                show: {
                  transition: { staggerChildren: 0.03, delayChildren: 0.6 },
                },
              }}
            >
              {letters("CALIPERS").map((ch, i) => (
                <motion.span
                  key={`c-${i}`}
                  className="inline-block text-[clamp(48px,10vw,140px)] font-bold uppercase leading-[0.9] tracking-[-0.05em] text-white"
                  style={{ fontFamily: "var(--font-display)" }}
                  variants={{
                    hidden: { y: 40, opacity: 0 },
                    show: { y: 0, opacity: 1 },
                  }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  {ch}
                </motion.span>
              ))}
              <motion.span
                key="sep-x"
                className="inline-block text-[clamp(48px,10vw,140px)] font-bold leading-[0.9] tracking-[-0.05em] text-white"
                style={{ fontFamily: "var(--font-display)" }}
                variants={{
                  hidden: { y: 40, opacity: 0 },
                  show: { y: 0, opacity: 1 },
                }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                x
              </motion.span>
              {letters("GENAI").map((ch, i) => (
                <motion.span
                  key={`g-${i}`}
                  className={`inline-block text-[clamp(48px,10vw,140px)] font-bold uppercase leading-[0.9] tracking-[-0.05em] text-[var(--color-accent)] ${i === 0 ? "ml-2 md:ml-3" : ""}`}
                  style={{ fontFamily: "var(--font-display)" }}
                  variants={{
                    hidden: { y: 40, opacity: 0 },
                    show: { y: 0, opacity: 1 },
                  }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  {ch}
                </motion.span>
              ))}
            </motion.div>

            <motion.p
              className="mt-6 max-w-[520px] text-[22px] text-white/70"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.4 }}
            >
              We build GenAI, applied AI, and the software stacks that ship them —
              from prototypes to production.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-wrap gap-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.3 }}
            >
              <BorderButton href="/contact" variant="solid">
                BOOK A DEMO ↗
              </BorderButton>
              <BorderButton
                href="/services"
                variant="outline"
                className="!border-white !text-white !shadow-[5px_5px_0_white] hover:!bg-white hover:!text-black"
              >
                SEE PLATFORM
              </BorderButton>
            </motion.div>

            <motion.p
              className="mt-12 text-mono-sm text-white/50"
              animate={{ y: [0, 4, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2.2 }}
            >
              ↓ SCROLL TO EXPLORE
            </motion.p>
        </div>
      </div>
    </section>
  );
}
