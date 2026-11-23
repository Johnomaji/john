import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Pill({
  children,
  className,
  tone = "neutral",
}: {
  children: ReactNode;
  className?: string;
  tone?: "neutral" | "accent";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 font-mono text-[0.6875rem] tracking-wide",
        tone === "accent"
          ? "border-ochre/40 bg-ochre-wash text-ochre-ink"
          : "border-line text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Stack tag used on project and venture cards. */
export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full bg-paper-sunken px-2.5 py-1 font-mono text-[0.6875rem] text-ink-soft ring-1 ring-line ring-inset">
      {children}
    </span>
  );
}
