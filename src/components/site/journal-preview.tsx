"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FormatDate } from "@/components/site/format-date";
import type { UpdatePost } from "@/lib/types";

type JournalPreviewProps = {
  updates: UpdatePost[];
};

export function JournalPreview({ updates }: JournalPreviewProps) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-matcha/80">
            Journal
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-mist md:text-5xl">
            Drops, craft, quiet flex.
          </h2>
        </div>
        <Link
          href="/journal"
          className="text-sm text-mist/70 underline-offset-4 hover:text-matcha hover:underline"
        >
          Read the journal
        </Link>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {updates.slice(0, 3).map((update, index) => (
          <motion.article
            key={update.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ delay: index * 0.08, duration: 0.5 }}
            className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="rounded-full border border-matcha/30 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-matcha">
                {update.tag}
              </span>
              <span className="text-xs text-mist/40">
                <FormatDate value={update.publishedAt} />
              </span>
            </div>
            <h3 className="mt-5 font-display text-xl font-semibold leading-snug text-mist">
              {update.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-mist/60">
              {update.body}
            </p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
