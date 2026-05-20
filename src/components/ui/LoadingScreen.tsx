"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const KEY = "caliper-loaded";

export function LoadingScreen() {
  const [show, setShow] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onPersistedResume = (e: PageTransitionEvent) => {
      if (!e.persisted) return;
      setShow(false);
      sessionStorage.setItem(KEY, "1");
    };
    window.addEventListener("pageshow", onPersistedResume);
    return () => window.removeEventListener("pageshow", onPersistedResume);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(KEY)) return;
    queueMicrotask(() => setShow(true));
    const start = performance.now();
    const dur = 2000;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      setProgress(Math.round(t * 100));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    const t = window.setTimeout(() => {
      setShow(false);
      sessionStorage.setItem(KEY, "1");
    }, 2500);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[2000] flex flex-col items-center justify-center bg-[var(--color-gray-900)] text-[var(--color-off-white)]"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-mono-lg mb-6 tracking-[0.3em]">CALIPERS</p>
          <div className="mb-8 h-1 w-64 overflow-hidden border border-white/30">
            <motion.div
              className="h-full bg-[var(--color-accent)]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-mono-sm space-y-1 text-white/70">
            <p>[00:00:00] INITIALIZING...</p>
            <p>[00:00:01] LOADING MODELS...</p>
            <p>[00:00:02] READY</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
