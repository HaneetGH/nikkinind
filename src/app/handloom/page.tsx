import type { Metadata } from "next";
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

export default async function HandloomIndexPage() {
  const content = await getContent();
  const house = content.designs.filter((d) => d.houseLine).length;
  const partners = content.designs.length - house;

  return (
    <>
      <SiteNav />
      <main className="flex-1 pt-16">
        <div className="mx-auto max-w-7xl px-5 pt-12 md:px-8">
          <p className="text-xs uppercase tracking-[0.28em] text-matcha/80">
            Handloom house
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-5xl font-bold tracking-tight text-mist md:text-6xl">
            Our weaves. Partner brands. One craft.
          </h1>
          <p className="mt-4 max-w-2xl text-mist/60">
            NikkiNind sells handloom we make and handloom we curate.{" "}
            {house} house-line pieces · {partners} partner brands — open any
            page for the full scroll story.
          </p>
        </div>
        <HandloomGrid
          designs={content.designs}
          eyebrow="All weaves"
          title="Pick a piece. Meet the maker."
        />
      </main>
      <SiteFooter />
    </>
  );
}
