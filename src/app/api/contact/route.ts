import { headers } from "next/headers";
import { z } from "zod";
import { contact, profile } from "@/content/profile";
import { rateLimit } from "@/lib/rate-limit";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100),
  email: z.email("That email address doesn't look right."),
  topic: z.enum(contact.topics as unknown as [string, ...string[]]),
  message: z
    .string()
    .trim()
    .min(20, "A little more detail, please — at least 20 characters.")
    .max(4000, "That's too long. Please keep it under 4000 characters."),
});

/** Anything faster than this was filled in by a script, not a person. */
const MIN_ELAPSED_MS = 2000;

/**
 * Bot signals are deliberately checked before validation and answered with a
 * silent 200: a field-level rejection would tell the script exactly what to fix.
 */
function looksAutomated(body: unknown): boolean {
  const { website, elapsedMs } = (body ?? {}) as Record<string, unknown>;
  return (
    (typeof website === "string" && website.length > 0) ||
    (typeof elapsedMs === "number" && elapsedMs < MIN_ELAPSED_MS)
  );
}

function clientIp(headerList: Headers): string {
  const forwarded = headerList.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return headerList.get("x-real-ip") ?? "unknown";
}

export async function POST(request: Request) {
  const headerList = await headers();

  const limit = rateLimit(clientIp(headerList));
  if (!limit.allowed) {
    return Response.json(
      {
        ok: false,
        message: "That's a few too many messages. Please try again later.",
      },
      {
        status: 429,
        headers: { "Retry-After": String(limit.retryAfterSeconds) },
      },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { ok: false, message: contact.errorMessage },
      { status: 400 },
    );
  }

  if (looksAutomated(body)) {
    return Response.json({ ok: true });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      {
        ok: false,
        message: "Please check the highlighted fields.",
        fieldErrors: z.flattenError(parsed.error).fieldErrors,
      },
      { status: 422 },
    );
  }

  const { name, email, topic, message } = parsed.data;

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? profile.email;
  const from = process.env.CONTACT_FROM_EMAIL;

  // No provider configured. In production that's a deploy mistake, so fail
  // loudly rather than tell the visitor their message landed when it didn't.
  if ((!apiKey || !from) && process.env.NODE_ENV === "production") {
    console.error(
      "[contact] RESEND_API_KEY or CONTACT_FROM_EMAIL is not set — message dropped.",
    );
    return Response.json(
      { ok: false, message: contact.errorMessage },
      { status: 503 },
    );
  }

  // In development, log and report success so the UI can still be exercised
  // end to end before you add the key.
  if (!apiKey || !from) {
    console.info(
      `[contact] No RESEND_API_KEY/CONTACT_FROM_EMAIL set — message not emailed.\n` +
        `  from:    ${name} <${email}>\n` +
        `  topic:   ${topic}\n` +
        `  message: ${message}`,
    );
    return Response.json({ ok: true });
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `${topic} — ${name}`,
      text: [
        `Topic:   ${topic}`,
        `Name:    ${name}`,
        `Email:   ${email}`,
        "",
        message,
      ].join("\n"),
    });

    if (error) {
      console.error("[contact] Resend rejected the message:", error);
      return Response.json(
        { ok: false, message: contact.errorMessage },
        { status: 502 },
      );
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error("[contact] Failed to send:", error);
    return Response.json(
      { ok: false, message: contact.errorMessage },
      { status: 500 },
    );
  }
}
