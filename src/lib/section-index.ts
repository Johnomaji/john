import { projects, testimonials, videos } from "@/content/profile";

/**
 * The numerals beside each section eyebrow, in page order. A section that
 * hides itself when its content is empty is skipped here too, so emptying an
 * array in profile.ts never leaves a gap like 05 → 07.
 */
const sections = [
  { id: "about", visible: true },
  { id: "ventures", visible: true },
  { id: "experience", visible: true },
  { id: "education", visible: true },
  { id: "speaking", visible: true },
  { id: "content", visible: videos.length > 0 },
  { id: "projects", visible: projects.length > 0 },
  { id: "skills", visible: true },
  { id: "testimonials", visible: testimonials.length > 0 },
  { id: "contact", visible: true },
] as const;

type SectionId = (typeof sections)[number]["id"];

/** Hidden sections have no entry — they never render, so never read one. */
export const sectionIndex: Partial<Record<SectionId, string>> =
  Object.fromEntries(
    sections
      .filter((section) => section.visible)
      .map((section, i) => [section.id, String(i + 1).padStart(2, "0")]),
  );
