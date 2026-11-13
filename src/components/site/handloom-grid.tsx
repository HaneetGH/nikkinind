"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { designHref } from "@/lib/designs";
import type { Design } from "@/lib/types";

type HandloomGridProps = {
  designs: Design[];
  title?: string;
  eyebrow?: string;
};

export function HandloomGrid({
  designs,
  title = "Every weave. Its own page.",
  eyebrow = "Handloom only",
}: HandloomGridProps) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-28">
      <p className="text-xs uppercase tracking-[0.28em] text-matcha/80">
        {eyebrow}
      </p>
      <h2 className="mt-3 max-w-2xl font-display text-4xl font-bold tracking-tight text-mist md:text-5xl">
        {title}
      </h2>
      <p className="mt-4 max-w-xl text-mist/60">
        Open any piece for a full scroll story — look, craft, loom, and palette.
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {designs.map((design, index) => (
          <motion.div
            key={design.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ delay: index * 0.05, duration: 0.5 }}
          >
            <Link
              href={designHref(design)}
              className="group block overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.03] transition hover:border-matcha/35"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={design.image}
                  alt={design.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs uppercase tracking-[0.2em] text-matcha">
                    {design.collection}
                  </p>
                  <p className="text-xs text-mist/45">{design.category}</p>
                </div>
                <h3 className="mt-2 font-display text-2xl font-semibold text-mist transition group-hover:text-matcha">
                  {design.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-mist/60">
                  {design.summary}
                </p>
                <p className="mt-4 text-sm font-medium text-matcha">
                  View weave →
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
