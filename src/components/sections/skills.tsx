import { skillGroups } from "@/content/profile";
import { sectionIndex } from "@/lib/section-index";
import { Section } from "../ui/section";
import { Reveal } from "../ui/reveal";

export function Skills() {
  return (
    <Section
      id="skills"
      index={sectionIndex.skills}
      eyebrow="Skills"
      title="What I work with."
      intro="Grouped by where it actually gets used, not by how confident I'd like to look."
    >
      <div className="border-t border-line">
        {skillGroups.map((group, i) => (
          <Reveal key={group.id} delay={i * 0.05}>
            <div className="group grid gap-x-12 gap-y-5 border-b border-line py-8 transition-colors duration-400 hover:border-ochre/40 md:grid-cols-[18rem_1fr] md:py-9">
              <div className="flex gap-4">
                <span className="mt-1.5 font-mono text-xs text-ochre">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-[length:var(--text-h3)] leading-tight transition-colors duration-300 group-hover:text-ochre-ink">
                    {group.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {group.description}
                  </p>
                </div>
              </div>

              <ul className="flex flex-wrap content-start gap-2.5">
                {group.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-full border border-line bg-paper px-4 py-2 text-sm text-ink-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-ochre/55 hover:bg-ochre-wash hover:text-ochre-ink"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
