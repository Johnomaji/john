import { testimonials } from "@/content/profile";
import { sectionIndex } from "@/lib/section-index";
import { Section } from "../ui/section";
import { Reveal } from "../ui/reveal";
import { Quote } from "../icons";

export function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <Section
      id="testimonials"
      index={sectionIndex.testimonials}
      eyebrow="Testimonials"
      tone="sunken"
      title="What people say."
    >
      <ul className="grid gap-6 md:grid-cols-3">
        {testimonials.map((testimonial, i) => (
          <Reveal as="li" key={testimonial.id} delay={i * 0.08}>
            <figure className="flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-paper p-7 transition-colors duration-400 hover:border-ochre/50">
              <Quote className="size-6 shrink-0 text-ochre/55" />
              <blockquote className="mt-5 flex-1 leading-relaxed text-ink-soft">
                {testimonial.quote}
              </blockquote>
              <figcaption className="mt-7 border-t border-line pt-5">
                <p className="font-display text-lg">{testimonial.name}</p>
                <p className="mt-0.5 text-sm text-muted">
                  {testimonial.attribution}
                </p>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
