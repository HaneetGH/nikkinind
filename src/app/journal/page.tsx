import type { Metadata } from "next";
import { FormatDate } from "@/components/site/format-date";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteNav } from "@/components/site/site-nav";
import { getContent } from "@/lib/store";

export const metadata: Metadata = {
  title: "Journal",
  description: "Drops, craft notes, and studio updates from KAIRA.",
};

export const instant = false;

export default async function JournalPage() {
  const content = await getContent();
  const posts = [...content.updates].sort((a, b) =>
    a.publishedAt < b.publishedAt ? 1 : a.publishedAt > b.publishedAt ? -1 : 0,
  );

  return (
    <>
      <SiteNav />
      <main className="flex-1 px-5 pb-24 pt-28 md:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs uppercase tracking-[0.28em] text-matcha/80">
            Journal
          </p>
          <h1 className="mt-3 font-display text-5xl font-bold tracking-tight text-mist md:text-6xl">
            Studio updates
          </h1>
          <p className="mt-4 text-mist/60">
            New designs, weave notes, and the quiet flex behind every drop.
          </p>

          <div className="mt-14 space-y-6">
            {posts.map((post) => (
              <article
                key={post.id}
                className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6 md:p-8"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-matcha/30 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-matcha">
                    {post.tag}
                  </span>
                  <span className="text-xs text-mist/40">
                    <FormatDate value={post.publishedAt} style="long" />
                  </span>
                </div>
                <h2 className="mt-4 font-display text-2xl font-semibold text-mist md:text-3xl">
                  {post.title}
                </h2>
                <p className="mt-3 text-base leading-relaxed text-mist/65">
                  {post.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
