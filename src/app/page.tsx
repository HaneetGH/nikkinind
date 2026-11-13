import { CtaBand } from "@/components/site/cta-band";
import { HandloomGrid } from "@/components/site/handloom-grid";
import { Hero } from "@/components/site/hero";
import { JournalPreview } from "@/components/site/journal-preview";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteNav } from "@/components/site/site-nav";
import { getContent } from "@/lib/store";

export const instant = false;

export default async function HomePage() {
  const content = await getContent();
  const featured =
    content.designs.find((d) => d.featured) ?? content.designs[0];

  return (
    <>
      <SiteNav />
      <main className="flex-1">
        <Hero
          brand={content.site.brand}
          tagline={content.site.tagline}
          subtitle={content.site.subtitle}
          image={featured.image}
        />
        <HandloomGrid designs={content.designs} />
        <JournalPreview updates={content.updates} />
        <CtaBand />
      </main>
      <SiteFooter />
    </>
  );
}
