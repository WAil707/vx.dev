# vx.dev — SaaS starter scaffold (Postgres + Stripe + OAuth + Magic Link)

This branch contains a scaffold to convert the starter to Postgres with Prisma, add Stripe billing stubs, and include GitHub + Google OAuth plus email magic-link sign-in.

Quick overview
- Postgres via docker-compose for local dev
- Prisma schema + client
- NextAuth-based auth (GitHub, Google, Email/magic-link)
- Stripe webhook handler stub for subscription events
- .env.example with required environment variables

Getting started (local)
1. Copy .env.example -> .env and fill in provider keys.
2. Start Postgres: docker-compose up -d
3. Install dependencies (root / apps): e.g. pnpm install
4. Generate Prisma client and run migrations:
   - pnpm --filter api prisma generate
   - pnpm --filter api prisma migrate dev --name init
5. Start dev servers (web/admin/api): pnpm dev (see package scripts)
6. Use ngrok (or similar) to expose webhook endpoint to Stripe for webhooks.

Stripe webhook notes
- Configure webhook endpoint to point to /api/webhooks/stripe
- Set STRIPE_WEBHOOK_SECRET in .env

Environment variables
- See .env.example

Files added (high level)
- docker-compose.yml
- .env.example
- prisma/schema.prisma
- apps/api/pages/api/auth/[...nextauth].ts (NextAuth config)
- apps/api/pages/api/webhooks/stripe.ts (stripe webhook stub)
- README.md (this file)

Next steps
- Provide provider keys (GitHub, Google) and Stripe keys in .env
- Run prisma migrate to create DB tables
- Test OAuth & magic-link locally
