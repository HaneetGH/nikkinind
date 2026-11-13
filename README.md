# NikkiNind

Handloom-only brand site. Each weave lives on its own page with an Apple-style scroll story.

No ecommerce yet. **Studio** is a password-protected dashboard for publishing new handloom designs and journal updates.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS + shadcn/ui
- Framer Motion (per-weave sticky product story)

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
3. Publish a handloom weave — it gets `/handloom/[slug]` automatically

Required env vars:

```bash
NIKKININD_STUDIO_PASSWORD=your-secret
NIKKININD_SESSION_SECRET=long-random-string
```

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Brand hub + links into every handloom piece |
| `/handloom` | Full handloom index |
| `/handloom/[slug]` | Individual weave page (scroll story + loom notes) |
| `/journal` | Studio updates |
| `/studio` | Admin dashboard |
