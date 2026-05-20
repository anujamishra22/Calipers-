import Link from "next/link";

export function HomeCTA() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-accent)] py-[var(--section-padding)] text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 1px, transparent 12px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="relative mx-auto max-w-[var(--container-max)] px-4 text-center md:px-[var(--container-padding)]">
        <span className="raw-badge border-white text-white">
          [LET&apos;S BUILD TOGETHER]
        </span>
        <h2
          className="mt-8 text-display-xl text-white"
          style={{ fontSize: "55px" }}
        >
          YOUR ENTERPRISE. REIMAGINED WITH AI.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80">
          From Day 1, you&apos;re not a client — you&apos;re a co-builder.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/contact"
            className="btn-brutal !bg-white !text-black !shadow-[5px_5px_0_#000]"
          >
            SCHEDULE A DEMO
          </Link>
          <Link
            href="/contact"
            className="btn-brutal !bg-white !text-black !shadow-[5px_5px_0_#000]"
          >
            CONTACT SALES
          </Link>
        </div>
        <p className="mt-10 text-mono-sm text-white/80">
          ✓ No commitment • ✓ 48-hour response • ✓ Expert consultation
        </p>
      </div>
    </section>
  );
}
