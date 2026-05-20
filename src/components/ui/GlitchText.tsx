"use client";

import { useCallback, useRef, useState } from "react";

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";

type Props = {
  text: string;
  className?: string;
};

export function GlitchText({ text, className }: Props) {
  const [display, setDisplay] = useState(text);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const glitch = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    const end = performance.now() + 400;
    intervalRef.current = setInterval(() => {
      if (performance.now() >= end) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplay(text);
        return;
      }
      setDisplay(
        text
          .split("")
          .map((c) =>
            c === " " ? " " : chars[Math.floor(Math.random() * chars.length)],
          )
          .join(""),
      );
    }, 80);
  }, [text]);

  return (
    <span className={className} onMouseEnter={glitch}>
      {display}
    </span>
  );
}
