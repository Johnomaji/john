import type { SVGProps } from "react";
import type { SocialPlatform } from "@/content/profile";

type IconProps = SVGProps<SVGSVGElement>;

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function ArrowUpRight(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path {...stroke} d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

export function ArrowDown(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path {...stroke} d="M12 5v14M6 13l6 6 6-6" />
    </svg>
  );
}

export function Download(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path {...stroke} d="M12 3v12M7 11l5 5 5-5M4 20h16" />
    </svg>
  );
}

export function Sun(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle {...stroke} cx="12" cy="12" r="4.25" />
      <path
        {...stroke}
        d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M18.7 5.3l-1.4 1.4M6.7 17.3l-1.4 1.4"
      />
    </svg>
  );
}

export function Moon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path {...stroke} d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.8 6.8 0 0 0 10.5 10.5Z" />
    </svg>
  );
}

export function Play(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M9 7.5v9l7.5-4.5z" fill="currentColor" />
      <circle {...stroke} cx="12" cy="12" r="9.25" />
    </svg>
  );
}

export function Quote(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M9.2 5.5c-3 1.5-4.7 4-4.7 7.3 0 3.3 1.8 5.7 4.4 5.7 2 0 3.5-1.4 3.5-3.4 0-1.9-1.3-3.2-3.1-3.2-.4 0-.7 0-1 .2.3-1.7 1.4-3.1 3.2-4.2zm9.3 0c-3 1.5-4.7 4-4.7 7.3 0 3.3 1.8 5.7 4.4 5.7 2 0 3.5-1.4 3.5-3.4 0-1.9-1.3-3.2-3.1-3.2-.4 0-.7 0-1 .2.3-1.7 1.4-3.1 3.2-4.2z"
      />
    </svg>
  );
}

export function Menu(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path {...stroke} d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function Close(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path {...stroke} d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function Pin(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path {...stroke} d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
      <circle {...stroke} cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export function Calendar(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <rect {...stroke} x="3.75" y="5" width="16.5" height="15" rx="2" />
      <path {...stroke} d="M3.75 10h16.5M8.5 3v4M15.5 3v4" />
    </svg>
  );
}

export function Mail(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <rect {...stroke} x="3" y="5.5" width="18" height="13" rx="2" />
      <path {...stroke} d="m3.8 7 8.2 6 8.2-6" />
    </svg>
  );
}

export function GitHub(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.1-1.46-1.1-1.46-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.88 1.52 2.32 1.08 2.88.82.09-.64.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03a9.4 9.4 0 0 1 5 0C15.4 5.22 16.24 5.5 16.24 5.5c.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.86v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"
      />
    </svg>
  );
}

export function YouTube(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M21.6 7.2a2.5 2.5 0 0 0-1.76-1.77C18.25 5 12 5 12 5s-6.25 0-7.84.43A2.5 2.5 0 0 0 2.4 7.2C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 0 0 1.76 1.77C5.75 19 12 19 12 19s6.25 0 7.84-.43a2.5 2.5 0 0 0 1.76-1.77C22 15.2 22 12 22 12s0-3.2-.4-4.8ZM10 15.2V8.8l5.2 3.2-5.2 3.2Z"
      />
    </svg>
  );
}

export function LinkedIn(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM3 9.5h4V21H3V9.5Zm6.5 0h3.8v1.6h.05A4.2 4.2 0 0 1 17 9.2c3 0 4 1.95 4 4.9V21h-4v-6.1c0-1.5-.55-2.5-1.9-2.5-1.1 0-1.7.73-2 1.44-.1.25-.13.6-.13.96V21h-4s.05-10.4 0-11.5Z"
      />
    </svg>
  );
}

export function XIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M17.5 3h3.2l-7 8 7.3 10h-5.6l-4.4-6.1L5.9 21H2.7l7.3-8.3L3 3h5.7l4.1 5.7L17.5 3Zm-1.1 16.1h1.8L7.6 4.8H5.7l10.7 14.3Z"
      />
    </svg>
  );
}

export const socialIcons: Record<
  SocialPlatform,
  (props: IconProps) => React.ReactElement
> = {
  github: GitHub,
  youtube: YouTube,
  linkedin: LinkedIn,
  x: XIcon,
  email: Mail,
};
