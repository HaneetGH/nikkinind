# NikkiNind

A high-end handloom comfort & decor brand site — soft architecture for modern homes.

No ecommerce yet. The public site tells the product story with Apple-style scroll animation; **Studio** is a password-protected dashboard for publishing new designs and journal updates.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS + shadcn/ui
- Framer Motion (sticky product story + horizontal gallery)

## Run locally

```bash
npm install
cp .env.example .env.local
# Set NIKKININD_STUDIO_PASSWORD and NIKKININD_SESSION_SECRET in .env.local
npm run dev
```

Open [http://localhost:4317](http://localhost:4317).

### Studio dashboard

1. Go to `/studio`
2. Sign in with the password from `NIKKININD_STUDIO_PASSWORD`
3. Add or edit designs (image URL + copy) and journal updates

Required env vars:

```bash
NIKKININD_STUDIO_PASSWORD=your-secret
NIKKININD_SESSION_SECRET=long-random-string
```

Content is stored in `data/content.json` (with an in-memory fallback if the filesystem is read-only).

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Hero, Apple-style product scroll story, sliding gallery, journal preview |
| `/collections` | Full design grid |
| `/journal` | Studio updates |
| `/studio` | Admin dashboard |
