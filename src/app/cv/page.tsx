import type { Metadata } from "next";
import Link from "next/link";
import {
  activeSocials,
  awards,
  certifications,
  education,
  experience,
  profile,
  skillGroups,
  speaking,
  speakingTopics,
  ventures,
} from "@/content/profile";
import { PrintButton } from "@/components/cv/print-button";
import { ThemeToggle } from "@/components/theme-toggle";
import { ArrowUpRight } from "@/components/icons";
import { sharedOpenGraph, sharedTwitter } from "@/lib/metadata";

const title = `Curriculum Vitae · ${profile.name}`;
const description = `The CV of ${profile.name} — ${profile.positioning.join(", ")}.`;

export const metadata: Metadata = {
  title: "Curriculum Vitae",
  description,
  alternates: { canonical: "/cv" },
  openGraph: { ...sharedOpenGraph, title, description, url: "/cv" },
  twitter: { ...sharedTwitter, title, description },
};

export default function CvPage() {
  return (
    <>
      {/* Screen-only chrome. Hidden from print by .no-print. */}
      <div className="no-print sticky top-0 z-40 border-b border-line bg-paper/85 backdrop-blur-xl">
        <div className="container-page flex h-18 items-center justify-between gap-4">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ochre-ink"
          >
            <ArrowUpRight className="size-4 -rotate-135" />
            Back to site
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <PrintButton />
          </div>
        </div>
      </div>

      <main className="print-page container-page max-w-[52rem] py-12 md:py-16">
        <article>
          <Header />
          <Summary />
          <Experience />
          <Ventures />
          <Education />
          <Skills />
          <Speaking />
          {(certifications.length > 0 || awards.length > 0) && <Credentials />}
        </article>

        <p className="no-print mt-16 border-t border-line pt-6 text-xs leading-relaxed text-muted">
          This page is print-optimised for A4. Use{" "}
          <strong className="text-ink-soft">Download PDF</strong> and choose
          &ldquo;Save as PDF&rdquo; as the destination. For best results set
          margins to <em>Default</em> and enable background graphics off.
        </p>
      </main>
    </>
  );
}

/* -------------------------------------------------------------------------- */

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-5 border-b border-ink/15 pb-2 font-mono text-[0.6875rem] font-medium tracking-[0.18em] uppercase print:mb-3 print:border-black/30 print:pb-1">
      {children}
    </h2>
  );
}

function Header() {
  return (
    <header className="print-avoid-break border-b-2 border-ink pb-7 print:border-black">
      <h1 className="text-[length:var(--text-h1)] leading-none print:text-[26pt]">
        {profile.name}
      </h1>
      <p className="mt-3 font-display text-lg text-ochre-ink italic print:text-[12pt] print:text-black">
        {profile.positioning.join(" · ")}
      </p>

      <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-1.5 font-mono text-xs text-muted print:text-[8.5pt] print:text-black">
        <li>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
        </li>
        {profile.phone && <li>{profile.phone}</li>}
        <li>{profile.siteUrl.replace(/^https?:\/\//, "")}</li>
        {activeSocials.map((social) => (
          <li key={social.platform}>
            <a href={social.href}>
              {social.handle ?? social.href.replace(/^https?:\/\//, "")}
            </a>
          </li>
        ))}
      </ul>
    </header>
  );
}

function Summary() {
  return (
    <section className="print-avoid-break mt-9 print:mt-6">
      <SectionTitle>Profile</SectionTitle>
      <p className="leading-relaxed text-ink-soft print:text-black">
        {profile.cvSummary}
      </p>
    </section>
  );
}

function Experience() {
  return (
    <section className="mt-9 print:mt-6">
      <SectionTitle>Experience</SectionTitle>
      <ul className="space-y-6 print:space-y-4">
        {experience.map((item) => (
          <li key={item.id} className="print-avoid-break">
            <div className="flex flex-wrap items-baseline justify-between gap-x-5">
              <h3 className="font-display text-lg leading-tight print:text-[12pt]">
                {item.role}
              </h3>
              <span className="font-mono text-xs text-muted print:text-[8.5pt] print:text-black">
                {item.period}
              </span>
            </div>
            <p className="mt-0.5 text-sm text-ochre-ink print:text-[10pt] print:text-black">
              {item.organization}
              {item.location && (
                <span className="text-muted print:text-black">
                  {" "}
                  · {item.location}
                </span>
              )}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft print:text-black">
              {item.description}
            </p>
            {item.achievements.length > 0 && (
              <ul className="mt-2 space-y-1">
                {item.achievements.map((achievement) => (
                  <li
                    key={achievement}
                    className="flex gap-2.5 text-sm text-ink-soft print:text-black"
                  >
                    <span aria-hidden="true" className="text-ochre print:text-black">
                      —
                    </span>
                    {achievement}
                  </li>
                ))}
              </ul>
            )}
            {item.stack && item.stack.length > 0 && (
              <p className="mt-2 font-mono text-xs text-muted print:text-[8.5pt] print:text-black">
                {item.stack.join(" · ")}
              </p>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

function Ventures() {
  return (
    <section className="mt-9 print:mt-6">
      <SectionTitle>Ventures founded</SectionTitle>
      <ul className="space-y-4 print:space-y-3">
        {ventures.map((venture) => (
          <li key={venture.id} className="print-avoid-break">
            <div className="flex flex-wrap items-baseline justify-between gap-x-5">
              <h3 className="font-display text-base print:text-[11pt]">
                {venture.name}
                <span className="ml-2 font-sans text-sm font-normal text-muted print:text-black">
                  {venture.tagline}
                </span>
              </h3>
              <span className="font-mono text-xs text-muted print:text-[8.5pt] print:text-black">
                {venture.period}
              </span>
            </div>
            <p className="mt-1 text-sm leading-relaxed text-ink-soft print:text-black">
              {venture.description}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Education() {
  return (
    <section className="print-avoid-break mt-9 print:mt-6">
      <SectionTitle>Education</SectionTitle>
      <ul className="space-y-4 print:space-y-2.5">
        {education.map((item) => (
          <li
            key={item.id}
            className="flex flex-wrap items-baseline justify-between gap-x-5"
          >
            <div>
              <h3 className="font-display text-base print:text-[11pt]">
                {item.qualification}
              </h3>
              <p className="text-sm text-muted print:text-black">
                {item.institution}
                {item.location && ` · ${item.location}`}
              </p>
            </div>
            <span className="font-mono text-xs text-muted print:text-[8.5pt] print:text-black">
              {item.period}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Skills() {
  return (
    <section className="print-avoid-break mt-9 print:mt-6">
      <SectionTitle>Skills</SectionTitle>
      <dl className="space-y-3 print:space-y-2">
        {skillGroups.map((group) => (
          <div
            key={group.id}
            className="grid gap-x-5 gap-y-1 sm:grid-cols-[10rem_1fr]"
          >
            <dt className="font-mono text-xs tracking-wide text-ochre-ink print:text-[8.5pt] print:text-black">
              {group.title}
            </dt>
            <dd className="text-sm text-ink-soft print:text-black">
              {group.skills.join(" · ")}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function Speaking() {
  return (
    <section className="print-avoid-break mt-9 print:mt-6">
      <SectionTitle>Speaking</SectionTitle>
      <p className="mb-3 text-sm leading-relaxed text-ink-soft print:text-black">
        {speaking.cvSummary} Topics:
      </p>
      <ul className="space-y-1.5">
        {speakingTopics.map((topic) => (
          <li
            key={topic.id}
            className="flex gap-2.5 text-sm text-ink-soft print:text-black"
          >
            <span aria-hidden="true" className="text-ochre print:text-black">
              —
            </span>
            <span>
              {topic.title}
              <span className="text-muted print:text-black">
                {" "}
                · {topic.audience}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Credentials() {
  return (
    <section className="print-avoid-break mt-9 print:mt-6">
      <SectionTitle>
        {certifications.length > 0 && awards.length > 0
          ? "Certifications & awards"
          : certifications.length > 0
            ? "Certifications"
            : "Awards"}
      </SectionTitle>
      <ul className="space-y-1.5">
        {[...certifications, ...awards].map((item) => (
          <li
            key={item.id}
            className="flex flex-wrap items-baseline justify-between gap-x-5 text-sm text-ink-soft print:text-black"
          >
            <span>{item.name}</span>
            <span className="font-mono text-xs text-muted print:text-[8.5pt] print:text-black">
              {item.issuer} · {item.year}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
