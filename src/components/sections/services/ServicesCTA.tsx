import Link from "next/link";

export function ServicesCTA() {
  return (
    <section className="bg-[var(--color-accent)] py-16 text-center text-white">
      <div className="mx-auto max-w-[var(--container-max)] px-4">
        <h2 className="text-display-sm">Ready for production-grade AI delivery?</h2>
        <Link
          href="/contact"
          className="btn-brutal mt-8 inline-block !bg-white !text-black !shadow-[5px_5px_0_#000]"
        >
          Talk to solutions
        </Link>
      </div>
    </section>
  );
}
