"use client";

import { useEffect, useState } from "react";

export function useCounter(
  end: number,
  durationMs: number,
  enabled: boolean,
  decimals = 0,
) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!enabled) return;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(end * eased);
      if (t < 1) requestAnimationFrame(tick);
    };
    const id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [end, durationMs, enabled]);

  return decimals > 0 ? value.toFixed(decimals) : Math.round(value);
}
