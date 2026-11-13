"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/handloom", label: "Handloom" },
  { href: "/journal", label: "Journal" },
  { href: "/studio", label: "Studio" },
];

export function SiteNav() {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <Link
          href="/"
          className="font-display text-xl font-extrabold tracking-tight text-mist sm:text-2xl md:text-3xl"
        >
          NikkiNind
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-1 rounded-full border border-white/10 bg-ink/60 px-2 py-1.5 md:flex"
        >
          {links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-4 py-1.5 text-sm transition-colors",
                  active
                    ? "bg-matcha text-ink"
                    : "text-mist/70 hover:text-mist",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <nav
            aria-label="Mobile"
            className="flex items-center gap-1 rounded-full border border-white/10 bg-ink/60 px-1.5 py-1 md:hidden"
          >
            {links.slice(1).map((link) => {
              const active = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-full px-2.5 py-1 text-[11px] transition-colors",
                    active
                      ? "bg-matcha text-ink"
                      : "text-mist/70 hover:text-mist",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <Link
            href="/handloom"
            className="hidden rounded-full border border-matcha/40 bg-matcha/10 px-4 py-2 text-sm font-medium text-matcha transition hover:bg-matcha hover:text-ink sm:inline-flex md:px-5"
          >
            Shop weaves
          </Link>
        </div>
      </div>
    </header>
  );
}
