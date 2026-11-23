import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import { profile, seo } from "@/content/profile";
import { ThemeProvider } from "@/components/theme-provider";
import { sharedOpenGraph, sharedTwitter } from "@/lib/metadata";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-jb",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: {
    default: seo.title,
    template: `%s · ${profile.name}`,
  },
  description: seo.description,
  keywords: [...seo.keywords],
  authors: [{ name: profile.name, url: profile.siteUrl }],
  creator: profile.name,
  // No canonical here: it would be inherited by every page that doesn't set
  // its own, declaring them all duplicates of the homepage. Each page sets one.
  openGraph: {
    ...sharedOpenGraph,
    title: seo.title,
    description: seo.description,
    url: profile.siteUrl,
  },
  twitter: {
    ...sharedTwitter,
    title: seo.title,
    description: seo.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf8f4" },
    { media: "(prefers-color-scheme: dark)", color: "#0e0d0c" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
