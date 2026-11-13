import type { Metadata } from "next";
import { FormatDate } from "@/components/site/format-date";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteNav } from "@/components/site/site-nav";
import { getContent } from "@/lib/store";

export const metadata: Metadata = {
  title: "Journal",
  description: "Drops, craft notes, and studio updates from NikkiNind.",
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
      <main className="flex-1 px-5 pb-20 pt-24 md:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs uppercase tracking-[0.28em] text-matcha/80">
            Journal
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-mist md:text-6xl">
            Studio updates
          </h1>
          <p className="mt-3 max-w-2xl text-mist/60">
            New designs, weave notes, and the quiet flex behind every drop —
            house line and partners.
          </p>

          {posts.length === 0 ? (
            <p className="mt-12 text-mist/55">
              No journal posts yet. Publish the first update in Studio.
            </p>
          ) : (
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {posts.map((post, index) => (
                <article
                  key={post.id}
                  className={`rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6 md:p-7 ${
                    index === 0 ? "md:col-span-2 md:p-8" : ""
                  }`}
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full border border-matcha/30 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-matcha">
                      {post.tag}
                    </span>
                    <span className="text-xs text-mist/40">
                      <FormatDate value={post.publishedAt} style="long" />
                    </span>
                  </div>
                  <h2
                    className={`mt-4 font-display font-semibold text-mist ${
                      index === 0 ? "text-3xl md:text-4xl" : "text-2xl"
                    }`}
                  >
                    {post.title}
                  </h2>
                  <p className="mt-3 text-base leading-relaxed text-mist/65">
                    {post.body}
                  </p>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
