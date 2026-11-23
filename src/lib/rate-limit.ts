/**
 * Fixed-window rate limiter held in module memory.
 *
 * Good enough for a personal site's contact form: it stops a single client
 * hammering the endpoint. It does NOT survive restarts and is per-instance, so
 * on serverless it limits per warm lambda rather than globally. If this site
 * ever needs stronger guarantees, swap in Upstash Redis — the call signature
 * below is deliberately easy to replace.
 */

type Window = { count: number; resetAt: number };

const windows = new Map<string, Window>();

const LIMIT = 5;
const WINDOW_MS = 10 * 60 * 1000;

export function rateLimit(key: string): {
  allowed: boolean;
  retryAfterSeconds: number;
} {
  const now = Date.now();
  const existing = windows.get(key);

  if (!existing || existing.resetAt <= now) {
    windows.set(key, { count: 1, resetAt: now + WINDOW_MS });
    cleanup(now);
    return { allowed: true, retryAfterSeconds: 0 };
  }

  existing.count += 1;

  if (existing.count > LIMIT) {
    return {
      allowed: false,
      retryAfterSeconds: Math.ceil((existing.resetAt - now) / 1000),
    };
  }

  return { allowed: true, retryAfterSeconds: 0 };
}

/** Drop expired windows so the map can't grow without bound. */
function cleanup(now: number) {
  if (windows.size < 500) return;
  for (const [key, window] of windows) {
    if (window.resetAt <= now) windows.delete(key);
  }
}
