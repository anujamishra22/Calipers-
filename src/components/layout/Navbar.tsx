"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { BorderButton } from "@/components/ui/BorderButton";
import { MobileMenu } from "./MobileMenu";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    queueMicrotask(() => setMobileOpen(false));
  }, [pathname]);

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 z-[1000] flex h-16 w-full items-center border-b-[3px] border-[var(--color-void)] transition-colors",
          scrolled
            ? "bg-[var(--color-white)] shadow-[0_3px_0_var(--color-void)]"
            : "bg-[var(--color-off-white)]",
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
        style={{
          boxShadow: scrolled ? "0 3px 0 var(--color-void)" : undefined,
        }}
      >
        <div className="mx-auto flex w-full max-w-[var(--container-max)] items-center justify-between px-4 md:px-[var(--container-padding)]">
          <Link
            href="/"
            className="font-[family-name:var(--font-display)] text-lg font-bold tracking-tight md:text-xl"
          >
            CALIPERS
          </Link>

          <nav
            className="hidden items-center gap-6 lg:flex"
            aria-label="Primary"
          >
            {NAV_LINKS.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "nav-underline text-mono-sm uppercase text-[var(--color-void)] transition-colors",
                    active && "text-[var(--color-accent)]",
                  )}
                  style={
                    active
                      ? { boxShadow: "inset 0 -2px 0 0 var(--color-accent)" }
                      : undefined
                  }
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <BorderButton
              href="/contact"
              className="hidden !px-4 !py-2 text-xs md:inline-flex"
            >
              Book Demo
            </BorderButton>
            <button
              type="button"
              suppressHydrationWarning
              className="p-2 md:hidden"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((o) => !o)}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.header>
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
