"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FormatDate } from "@/components/site/format-date";
import type { UpdatePost } from "@/lib/types";

type JournalPreviewProps = {
  updates: UpdatePost[];
};

export function JournalPreview({ updates }: JournalPreviewProps) {
  if (!updates.length) {
    return (
      <section className="mx-auto max-w-7xl px-5 py-14 md:px-8">
        <p className="text-mist/60">Journal updates will appear here.</p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-16">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-matcha/80">
            Journal
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-mist md:text-4xl">
            Drops, craft, partner notes.
          </h2>
        </div>
        <Link
          href="/journal"
          className="text-sm text-mist/70 underline-offset-4 hover:text-matcha hover:underline"
        >
          Read all updates
        </Link>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {updates.slice(0, 3).map((update, index) => (
          <motion.article
            key={update.id}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: index * 0.06, duration: 0.45 }}
            className="rounded-[1.25rem] border border-white/10 bg-white/[0.04] p-5"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="rounded-full border border-matcha/30 px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-matcha">
                {update.tag}
              </span>
              <span className="text-xs text-mist/40">
                <FormatDate value={update.publishedAt} />
              </span>
            </div>
            <h3 className="mt-4 font-display text-xl font-semibold leading-snug text-mist">
              {update.title}
            </h3>
            <p className="mt-2 line-clamp-4 text-sm leading-relaxed text-mist/60">
              {update.body}
            </p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
