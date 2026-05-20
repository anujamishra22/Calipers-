import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
  cols?: number;
  gap?: number;
};

export function BentoGrid({
  children,
  className,
  cols = 12,
  gap = 12,
}: Props) {
  return (
    <div
      className={cn("bento-grid", className)}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        gap: `${gap}px`,
        width: "100%",
      }}
    >
      {children}
    </div>
  );
}
