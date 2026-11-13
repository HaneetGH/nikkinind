import Image from "next/image";
import type { Metadata } from "next";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteNav } from "@/components/site/site-nav";
import { getContent } from "@/lib/store";

export const metadata: Metadata = {
  title: "Collections",
  description: "Handloom bedsheets, throws, and decor weaves from NikkiNind.",
};

export const instant = false;

export default async function CollectionsPage() {
  const content = await getContent();

  return (
    <>
      <SiteNav />
      <main className="flex-1 px-5 pb-24 pt-28 md:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs uppercase tracking-[0.28em] text-matcha/80">
            Collections
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-5xl font-bold tracking-tight text-mist md:text-6xl">
            Designs you can feel before you buy.
          </h1>
          <p className="mt-4 max-w-xl text-mist/60">
            Browse the current handloom edit. Shop comes later — for now, soak
            in the palette, weave, and vibe.
          </p>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {content.designs.map((design) => (
              <article
                key={design.id}
                className="group overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.03]"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={design.image}
                    alt={design.title}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs uppercase tracking-[0.2em] text-matcha">
                      {design.collection}
                    </p>
                    <p className="text-xs text-mist/45">{design.category}</p>
                  </div>
                  <h2 className="mt-2 font-display text-2xl font-semibold text-mist">
                    {design.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-mist/60">
                    {design.summary}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-mist/45">
                    {design.detail}
                  </p>
                  <div className="mt-4 flex gap-2">
                    {design.palette.map((swatch) => (
                      <span
                        key={`${design.id}-${swatch}`}
                        className="h-4 w-4 rounded-full border border-white/15"
                        style={{ backgroundColor: swatch }}
                        title={swatch}
                      />
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
