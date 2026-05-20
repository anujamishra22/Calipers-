import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  href?: string;
  children: React.ReactNode;
  variant?: "solid" | "outline";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
};

export function BorderButton({
  href,
  children,
  variant = "solid",
  className,
  onClick,
  type = "button",
}: Props) {
  const cls = cn(
    "btn-brutal inline-flex items-center justify-center gap-2 no-underline",
    variant === "outline" && "btn-brutal-outline",
    className,
  );
  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button
      type={type}
      onClick={onClick}
      className={cls}
      suppressHydrationWarning
    >
      {children}
    </button>
  );
}
