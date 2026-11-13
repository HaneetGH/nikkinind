import { promises as fs } from "fs";
import path from "path";
import { nanoid } from "nanoid";
import { connection } from "next/server";
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
  // Studio edits must show on the live site — read at request time.
  await connection();
  if (memoryCache) return structuredClone(memoryCache);
  const disk = await readFromDisk();
  memoryCache = disk ?? cloneSeed();
  return structuredClone(memoryCache);
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
    const updated: Design = {
      ...content.designs[idx],
      ...input,
      id: input.id,
      createdAt: content.designs[idx].createdAt,
      palette: input.palette?.length ? input.palette : content.designs[idx].palette,
    };
    content.designs[idx] = updated;
    await persist(content);
    return updated;
  }

  const created: Design = {
    id: `dsgn_${nanoid(8)}`,
    title: input.title,
    collection: input.collection,
    category: input.category,
    summary: input.summary,
    detail: input.detail,
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
