"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import type { StoryBeat } from "@/lib/types";

type BedBlanketRevealProps = {
  beats: StoryBeat[];
  image: string;
  productName: string;
  accent?: string;
  category?: string;
};

/**
 * Apple-style sticky scrub: folded bed/blanket expands outward as you scroll,
 * then craft details fade and slide in beside the settled weave.
 */
export function BedBlanketReveal({
  beats,
  image,
  productName,
  accent = "#C5D5A8",
  category = "Handloom",
}: BedBlanketRevealProps) {
  const containerRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // --- Bed / blanket unfold ---
  const bedScale = useTransform(
    scrollYProgress,
    [0, 0.22, 0.55, 1],
    reduceMotion ? [1, 1, 1, 1] : [0.72, 0.92, 1.04, 1],
  );
  const bedY = useTransform(
    scrollYProgress,
    [0, 0.45, 1],
    reduceMotion ? ["0%", "0%", "0%"] : ["18%", "0%", "-4%"],
  );
  const bedRotateX = useTransform(
    scrollYProgress,
    [0, 0.35, 0.7],
    reduceMotion ? [0, 0, 0] : [18, 8, 0],
  );
  const blanketClip = useTransform(
    scrollYProgress,
    [0, 0.18, 0.42, 0.62],
    reduceMotion
      ? [
          "inset(0% 0% 0% 0% round 2rem)",
          "inset(0% 0% 0% 0% round 2rem)",
          "inset(0% 0% 0% 0% round 2rem)",
          "inset(0% 0% 0% 0% round 2rem)",
        ]
      : [
          "inset(42% 34% 42% 34% round 1.5rem)",
          "inset(28% 18% 32% 18% round 1.75rem)",
          "inset(8% 4% 12% 4% round 2rem)",
          "inset(0% 0% 0% 0% round 2.25rem)",
        ],
  );
  const duvetY = useTransform(
    scrollYProgress,
    [0.12, 0.48],
    reduceMotion ? ["0%", "0%"] : ["8%", "-105%"],
  );
  const duvetOpacity = useTransform(
    scrollYProgress,
    [0.1, 0.28, 0.48],
    reduceMotion ? [0, 0, 0] : [0.95, 0.85, 0],
  );
  const foldShadow = useTransform(
    scrollYProgress,
    [0, 0.3, 0.55],
    reduceMotion ? [0, 0, 0] : [0.55, 0.28, 0],
  );
  const glow = useTransform(scrollYProgress, [0, 0.4, 0.8], [0.12, 0.4, 0.22]);

  // Intro label fades as blanket opens
  const introOpacity = useTransform(scrollYProgress, [0, 0.12, 0.28], [1, 0.7, 0]);
  const introY = useTransform(scrollYProgress, [0, 0.28], [0, -30]);

  // Detail panel fades in after unfold
  const detailsOpacity = useTransform(
    scrollYProgress,
    [0.42, 0.55, 0.92, 1],
    [0, 1, 1, 1],
  );
  const detailsX = useTransform(
    scrollYProgress,
    [0.42, 0.58],
    reduceMotion ? [0, 0] : [48, 0],
  );

  const n = Math.max(beats.length, 1);

  return (
    <section
      id="story"
      ref={containerRef}
      className="relative"
      style={{ height: reduceMotion ? "auto" : "420vh" }}
    >
      <div
        className={
          reduceMotion
            ? "relative flex min-h-[100svh] flex-col justify-center overflow-hidden py-20"
            : "sticky top-0 flex h-[100svh] items-center overflow-hidden"
        }
      >
        <div className="pointer-events-none absolute inset-0">
          <motion.div
            style={{ opacity: glow }}
            className="absolute left-1/2 top-[42%] h-[50vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[110px]"
          >
            <div
              className="h-full w-full rounded-full"
              style={{ backgroundColor: accent, opacity: 0.35 }}
            />
          </motion.div>
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink to-transparent" />
        </div>

        <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 px-5 md:grid-cols-[1.15fr_0.85fr] md:gap-12 md:px-8">
          {/* Bed + blanket stage */}
          <div className="relative flex justify-center perspective-[1400px]">
            <motion.div
              style={{
                scale: bedScale,
                y: bedY,
                rotateX: bedRotateX,
                transformPerspective: 1400,
              }}
              className="relative w-full max-w-[560px] origin-bottom"
            >
              {/* Mattress base */}
              <div className="absolute -bottom-3 left-[6%] right-[6%] h-6 rounded-full bg-black/40 blur-xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#14201b] shadow-[0_50px_120px_rgba(0,0,0,0.55)]">
                <div className="relative aspect-[5/4]">
                  <motion.div
                    style={{ clipPath: blanketClip }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={image}
                      alt={productName}
                      fill
                      priority
                      className="object-cover"
                      sizes="(max-width: 768px) 90vw, 560px"
                    />
                    <motion.div
                      style={{ opacity: foldShadow }}
                      className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/35"
                    />
                    {/* Soft fabric fold lines while closed */}
                    <motion.div
                      style={{ opacity: foldShadow }}
                      className="absolute inset-y-[18%] left-1/2 w-px -translate-x-1/2 bg-white/25"
                    />
                    <motion.div
                      style={{ opacity: foldShadow }}
                      className="absolute inset-x-[18%] top-1/2 h-px -translate-y-1/2 bg-white/20"
                    />
                  </motion.div>

                  {/* Duvet / blanket layer that peels up and out */}
                  <motion.div
                    style={{ y: duvetY, opacity: duvetOpacity }}
                    className="absolute inset-x-[-2%] top-[-8%] z-10 aspect-[5/3] overflow-hidden rounded-[1.75rem] border border-white/15 shadow-2xl"
                  >
                    <Image
                      src={image}
                      alt=""
                      fill
                      aria-hidden
                      className="object-cover object-[center_20%] brightness-[0.85] saturate-[1.05]"
                      sizes="560px"
                    />
                    <div
                      className="absolute inset-0 opacity-40 mix-blend-soft-light"
                      style={{
                        background: `linear-gradient(135deg, ${accent}, transparent 55%)`,
                      }}
                    />
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/50 to-transparent" />
                    <p className="absolute bottom-4 left-5 text-[10px] uppercase tracking-[0.28em] text-white/80">
                      Blanket unfolding
                    </p>
                  </motion.div>
                </div>

                <div className="relative z-20 border-t border-white/10 bg-ink/70 px-5 py-4 backdrop-blur-md">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-matcha">
                    {category}
                  </p>
                  <p className="mt-1 font-display text-xl font-semibold text-mist md:text-2xl">
                    {productName}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              style={{ opacity: introOpacity, y: introY }}
              className="pointer-events-none absolute left-1/2 top-6 z-30 w-[min(90%,280px)] -translate-x-1/2 text-center md:top-10"
            >
              <p className="text-[11px] uppercase tracking-[0.32em] text-matcha">
                Scroll to unfold
              </p>
              <p className="mt-2 text-sm text-mist/70">
                Bed settles. Blanket goes out. Details come in.
              </p>
            </motion.div>
          </div>

          {/* Details that arrive after the blanket opens */}
          <motion.div
            style={
              reduceMotion
                ? undefined
                : { opacity: detailsOpacity, x: detailsX }
            }
            className="relative min-h-[280px] md:min-h-[420px]"
          >
            {beats.map((beat, index) => {
              const start = 0.48 + (index / n) * 0.42;
              const mid = start + 0.06;
              const end = start + 0.42 / n;
              return (
                <BeatPanel
                  key={beat.id}
                  beat={beat}
                  progress={scrollYProgress}
                  start={start}
                  mid={mid}
                  end={Math.min(end, 0.98)}
                  reduceMotion={Boolean(reduceMotion)}
                  index={index}
                />
              );
            })}

            {reduceMotion ? (
              <div className="space-y-8">
                {beats.map((beat) => (
                  <div key={`static-${beat.id}`}>
                    <p className="text-sm font-medium text-river">{beat.label}</p>
                    <h2 className="mt-2 font-display text-3xl font-bold text-mist">
                      {beat.title}
                    </h2>
                    <p className="mt-3 text-mist/65">{beat.copy}</p>
                  </div>
                ))}
              </div>
            ) : null}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function BeatPanel({
  beat,
  progress,
  start,
  mid,
  end,
  reduceMotion,
  index,
}: {
  beat: StoryBeat;
  progress: MotionValue<number>;
  start: number;
  mid: number;
  end: number;
  reduceMotion: boolean;
  index: number;
}) {
  const opacity = useTransform(
    progress,
    [start, mid, end - 0.04, end],
    reduceMotion ? [0, 0, 0, 0] : [0, 1, 1, 0],
  );
  const y = useTransform(
    progress,
    [start, mid, end],
    reduceMotion ? [0, 0, 0] : [36, 0, -24],
  );
  const blur = useTransform(
    progress,
    [start, mid, end - 0.04, end],
    reduceMotion ? [0, 0, 0, 0] : [8, 0, 0, 6],
  );
  const filter = useTransform(blur, (v) => `blur(${v}px)`);

  if (reduceMotion) return null;

  return (
    <motion.div
      style={{ opacity, y, filter }}
      className="absolute inset-x-0 top-1/2 -translate-y-1/2"
    >
      <p className="text-xs uppercase tracking-[0.28em] text-matcha/80">
        {String(index + 1).padStart(2, "0")} · {beat.label}
      </p>
      <h2 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight text-mist md:text-5xl lg:text-[3.4rem]">
        {beat.title}
      </h2>
      <p className="mt-5 max-w-md text-base leading-relaxed text-mist/65 md:text-lg">
        {beat.copy}
      </p>
    </motion.div>
  );
}
