import {
  activeSocials,
  education,
  profile,
  seo,
  skillGroups,
  ventures,
} from "@/content/profile";

/** schema.org Person markup so search engines can resolve "John Omaji". */
export function PersonJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    alternateName: `${profile.firstName} Omaji`,
    url: profile.siteUrl,
    email: `mailto:${profile.email}`,
    jobTitle: profile.positioning.join(", "),
    description: seo.description,
    ...(profile.photo ? { image: `${profile.siteUrl}${profile.photo}` } : {}),
    sameAs: activeSocials.map((social) => social.href),
    knowsAbout: skillGroups.flatMap((group) => group.skills),
    alumniOf: education.map((item) => ({
      "@type": "EducationalOrganization",
      name: item.institution,
    })),
    worksFor: ventures.map((venture) => ({
      "@type": "Organization",
      name: venture.name,
      description: venture.tagline,
      ...(venture.href ? { url: venture.href } : {}),
    })),
  };

  return (
    <script
      type="application/ld+json"
      // Escaping "<" prevents any content string from breaking out of the tag.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}
