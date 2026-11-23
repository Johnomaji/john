/**
 * profile.ts — the single source of truth for every word on this site.
 *
 * Nothing else needs editing to change copy. Components read from here, the
 * print CV at /cv reads from here, and the SEO/OG metadata reads from here.
 *
 * Anything marked `TODO` is a placeholder. Values written as "20XX" or
 * wrapped in "Replace this…" are deliberately obvious so an unfinished entry
 * can never be mistaken for a real claim. See CHECKLIST.md for the full list.
 */

/* ---------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

export type SocialPlatform =
  | "github"
  | "youtube"
  | "linkedin"
  | "x"
  | "email";

export interface SocialLink {
  platform: SocialPlatform;
  /** Shown as the visible label, e.g. "GitHub". */
  label: string;
  /** Full URL, or a mailto: link for email. */
  href: string;
  /** Shown in the footer under the label, e.g. "@abijay440". */
  handle?: string;
}

export interface Venture {
  /** Stable id, also used as the anchor fragment. */
  id: string;
  name: string;
  /** One-line category, e.g. "Web development & consulting". */
  tagline: string;
  role: string;
  /** Display string, e.g. "2018" or "2018 — Present". */
  period: string;
  /** 2–3 sentences. Appears on the venture card. */
  description: string;
  /** Short proof points. Keep to 3 or fewer; keep them factual. */
  highlights: string[];
  href?: string;
  /** Visible link text, e.g. "creedacademy.ng". */
  hrefLabel?: string;
  /** Drives the small status pill on the card. */
  status: "Active" | "In development" | "Archived";
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  /** Display string, e.g. "2018 — Present". */
  period: string;
  location?: string;
  description: string;
  /** Bullet points shown on the timeline and in the print CV. */
  achievements: string[];
  /** Tech or tools worth naming. Optional. */
  stack?: string[];
}

export interface EducationItem {
  id: string;
  qualification: string;
  institution: string;
  /** Optional — leave it out to list the qualification without dates. */
  period?: string;
  location?: string;
  note?: string;
  status: "In progress" | "Completed";
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  year: string;
  href?: string;
}

export interface SpeakingTopic {
  id: string;
  title: string;
  description: string;
  /** Audience this talk is pitched at. */
  audience: string;
}

export interface SpeakingEvent {
  id: string;
  event: string;
  /** Talk or session title. */
  talk: string;
  /** Display string, e.g. "March 2025". */
  date: string;
  location: string;
  /** "upcoming" events render above past ones with an accent pill. */
  timing: "upcoming" | "past";
  href?: string;
}

export interface VideoItem {
  id: string;
  title: string;
  description: string;
  /** YouTube video id only — the 11-character string after `v=`. */
  youtubeId: string;
  /** Display string, e.g. "12 min". */
  duration?: string;
}

export interface Project {
  id: string;
  name: string;
  /** One line, plain language, no buzzwords. */
  summary: string;
  description: string;
  stack: string[];
  year: string;
  /** Live site or app store link. */
  liveHref?: string;
  repoHref?: string;
  /** Pins the project to the top of the grid with a larger card. */
  featured?: boolean;
}

export interface SkillGroup {
  id: string;
  title: string;
  /** One line describing how this cluster is actually used. */
  description: string;
  skills: string[];
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  /** Role and organisation, e.g. "Parent, Creed Academy". */
  attribution: string;
}

export interface NavItem {
  label: string;
  /** Fragment on the home page, or an absolute path like "/cv". */
  href: string;
}

/* ---------------------------------------------------------------------------
 * Identity
 * ------------------------------------------------------------------------- */

export const profile = {
  name: "John Omaji",
  /** Used in conversational copy and the footer sign-off. */
  firstName: "Johnny",
  /** Appears under the hero name. Keep it to four words or fewer each. */
  positioning: ["Founder", "Developer", "Educator", "Speaker"],
  /** One sentence. Used for the meta description and OG image subtitle. */
  oneLiner:
    "Software developer and founder building education and language technology.",
  /** Hero paragraph. Two or three sentences maximum. */
  heroBio:
    "I build software, companies, and curricula. I founded Creed IT to ship web products for clients, Creed Academy to teach children to code, and IdomaSpeak to put my mother tongue in people's pockets. I'm currently reading for an M.Sc. in Software Engineering.",
  /** Opens the Profile block on the print CV. Three or four sentences. */
  cvSummary:
    "Software developer and founder building education and language technology. I run Creed IT, where I build and consult on web products; I founded Creed Academy in 2018 to teach children between 7 and 14 to code; and I am building IdomaSpeak, a mobile app for learning the Idoma language. I hold a B.Sc. in Computer Science and am currently reading for an M.Sc. in Software Engineering.",
  email: "hello@johnomaji.com",
  /** TODO: add your phone number, or set to null to hide it from the CV. */
  phone: null as string | null,
  /** Canonical production URL. Update before deploying. */
  siteUrl: "https://johnomaji.com",
  /**
   * Professional photo, served from public/. Set to null to fall back to the
   * typographic monogram in the hero.
   */
  photo: "/johnny.jpg" as string | null,
  photoAlt: "John Omaji smiling, wearing a green kaftan and patterned cap",
  /**
   * CV PDF served from /public. Leave as-is and the "Download CV" button
   * routes to /cv, where the browser's print dialog produces the PDF.
   * Set to "/john-omaji-cv.pdf" once you've exported and saved one.
   */
  cvPdf: null as string | null,
  /** Shown in the contact section. Set to false when you're booked up. */
  availableForWork: true,
} as const;

/* ---------------------------------------------------------------------------
 * About
 * ------------------------------------------------------------------------- */

export const about = {
  eyebrow: "About",
  title: "A developer who kept building the thing that was missing.",
  /** Each string is a paragraph. */
  paragraphs: [
    "I'm drawn to the gap between an idea and a working product. That gap is where the real work lives: deciding what actually matters, breaking the build, and staying with a problem long enough to properly understand it. It's the habit behind everything I've started.",
    "Along the way I saw how much friction there is for anyone starting out, which is why I founded Creed Academy in 2018 to teach children between 7 and 14 to code. Children don't need to be convinced that building things is fun; they need someone to hand them the tools early, before anyone tells them programming is hard. Watching a nine-year-old debug their own game is the clearest evidence I have that the barrier was never ability.",
    "IdomaSpeak came from a different kind of gap. Idoma is my language, and like most of the world's languages it has almost no digital footprint — no apps, few resources, and a generation growing up without it. So I'm building the Duolingo-style app it didn't have. Language is infrastructure, and if nobody builds it for a language, the language quietly loses.",
    "Alongside that I run Creed IT, where I build and consult on web products, and I'm studying for an M.Sc. in Software Engineering to go deeper on the engineering fundamentals behind it all. The thread through all of it is the same: find the thing that should exist, and build it.",
  ],
  /** Short, factual stat row. Keep these honest and easy to verify. */
  facts: [
    { label: "Teaching since", value: "2018" },
    { label: "Ventures founded", value: "Three" },
    { label: "Primary stack", value: "Next.js" },
    { label: "Currently", value: "M.Sc. student" },
  ],
  /** Pull quote rendered large between paragraphs. */
  pullQuote: "Find the thing that should exist, and build it.",
} as const;

/* ---------------------------------------------------------------------------
 * Ventures
 * ------------------------------------------------------------------------- */

export const ventures: Venture[] = [
  {
    id: "creed-it",
    name: "Creed IT",
    tagline: "Web development & consulting",
    role: "Founder",
    period: "2021 — Present",
    description:
      "A studio building web products for clients, from first scope to deployed and maintained. I take on the work end to end: architecture, build, and the consulting conversations that decide what's worth building in the first place.",
    highlights: [
      "Full-stack delivery on Next.js and TypeScript",
      "Technical consulting and architecture reviews",
      // TODO: add a factual, verifiable third highlight (e.g. a sector you
      // focus on, or a number of projects shipped). Delete if unsure.
    ],
    // TODO: add the Creed IT website URL and its display label.
    href: undefined,
    hrefLabel: undefined,
    status: "Active",
  },
  {
    id: "creed-academy",
    name: "Creed Academy",
    tagline: "Coding education for children aged 7–14",
    role: "Founder",
    period: "2018 — Present",
    description:
      "A coding school for children between 7 and 14, founded on the belief that the barrier to programming is access, not aptitude. We teach the fundamentals through things children actually want to make — games, animations, small apps — so the logic lands before the syntax intimidates.",
    highlights: [
      "Founded in 2018",
      "Curriculum designed for ages 7 to 14",
      // TODO: add students taught, cohorts run, or schools partnered with —
      // only once you have the real number.
    ],
    // TODO: add the Creed Academy website URL and its display label.
    href: undefined,
    hrefLabel: undefined,
    status: "Active",
  },
  {
    id: "idomaspeak",
    name: "IdomaSpeak",
    tagline: "Learn the Idoma language",
    role: "Founder",
    period: "2025 — Present",
    description:
      "A mobile app for learning Idoma, built in the shape people already understand: short lessons, streaks, and spaced repetition. Idoma has almost no digital learning resources, so the app is as much language preservation as it is product.",
    highlights: [
      "Bite-sized lessons with spaced repetition",
      "Built with React Native",
      // TODO: add launch status, waitlist size, or app store links when real.
    ],
    // TODO: add the IdomaSpeak landing page or app store URL.
    href: undefined,
    hrefLabel: undefined,
    status: "In development",
  },
];

/* ---------------------------------------------------------------------------
 * Experience
 *
 * TODO: add any earlier employment, freelance, or contract roles below the
 * founder entries. The timeline renders in array order, newest first.
 * ------------------------------------------------------------------------- */

export const experience: ExperienceItem[] = [
  {
    id: "exp-creed-it",
    role: "Founder & Lead Developer",
    organization: "Creed IT",
    period: "2021 — Present",
    description:
      "Lead web development and technical consulting engagements end to end, from scoping and architecture through to deployment and ongoing maintenance.",
    achievements: [
      "Deliver production web applications on Next.js, TypeScript, and PostgreSQL",
      "Advise clients on architecture, scope, and technical trade-offs before build",
      // TODO: add a quantified achievement once you have the figure.
    ],
    stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Tailwind CSS"],
  },
  {
    id: "exp-idomaspeak",
    role: "Founder",
    organization: "IdomaSpeak",
    period: "2025 — Present",
    description:
      "Designing and building a mobile language-learning app for Idoma, covering product design, curriculum structure, and mobile engineering.",
    achievements: [
      "Build the cross-platform mobile client in React Native",
      "Structure the Idoma lesson progression and spaced-repetition model",
    ],
    stack: ["React Native", "TypeScript", "Node.js"],
  },
  {
    id: "exp-creed-academy",
    role: "Founder & Instructor",
    organization: "Creed Academy",
    period: "2018 — Present",
    description:
      "Founded and run a coding school for children aged 7 to 14, writing the curriculum and teaching the cohorts.",
    achievements: [
      "Designed an age-appropriate programming curriculum from scratch",
      "Teach and mentor young beginners through their first working projects",
      // TODO: add number of students or cohorts taught since 2018.
    ],
  },
  // TODO: add earlier roles here — employment, freelance, or internships.
  // Copy the shape above. Delete this comment once you have.
];

/* ---------------------------------------------------------------------------
 * Education & certifications
 * ------------------------------------------------------------------------- */

export const education: EducationItem[] = [
  {
    id: "edu-msc",
    qualification: "M.Sc. Software Engineering",
    institution: "Iconic University",
    period: "2026 — Present",
    note: "Currently reading, alongside running Creed IT and Creed Academy.",
    status: "In progress",
  },
  {
    id: "edu-bsc",
    qualification: "B.Sc. Computer Science",
    institution: "Federal University of Agriculture, Makurdi",
    // TODO: add the years, e.g. "2012 — 2016", or leave it out.
    status: "Completed",
  },
];

/**
 * Empty, so the subsection is hidden on the homepage and the CV. Add entries
 * in this shape when you have real ones:
 * { id: "cert-slug", name: "Certification name", issuer: "Issuing body", year: "2025" }
 */
export const certifications: Certification[] = [];

/** TODO: add real awards, or set this to [] to hide the subsection. */
export const awards: Certification[] = [];

/* ---------------------------------------------------------------------------
 * Speaking
 * ------------------------------------------------------------------------- */

export const speaking = {
  eyebrow: "Speaking",
  title: "Talks on building, teaching, and technology.",
  intro:
    "I've spoken at DevFest and at several tech bootcamps, to developers, founders, educators, and students — usually about the gap between learning to code and building something real, and about why that gap matters most for people furthest from the usual pipelines.",
  /** Opens the Speaking block on the print CV. One line. */
  cvSummary: "Spoken at DevFest and at several tech bootcamps.",
  /** The "Book me to speak" block. */
  booking: {
    title: "Book me to speak",
    body: "Conferences, meetups, schools, and corporate sessions — in person or remote. Tell me the audience and the slot length and I'll shape the talk around it.",
    ctaLabel: "Send a speaking enquiry",
    /** Prefills the contact form topic when clicked. */
    formTopic: "Speaking enquiry",
  },
  /**
   * Speaker reel. Set `youtubeId` to the video id to embed a reel.
   * TODO: add a speaker reel video id, or leave null to hide the player.
   */
  reel: {
    youtubeId: null as string | null,
    caption: "Speaker reel",
  },
  /** TODO: add real one-sheet PDF at /public and link it here. */
  onePagerHref: null as string | null,
} as const;

export const speakingTopics: SpeakingTopic[] = [
  {
    id: "topic-learning-to-ship",
    title: "From tutorials to shipped software",
    description:
      "What actually works when you move from learning to code to building software people use — and which pieces of conventional advice quietly waste years.",
    audience: "Students, career switchers, developer communities",
  },
  {
    id: "topic-teaching-kids",
    title: "Teaching children to code before they're told it's hard",
    description:
      "What eight years of teaching 7-to-14-year-olds has taught me about curriculum, attention, and why the barrier to programming is access rather than aptitude.",
    audience: "Educators, schools, EdTech and policy audiences",
  },
  {
    id: "topic-language-tech",
    title: "Building technology for languages the internet forgot",
    description:
      "Why most of the world's languages have almost no digital footprint, what it takes to build a learning app for one, and why language is infrastructure.",
    audience: "Product builders, local-language and culture technologists",
  },
  {
    id: "topic-shipping",
    title: "Running three ventures at once",
    description:
      "Running a software studio, a coding school, and a product startup in parallel: the real constraints, the trade-offs, and what actually gets shipped.",
    audience: "Founders, startup communities, investors",
  },
  // TODO: add or edit topics so they match what you actually want to be
  // invited to speak about.
];

/**
 * Empty, so the events list is hidden. Add talks in this shape to show it;
 * `timing: "upcoming"` entries render first with an accent pill:
 * { id: "event-slug", event: "DevFest", talk: "Talk title", date: "November 2025",
 *   location: "City", timing: "past", href: "https://…" }
 */
export const speakingEvents: SpeakingEvent[] = [];

/* ---------------------------------------------------------------------------
 * Content / YouTube
 * ------------------------------------------------------------------------- */

export const content = {
  eyebrow: "Content",
  title: "I make videos about building things.",
  intro:
    "Walkthroughs, build logs, and the parts of software work that don't make it into tutorials. Made for people who learn best by watching someone actually do it.",
  /** TODO: add your YouTube channel URL. */
  channelHref: null as string | null,
  /** TODO: add your channel handle, e.g. "@johnnyomaji". */
  channelHandle: null as string | null,
  ctaLabel: "Visit the channel",
} as const;

/**
 * Empty, so the whole Content section is hidden. Add videos in this shape to
 * show it. `youtubeId` is the 11-character id from the video URL — in
 * youtube.com/watch?v=dQw4w9WgXcQ the id is dQw4w9WgXcQ:
 * { id: "video-slug", title: "Video title", description: "One line.", youtubeId: "dQw4w9WgXcQ" }
 */
export const videos: VideoItem[] = [];

/* ---------------------------------------------------------------------------
 * Projects
 *
 * TODO: these describe your three ventures as software. Add your other
 * notable projects — client work you can name, open source, experiments.
 * ------------------------------------------------------------------------- */

export const projects: Project[] = [
  {
    id: "proj-idomaspeak",
    name: "IdomaSpeak",
    summary: "A Duolingo-style mobile app for learning the Idoma language.",
    description:
      "Cross-platform mobile app teaching Idoma through short lessons, streaks, and spaced repetition. Built to give a language with almost no digital resources a modern learning path.",
    stack: ["React Native", "TypeScript", "Node.js", "PostgreSQL"],
    year: "2025",
    featured: true,
  },
  {
    id: "proj-creed-academy-platform",
    name: "Creed Academy",
    summary: "Curriculum and platform for teaching children aged 7–14 to code.",
    description:
      "The teaching programme and supporting web platform behind Creed Academy — lesson structure, progression, and the tooling that keeps cohorts running.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma"],
    year: "2018",
    featured: true,
  },
  // TODO: add more projects below. Shape to copy:
  // {
  //   id: "proj-slug",
  //   name: "Project name",
  //   summary: "One line on what it does.",
  //   description: "Two or three sentences: the problem, your part, the result.",
  //   stack: ["Next.js", "PostgreSQL"],
  //   year: "2025",
  //   liveHref: "https://…",
  //   repoHref: "https://github.com/abijay440/…",
  // },
];

/* ---------------------------------------------------------------------------
 * Skills
 * ------------------------------------------------------------------------- */

export const skillGroups: SkillGroup[] = [
  {
    id: "frontend",
    title: "Frontend",
    description: "Where most of my build time goes.",
    skills: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "HTML & CSS",
    ],
  },
  {
    id: "backend",
    title: "Backend",
    description: "APIs, data modelling, and the layer underneath.",
    skills: ["Node.js", "PostgreSQL", "Prisma", "REST APIs", "Authentication"],
  },
  {
    id: "mobile",
    title: "Mobile",
    description: "Cross-platform apps, currently IdomaSpeak.",
    skills: ["React Native", "Expo", "Mobile UI patterns"],
  },
  {
    id: "blockchain",
    title: "Blockchain",
    description: "Smart contracts and the tooling around them.",
    skills: ["Solidity", "Smart contracts", "Web3 tooling", "EVM chains"],
  },
  {
    id: "teaching",
    title: "Teaching & Leadership",
    description: "The half of the work that isn't code.",
    skills: [
      "Curriculum design",
      "Teaching ages 7–14",
      "Public speaking",
      "Mentoring",
      "Founding & running ventures",
      "Technical consulting",
    ],
  },
];

/* ---------------------------------------------------------------------------
 * Testimonials
 *
 * Empty, so the section is hidden. Add real quotes — with written permission
 * from each person — in this shape to show it:
 * { id: "testimonial-slug", quote: "Two or three sentences.", name: "Full name",
 *   attribution: "Role, Organisation" }
 * ------------------------------------------------------------------------- */

export const testimonials: Testimonial[] = [];

/* ---------------------------------------------------------------------------
 * Contact & socials
 * ------------------------------------------------------------------------- */

export const contact = {
  eyebrow: "Contact",
  title: "Let's talk.",
  intro:
    "Client work, speaking invitations, teaching partnerships, or a question about one of the ventures — all welcome. I read everything that comes through here.",
  /** Options in the contact form's topic select. */
  topics: [
    "Project enquiry",
    "Speaking enquiry",
    "Creed Academy",
    "IdomaSpeak",
    "Something else",
  ],
  successMessage: "Thanks — your message landed. I'll reply soon.",
  errorMessage:
    "Something went wrong sending that. Email me directly instead and I'll pick it up.",
} as const;

/**
 * TODO: fill in every href below. Set a platform's href to null to hide it.
 * Only the GitHub handle is confirmed.
 */
export const socials: SocialLink[] = [
  {
    platform: "github",
    label: "GitHub",
    href: "https://github.com/abijay440",
    handle: "@abijay440",
  },
  {
    platform: "youtube",
    label: "YouTube",
    // TODO: add your YouTube channel URL and handle.
    href: "",
    handle: undefined,
  },
  {
    platform: "linkedin",
    label: "LinkedIn",
    // TODO: add your LinkedIn profile URL and handle.
    href: "",
    handle: undefined,
  },
  {
    platform: "x",
    label: "X",
    // TODO: add your X profile URL and handle.
    href: "",
    handle: undefined,
  },
];

/* ---------------------------------------------------------------------------
 * Navigation
 * ------------------------------------------------------------------------- */

export const navItems: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Ventures", href: "#ventures" },
  { label: "Experience", href: "#experience" },
  { label: "Speaking", href: "#speaking" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

/* ---------------------------------------------------------------------------
 * SEO
 * ------------------------------------------------------------------------- */

export const seo = {
  title: "John Omaji — Founder, Developer, Educator, Speaker",
  /** Keep under ~160 characters. */
  description:
    "John Omaji (Johnny) is a software developer and the founder of Creed IT, Creed Academy, and IdomaSpeak. Educator and speaker.",
  keywords: [
    "John Omaji",
    "Johnny Omaji",
    "Creed Academy",
    "Creed IT",
    "IdomaSpeak",
    "Idoma language app",
    "Next.js developer",
    "TypeScript developer",
    "coding for kids",
    "tech speaker",
  ],
  /** TODO: add your X handle for Twitter cards, e.g. "@johnnyomaji". */
  twitterHandle: null as string | null,
} as const;

/* ---------------------------------------------------------------------------
 * Derived helpers
 * ------------------------------------------------------------------------- */

/** Socials with a usable href — everything else is still a TODO. */
export const activeSocials = socials.filter((s) => s.href.length > 0);

/** Videos with a real YouTube id. */
export const publishedVideos = videos.filter((v) => v.youtubeId.length > 0);

export const upcomingEvents = speakingEvents.filter(
  (e) => e.timing === "upcoming",
);
export const pastEvents = speakingEvents.filter((e) => e.timing === "past");
