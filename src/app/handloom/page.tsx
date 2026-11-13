import type { Metadata } from "next";
import { CatalogStats } from "@/components/site/catalog-stats";
import { HandloomGrid } from "@/components/site/handloom-grid";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteNav } from "@/components/site/site-nav";
import { getContent } from "@/lib/store";

export const metadata: Metadata = {
  title: "Handloom",
  description:
    "NikkiNind house weaves and curated partner handloom brands — each piece on its own page.",
};

export const instant = false;

type PageProps = {
  searchParams: Promise<{ filter?: string }>;
};

export default async function HandloomIndexPage({ searchParams }: PageProps) {
  const { filter } = await searchParams;
  const content = await getContent();
  const all = content.designs ?? [];
  const designs =
    filter === "partner"
      ? all.filter((d) => !d.houseLine)
      : filter === "house"
        ? all.filter((d) => d.houseLine)
        : all;
  const house = all.filter((d) => d.houseLine).length;
  const partners = all.length - house;
  const collections = new Set(all.map((d) => d.collection)).size;
  const makers = new Set(all.map((d) => d.maker)).size;

  return (
    <>
      <SiteNav />
      <main className="flex-1 pt-16">
        <div className="mx-auto max-w-7xl px-5 pt-8 md:px-8 md:pt-10">
          <p className="text-xs uppercase tracking-[0.28em] text-matcha/80">
            Handloom house
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold tracking-tight text-mist md:text-5xl lg:text-6xl">
            Our weaves. Partner brands. One craft.
          </h1>
          <p className="mt-3 max-w-2xl text-mist/60">
            NikkiNind sells handloom we make and handloom we curate. Browse the
            full edit — each piece opens into its own bed-and-blanket scroll
            story.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {[
              { href: "/handloom", label: "All", active: !filter },
              {
                href: "/handloom?filter=house",
                label: "House line",
                active: filter === "house",
              },
              {
                href: "/handloom?filter=partner",
                label: "Partners",
                active: filter === "partner",
              },
            ].map((tab) => (
              <a
                key={tab.href}
                href={tab.href}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  tab.active
                    ? "bg-matcha text-ink"
                    : "border border-white/15 text-mist/70 hover:border-matcha/40 hover:text-matcha"
                }`}
              >
                {tab.label}
              </a>
            ))}
          </div>
        </div>
        <div className="mt-8">
          <CatalogStats
            house={house}
            partners={partners}
            collections={collections}
            makers={makers}
          />
        </div>
        <HandloomGrid
          designs={designs}
          eyebrow={
            filter === "partner"
              ? "Partner brands"
              : filter === "house"
                ? "House line"
                : "All weaves"
          }
          title={
            filter === "partner"
              ? "Curated handloom partners"
              : filter === "house"
                ? "NikkiNind house weaves"
                : "Pick a piece. Meet the maker."
          }
          compact
        />
      </main>
      <SiteFooter />
    </>
  );
}
