"use client";

import { motion } from "framer-motion";

const makers = [
  "NikkiNind House",
  "Aaranya Loom",
  "Khadi North",
  "Softloom Co.",
  "Karur Collective",
  "Indigo Thread",
];

export function BrandMarquee() {
  const row = [...makers, ...makers];

  return (
    <section className="overflow-hidden border-y border-white/10 bg-white/[0.03] py-4">
      <motion.div
        className="flex w-max gap-10 whitespace-nowrap px-4"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, ease: "linear", repeat: Infinity }}
      >
        {row.map((name, i) => (
          <span
            key={`${name}-${i}`}
            className="font-display text-sm font-semibold tracking-[0.2em] text-mist/55 uppercase"
          >
            {name}
            <span className="ml-10 text-matcha/50">✦</span>
          </span>
        ))}
      </motion.div>
    </section>
  );
}
