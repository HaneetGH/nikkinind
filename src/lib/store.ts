import { promises as fs } from "fs";
import path from "path";
import { nanoid } from "nanoid";
import { connection } from "next/server";
import { slugify } from "@/lib/designs";
import type {
  ContentStore,
  Design,
  DesignInput,
  UpdateInput,
  UpdatePost,
} from "@/lib/types";
import seed from "../../data/content.json";

const DATA_PATH = path.join(process.cwd(), "data", "content.json");

let memoryCache: ContentStore | null = null;

function cloneSeed(): ContentStore {
  return structuredClone(seed as ContentStore);
}

function uniqueSlug(base: string, designs: Design[], ignoreId?: string) {
  let slug = slugify(base) || `weave-${nanoid(6)}`;
  let n = 2;
  while (designs.some((d) => d.slug === slug && d.id !== ignoreId)) {
    slug = `${slugify(base)}-${n}`;
    n += 1;
  }
  return slug;
}

async function readFromDisk(): Promise<ContentStore | null> {
  try {
    const raw = await fs.readFile(DATA_PATH, "utf8");
    return JSON.parse(raw) as ContentStore;
  } catch {
    return null;
  }
}

async function writeToDisk(data: ContentStore): Promise<boolean> {
  try {
    await fs.mkdir(path.dirname(DATA_PATH), { recursive: true });
    await fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2), "utf8");
    return true;
  } catch {
    return false;
  }
}

export async function getContent(): Promise<ContentStore> {
  await connection();
  if (memoryCache) return structuredClone(memoryCache);
  const disk = await readFromDisk();
  memoryCache = disk ?? cloneSeed();
  return structuredClone(memoryCache);
}

export async function getDesignBySlug(slug: string): Promise<Design | null> {
  const content = await getContent();
  return content.designs.find((d) => d.slug === slug) ?? null;
}

async function persist(next: ContentStore): Promise<ContentStore> {
  memoryCache = next;
  await writeToDisk(next);
  return structuredClone(next);
}

export async function upsertDesign(input: DesignInput): Promise<Design> {
  const content = await getContent();
  const now = new Date().toISOString();

  if (input.id) {
    const idx = content.designs.findIndex((d) => d.id === input.id);
    if (idx === -1) throw new Error("Design not found");
    const existing = content.designs[idx];
    const slug = uniqueSlug(
      input.slug || input.title || existing.title,
      content.designs,
      input.id,
    );
    const updated: Design = {
      ...existing,
      ...input,
      id: input.id,
      slug,
      createdAt: existing.createdAt,
      loom: input.loom || existing.loom,
      origin: input.origin || existing.origin,
      palette: input.palette?.length ? input.palette : existing.palette,
      category: input.category || existing.category || "Handloom Bedsheet",
    };
    content.designs[idx] = updated;
    await persist(content);
    return updated;
  }

  const created: Design = {
    id: `dsgn_${nanoid(8)}`,
    slug: uniqueSlug(input.slug || input.title, content.designs),
    title: input.title,
    collection: input.collection,
    category: input.category || "Handloom Bedsheet",
    summary: input.summary,
    detail: input.detail,
    loom: input.loom || "Handloom",
    origin: input.origin || "Handwoven in small batches.",
    palette: input.palette?.length ? input.palette : ["#0B1210", "#C9D4C6"],
    accent: input.accent || "#C9D4C6",
    image: input.image,
    featured: Boolean(input.featured),
    createdAt: now,
  };
  content.designs.unshift(created);
  await persist(content);
  return created;
}

export async function deleteDesign(id: string): Promise<void> {
  const content = await getContent();
  content.designs = content.designs.filter((d) => d.id !== id);
  await persist(content);
}

export async function upsertUpdate(input: UpdateInput): Promise<UpdatePost> {
  const content = await getContent();
  const now = new Date().toISOString();

  if (input.id) {
    const idx = content.updates.findIndex((u) => u.id === input.id);
    if (idx === -1) throw new Error("Update not found");
    const updated: UpdatePost = {
      ...content.updates[idx],
      ...input,
      id: input.id,
      publishedAt: content.updates[idx].publishedAt,
    };
    content.updates[idx] = updated;
    await persist(content);
    return updated;
  }

  const created: UpdatePost = {
    id: `upd_${nanoid(8)}`,
    title: input.title,
    body: input.body,
    tag: input.tag,
    publishedAt: now,
  };
  content.updates.unshift(created);
  await persist(content);
  return created;
}

export async function deleteUpdate(id: string): Promise<void> {
  const content = await getContent();
  content.updates = content.updates.filter((u) => u.id !== id);
  await persist(content);
}
