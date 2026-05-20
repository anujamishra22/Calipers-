"use client";

import { useEffect, useRef } from "react";

export function useScrollAnimation<T extends HTMLElement>(
  callback: (entry: IntersectionObserverEntry) => void,
  options: IntersectionObserverInit = { threshold: 0.2 },
) {
  const ref = useRef<T | null>(null);
  const cbRef = useRef(callback);

  useEffect(() => {
    cbRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) cbRef.current(entry);
    }, options);
    obs.observe(node);
    return () => obs.disconnect();
  }, [options.threshold, options.root, options.rootMargin]); // eslint-disable-line react-hooks/exhaustive-deps

  return ref;
}
