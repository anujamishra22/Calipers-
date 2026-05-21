"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const TERMINAL_LOTTIE_SRC =
  "https://lottie.host/56119ca5-593f-4247-a4e8-0d84496a0fb0/MEItbTdu5b.lottie";

const TERMINAL_CONIC_BORDER =
  "conic-gradient(from 0deg, #0047FF 0deg, #ffffff 60deg, #0047FF 120deg, rgba(255,255,255,0.45) 180deg, #0047FF 240deg, #ffffff 300deg, #0047FF 360deg)";

export function TerminalLottie() {
  return (
    <div
      className="relative flex w-full min-w-0 items-center justify-center [perspective:1400px]"
      aria-hidden
    >
      <div
        className="relative w-full max-w-[330px] origin-center transform-gpu [transform-style:preserve-3d] [transform:rotateY(-12deg)] drop-shadow-[12px_16px_32px_rgba(0,0,0,0.45)] lg:max-w-none lg:w-[88%] lg:origin-center xl:w-[85%]"
      >
        {/* Animated blue + white RGB-style border */}
        <div className="relative overflow-hidden rounded-xl animate-terminal-glow-pulse">
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[240%] w-[240%] animate-terminal-border-glow"
            style={{ background: TERMINAL_CONIC_BORDER }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -inset-2 z-0 rounded-2xl opacity-70 blur-xl animate-terminal-border-glow"
            style={{ background: TERMINAL_CONIC_BORDER }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -inset-3 z-0 rounded-2xl bg-[radial-gradient(ellipse_at_50%_0%,rgba(0,71,255,0.35),transparent_65%)]"
            aria-hidden
          />
          <div className="relative z-10 m-[3px] overflow-hidden rounded-[9px] border border-white/20 bg-[#05060a] shadow-[inset_0_1px_0_rgba(255,255,255,0.2),inset_0_0_28px_rgba(0,71,255,0.15)]">
            <div className="aspect-[5/4] w-full max-h-[264px] lg:max-h-none">
              <DotLottieReact
                src={TERMINAL_LOTTIE_SRC}
                loop
                autoplay
                className="h-full w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
