import { projects } from "@/content/profile";
import { sectionIndex } from "@/lib/section-index";
import { Section } from "../ui/section";
import { Reveal } from "../ui/reveal";
import { Tag } from "../ui/pill";
import { ArrowUpRight, GitHub } from "../icons";
import { cn } from "@/lib/utils";

export function Projects() {
  if (projects.length === 0) return null;

  return (
    <Section
      id="work"
      index={sectionIndex.projects}
      eyebrow="Selected work"
      title="Software I've built."
      intro="A few projects worth showing. Each one solved a problem I actually had."
    >
      <ul className="grid gap-6 md:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal
            as="li"
            key={project.id}
            delay={i * 0.07}
            className={cn(project.featured && "md:col-span-2")}
          >
            <article
              className={cn(
                "group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-paper-sunken p-7 transition-all duration-500 ease-[var(--ease-out-soft)] hover:-translate-y-1 hover:border-ochre/50 hover:shadow-[0_24px_50px_-28px_rgb(var(--shadow-color)/0.35)] md:p-9",
                project.featured && "md:grid md:grid-cols-[1.1fr_1fr] md:gap-10",
              )}
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-ochre to-transparent transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-x-100"
              />

              <div>
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-[length:var(--text-h3)]">
                    {project.name}
                  </h3>
                  <span className="font-mono text-xs text-muted">
                    {project.year}
                  </span>
                </div>
                <p className="mt-3 text-[length:var(--text-lead)] leading-snug text-ochre-ink">
                  {project.summary}
                </p>
              </div>

              <div className={cn(!project.featured && "mt-5 flex flex-1 flex-col")}>
                <p className="leading-relaxed text-muted">
                  {project.description}
                </p>

                <ul className="mt-6 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <li key={tech}>
                      <Tag>{tech}</Tag>
                    </li>
                  ))}
                </ul>

                {(project.liveHref || project.repoHref) && (
                  <div className="mt-auto flex flex-wrap items-center gap-6 pt-7">
                    {project.liveHref && (
                      <a
                        href={project.liveHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-ochre-ink"
                      >
                        View live
                        <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    )}
                    {project.repoHref && (
                      <a
                        href={project.repoHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ochre-ink"
                      >
                        <GitHub className="size-4" />
                        Source
                      </a>
                    )}
                  </div>
                )}
              </div>
            </article>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
