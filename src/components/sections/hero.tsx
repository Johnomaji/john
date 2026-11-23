import Image from "next/image";
import { activeSocials, profile } from "@/content/profile";
import { ButtonLink } from "../ui/button";
import { Reveal, RevealWords } from "../ui/reveal";
import { ArrowDown, ArrowUpRight, Download, socialIcons } from "../icons";

export function Hero() {
  return (
    <section className="grain relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28 lg:pt-48">
      {/* Warm bloom behind the headline, plus a faint ruled grid. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -left-32 size-[42rem] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--ochre)_22%,transparent),transparent_68%)] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_right,var(--line-strong)_1px,transparent_1px)] [background-size:7rem_100%]"
      />

      <div className="container-page relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1.35fr_1fr] lg:gap-20">
          <div>
            {profile.availableForWork && (
              <Reveal y={12}>
                <p className="eyebrow flex items-center gap-1.5">
                  <span className="relative flex size-1.5">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-ochre opacity-70" />
                    <span className="relative inline-flex size-1.5 rounded-full bg-ochre" />
                  </span>
                  Open to work
                </p>
              </Reveal>
            )}

            <h1 className="mt-7 text-[length:var(--text-display)] leading-[0.92]">
              <RevealWords text={profile.name} />
            </h1>

            <Reveal delay={0.35} y={14}>
              <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 font-display text-[length:var(--text-h3)] text-ink-soft italic">
                {profile.positioning.map((word, i) => (
                  <span key={word} className="inline-flex items-center gap-3">
                    {i > 0 && (
                      <span aria-hidden="true" className="text-ochre not-italic">
                        ·
                      </span>
                    )}
                    {word}
                  </span>
                ))}
              </p>
            </Reveal>

            <Reveal delay={0.45}>
              <p className="mt-8 max-w-xl text-[length:var(--text-lead)] leading-relaxed text-muted">
                {profile.heroBio}
              </p>
            </Reveal>

            <Reveal delay={0.55}>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <ButtonLink href={profile.cvPdf ?? "/cv"} size="lg">
                  <Download className="size-4" />
                  Download CV
                </ButtonLink>
                <ButtonLink href="#contact" variant="outline" size="lg">
                  Get in touch
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </ButtonLink>
              </div>
            </Reveal>

            {activeSocials.length > 0 && (
              <Reveal delay={0.65}>
                <div className="mt-12 flex items-center gap-5">
                  <span className="eyebrow">Find me</span>
                  <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
                  <ul className="flex items-center gap-2">
                    {activeSocials.map((social) => {
                      const Icon = socialIcons[social.platform];
                      return (
                        <li key={social.platform}>
                          <a
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={social.label}
                            className="grid size-10 place-items-center rounded-full border border-line text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-ochre hover:text-ochre"
                          >
                            <Icon className="size-4.5" />
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </Reveal>
            )}
          </div>

          <Reveal delay={0.3} y={28}>
            <PortraitFrame />
          </Reveal>
        </div>

        <Reveal delay={0.8}>
          <a
            href="#about"
            className="mt-20 inline-flex items-center gap-3 text-sm text-muted transition-colors hover:text-ochre-ink md:mt-28"
          >
            <span className="grid size-10 place-items-center rounded-full border border-line">
              <ArrowDown className="size-4 animate-bounce [animation-duration:2.4s]" />
            </span>
            Scroll to read on
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/**
 * The photo slot. Until `profile.photo` is set, renders a typographic monogram
 * so the hero never shows a broken image or grey box.
 */
function PortraitFrame() {
  return (
    <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
      {/* Offset ochre rule, letterpress-plate feel. */}
      <div
        aria-hidden="true"
        className="absolute -right-3 -bottom-3 size-full rounded-[var(--radius-card)] border border-ochre/45"
      />
      <div className="relative aspect-4/5 overflow-hidden rounded-[var(--radius-card)] border border-line bg-paper-sunken">
        {profile.photo ? (
          <Image
            src={profile.photo}
            alt={profile.photoAlt}
            fill
            priority
            sizes="(min-width: 1024px) 28rem, (min-width: 640px) 24rem, 90vw"
            className="object-cover"
          />
        ) : (
          <div className="grain absolute inset-0 grid place-items-center bg-[linear-gradient(145deg,var(--paper-sunken),var(--ochre-wash))]">
            <div className="text-center">
              <p className="font-display text-[7rem] leading-none text-ochre/85 select-none">
                JO
              </p>
              <p className="eyebrow mt-4">Photo slot</p>
              <p className="mt-2 px-8 text-xs leading-relaxed text-muted">
                Add a portrait to{" "}
                <code className="font-mono text-ochre-ink">public/</code> and set{" "}
                <code className="font-mono text-ochre-ink">profile.photo</code>
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="mt-5 flex items-baseline justify-between">
        <p className="eyebrow">{profile.firstName}</p>
        <p className="font-mono text-[0.6875rem] text-muted">
          M.Sc. Software Engineering
        </p>
      </div>
    </div>
  );
}
