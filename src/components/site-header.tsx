"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { navItems, profile } from "@/content/profile";
import { cn } from "@/lib/utils";
import { Close, Download, Menu } from "./icons";
import { ThemeToggle } from "./theme-toggle";

const sectionIds = navItems
  .filter((item) => item.href.startsWith("#"))
  .map((item) => item.href.slice(1));

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: the topmost section intersecting the upper half wins.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px" },
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Lock scroll behind the mobile sheet.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-paper"
      >
        Skip to content
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-[var(--ease-out-soft)]",
          scrolled
            ? "border-b border-line bg-paper/80 backdrop-blur-xl"
            : "border-b border-transparent",
        )}
      >
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

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navItems.map((item) => {
                const id = item.href.replace("#", "");
                const isActive = active === id;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "relative rounded-full px-3.5 py-2 text-sm transition-colors duration-300",
                        isActive
                          ? "text-ink"
                          : "text-muted hover:text-ink",
                      )}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute inset-0 rounded-full bg-paper-sunken"
                          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        />
                      )}
                      <span className="relative">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              href="/cv"
              className="hidden h-10 items-center gap-2 rounded-full bg-ink px-4 text-sm font-medium text-paper transition-colors duration-300 hover:bg-ochre hover:text-[#17120a] sm:inline-flex"
            >
              <Download className="size-4" />
              CV
            </Link>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className="grid size-10 place-items-center rounded-full border border-line text-ink-soft lg:hidden"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-60 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <button
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-paper px-7 pt-7 pb-10 shadow-2xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-between">
                <p className="eyebrow">Menu</p>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="grid size-10 place-items-center rounded-full border border-line text-ink-soft"
                >
                  <Close className="size-5" />
                </button>
              </div>

              <nav aria-label="Mobile" className="mt-10">
                <ul className="space-y-1">
                  {navItems.map((item, i) => (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="flex items-baseline gap-4 border-b border-line py-4 font-display text-2xl"
                      >
                        <span className="font-mono text-xs text-ochre">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {item.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <Link
                href="/cv"
                onClick={() => setOpen(false)}
                className="mt-auto inline-flex h-12 items-center justify-center gap-2 rounded-[var(--radius-field)] bg-ink text-sm font-medium text-paper"
              >
                <Download className="size-4" />
                View CV
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
