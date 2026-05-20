"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;
function ensureGsap() {
  if (typeof window === "undefined") return;
  if (!registered) {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function fadeUpOnScroll(selector: string, options: gsap.TweenVars = {}) {
  if (prefersReducedMotion()) return;
  ensureGsap();
  const el = document.querySelector(selector);
  if (!el) return;
  gsap.fromTo(
    el,
    { y: 60, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none none",
      },
      ...options,
    },
  );
}

export function staggerReveal(
  parentSelector: string,
  childSelector: string,
  options: gsap.TweenVars = {},
) {
  if (prefersReducedMotion()) return;
  ensureGsap();
  const parent = document.querySelector(parentSelector);
  if (!parent) return;
  const children = parent.querySelectorAll(childSelector);
  if (!children.length) return;
  gsap.fromTo(
    children,
    { y: 40, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: "power2.out",
      stagger: 0.1,
      scrollTrigger: {
        trigger: parent,
        start: "top 80%",
      },
      ...options,
    },
  );
}

export function magneticButton(buttonSelector: string) {
  if (prefersReducedMotion()) return;
  ensureGsap();
  const buttons = document.querySelectorAll(buttonSelector);
  buttons.forEach((btn) => {
    const el = btn as HTMLElement;
    const move = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const max = 6;
      const nx = Math.max(-max, Math.min(max, x * 0.12));
      const ny = Math.max(-max, Math.min(max, y * 0.12));
      gsap.to(el, { x: nx, y: ny, duration: 0.2 });
    };
    const leave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.4, ease: "elastic.out(1, 0.3)" });
    };
    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);
  });
}

export function drawLine(
  selector: string,
  triggerSelector?: string,
  start: string = "top 85%",
  end: string = "bottom top",
  scrub: boolean | number = false,
) {
  if (prefersReducedMotion()) return;
  ensureGsap();
  const el = document.querySelector(selector);
  if (!el) return;
  const trigger = triggerSelector ? document.querySelector(triggerSelector) : el;
  gsap.fromTo(
    el,
    { scaleY: 0, opacity: 1, transformOrigin: "top center" },
    {
      scaleY: 1,
      duration: 0.9,
      ease: "power2.out",
      scrollTrigger: {
        trigger,
        start,
        end,
        scrub,
        toggleActions: scrub ? undefined : "play none none none",
      },
    },
  );
}

export function refreshScrollTrigger() {
  if (typeof window === "undefined") return;
  ScrollTrigger.refresh();
}
