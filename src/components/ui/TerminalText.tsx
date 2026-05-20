"use client";

import { useEffect, useState } from "react";

type Props = {
  lines: string[];
  className?: string;
};

export function TerminalText({ lines, className }: Props) {
  const [visible, setVisible] = useState(0);
  useEffect(() => {
    if (visible >= lines.length) return;
    const t = window.setTimeout(() => setVisible((v) => v + 1), 220);
    return () => clearTimeout(t);
  }, [visible, lines.length]);

  return (
    <div
      className={`scanlines relative rounded border border-[var(--color-gray-600)] bg-[var(--color-gray-900)] p-4 font-[family-name:var(--font-mono)] text-mono-sm text-[var(--color-off-white)] ${className ?? ""}`}
    >
      {lines.slice(0, visible + 1).map((line, i) => (
        <p key={i} className="border-l-2 border-[var(--color-accent)] pl-2">
          <span className="text-[var(--color-accent)]">{">"} </span>
          {line}
          {i === visible && visible < lines.length ? (
            <span className="animate-blink">_</span>
          ) : null}
        </p>
      ))}
    </div>
  );
}
