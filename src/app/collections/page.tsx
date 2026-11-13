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

/** Alias of /handloom so older links still work. */
export default async function CollectionsPage() {
  const content = await getContent();

  return (
    <>
      <SiteNav />
      <main className="flex-1 pt-16">
        <div className="mx-auto max-w-7xl px-5 pt-10 md:px-8">
          <p className="text-xs uppercase tracking-[0.28em] text-matcha/80">
            Collections
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold tracking-tight text-mist md:text-5xl">
            Handloom collections
          </h1>
          <p className="mt-4 max-w-xl text-mist/60">
            NikkiNind house weaves and partner brands — {content.designs.length}{" "}
            pieces live now.
          </p>
        </div>
        <HandloomGrid designs={content.designs} compact />
      </main>
      <SiteFooter />
    </>
  );
}
