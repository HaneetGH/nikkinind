import Link from "next/link";
import type { Design } from "@/lib/types";

type MakersBandProps = {
  designs: Design[];
};

export function MakersBand({ designs }: MakersBandProps) {
  const makers = Array.from(
    new Map(
      designs.map((d) => [
        d.maker,
        {
          maker: d.maker,
          houseLine: d.houseLine,
          count: designs.filter((x) => x.maker === d.maker).length,
        },
      ]),
    ).values(),
  );

  return (
    <section className="border-y border-white/10 bg-[#0a1612] px-5 py-12 md:px-8 md:py-14">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-matcha/80">
              Makers
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-mist md:text-4xl">
              One house. Multiple looms.
            </h2>
          </div>
          <p className="max-w-md text-sm text-mist/60">
            NikkiNind is the storefront — house weaves we design, plus partner
            handloom brands we stand behind.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {makers.map((m) => (
            <Link
              key={m.maker}
              href="/handloom"
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-matcha/40"
            >
              <p className="text-[10px] uppercase tracking-[0.2em] text-matcha">
                {m.houseLine ? "House line" : "Partner brand"}
              </p>
              <h3 className="mt-3 font-display text-2xl font-semibold text-mist">
                {m.maker}
              </h3>
              <p className="mt-2 text-sm text-mist/55">
                {m.count} weave{m.count === 1 ? "" : "s"} in catalog
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
