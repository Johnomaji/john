import { awards, certifications, education } from "@/content/profile";
import { sectionIndex } from "@/lib/section-index";
import { Section } from "../ui/section";
import { Reveal } from "../ui/reveal";
import { Pill } from "../ui/pill";

export function Education() {
  return (
    <Section
      id="education"
      index={sectionIndex.education}
      eyebrow="Education"
      tone="sunken"
      title="Still studying, still shipping."
    >
      <ul className="grid gap-6 md:grid-cols-2">
        {education.map((item, i) => (
          <Reveal as="li" key={item.id} delay={i * 0.08}>
            <article className="flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-paper p-7 transition-colors duration-400 hover:border-ochre/50">
              <div className="flex items-start justify-between gap-4">
                <p className="eyebrow">{item.period}</p>
                <Pill tone={item.status === "In progress" ? "accent" : "neutral"}>
                  {item.status}
                </Pill>
              </div>

              <h3 className="mt-5 text-[length:var(--text-h3)] leading-tight">
                {item.qualification}
              </h3>
              <p className="mt-2 text-sm text-ochre-ink">{item.institution}</p>
              {item.location && (
                <p className="mt-1 text-sm text-muted">{item.location}</p>
              )}
              {item.note && (
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  {item.note}
                </p>
              )}
            </article>
          </Reveal>
        ))}
      </ul>

      {certifications.length > 0 && (
        <SubList title="Certifications" items={certifications} />
      )}
      {awards.length > 0 && <SubList title="Awards" items={awards} />}
    </Section>
  );
}

function SubList({
  title,
  items,
}: {
  title: string;
  items: typeof certifications;
}) {
  return (
    <Reveal>
      <div className="mt-14">
        <p className="eyebrow">{title}</p>
        <div className="rule mt-4" />
        <ul className="mt-2">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-line py-4"
            >
              <span className="font-medium">
                {item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline"
                  >
                    {item.name}
                  </a>
                ) : (
                  item.name
                )}
              </span>
              <span className="text-sm text-muted">
                {item.issuer}
                <span className="ml-3 font-mono text-xs">{item.year}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}
