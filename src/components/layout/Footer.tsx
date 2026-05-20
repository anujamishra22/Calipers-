"use client";

import Link from "next/link";
import { FaLinkedin } from "react-icons/fa";
import { FOOTER_SERVICES } from "@/lib/constants";

const company = [
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/compliance", label: "Trust" },
  { href: "/resources", label: "Resources" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t-[3px] border-[var(--color-void)] bg-[var(--color-off-white)] text-[var(--color-void)]">
      <div className="mx-auto grid max-w-[var(--container-max)] gap-10 px-4 py-16 md:grid-cols-4 md:px-[var(--container-padding)]">
        <div>
          <p className="font-[family-name:var(--font-display)] text-xl font-bold">
            CALIPERS<span className="text-[var(--color-accent)]"> GenAI</span>
          </p>
          <p className="mt-3 text-body-sm opacity-80">
            GenAI, AI & software—shipped with craft.
          </p>
          <div className="mt-4 flex gap-3">
            <a href="#" className="border border-[var(--color-void)] p-2 transition hover:-translate-y-0.5 hover:shadow-[3px_3px_0_var(--color-void)]" aria-label="LinkedIn">
              <FaLinkedin size={18} />
            </a>
          </div>
        </div>
        <div>
          <p className="text-mono-sm font-bold uppercase tracking-widest">
            Company
          </p>
          <ul className="mt-4 space-y-2 text-body-sm">
            {company.map((c) => (
              <li key={c.href}>
                <Link href={c.href} className="hover:text-[var(--color-accent)]">
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-mono-sm font-bold uppercase tracking-widest">
            Services
          </p>
          <ul className="mt-4 space-y-2 text-body-sm">
            {FOOTER_SERVICES.map((s) => (
              <li key={s}>
                <Link href="/services" className="hover:text-[var(--color-accent)]">
                  {s}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-mono-sm font-bold uppercase tracking-widest">
            Newsletter
          </p>
          <form
            className="mt-4 flex flex-col gap-2"
            onSubmit={(e) => e.preventDefault()}
            suppressHydrationWarning
          >
            <label className="text-mono-sm uppercase">Email</label>
            <input
              type="email"
              suppressHydrationWarning
              className="border-b-2 border-[var(--color-void)] bg-transparent px-0 py-2 text-body-sm outline-none focus:border-[var(--color-accent)]"
              placeholder="you@company.com"
            />
            <button
              type="submit"
              suppressHydrationWarning
              className="btn-brutal mt-2 w-fit text-xs"
            >
              Subscribe
            </button>
          </form>
          <p className="mt-6 text-mono-sm opacity-70">
            © 2025 Calipers. All rights reserved.
          </p>
        </div>
      </div>
      <div className="border-t border-[var(--color-void)] py-3 overflow-hidden">
        <div className="animate-marquee flex w-max gap-16 whitespace-nowrap text-mono-sm uppercase tracking-[0.2em]">
          <span>CALIPERS — GENAI · AI · SOFTWARE DEVELOPMENT</span>
          <span aria-hidden>CALIPERS — GENAI · AI · SOFTWARE DEVELOPMENT</span>
        </div>
      </div>
    </footer>
  );
}
