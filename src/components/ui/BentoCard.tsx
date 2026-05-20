import { cn } from "@/lib/utils";

type Variant = "default" | "dark" | "accent" | "green" | "transparent";

type Props = {
  children: React.ReactNode;
  colSpan?: number;
  rowSpan?: number;
  /** When false, omit grid placement (wrap in your own grid cell). */
  grid?: boolean;
  variant?: Variant;
  className?: string;
  onClick?: () => void;
  label?: string;
  labelRight?: string;
};

const variantStyles: Record<Variant, string> = {
  default: "",
  dark: "bento-card-dark",
  accent: "bento-card-accent",
  green: "bg-[var(--color-green)] text-black border-[var(--color-void)]",
  transparent: "bg-transparent",
};

export function BentoCard({
  children,
  colSpan = 4,
  rowSpan = 1,
  grid = true,
  variant = "default",
  className,
  onClick,
  label,
  labelRight,
}: Props) {
  return (
    <div
      className={cn("bento-card", variantStyles[variant], className)}
      style={
        grid
          ? {
              gridColumn: `span ${colSpan} / span ${colSpan}`,
              gridRow: `span ${rowSpan} / span ${rowSpan}`,
            }
          : undefined
      }
      onClick={onClick}
      role={onClick ? "button" : undefined}
    >
      {(label || labelRight) && (
        <div className="card-label-strip">
          <span>{label}</span>
          {labelRight ? <span>{labelRight}</span> : null}
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  );
}
