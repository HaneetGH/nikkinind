import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="relative mt-auto border-t border-white/10">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-14 md:flex-row md:items-end md:justify-between md:px-8">
        <div>
          <p className="font-display text-4xl font-bold tracking-tight text-mist md:text-5xl">
            NikkiNind
          </p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-mist/60">
            A handloom house — NikkiNind weaves plus curated partner brands.
            Each piece on its own page. Shop comes later.
          </p>
        </div>
        <div className="flex flex-wrap gap-6 text-sm text-mist/70">
          <Link href="/handloom" className="hover:text-matcha">
            Handloom
          </Link>
          <Link href="/journal" className="hover:text-matcha">
            Journal
          </Link>
          <Link href="/studio" className="hover:text-matcha">
            Studio dashboard
          </Link>
        </div>
      </div>
      <div className="border-t border-white/5 px-5 py-4 text-xs text-mist/40 md:px-8">
        © 2026 NikkiNind. Own weaves + partner handloom brands.
      </div>
    </footer>
  );
}
