import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AppleProductStory } from "@/components/site/apple-product-story";
import { RelatedHandloom } from "@/components/site/related-handloom";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteNav } from "@/components/site/site-nav";
import { designStoryBeats } from "@/lib/designs";
import { getContent, getDesignBySlug } from "@/lib/store";

export const instant = false;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const design = await getDesignBySlug(slug);
  if (!design) return { title: "Handloom" };
  return {
    title: design.title,
    description: design.summary,
  };
}

export default async function HandloomPiecePage({ params }: PageProps) {
  const { slug } = await params;
  const design = await getDesignBySlug(slug);
  if (!design) notFound();

  const content = await getContent();
  const related = content.designs
    .filter((d) => d.id !== design.id)
    .slice(0, 3);
  const beats = designStoryBeats(design);

  return (
    <>
      <SiteNav />
      <main className="flex-1">
        <section className="relative min-h-[88svh] overflow-hidden">
          <Image
            src={design.image}
            alt={design.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/45 to-ink" />
          <div className="relative z-10 mx-auto flex min-h-[88svh] max-w-7xl flex-col justify-end px-5 pb-16 pt-28 md:px-8 md:pb-20">
            <Link
              href="/handloom"
              className="text-sm text-mist/70 transition hover:text-matcha"
            >
              ← All handloom
            </Link>
            <p className="mt-6 text-xs uppercase tracking-[0.28em] text-matcha">
              {design.category} · {design.collection}
            </p>
            <h1 className="mt-3 max-w-3xl font-display text-5xl font-bold tracking-tight text-mist md:text-7xl">
              {design.title}
            </h1>
            <p className="mt-4 max-w-xl text-lg text-mist/70">{design.summary}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {design.palette.map((swatch) => (
                <span
                  key={swatch}
                  className="h-4 w-4 rounded-full border border-white/20"
                  style={{ backgroundColor: swatch }}
                  title={swatch}
                />
              ))}
            </div>
            <p className="mt-8 text-[11px] uppercase tracking-[0.3em] text-mist/45">
              Scroll the story
            </p>
          </div>
        </section>

        <AppleProductStory
          beats={beats}
          image={design.image}
          productName={design.title}
        />

        <section className="mx-auto grid max-w-7xl gap-8 px-5 py-20 md:grid-cols-2 md:px-8">
          <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6 md:p-8">
            <p className="text-xs uppercase tracking-[0.22em] text-matcha">
              Loom
            </p>
            <h2 className="mt-3 font-display text-2xl font-semibold text-mist">
              {design.loom}
            </h2>
            <p className="mt-3 text-mist/65">{design.origin}</p>
          </div>
          <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6 md:p-8">
            <p className="text-xs uppercase tracking-[0.22em] text-matcha">
              Craft note
            </p>
            <h2 className="mt-3 font-display text-2xl font-semibold text-mist">
              Handloom only
            </h2>
            <p className="mt-3 text-mist/65">{design.detail}</p>
          </div>
        </section>

        <RelatedHandloom designs={related} />
      </main>
      <SiteFooter />
    </>
  );
}
