export type Design = {
  id: string;
  title: string;
  collection: string;
  category: string;
  summary: string;
  detail: string;
  palette: string[];
  accent: string;
  image: string;
  featured: boolean;
  createdAt: string;
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
  storyBeats: StoryBeat[];
};

export type DesignInput = Omit<Design, "id" | "createdAt"> & {
  id?: string;
  createdAt?: string;
};

export type UpdateInput = Omit<UpdatePost, "id" | "publishedAt"> & {
  id?: string;
  publishedAt?: string;
};
