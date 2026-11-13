import Link from "next/link";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteNav } from "@/components/site/site-nav";

export default function NotFound() {
  return (
    <>
      <SiteNav />
      <main className="flex flex-1 flex-col items-center justify-center px-5 py-32 text-center">
        <p className="text-xs uppercase tracking-[0.28em] text-matcha">404</p>
        <h1 className="mt-3 font-display text-4xl font-bold text-mist">
          Weave not found
        </h1>
        <p className="mt-3 max-w-md text-mist/60">
          That page isn’t on the loom. Browse the handloom house instead.
        </p>
        <Link
          href="/handloom"
          className="mt-8 rounded-full bg-matcha px-6 py-3 text-sm font-semibold text-ink"
        >
          Browse handloom
        </Link>
      </main>
      <SiteFooter />
    </>
  );
}
