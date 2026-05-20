import { cn } from "@/lib/utils";

export function NoiseOverlay({ className }: { className?: string }) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 noise-overlay", className)}
      aria-hidden
    />
  );
}
