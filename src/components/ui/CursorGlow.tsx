"use client";

import { useEffect, useRef } from "react";

export function CursorGlow() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.transform = `translate(${mouseX - 6}px, ${mouseY - 6}px)`;
    };

    const loop = () => {
      followerX += (mouseX - followerX) * 0.12;
      followerY += (mouseY - followerY) * 0.12;
      follower.style.transform = `translate(${followerX - 24}px, ${followerY - 24}px)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-[5000] h-3 w-3 rounded-full border border-[var(--color-accent)] bg-[var(--color-accent)]/30 mix-blend-difference max-md:hidden"
        aria-hidden
      />
      <div
        ref={followerRef}
        className="pointer-events-none fixed left-0 top-0 z-[4999] h-12 w-12 rounded-full border border-white/20 bg-[var(--color-accent)]/10 blur-sm max-md:hidden"
        aria-hidden
      />
    </>
  );
}
