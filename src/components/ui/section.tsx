import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

interface SectionProps {
  id: string;
  /** Two-digit numeral shown beside the eyebrow, e.g. "02". */
  index?: string;
  eyebrow: string;
  title: ReactNode;
  /** Optional paragraph under the title. */
  intro?: string;
  children: ReactNode;
  className?: string;
  /** Alternate background for rhythm between sections. */
  tone?: "paper" | "sunken";
  /** Right-hand slot in the header row, e.g. a CTA link. */
  action?: ReactNode;
}

export function Section({
  id,
  index,
  eyebrow,
  title,
  intro,
  children,
  className,
  tone = "paper",
  action,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={cn(
        "relative scroll-mt-24 py-20 md:py-28 lg:py-36",
        tone === "sunken" && "bg-paper-sunken",
        className,
      )}
    >
      <div className="container-page">
        <Reveal>
          <div className="flex items-baseline justify-between gap-6">
            <p className="eyebrow flex items-center gap-3">
              {index && <span className="text-ochre">{index}</span>}
              <span>{eyebrow}</span>
            </p>
            {action && <div className="hidden sm:block">{action}</div>}
          </div>
          <div className="rule mt-4" />
        </Reveal>

        <Reveal delay={0.05}>
          <h2
            id={`${id}-heading`}
            className="mt-8 max-w-3xl text-[length:var(--text-h2)]"
          >
            {title}
          </h2>
        </Reveal>

        {intro && (
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-[length:var(--text-lead)] leading-relaxed text-muted">
              {intro}
            </p>
          </Reveal>
        )}

        <div className="mt-14 md:mt-18">{children}</div>
      </div>
    </section>
  );
}
