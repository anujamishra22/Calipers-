"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { NAV_LINKS } from "@/lib/constants";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function MobileMenu({ open, onClose }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[1500] bg-[var(--color-void)] text-white md:hidden"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <nav className="flex h-full flex-col px-8 pt-24" aria-label="Mobile">
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="block border-b border-white/15 py-4 text-mono-md uppercase tracking-widest"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <div className="mt-auto flex gap-4 pb-10">
              <a href="#" aria-label="LinkedIn" className="p-2">
                <FaLinkedin size={22} />
              </a>
              <a href="#" aria-label="Twitter" className="p-2">
                <FaTwitter size={22} />
              </a>
              <a href="#" aria-label="GitHub" className="p-2">
                <FaGithub size={22} />
              </a>
            </div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
