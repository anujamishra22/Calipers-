import { cn } from "@/lib/utils";

export function GridLines({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 grid-bg opacity-40",
        className,
      )}
      aria-hidden
    />
  );
}
