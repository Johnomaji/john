import { ventures } from "@/content/profile";
import { sectionIndex } from "@/lib/section-index";
import { Section } from "../ui/section";
import { Reveal } from "../ui/reveal";
import { Pill } from "../ui/pill";
import { ArrowUpRight } from "../icons";

export function Ventures() {
  return (
    <Section
      id="ventures"
      index={sectionIndex.ventures}
      eyebrow="Ventures"
      tone="sunken"
      title="Three things I founded, and still run."
      intro="A studio, a school, and a language app. Different shapes, same instinct: build the thing that should already exist."
    >
      <ul className="grid gap-6 lg:grid-cols-3">
        {ventures.map((venture, i) => (
          <Reveal as="li" key={venture.id} delay={i * 0.08}>
            <article className="group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-paper p-7 transition-all duration-500 ease-[var(--ease-out-soft)] hover:-translate-y-1 hover:border-ochre/50 hover:shadow-[0_24px_50px_-28px_rgb(var(--shadow-color)/0.35)]">
              {/* Ochre hairline that wipes across on hover. */}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-ochre to-transparent transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-x-100"
              />

              <div className="flex items-start justify-between gap-4">
                <h3 className="text-[length:var(--text-h3)]">{venture.name}</h3>
                <Pill tone={venture.status === "Active" ? "accent" : "neutral"}>
                  {venture.status}
                </Pill>
              </div>

              <p className="mt-2 text-sm text-ochre-ink">{venture.tagline}</p>

              <p className="eyebrow mt-5">
                {venture.role} · {venture.period}
              </p>

              <p className="mt-5 leading-relaxed text-muted">
                {venture.description}
              </p>

              {venture.highlights.length > 0 && (
                <ul className="mt-6 space-y-2.5 border-t border-line pt-6">
                  {venture.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex gap-3 text-sm text-ink-soft"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 size-1 shrink-0 rounded-full bg-ochre"
                      />
                      {highlight}
                    </li>
                  ))}
                </ul>
              )}

              {venture.href && (
                <a
                  href={venture.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-ochre-ink"
                >
                  {venture.hrefLabel ?? "Visit site"}
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              )}
            </article>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
