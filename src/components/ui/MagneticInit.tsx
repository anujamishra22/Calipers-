"use client";

import { useEffect } from "react";
import { magneticButton, prefersReducedMotion } from "@/lib/animations";

export function MagneticInit() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    magneticButton(".btn-brutal");
  }, []);

  return null;
}
