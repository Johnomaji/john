import {
  pastEvents,
  speaking,
  speakingTopics,
  upcomingEvents,
} from "@/content/profile";
import { sectionIndex } from "@/lib/section-index";
import { cn } from "@/lib/utils";
import { Section } from "../ui/section";
import { Reveal } from "../ui/reveal";
import { Pill } from "../ui/pill";
import { ButtonLink } from "../ui/button";
import { YouTubeEmbed } from "../ui/youtube-embed";
import { ArrowUpRight, Calendar, Download, Pin } from "../icons";

export function Speaking() {
  const events = [...upcomingEvents, ...pastEvents];

  return (
    <Section
      id="speaking"
      index={sectionIndex.speaking}
      eyebrow={speaking.eyebrow}
      title={speaking.title}
      intro={speaking.intro}
    >
      <p className="eyebrow">Topics I speak on</p>
      <div className="rule mt-4" />
      <ul className="mt-8 grid gap-x-10 gap-y-8 md:grid-cols-2">
        {speakingTopics.map((topic, i) => (
          <Reveal as="li" key={topic.id} delay={i * 0.06}>
            <article className="group">
              <h3 className="flex gap-3 text-[length:var(--text-h3)] leading-tight">
                <span className="mt-1.5 font-mono text-xs text-ochre">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="transition-colors duration-300 group-hover:text-ochre-ink">
                  {topic.title}
                </span>
              </h3>
              <p className="mt-3 pl-8 leading-relaxed text-muted">
                {topic.description}
              </p>
              <p className="mt-3 pl-8 text-sm text-ink-soft">
                <span className="eyebrow">For</span>{" "}
                <span className="ml-1">{topic.audience}</span>
              </p>
            </article>
          </Reveal>
        ))}
      </ul>

      {events.length > 0 && (
        <div className="mt-20">
          <p className="eyebrow">Events</p>
          <div className="rule mt-4" />
          <ul className="mt-2">
            {events.map((event) => (
              <Reveal as="li" key={event.id}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 border-b border-line py-5 transition-colors duration-300 hover:border-ochre/40">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-lg leading-tight">{event.talk}</h3>
                      {event.timing === "upcoming" && (
                        <Pill tone="accent">Upcoming</Pill>
                      )}
                    </div>
                    <p className="mt-1.5 text-sm text-ochre-ink">
                      {event.href ? (
                        <a
                          href={event.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-underline"
                        >
                          {event.event}
                        </a>
                      ) : (
                        event.event
                      )}
                    </p>
                  </div>
                  <p className="flex items-center gap-4 font-mono text-xs text-muted">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="size-3.5" />
                      {event.date}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Pin className="size-3.5" />
                      {event.location}
                    </span>
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      )}

      <Reveal>
        <div
          className={cn(
            "mt-20 grid gap-10 rounded-[var(--radius-card)] border border-line bg-paper-sunken p-8 md:p-10",
            // Without a reel the panel is one column rather than a half-empty two.
            speaking.reel.youtubeId && "md:grid-cols-2 md:items-center",
          )}
        >
          <div>
            <h3 className="text-[length:var(--text-h2)]">
              {speaking.booking.title}
            </h3>
            <p className="mt-5 max-w-md leading-relaxed text-muted">
              {speaking.booking.body}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink
                href={`/?topic=${encodeURIComponent(speaking.booking.formTopic)}#contact`}
                size="lg"
              >
                {speaking.booking.ctaLabel}
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </ButtonLink>
              {speaking.onePagerHref && (
                <ButtonLink
                  href={speaking.onePagerHref}
                  variant="outline"
                  size="lg"
                >
                  <Download className="size-4" />
                  Speaker one-sheet
                </ButtonLink>
              )}
            </div>
          </div>

          {speaking.reel.youtubeId && (
            <div>
              <YouTubeEmbed
                youtubeId={speaking.reel.youtubeId}
                title={speaking.reel.caption}
              />
            </div>
          )}
        </div>
      </Reveal>
    </Section>
  );
}
