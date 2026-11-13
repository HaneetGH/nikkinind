import type { Design, StoryBeat } from "@/lib/types";

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function designHref(design: Pick<Design, "slug">) {
  return `/handloom/${design.slug}`;
}

export function makerLabel(design: Pick<Design, "maker" | "houseLine">) {
  return design.houseLine
    ? `${design.maker} · House line`
    : `${design.maker} · Partner brand`;
}

export function designStoryBeats(design: Design): StoryBeat[] {
  if (design.beats?.length) return design.beats;

  return [
    {
      id: `${design.id}_look`,
      label: "The look",
      title: design.title,
      copy: design.summary,
    },
    {
      id: `${design.id}_maker`,
      label: "The maker",
      title: design.maker,
      copy: design.houseLine
        ? "NikkiNind house line — designed and woven for our own shelves."
        : `Partner handloom from ${design.maker}, curated and sold by NikkiNind.`,
    },
    {
      id: `${design.id}_craft`,
      label: "The craft",
      title: "Handloom, thread by thread.",
      copy: design.detail,
    },
    {
      id: `${design.id}_loom`,
      label: "The loom",
      title: design.loom,
      copy: design.origin,
    },
  ];
}
