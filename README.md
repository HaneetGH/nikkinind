# NikkiNind

Handloom house site. **NikkiNind** sells our own weaves **and** curated handloom from partner brands. Each piece lives on its own page with an Apple-style bed/blanket scroll story.

No ecommerce yet. **Studio** is a password-protected dashboard for publishing house and partner designs plus journal updates.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS + shadcn/ui
- Framer Motion (per-weave sticky bed/blanket reveal)

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
2. Sign in with `NIKKININD_STUDIO_PASSWORD`
3. Publish a house or partner weave — it gets `/handloom/[slug]` with maker credit

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Brand hub + links into every weave |
| `/handloom` | Full catalog (house + partners) |
| `/handloom/[slug]` | Individual weave page |
| `/collections` | Alias of the handloom catalog |
| `/journal` | Studio updates |
| `/studio` | Admin dashboard |
