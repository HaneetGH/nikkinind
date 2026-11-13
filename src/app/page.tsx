import { AppleProductStory } from "@/components/site/apple-product-story";
import { CtaBand } from "@/components/site/cta-band";
import { Hero } from "@/components/site/hero";
import { HorizontalGallery } from "@/components/site/horizontal-gallery";
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
        <AppleProductStory
          beats={content.storyBeats}
          image={featured.image}
          productName={featured.title}
        />
        <HorizontalGallery designs={content.designs} />
        <JournalPreview updates={content.updates} />
        <CtaBand />
      </main>
      <SiteFooter />
    </>
  );
}
