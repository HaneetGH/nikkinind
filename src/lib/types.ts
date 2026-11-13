export type Design = {
  id: string;
  slug: string;
  title: string;
  /** Label of the textile brand — NikkiNind for house line, or a partner brand. */
  maker: string;
  /** true when NikkiNind is the maker; false for curated partner brands. */
  houseLine: boolean;
  collection: string;
  category: string;
  summary: string;
  detail: string;
  loom: string;
  origin: string;
  palette: string[];
  accent: string;
  image: string;
  featured: boolean;
  createdAt: string;
  beats?: StoryBeat[];
};

export type UpdatePost = {
  id: string;
  title: string;
  body: string;
  tag: string;
  publishedAt: string;
};

export type StoryBeat = {
  id: string;
  label: string;
  title: string;
  copy: string;
};

export type SiteInfo = {
  brand: string;
  tagline: string;
  subtitle: string;
};

export type ContentStore = {
  site: SiteInfo;
  designs: Design[];
  updates: UpdatePost[];
};

export type DesignInput = Omit<Design, "id" | "createdAt" | "slug"> & {
  id?: string;
  slug?: string;
  createdAt?: string;
};

export type UpdateInput = Omit<UpdatePost, "id" | "publishedAt"> & {
  id?: string;
  publishedAt?: string;
};
