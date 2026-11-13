"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Design } from "@/lib/types";

type HorizontalGalleryProps = {
  designs: Design[];
};

export function HorizontalGallery({ designs }: HorizontalGalleryProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "-55%"]);

  return (
    <section ref={ref} className="relative overflow-hidden py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-matcha/80">
              Slide the edit
            </p>
            <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-mist md:text-5xl">
              New weaves in motion.
            </h2>
          </div>
          <Link
            href="/collections"
            className="text-sm text-mist/70 underline-offset-4 hover:text-matcha hover:underline"
          >
            View all designs
          </Link>
        </div>
      </div>

      <div className="mt-12 overflow-hidden">
        <motion.div style={{ x }} className="flex w-max gap-5 px-5 md:gap-7 md:px-8">
          {designs.map((design, index) => (
            <motion.article
              key={design.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.05, duration: 0.55 }}
              className="group relative h-[420px] w-[300px] shrink-0 overflow-hidden rounded-[1.75rem] border border-white/10 md:h-[520px] md:w-[380px]"
            >
              <Image
                src={design.image}
                alt={design.title}
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
                sizes="380px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="text-xs uppercase tracking-[0.2em] text-matcha">
                  {design.collection}
                </p>
                <h3 className="mt-2 font-display text-2xl font-semibold text-mist">
                  {design.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-mist/65">
                  {design.summary}
                </p>
                <div className="mt-4 flex gap-2">
                  {design.palette.slice(0, 3).map((swatch) => (
                    <span
                      key={swatch}
                      className="h-3 w-3 rounded-full border border-white/20"
                      style={{ backgroundColor: swatch }}
                    />
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
