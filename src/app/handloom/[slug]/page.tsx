import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BedBlanketReveal } from "@/components/site/bed-blanket-reveal";
import { RelatedHandloom } from "@/components/site/related-handloom";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteNav } from "@/components/site/site-nav";
import { designStoryBeats, makerLabel } from "@/lib/designs";
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
        <section className="relative overflow-hidden px-5 pb-8 pt-28 md:px-8 md:pt-32">
          <div className="mx-auto max-w-7xl">
            <Link
              href="/handloom"
              className="text-sm text-mist/70 transition hover:text-matcha"
            >
              ← All handloom
            </Link>
            <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-matcha">
                  {makerLabel(design)} · {design.collection}
                </p>
                <h1 className="mt-3 max-w-3xl font-display text-5xl font-bold tracking-tight text-mist md:text-6xl">
                  {design.title}
                </h1>
                <p className="mt-2 text-sm text-mist/50">{design.category}</p>
                <p className="mt-4 max-w-xl text-lg text-mist/65">
                  {design.summary}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 pb-1">
                {design.palette.map((swatch) => (
                  <span
                    key={swatch}
                    className="h-4 w-4 rounded-full border border-white/20"
                    style={{ backgroundColor: swatch }}
                    title={swatch}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <BedBlanketReveal
          beats={beats}
          image={design.image}
          productName={design.title}
          accent={design.accent}
          category={makerLabel(design)}
        />

        <section className="mx-auto grid max-w-7xl gap-8 px-5 py-20 md:grid-cols-2 md:px-8">
          <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.03]">
            <div className="relative aspect-[16/10]">
              <Image
                src={design.image}
                alt={design.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
          <div className="flex flex-col justify-center gap-8">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-matcha">
                Maker
              </p>
              <h2 className="mt-3 font-display text-2xl font-semibold text-mist">
                {design.maker}
              </h2>
              <p className="mt-3 text-mist/65">
                {design.houseLine
                  ? "NikkiNind house line — designed and woven for our shelves."
                  : `Partner handloom brand, curated and sold by NikkiNind.`}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-matcha">
                Loom
              </p>
              <h2 className="mt-3 font-display text-2xl font-semibold text-mist">
                {design.loom}
              </h2>
              <p className="mt-3 text-mist/65">{design.origin}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-matcha">
                Craft note
              </p>
              <h2 className="mt-3 font-display text-2xl font-semibold text-mist">
                Pure handloom
              </h2>
              <p className="mt-3 text-mist/65">{design.detail}</p>
            </div>
          </div>
        </section>

        <RelatedHandloom designs={related} />
      </main>
      <SiteFooter />
    </>
  );
}
