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
    {
      id: `${design.id}_palette`,
      label: "The palette",
      title: design.collection,
      copy: `Woven in ${design.palette.join(", ")} — a handloom palette made for real bedrooms.`,
    },
  ];
}
