import { activeSocials, contact, profile } from "@/content/profile";
import { sectionIndex } from "@/lib/section-index";
import { Reveal } from "../ui/reveal";
import { ContactForm } from "../contact-form";
import { socialIcons } from "../icons";

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="grain relative scroll-mt-24 overflow-hidden py-20 md:py-28 lg:py-36"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -bottom-40 size-[38rem] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--ochre)_18%,transparent),transparent_70%)] blur-3xl"
      />

      <div className="container-page relative">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <Reveal>
              <p className="eyebrow flex items-center gap-3">
                <span className="text-ochre">{sectionIndex.contact}</span>
                <span>{contact.eyebrow}</span>
              </p>
              <div className="rule mt-4" />
              <h2
                id="contact-heading"
                className="mt-8 text-[length:var(--text-h1)]"
              >
                {contact.title}
              </h2>
              <p className="mt-6 max-w-md text-[length:var(--text-lead)] leading-relaxed text-muted">
                {contact.intro}
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <dl className="mt-12 space-y-7">
                <div>
                  <dt className="eyebrow">Email</dt>
                  <dd className="mt-2">
                    <a
                      href={`mailto:${profile.email}`}
                      className="link-underline font-display text-[length:var(--text-h3)]"
                    >
                      {profile.email}
                    </a>
                  </dd>
                </div>

                {activeSocials.length > 0 && (
                  <div>
                    <dt className="eyebrow">Elsewhere</dt>
                    <dd className="mt-3">
                      <ul className="flex flex-wrap gap-2.5">
                        {activeSocials.map((social) => {
                          const Icon = socialIcons[social.platform];
                          return (
                            <li key={social.platform}>
                              <a
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2.5 rounded-full border border-line px-4 py-2 text-sm text-ink-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-ochre/55 hover:text-ochre-ink"
                              >
                                <Icon className="size-4" />
                                {social.label}
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    </dd>
                  </div>
                )}
              </dl>
            </Reveal>
          </div>

          <Reveal delay={0.15} y={28}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
