"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { designHref, makerLabel } from "@/lib/designs";
import type { Design } from "@/lib/types";

type HandloomGridProps = {
  designs: Design[];
  title?: string;
  eyebrow?: string;
  compact?: boolean;
};

export function HandloomGrid({
  designs,
  title = "House line + partner brands",
  eyebrow = "Handloom edit",
  compact = false,
}: HandloomGridProps) {
  if (!designs.length) {
    return (
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <p className="text-mist/60">
          No weaves yet. Add designs in Studio to fill this catalog.
        </p>
      </section>
    );
  }

  return (
    <section
      className={`mx-auto max-w-7xl px-5 md:px-8 ${compact ? "py-12" : "py-14 md:py-16"}`}
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-matcha/80">
            {eyebrow}
          </p>
          <h2 className="mt-2 max-w-2xl font-display text-3xl font-bold tracking-tight text-mist md:text-4xl">
            {title}
          </h2>
        </div>
        <p className="max-w-sm text-sm text-mist/55">
          {designs.length} live weaves · each with its own scroll story
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {designs.map((design, index) => (
          <motion.div
            key={design.id}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: index * 0.04, duration: 0.45 }}
          >
            <Link
              href={designHref(design)}
              className="group block overflow-hidden rounded-[1.35rem] border border-white/10 bg-white/[0.035] transition hover:border-matcha/40"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={design.image}
                  alt={`${design.title} by ${design.maker}`}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />
                <span
                  className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] ${
                    design.houseLine
                      ? "bg-matcha text-ink"
                      : "border border-white/25 bg-ink/75 text-mist"
                  }`}
                >
                  {design.houseLine ? "House" : "Partner"}
                </span>
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-matcha">
                    {design.maker}
                  </p>
                  <h3 className="mt-1 font-display text-xl font-semibold text-mist transition group-hover:text-matcha">
                    {design.title}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-sm text-mist/65">
                    {design.summary}
                  </p>
                  <div className="mt-3 flex items-center justify-between gap-2">
                    <div className="flex gap-1.5">
                      {design.palette.slice(0, 3).map((swatch) => (
                        <span
                          key={swatch}
                          className="h-2.5 w-2.5 rounded-full border border-white/20"
                          style={{ backgroundColor: swatch }}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-mist/45">
                      {design.category.replace("Handloom ", "")}
                    </span>
                  </div>
                </div>
              </div>
              <div className="border-t border-white/5 px-4 py-3 text-xs text-mist/45">
                {makerLabel(design)} · {design.collection}
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
