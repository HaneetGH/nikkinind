import Image from "next/image";
import Link from "next/link";
import { designHref } from "@/lib/designs";
import type { Design } from "@/lib/types";

type RelatedHandloomProps = {
  designs: Design[];
};

export function RelatedHandloom({ designs }: RelatedHandloomProps) {
  if (!designs.length) return null;

  return (
    <section className="mx-auto max-w-7xl px-5 pb-28 md:px-8">
      <p className="text-xs uppercase tracking-[0.28em] text-matcha/80">
        More handloom
      </p>
      <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-mist md:text-4xl">
        Keep wandering the loom room.
      </h2>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {designs.map((design) => (
          <Link
            key={design.id}
            href={designHref(design)}
            className="group overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.03]"
          >
            <div className="relative aspect-[5/4]">
              <Image
                src={design.image}
                alt={design.title}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
                sizes="33vw"
              />
            </div>
            <div className="p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-matcha">
                {design.maker}
                {design.houseLine ? " · House" : " · Partner"}
              </p>
              <h3 className="mt-1 font-display text-xl font-semibold text-mist">
                {design.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
