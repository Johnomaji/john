import type { Metadata } from "next";
import Link from "next/link";
import { navItems, profile } from "@/content/profile";
import { ThemeToggle } from "@/components/theme-toggle";
import { ButtonLink } from "@/components/ui/button";
import { ArrowUpRight, Download } from "@/components/icons";
import { ordinal } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Page not found",
  description: `This page doesn't exist on ${profile.name}'s site.`,
  // Overrides the layout's "index, follow", which would otherwise sit next to
  // the noindex Next injects for a 404 and contradict it.
  robots: { index: false, follow: true },
};

/** navItems are fragments on the home page; from here they need the "/" too. */
const jumpLinks = [
  ...navItems.map((item) => ({
    label: item.label,
    href: item.href.startsWith("#") ? `/${item.href}` : item.href,
  })),
  { label: "CV", href: "/cv" },
];

// Static and JS-free on purpose: a 404 is often the first page a visitor from
// a stale link sees, so it renders fully before anything hydrates.
export default function NotFound() {
  return (
    <div className="grain relative flex min-h-svh flex-col overflow-hidden">
      {/* Same bloom and ruled grid as the hero, so this reads as the same site. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-32 size-[42rem] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--ochre)_22%,transparent),transparent_68%)] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_right,var(--line-strong)_1px,transparent_1px)] [background-size:7rem_100%]"
      />

      {/* The site header's links are home-page fragments, so it gets a bar of its own. */}
      <header className="relative">
        <div className="container-page flex h-18 items-center justify-between gap-4">
          <Link
            href="/"
            className="group flex items-baseline gap-2.5 font-display text-lg leading-none font-semibold tracking-tight"
          >
            <span className="grid size-8 place-items-center rounded-full bg-ink text-[0.8125rem] text-paper transition-colors duration-300 group-hover:bg-ochre group-hover:text-[#17120a]">
              JO
            </span>
            <span className="hidden sm:inline">{profile.name}</span>
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <main
        id="main"
        className="container-page relative flex flex-1 flex-col justify-center py-16 md:py-24"
      >
        <div className="grid items-end gap-10 lg:grid-cols-[1fr_auto] lg:gap-20">
          <div className="max-w-2xl">
            <p className="eyebrow flex items-center gap-3">
              <span className="text-ochre-ink">Error 404</span>
              <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
              <span>Page not found</span>
            </p>

            <h1 className="mt-7 text-[length:var(--text-h1)]">
              Nothing lives at this{" "}
              <em className="text-gradient-ochre pr-1">address.</em>
            </h1>

            <p className="mt-6 max-w-xl text-[length:var(--text-lead)] leading-relaxed text-muted">
              The link may be out of date, or the address may have been mistyped.
              Everything I build, teach, and speak about is still one click
              away.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <ButtonLink href="/" size="lg">
                Back to home
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </ButtonLink>
              <ButtonLink href="/cv" variant="outline" size="lg">
                <Download className="size-4" />
                View CV
              </ButtonLink>
            </div>
          </div>

          <p
            aria-hidden="true"
            className="order-first font-display text-[clamp(7rem,26vw,19rem)] leading-[0.8] font-semibold tracking-[-0.06em] text-ochre/15 select-none lg:order-none"
          >
            404
          </p>
        </div>

        <nav aria-label="Site sections" className="mt-16 md:mt-24">
          <div className="rule" />
          <p className="eyebrow mt-6">Or jump to</p>
          <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
            {jumpLinks.map((item, i) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group inline-flex items-baseline gap-2.5 text-sm text-ink-soft transition-colors hover:text-ochre-ink"
                >
                  <span className="font-mono text-xs text-ochre">
                    {ordinal(i)}
                  </span>
                  <span className="link-underline">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </main>

      <footer className="relative">
        <div className="container-page flex flex-col gap-2 py-8 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {profile.name}
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="link-underline font-mono tracking-wide"
          >
            Broken link? Tell me at {profile.email}
          </a>
        </div>
      </footer>
    </div>
  );
}
