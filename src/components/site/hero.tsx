"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { designHref } from "@/lib/designs";
import type { Design } from "@/lib/types";

type HeroProps = {
  brand: string;
  tagline: string;
  subtitle: string;
  image: string;
  featured: Design[];
};

export function Hero({
  brand,
  tagline,
  subtitle,
  image,
  featured,
}: HeroProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);

  return (
    <section ref={ref} className="relative overflow-hidden pt-20">
      <div className="relative min-h-[78svh] md:min-h-[85svh]">
        <motion.div
          style={{ y: imageY, scale: imageScale }}
          className="absolute inset-0"
        >
          <Image
            src={image}
            alt="Handloom bedding styled on a modern bed"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/35 to-ink" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/75 via-ink/25 to-transparent" />
        </motion.div>

        <div className="relative z-10 mx-auto flex min-h-[78svh] max-w-7xl flex-col justify-end px-5 pb-10 pt-24 md:min-h-[85svh] md:px-8 md:pb-12">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xs uppercase tracking-[0.32em] text-matcha"
          >
            Handloom house · Own + partner brands
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.65 }}
            className="mt-3 font-display text-6xl font-extrabold tracking-tight text-mist sm:text-7xl md:text-8xl lg:text-[7.5rem]"
          >
            {brand}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.65 }}
            className="mt-4 max-w-2xl text-balance text-2xl font-light leading-snug text-mist/90 md:text-3xl"
          >
            {tagline}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-3 max-w-xl text-base text-mist/65 md:text-lg"
          >
            {subtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.55 }}
            className="mt-7 flex flex-wrap gap-3"
          >
            <Link
              href="/handloom"
              className="rounded-full bg-matcha px-6 py-3 text-sm font-semibold text-ink transition hover:bg-foam"
            >
              Browse handloom
            </Link>
            <Link
              href="/handloom?filter=partner"
              className="rounded-full border border-white/25 px-6 py-3 text-sm font-medium text-mist transition hover:border-matcha/50 hover:text-matcha"
            >
              Partner brands
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Dense featured strip — kills empty gap under hero */}
      <div className="relative z-20 -mt-2 border-t border-white/10 bg-ink/95 px-5 py-5 backdrop-blur-md md:px-8">
        <div className="mx-auto grid max-w-7xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {featured.slice(0, 4).map((design) => (
            <Link
              key={design.id}
              href={designHref(design)}
              className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-2.5 transition hover:border-matcha/40"
            >
              <div className="relative h-16 w-14 shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={design.image}
                  alt={design.title}
                  fill
                  className="object-cover"
                  sizes="56px"
                />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-[0.16em] text-matcha">
                  {design.houseLine ? "House" : "Partner"}
                </p>
                <p className="truncate font-display text-base font-semibold text-mist">
                  {design.title}
                </p>
                <p className="truncate text-xs text-mist/50">{design.maker}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
