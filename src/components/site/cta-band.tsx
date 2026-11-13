import Link from "next/link";

export function CtaBand() {
  return (
    <section className="px-5 pb-14 md:px-8 md:pb-16">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[1.75rem] border border-white/10 px-7 py-10 md:px-14 md:py-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(197,213,168,0.22),transparent_45%),radial-gradient(circle_at_80%_80%,rgba(94,139,126,0.25),transparent_40%)]" />
        <div className="relative z-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.28em] text-matcha">
              Coming soon
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-mist md:text-5xl">
              House line + partners. Shop later.
            </h2>
            <p className="mt-3 text-base text-mist/65 md:text-lg">
              Ecommerce is on the way. Until then, browse NikkiNind weaves and
              partner handloom brands — each with its own scroll story.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/studio"
              className="rounded-full bg-matcha px-6 py-3 text-sm font-semibold text-ink transition hover:bg-foam"
            >
              Open Studio
            </Link>
            <Link
              href="/journal"
              className="rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-mist transition hover:border-matcha/50"
            >
              Latest updates
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
