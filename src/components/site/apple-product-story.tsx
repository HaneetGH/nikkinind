"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useState } from "react";
import type { StoryBeat } from "@/lib/types";

type AppleProductStoryProps = {
  beats: StoryBeat[];
  image: string;
  productName: string;
};

export function AppleProductStory({
  beats,
  image,
  productName,
}: AppleProductStoryProps) {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const next = Math.min(
      beats.length - 1,
      Math.max(0, Math.floor(value * beats.length)),
    );
    setActiveIndex(next);
  });

  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.82, 1, 1.05, 0.96]);
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [-4, 0, 3]);
  const glow = useTransform(scrollYProgress, [0, 0.4, 1], [0.15, 0.45, 0.25]);
  const frameY = useTransform(scrollYProgress, [0, 1], ["6%", "-4%"]);

  const active = beats[activeIndex] ?? beats[0];

  return (
    <section
      id="story"
      ref={containerRef}
      className="relative"
      style={{ height: `${beats.length * 100}vh` }}
    >
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <motion.div
            style={{ opacity: glow }}
            className="absolute left-1/2 top-1/2 h-[55vmin] w-[55vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-matcha/30 blur-[100px]"
          />
        </div>

        <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-5 md:grid-cols-2 md:gap-16 md:px-8">
          <div className="order-2 md:order-1">
            <p className="text-xs uppercase tracking-[0.28em] text-matcha/80">
              Product story
            </p>
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="mt-5"
              >
                <p className="text-sm font-medium text-river">{active.label}</p>
                <h2 className="mt-3 font-display text-4xl font-bold leading-[1.05] tracking-tight text-mist md:text-5xl lg:text-6xl">
                  {active.title}
                </h2>
                <p className="mt-5 max-w-md text-base leading-relaxed text-mist/65 md:text-lg">
                  {active.copy}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-10 flex gap-2">
              {beats.map((beat, index) => (
                <div
                  key={beat.id}
                  className="h-1 flex-1 overflow-hidden rounded-full bg-white/10"
                >
                  <motion.div
                    className="h-full bg-matcha"
                    animate={{
                      width: index < activeIndex ? "100%" : index === activeIndex ? "70%" : "0%",
                    }}
                    transition={{ duration: 0.35 }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="order-1 flex justify-center md:order-2">
            <motion.div
              style={{ scale, rotate, y: frameY }}
              className="relative aspect-[4/5] w-[min(88vw,420px)] overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_40px_120px_rgba(0,0,0,0.45)]"
            >
              <Image
                src={image}
                alt={productName}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 88vw, 420px"
                priority
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent p-6">
                <p className="text-xs uppercase tracking-[0.22em] text-matcha">
                  Featured weave
                </p>
                <p className="mt-1 font-display text-2xl font-semibold text-mist">
                  {productName}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
