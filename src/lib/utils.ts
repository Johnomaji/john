type ClassValue = string | number | false | null | undefined;

export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}

/** "01", "02" … for section numbering. */
export function ordinal(index: number): string {
  return String(index + 1).padStart(2, "0");
}
