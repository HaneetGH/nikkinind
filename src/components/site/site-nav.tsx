"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
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
    <motion.header
      initial={{ y: -12 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 md:px-8">
        <Link
          href="/"
          className="font-display text-xl font-extrabold tracking-tight text-mist sm:text-2xl md:text-3xl"
        >
          NikkiNind
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-ink/60 px-2 py-1.5 backdrop-blur-xl md:flex">
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
          <nav className="flex items-center gap-1 rounded-full border border-white/10 bg-ink/60 px-1.5 py-1 backdrop-blur-xl md:hidden">
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
            className="hidden rounded-full border border-matcha/40 bg-matcha/10 px-4 py-2 text-sm font-medium text-matcha backdrop-blur-md transition hover:bg-matcha hover:text-ink sm:inline-flex md:px-5"
          >
            Weaves
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
