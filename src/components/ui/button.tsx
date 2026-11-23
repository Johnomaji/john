import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "solid" | "outline" | "ghost";
type Size = "md" | "lg";

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-[var(--radius-field)] font-medium transition-all duration-300 ease-[var(--ease-out-soft)] disabled:pointer-events-none disabled:opacity-55";

const variants: Record<Variant, string> = {
  solid:
    "bg-ink text-paper hover:bg-ochre hover:text-[#17120a] hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-14px_rgb(var(--shadow-color)/0.55)]",
  outline:
    "border border-line-strong text-ink hover:border-ochre hover:text-ochre-ink hover:-translate-y-0.5",
  ghost: "text-ink-soft hover:text-ochre-ink",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-[0.9375rem]",
};

function classesFor(variant: Variant, size: Size, className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

interface Shared {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
}

export function Button({
  variant = "solid",
  size = "md",
  className,
  children,
  ...props
}: Shared & ComponentProps<"button">) {
  return (
    <button className={classesFor(variant, size, className)} {...props}>
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = "solid",
  size = "md",
  className,
  href,
  children,
  ...props
}: Shared & ComponentProps<typeof Link>) {
  const external = typeof href === "string" && href.startsWith("http");

  return (
    <Link
      href={href}
      className={classesFor(variant, size, className)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
    >
      {children}
    </Link>
  );
}
