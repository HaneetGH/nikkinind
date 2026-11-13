import { BrandMarquee } from "@/components/site/brand-marquee";
import { CtaBand } from "@/components/site/cta-band";
import { FeaturedSplit } from "@/components/site/featured-split";
import { HandloomGrid } from "@/components/site/handloom-grid";
import { Hero } from "@/components/site/hero";
import { JournalPreview } from "@/components/site/journal-preview";
import { MakersBand } from "@/components/site/makers-band";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteNav } from "@/components/site/site-nav";
import { getContent } from "@/lib/store";

export const instant = false;

export default async function HomePage() {
  const content = await getContent();
  const designs = content.designs ?? [];
  const featured =
    designs.find((d) => d.featured && d.houseLine) ??
    designs.find((d) => d.featured) ??
    designs[0];

  if (!featured) {
    return (
      <>
        <SiteNav />
        <main className="flex flex-1 items-center justify-center px-5 py-32 text-center">
          <div>
            <h1 className="font-display text-4xl font-bold text-mist">
              NikkiNind
            </h1>
            <p className="mt-3 text-mist/60">
              Catalog is empty. Open Studio to publish the first weave.
            </p>
          </div>
        </main>
        <SiteFooter />
      </>
    );
  }

  const strip = [
    featured,
    ...designs.filter((d) => d.id !== featured.id),
  ].slice(0, 4);
  const side = designs.filter((d) => d.id !== featured.id).slice(0, 4);

  return (
    <>
      <SiteNav />
      <main className="flex-1">
        <Hero
          brand={content.site.brand}
          tagline={content.site.tagline}
          subtitle={content.site.subtitle}
          image={featured.image}
          featured={strip}
        />
        <BrandMarquee />
        <FeaturedSplit featured={featured} side={side} />
        <MakersBand designs={designs} />
        <HandloomGrid
          designs={designs}
          eyebrow="Full edit"
          title="Every weave in the house"
          compact
        />
        <JournalPreview updates={content.updates} />
        <CtaBand />
      </main>
      <SiteFooter />
    </>
  );
}
