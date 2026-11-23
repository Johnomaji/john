import { about } from "@/content/profile";
import { sectionIndex } from "@/lib/section-index";
import { Reveal } from "../ui/reveal";
import { Quote } from "../icons";

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="scroll-mt-24 py-20 md:py-28 lg:py-36"
    >
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-[18rem_1fr] lg:gap-20">
          {/* Sticky rail keeps the section label in view while the story scrolls. */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <p className="eyebrow flex items-center gap-3">
                <span className="text-ochre">{sectionIndex.about}</span>
                <span>{about.eyebrow}</span>
              </p>
              <div className="rule mt-4" />
              <h2
                id="about-heading"
                className="mt-7 text-[length:var(--text-h3)]"
              >
                {about.title}
              </h2>
            </Reveal>
          </div>

          <div>
            <div className="max-w-2xl space-y-6 text-[length:var(--text-lead)] leading-relaxed text-ink-soft">
              {about.paragraphs.map((paragraph, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  {/* Letterpress drop-cap on the opening paragraph only. */}
                  <p
                    className={
                      i === 0
                        ? "first-letter:float-left first-letter:mt-1 first-letter:mr-3 first-letter:font-display first-letter:text-[3.75rem] first-letter:leading-[0.78] first-letter:font-semibold first-letter:text-ochre"
                        : undefined
                    }
                  >
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.1}>
              <figure className="my-14 border-l-2 border-ochre pl-7">
                <Quote className="size-7 text-ochre/60" />
                <blockquote className="mt-3 font-display text-[length:var(--text-h3)] leading-snug italic">
                  {about.pullQuote}
                </blockquote>
              </figure>
            </Reveal>

            <Reveal>
              <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-card)] bg-line sm:grid-cols-4">
                {about.facts.map((fact) => (
                  <div key={fact.label} className="bg-paper p-5">
                    <dt className="eyebrow">{fact.label}</dt>
                    <dd className="mt-2 font-display text-xl">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
