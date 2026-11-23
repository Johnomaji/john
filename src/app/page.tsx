import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PersonJsonLd } from "@/components/person-json-ld";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Ventures } from "@/components/sections/ventures";
import { Experience } from "@/components/sections/experience";
import { Education } from "@/components/sections/education";
import { Speaking } from "@/components/sections/speaking";
import { Content } from "@/components/sections/content";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { Testimonials } from "@/components/sections/testimonials";
import { Contact } from "@/components/sections/contact";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <PersonJsonLd />
      <SiteHeader />
      <main id="main">
        <Hero />
        <About />
        <Ventures />
        <Experience />
        <Education />
        <Speaking />
        <Content />
        <Projects />
        <Skills />
        <Testimonials />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
