import type { Metadata } from "next";
import { HandloomGrid } from "@/components/site/handloom-grid";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteNav } from "@/components/site/site-nav";
import { getContent } from "@/lib/store";

export const metadata: Metadata = {
  title: "Collections",
  description:
    "NikkiNind handloom collections — house line and partner brands.",
};

export const instant = false;

/** Alias of /handloom so older links and bookmarks still work. */
export default async function CollectionsPage() {
  const content = await getContent();

  return (
    <>
      <SiteNav />
      <main className="flex-1 pt-16">
        <div className="mx-auto max-w-7xl px-5 pt-12 md:px-8">
          <p className="text-xs uppercase tracking-[0.28em] text-matcha/80">
            Collections
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-5xl font-bold tracking-tight text-mist md:text-6xl">
            Handloom collections
          </h1>
          <p className="mt-4 max-w-xl text-mist/60">
            Same catalog as Handloom — NikkiNind house weaves and partner
            brands, each with its own page.
          </p>
        </div>
        <HandloomGrid designs={content.designs} />
      </main>
      <SiteFooter />
    </>
  );
}
