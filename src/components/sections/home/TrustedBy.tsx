"use client";

import Image from "next/image";

/** Files live in `public/logos/`. Add or rename files there and update this list. */
const logos: { name: string; file: string }[] = [
  { name: "DATAFLOW", file: "dataflow logo.svg" },
  { name: "VANTA BANK", file: "Vanta logo.svg" },
  { name: "HELIX HEALTH", file: "Helix logo.svg" },
  { name: "IRONGATE IND.", file: "irongate.svg" },
  { name: "CLOUDPEAK", file: "CloudPeak.svg" },
  { name: "MERIDIAN AI", file: "MERIDIAN logo.svg" },
  { name: "ZEPHYR FIN", file: "Zephyr logo.svg" },
  { name: "AXIOM LABS", file: "axiomlabs.svg" },
];

const rows = logos.map((l) => ({
  name: l.name,
  src: `/logos/${encodeURIComponent(l.file)}`,
}));

export function TrustedBy() {
  return (
    <section className="border-t-[3px] border-[var(--color-void)] bg-gradient-to-br from-[var(--color-accent-light)] via-[var(--color-off-white)] to-[var(--color-off-white)] py-12 [html[data-theme='dark']_&]:from-[color-mix(in_srgb,var(--color-accent)_22%,var(--color-gray-900))] [html[data-theme='dark']_&]:via-[var(--color-gray-900)] [html[data-theme='dark']_&]:to-[var(--color-gray-900)]">
      <div className="mx-auto max-w-[var(--container-max)] px-4 md:px-[var(--container-padding)]">
        <p className="text-mono-sm font-bold uppercase tracking-[0.2em] text-[var(--color-void)]">
          Trusted by{" "}
          <span className="text-[var(--color-accent)]">enterprise</span>
        </p>
        <div className="relative left-1/2 right-1/2 mt-6 w-screen -ml-[50vw] -mr-[50vw] overflow-hidden border-y-[3px] border-[var(--color-void)] bg-[color-mix(in_srgb,var(--color-white)_88%,var(--color-accent-light))] py-5 shadow-[inset_0_1px_0_0_var(--color-accent),inset_0_-1px_0_0_var(--color-green-muted)] [html[data-theme='dark']_&]:bg-[color-mix(in_srgb,var(--color-gray-900)_75%,var(--color-accent)_8%)] [html[data-theme='dark']_&]:shadow-[inset_0_1px_0_0_var(--color-accent),inset_0_-1px_0_0_var(--color-green)]">
          <div className="animate-marquee-fast mx-auto flex w-max gap-16 px-2">
            {[...rows, ...rows].map((logo, i) => (
              <div
                key={`${logo.src}-${i}`}
                className="flex h-14 min-w-[140px] items-center justify-center rounded-sm border border-[var(--color-void)]/10 bg-[var(--color-white)]/80 px-3 shadow-[2px_2px_0_var(--color-accent-glow)] transition hover:scale-105 hover:border-[var(--color-accent)] hover:shadow-[3px_3px_0_var(--color-accent)] md:h-16 md:min-w-[160px] [html[data-theme='dark']_&]:border-white/15 [html[data-theme='dark']_&]:bg-[var(--color-gray-800)]/90"
              >
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={200}
                  height={56}
                  className="h-11 w-auto max-w-[200px] object-contain object-center md:h-12"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
