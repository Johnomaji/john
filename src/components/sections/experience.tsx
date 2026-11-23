import { experience } from "@/content/profile";
import { sectionIndex } from "@/lib/section-index";
import { Section } from "../ui/section";
import { Reveal } from "../ui/reveal";
import { Tag } from "../ui/pill";

export function Experience() {
  return (
    <Section
      id="experience"
      index={sectionIndex.experience}
      eyebrow="Experience"
      title="What I've been doing, in order."
    >
      <ol className="relative">
        {/* Continuous rail behind the markers. */}
        <span
          aria-hidden="true"
          className="absolute top-2 bottom-2 left-[7px] w-px bg-gradient-to-b from-ochre/50 via-line to-transparent sm:left-[calc(11rem+7px)]"
        />

        {experience.map((item, i) => (
          <Reveal as="li" key={item.id} delay={i * 0.06}>
            <article className="group relative grid gap-x-10 gap-y-3 pb-12 pl-9 sm:grid-cols-[11rem_1fr] sm:pl-0 last:pb-0">
              <p className="eyebrow pt-1 sm:text-right">{item.period}</p>

              {/* Marker sits on the rail. */}
              <span
                aria-hidden="true"
                className="absolute top-2 left-0 grid size-[15px] place-items-center rounded-full border border-line bg-paper transition-colors duration-400 group-hover:border-ochre sm:left-[11rem]"
              >
                <span className="size-[5px] rounded-full bg-ochre" />
              </span>

              <div className="sm:pl-2">
                <h3 className="text-[length:var(--text-h3)] leading-tight">
                  {item.role}
                </h3>
                <p className="mt-1.5 text-sm">
                  <span className="text-ochre-ink">{item.organization}</span>
                  {item.location && (
                    <span className="text-muted"> · {item.location}</span>
                  )}
                </p>

                <p className="mt-4 max-w-2xl leading-relaxed text-muted">
                  {item.description}
                </p>

                {item.achievements.length > 0 && (
                  <ul className="mt-4 max-w-2xl space-y-2">
                    {item.achievements.map((achievement) => (
                      <li
                        key={achievement}
                        className="flex gap-3 text-sm text-ink-soft"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-[0.55rem] h-px w-3 shrink-0 bg-ochre"
                        />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                )}

                {item.stack && item.stack.length > 0 && (
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {item.stack.map((tech) => (
                      <li key={tech}>
                        <Tag>{tech}</Tag>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
