"use client";

import { FormEvent, useEffect, useMemo, useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { Loader2, LogOut, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { designHref } from "@/lib/designs";
import type { ContentStore, Design, UpdatePost } from "@/lib/types";

const emptyDesign = {
  title: "",
  collection: "",
  category: "Handloom Bedsheet",
  loom: "",
  origin: "",
  summary: "",
  detail: "",
  accent: "#C5D5A8",
  palette: "#07110E, #C5D5A8, #EDF2EF",
  image: "",
  featured: false,
};

const emptyUpdate = {
  title: "",
  body: "",
  tag: "Drop",
};

export function StudioApp() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [content, setContent] = useState<ContentStore | null>(null);
  const [designForm, setDesignForm] = useState(emptyDesign);
  const [editingDesignId, setEditingDesignId] = useState<string | null>(null);
  const [updateForm, setUpdateForm] = useState(emptyUpdate);
  const [editingUpdateId, setEditingUpdateId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [pending, startTransition] = useTransition();

  async function refresh() {
    const res = await fetch("/api/content", { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to load content");
    const data = (await res.json()) as ContentStore;
    setContent(data);
  }

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const session = await fetch("/api/auth/session", { cache: "no-store" });
        const { authenticated: ok } = (await session.json()) as {
          authenticated: boolean;
        };
        if (cancelled) return;
        setAuthenticated(ok);
        if (ok) await refresh();
      } catch {
        if (!cancelled) setAuthenticated(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const sortedDesigns = useMemo(
    () =>
      content
        ? [...content.designs].sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          )
        : [],
    [content],
  );

  const sortedUpdates = useMemo(
    () =>
      content
        ? [...content.updates].sort(
            (a, b) =>
              new Date(b.publishedAt).getTime() -
              new Date(a.publishedAt).getTime(),
          )
        : [],
    [content],
  );

  function onLogin(event: FormEvent) {
    event.preventDefault();
    setLoginError("");
    startTransition(async () => {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        setLoginError("Wrong password. Try again.");
        return;
      }
      setAuthenticated(true);
      setPassword("");
      await refresh();
      setMessage("Welcome to Studio.");
    });
  }

  function onLogout() {
    startTransition(async () => {
      await fetch("/api/auth/logout", { method: "POST" });
      setAuthenticated(false);
      setContent(null);
      setMessage("");
    });
  }

  function startEditDesign(design: Design) {
    setEditingDesignId(design.id);
    setDesignForm({
      title: design.title,
      collection: design.collection,
      category: design.category,
      loom: design.loom,
      origin: design.origin,
      summary: design.summary,
      detail: design.detail,
      accent: design.accent,
      palette: design.palette.join(", "),
      image: design.image,
      featured: design.featured,
    });
  }

  function resetDesignForm() {
    setEditingDesignId(null);
    setDesignForm(emptyDesign);
  }

  function saveDesign(event: FormEvent) {
    event.preventDefault();
    startTransition(async () => {
      const palette = designForm.palette
        .split(",")
        .map((p) => p.trim())
        .filter(Boolean);
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "design",
          payload: {
            id: editingDesignId ?? undefined,
            title: designForm.title,
            collection: designForm.collection,
            category: designForm.category,
            loom: designForm.loom,
            origin: designForm.origin,
            summary: designForm.summary,
            detail: designForm.detail,
            accent: designForm.accent,
            palette,
            image: designForm.image,
            featured: designForm.featured,
          },
        }),
      });
      if (!res.ok) {
        setMessage("Could not save design.");
        return;
      }
      resetDesignForm();
      await refresh();
      setMessage(editingDesignId ? "Design updated." : "Design published.");
    });
  }

  function removeDesign(id: string) {
    startTransition(async () => {
      const res = await fetch(`/api/content?type=design&id=${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        setMessage("Could not delete design.");
        return;
      }
      if (editingDesignId === id) resetDesignForm();
      await refresh();
      setMessage("Design removed.");
    });
  }

  function startEditUpdate(update: UpdatePost) {
    setEditingUpdateId(update.id);
    setUpdateForm({
      title: update.title,
      body: update.body,
      tag: update.tag,
    });
  }

  function resetUpdateForm() {
    setEditingUpdateId(null);
    setUpdateForm(emptyUpdate);
  }

  function saveUpdate(event: FormEvent) {
    event.preventDefault();
    startTransition(async () => {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "update",
          payload: {
            id: editingUpdateId ?? undefined,
            title: updateForm.title,
            body: updateForm.body,
            tag: updateForm.tag,
          },
        }),
      });
      if (!res.ok) {
        setMessage("Could not save update.");
        return;
      }
      resetUpdateForm();
      await refresh();
      setMessage(editingUpdateId ? "Update saved." : "Update published.");
    });
  }

  function removeUpdate(id: string) {
    startTransition(async () => {
      const res = await fetch(`/api/content?type=update&id=${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        setMessage("Could not delete update.");
        return;
      }
      if (editingUpdateId === id) resetUpdateForm();
      await refresh();
      setMessage("Update removed.");
    });
  }

  if (authenticated === null) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-mist/60">
        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
        Loading Studio…
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-5">
        <p className="text-xs uppercase tracking-[0.28em] text-matcha/80">
          Studio access
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold text-mist">
          Enter the loom room.
        </h1>
        <p className="mt-3 text-sm text-mist/60">
          Password-protected dashboard for publishing new designs and journal
          updates. Set{" "}
          <code className="text-matcha">NIKKININD_STUDIO_PASSWORD</code> in
          your environment to unlock Studio.
        </p>
        <form onSubmit={onLogin} className="mt-8 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">Studio password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="bg-white/5"
              required
            />
          </div>
          {loginError ? (
            <p className="text-sm text-red-300">{loginError}</p>
          ) : null}
          <Button type="submit" disabled={pending} className="w-full">
            {pending ? "Checking…" : "Unlock Studio"}
          </Button>
        </form>
        <Link href="/" className="mt-6 text-sm text-mist/50 hover:text-matcha">
          ← Back to site
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-5 pb-20 pt-10 md:px-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-matcha/80">
            Studio dashboard
          </p>
          <h1 className="mt-2 font-display text-4xl font-bold text-mist md:text-5xl">
            Publish handloom weaves
          </h1>
          <p className="mt-2 max-w-xl text-sm text-mist/60">
            Each weave gets its own page at /handloom/[slug]. Handloom only —
            image URL + craft notes for now.
          </p>
        </div>
          <div className="flex items-center gap-2">
          <Link
            href="/"
            className="inline-flex h-8 items-center rounded-lg border border-border bg-background px-3 text-sm hover:bg-muted"
          >
            View site
          </Link>
          <Button variant="secondary" onClick={onLogout} disabled={pending}>
            <LogOut className="h-4 w-4" />
            Log out
          </Button>
        </div>
      </div>

      {message ? (
        <p className="mt-6 rounded-xl border border-matcha/30 bg-matcha/10 px-4 py-3 text-sm text-matcha">
          {message}
        </p>
      ) : null}

      <Tabs defaultValue="designs" className="mt-10">
        <TabsList className="bg-white/5">
          <TabsTrigger value="designs">Designs</TabsTrigger>
          <TabsTrigger value="updates">Updates</TabsTrigger>
        </TabsList>

        <TabsContent value="designs" className="mt-6 space-y-8">
          <form
            onSubmit={saveDesign}
            className="grid gap-4 rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6 md:grid-cols-2"
          >
            <div className="md:col-span-2 flex items-center justify-between">
              <h2 className="font-display text-xl font-semibold text-mist">
                {editingDesignId ? "Edit design" : "New design"}
              </h2>
              {editingDesignId ? (
                <Button type="button" variant="ghost" onClick={resetDesignForm}>
                  Cancel edit
                </Button>
              ) : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={designForm.title}
                onChange={(e) =>
                  setDesignForm((f) => ({ ...f, title: e.target.value }))
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="collection">Collection</Label>
              <Input
                id="collection"
                value={designForm.collection}
                onChange={(e) =>
                  setDesignForm((f) => ({ ...f, collection: e.target.value }))
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={designForm.category}
                onChange={(e) =>
                  setDesignForm((f) => ({ ...f, category: e.target.value }))
                }
                placeholder="Handloom Bedsheet"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="accent">Accent color</Label>
              <Input
                id="accent"
                value={designForm.accent}
                onChange={(e) =>
                  setDesignForm((f) => ({ ...f, accent: e.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="loom">Loom</Label>
              <Input
                id="loom"
                value={designForm.loom}
                onChange={(e) =>
                  setDesignForm((f) => ({ ...f, loom: e.target.value }))
                }
                placeholder="Pit loom"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="origin">Origin / craft note</Label>
              <Input
                id="origin"
                value={designForm.origin}
                onChange={(e) =>
                  setDesignForm((f) => ({ ...f, origin: e.target.value }))
                }
                placeholder="Handwoven in Karur"
                required
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                value={designForm.image}
                onChange={(e) =>
                  setDesignForm((f) => ({ ...f, image: e.target.value }))
                }
                placeholder="https://images.unsplash.com/..."
                required
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="palette">Palette (comma-separated hex)</Label>
              <Input
                id="palette"
                value={designForm.palette}
                onChange={(e) =>
                  setDesignForm((f) => ({ ...f, palette: e.target.value }))
                }
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="summary">Summary</Label>
              <Textarea
                id="summary"
                value={designForm.summary}
                onChange={(e) =>
                  setDesignForm((f) => ({ ...f, summary: e.target.value }))
                }
                required
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="detail">Detail</Label>
              <Textarea
                id="detail"
                value={designForm.detail}
                onChange={(e) =>
                  setDesignForm((f) => ({ ...f, detail: e.target.value }))
                }
                required
              />
            </div>
            <label className="flex items-center gap-2 text-sm text-mist/70 md:col-span-2">
              <input
                type="checkbox"
                checked={designForm.featured}
                onChange={(e) =>
                  setDesignForm((f) => ({ ...f, featured: e.target.checked }))
                }
                className="size-4 rounded border-white/20 bg-transparent"
              />
              Feature on homepage story
            </label>
            <div className="md:col-span-2">
              <Button type="submit" disabled={pending}>
                <Plus className="h-4 w-4" />
                {editingDesignId ? "Save changes" : "Publish design"}
              </Button>
            </div>
          </form>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sortedDesigns.map((design) => (
              <article
                key={design.id}
                className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={design.image}
                    alt={design.title}
                    fill
                    className="object-cover"
                    sizes="300px"
                  />
                </div>
                <div className="space-y-3 p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs text-matcha">{design.collection}</p>
                      <h3 className="font-display text-lg font-semibold text-mist">
                        {design.title}
                      </h3>
                    </div>
                    {design.featured ? <Badge>Featured</Badge> : null}
                  </div>
                  <p className="line-clamp-2 text-sm text-mist/55">
                    {design.summary}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => startEditDesign(design)}
                    >
                      Edit
                    </Button>
                    <Link
                      href={designHref(design)}
                      className="inline-flex h-7 items-center rounded-lg border border-border px-2.5 text-[0.8rem] hover:bg-muted"
                    >
                      Open page
                    </Link>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => removeDesign(design.id)}
                      disabled={pending}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Delete
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="updates" className="mt-6 space-y-8">
          <form
            onSubmit={saveUpdate}
            className="space-y-4 rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-semibold text-mist">
                {editingUpdateId ? "Edit update" : "New journal update"}
              </h2>
              {editingUpdateId ? (
                <Button type="button" variant="ghost" onClick={resetUpdateForm}>
                  Cancel edit
                </Button>
              ) : null}
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="update-title">Title</Label>
                <Input
                  id="update-title"
                  value={updateForm.title}
                  onChange={(e) =>
                    setUpdateForm((f) => ({ ...f, title: e.target.value }))
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="update-tag">Tag</Label>
                <Input
                  id="update-tag"
                  value={updateForm.tag}
                  onChange={(e) =>
                    setUpdateForm((f) => ({ ...f, tag: e.target.value }))
                  }
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="update-body">Body</Label>
              <Textarea
                id="update-body"
                value={updateForm.body}
                onChange={(e) =>
                  setUpdateForm((f) => ({ ...f, body: e.target.value }))
                }
                required
                rows={5}
              />
            </div>
            <Button type="submit" disabled={pending}>
              <Plus className="h-4 w-4" />
              {editingUpdateId ? "Save update" : "Publish update"}
            </Button>
          </form>

          <div className="space-y-4">
            {sortedUpdates.map((update) => (
              <article
                key={update.id}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary">{update.tag}</Badge>
                  <time className="text-xs text-mist/40">
                    {new Date(update.publishedAt).toLocaleDateString("en-IN", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      timeZone: "Asia/Calcutta",
                    })}
                  </time>
                </div>
                <h3 className="mt-3 font-display text-xl font-semibold text-mist">
                  {update.title}
                </h3>
                <p className="mt-2 text-sm text-mist/60">{update.body}</p>
                <div className="mt-4 flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => startEditUpdate(update)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => removeUpdate(update.id)}
                    disabled={pending}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Delete
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
