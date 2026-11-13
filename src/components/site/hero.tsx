"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type HeroProps = {
  brand: string;
  tagline: string;
  subtitle: string;
  image: string;
};

export function Hero({ brand, tagline, subtitle, image }: HeroProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.55], [0, -40]);

  return (
    <section ref={ref} className="relative min-h-[100svh] overflow-hidden">
      <motion.div
        style={{ y: imageY, scale: imageScale }}
        className="absolute inset-0"
      >
        <Image
          src={image}
          alt="Layered handloom bedsheets in soft morning light"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/45 to-ink" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-transparent to-ink/30" />
      </motion.div>

      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 flex min-h-[100svh] flex-col justify-end px-5 pb-16 pt-28 md:px-8 md:pb-24"
      >
        <div className="mx-auto w-full max-w-7xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="font-display text-6xl font-extrabold tracking-tight text-mist sm:text-7xl md:text-8xl lg:text-9xl"
          >
            {brand}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.75 }}
            className="mt-5 max-w-2xl text-balance text-2xl font-light leading-snug text-mist/90 md:text-3xl lg:text-4xl"
          >
            {tagline}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="mt-4 max-w-lg text-base text-mist/65 md:text-lg"
          >
            {subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.52, duration: 0.7 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Link
              href="/handloom"
              className="rounded-full bg-matcha px-6 py-3 text-sm font-semibold text-ink transition hover:bg-foam"
            >
              Browse handloom
            </Link>
            <Link
              href="/handloom/moonloom-stripe"
              className="rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-mist transition hover:border-matcha/50 hover:text-matcha"
            >
              House line: Moonloom
            </Link>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-[11px] uppercase tracking-[0.3em] text-mist/50"
      >
        Scroll
      </motion.div>
    </section>
  );
}
