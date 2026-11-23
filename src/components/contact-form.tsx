"use client";

import { useEffect, useRef, useState } from "react";
import { contact } from "@/content/profile";
import { Button } from "./ui/button";
import { ArrowUpRight } from "./icons";
import { cn } from "@/lib/utils";

type FieldErrors = Partial<Record<"name" | "email" | "topic" | "message", string>>;
type Status = "idle" | "submitting" | "success" | "error";

const fieldClasses =
  "w-full rounded-[var(--radius-field)] border bg-paper px-4 py-3 text-[0.9375rem] transition-colors duration-300 placeholder:text-muted/70 focus:border-ochre focus:outline-none";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const topicRef = useRef<HTMLSelectElement>(null);
  /** Submissions faster than MIN_ELAPSED_MS are almost certainly bots. */
  const mountedAt = useRef(0);

  useEffect(() => {
    mountedAt.current = Date.now();

    // The "Book me to speak" CTA links here with ?topic=… — preselect it.
    // Written to the DOM rather than held in state: the select is otherwise
    // uncontrolled, so there is nothing for React to synchronise.
    const requested = new URLSearchParams(window.location.search).get("topic");
    if (
      topicRef.current &&
      requested &&
      (contact.topics as readonly string[]).includes(requested)
    ) {
      topicRef.current.value = requested;
    }
  }, []);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrors({});
    setServerMessage(null);

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          topic: data.get("topic"),
          message: data.get("message"),
          website: data.get("website"),
          elapsedMs: Date.now() - mountedAt.current,
        }),
      });

      const payload = (await res.json()) as {
        ok?: boolean;
        fieldErrors?: Record<string, string[]>;
        message?: string;
      };

      if (!res.ok || !payload.ok) {
        if (payload.fieldErrors) {
          setErrors(
            Object.fromEntries(
              Object.entries(payload.fieldErrors).map(([key, value]) => [
                key,
                value[0],
              ]),
            ),
          );
        }
        setServerMessage(payload.message ?? contact.errorMessage);
        setStatus("error");
        return;
      }

      form.reset();
      setStatus("success");
    } catch {
      setServerMessage(contact.errorMessage);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="flex min-h-[26rem] flex-col items-center justify-center rounded-[var(--radius-card)] border border-ochre/45 bg-ochre-wash p-10 text-center"
      >
        <span className="grid size-14 place-items-center rounded-full bg-ochre text-[#17120a]">
          <ArrowUpRight className="size-7" />
        </span>
        <p className="mt-6 font-display text-2xl">Message sent</p>
        <p className="mt-3 max-w-xs leading-relaxed text-ink-soft">
          {contact.successMessage}
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="link-underline mt-7 text-sm text-ochre-ink"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-[var(--radius-card)] border border-line bg-paper-sunken p-7 md:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" htmlFor="name" error={errors.name}>
          <input
            id="name"
            name="name"
            autoComplete="name"
            required
            placeholder="Your name"
            aria-invalid={Boolean(errors.name)}
            className={cn(fieldClasses, errors.name ? "border-red-500" : "border-line")}
          />
        </Field>

        <Field label="Email" htmlFor="email" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="you@company.com"
            aria-invalid={Boolean(errors.email)}
            className={cn(fieldClasses, errors.email ? "border-red-500" : "border-line")}
          />
        </Field>
      </div>

      <div className="mt-5">
        <Field label="Topic" htmlFor="topic" error={errors.topic}>
          <select
            id="topic"
            name="topic"
            ref={topicRef}
            defaultValue={contact.topics[0]}
            className={cn(fieldClasses, "border-line appearance-none")}
          >
            {contact.topics.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-5">
        <Field label="Message" htmlFor="message" error={errors.message}>
          <textarea
            id="message"
            name="message"
            rows={6}
            required
            placeholder="What are you working on?"
            aria-invalid={Boolean(errors.message)}
            className={cn(
              fieldClasses,
              "resize-y",
              errors.message ? "border-red-500" : "border-line",
            )}
          />
        </Field>
      </div>

      {/* Honeypot: hidden from users, irresistible to bots. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {status === "error" && serverMessage && (
        <p
          role="alert"
          className="mt-6 rounded-[var(--radius-field)] border border-red-500/40 bg-red-500/8 px-4 py-3 text-sm text-red-700 dark:text-red-300"
        >
          {serverMessage}
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={status === "submitting"}
        className="mt-7 w-full"
      >
        {status === "submitting" ? "Sending…" : "Send message"}
        {status !== "submitting" && (
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        )}
      </Button>

      <p className="mt-4 text-center text-xs text-muted">
        No newsletter, no list. Your message goes straight to my inbox.
      </p>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="eyebrow mb-2.5 block">
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-2 text-xs text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
}
