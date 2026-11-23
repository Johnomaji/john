import Link from "next/link";
import { activeSocials, navItems, profile } from "@/content/profile";
import { socialIcons } from "./icons";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="hairline-top bg-paper-sunken py-16">
      <div className="container-page">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-display text-2xl">{profile.name}</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
              {profile.positioning.join(". ")}.
            </p>
          </div>

          <nav aria-label="Footer">
            <p className="eyebrow">Sections</p>
            <ul className="mt-5 space-y-2.5">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="link-underline text-sm text-ink-soft"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/cv" className="link-underline text-sm text-ink-soft">
                  CV
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <p className="eyebrow">Elsewhere</p>
            <ul className="mt-5 space-y-2.5">
              {activeSocials.map((social) => {
                const Icon = socialIcons[social.platform];
                return (
                  <li key={social.platform}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2.5 text-sm text-ink-soft transition-colors hover:text-ochre-ink"
                    >
                      <Icon className="size-4 text-muted transition-colors group-hover:text-ochre" />
                      {social.label}
                      {social.handle && (
                        <span className="font-mono text-xs text-muted">
                          {social.handle}
                        </span>
                      )}
                    </a>
                  </li>
                );
              })}
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  className="group inline-flex items-center gap-2.5 text-sm text-ink-soft transition-colors hover:text-ochre-ink"
                >
                  <socialIcons.email className="size-4 text-muted transition-colors group-hover:text-ochre" />
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="rule mt-14" />

        <div className="mt-6 flex flex-col-reverse gap-3 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {profile.name}. All rights reserved.
          </p>
          <p className="font-mono tracking-wide">
            Built with Next.js
          </p>
        </div>
      </div>
    </footer>
  );
}
