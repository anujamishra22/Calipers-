import { cn } from "@/lib/utils";

export function RawBadge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <span className={cn("raw-badge", className)}>{children}</span>;
}
