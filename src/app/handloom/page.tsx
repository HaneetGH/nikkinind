import type { Metadata } from "next";
import { HandloomGrid } from "@/components/site/handloom-grid";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteNav } from "@/components/site/site-nav";
import { getContent } from "@/lib/store";

export const metadata: Metadata = {
  title: "Handloom",
  description:
    "Browse every NikkiNind handloom weave — each piece on its own page.",
};

export const instant = false;

export default async function HandloomIndexPage() {
  const content = await getContent();

  return (
    <>
      <SiteNav />
      <main className="flex-1 pt-16">
        <div className="mx-auto max-w-7xl px-5 pt-12 md:px-8">
          <p className="text-xs uppercase tracking-[0.28em] text-matcha/80">
            Handloom only
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-5xl font-bold tracking-tight text-mist md:text-6xl">
            The full weave list.
          </h1>
          <p className="mt-4 max-w-xl text-mist/60">
            No decor dump. No filler. Pure handloom textiles — open any piece
            for its own scroll story.
          </p>
        </div>
        <HandloomGrid
          designs={content.designs}
          eyebrow="All weaves"
          title="Pick a piece. Scroll the craft."
        />
      </main>
      <SiteFooter />
    </>
  );
}
