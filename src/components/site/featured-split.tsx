import Image from "next/image";
import Link from "next/link";
import { designHref, makerLabel } from "@/lib/designs";
import type { Design } from "@/lib/types";

type FeaturedSplitProps = {
  featured: Design;
  side: Design[];
};

export function FeaturedSplit({ featured, side }: FeaturedSplitProps) {
  return (
    <section className="mx-auto grid max-w-7xl gap-6 px-5 py-16 md:grid-cols-12 md:gap-8 md:px-8 md:py-20">
      <div className="md:col-span-7">
        <Link
          href={designHref(featured)}
          className="group relative block overflow-hidden rounded-[1.75rem] border border-white/10"
        >
          <div className="relative aspect-[4/5] md:aspect-[5/6]">
            <Image
              src={featured.image}
              alt={featured.title}
              fill
              className="object-cover transition duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 58vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
              <span className="rounded-full bg-matcha px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink">
                Featured house weave
              </span>
              <h2 className="mt-4 font-display text-4xl font-bold text-mist md:text-5xl">
                {featured.title}
              </h2>
              <p className="mt-2 text-sm text-mist/70">{makerLabel(featured)}</p>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-mist/65 md:text-base">
                {featured.summary}
              </p>
              <p className="mt-5 text-sm font-medium text-matcha">
                Unfold the story →
              </p>
            </div>
          </div>
        </Link>
      </div>

      <div className="flex flex-col gap-4 md:col-span-5">
        <div className="mb-1">
          <p className="text-xs uppercase tracking-[0.28em] text-matcha/80">
            Also in the room
          </p>
          <h3 className="mt-2 font-display text-2xl font-bold text-mist">
            Partners & house picks
          </h3>
        </div>
        {side.map((design) => (
          <Link
            key={design.id}
            href={designHref(design)}
            className="group flex gap-4 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-3 transition hover:border-matcha/40"
          >
            <div className="relative h-28 w-24 shrink-0 overflow-hidden rounded-xl">
              <Image
                src={design.image}
                alt={design.title}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
                sizes="96px"
              />
            </div>
            <div className="flex min-w-0 flex-1 flex-col justify-center py-1">
              <p className="text-[10px] uppercase tracking-[0.18em] text-matcha">
                {design.houseLine ? "House" : "Partner"} · {design.maker}
              </p>
              <h4 className="mt-1 truncate font-display text-xl font-semibold text-mist">
                {design.title}
              </h4>
              <p className="mt-1 line-clamp-2 text-sm text-mist/55">
                {design.summary}
              </p>
            </div>
          </Link>
        ))}
        <Link
          href="/handloom"
          className="mt-1 rounded-2xl border border-dashed border-matcha/35 px-4 py-4 text-center text-sm font-medium text-matcha transition hover:bg-matcha/10"
        >
          View full handloom catalog →
        </Link>
      </div>
    </section>
  );
}
