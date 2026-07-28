# SkillSwap — Work-Barter Marketplace (UI Reference Build)

A premium, mobile-first UI for a **subscription-based work-barter platform**: members pay
₹1,199/month, receive 10,000 credits per billing cycle, and hire each other using
closed-loop platform credits — never cash. This repository is the **complete visual and
interaction reference** intended to be handed to an app builder (e.g. Emergent) or a
development team to implement against the full backend architecture documented below.

> **Product name is configurable** — see `src/lib/config.ts` (`PRODUCT.name`). All pricing,
> credit-pack quantities and GST rates live there too, mirroring the admin-configurable
> `platform_settings` table in production.

---

## Running the UI

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (all routes prerender statically)
```

No environment variables are required for the UI reference build. All data is clearly
labelled demo data in `src/lib/data.ts`.

## Page map (what's built)

| Route | Page | Key flows shown |
|---|---|---|
| `/` | Homepage | Hero + search, live "Grab a New Job" feed, stats, categories, featured services, Top 10, membership CTA, credit-policy wording |
| `/jobs` | Job feed | Working keyword/category/mode/type/credit-range/verified filters, 6 sort orders, empty state, job alerts panel |
| `/jobs/[id]` | Job detail | "Grab This Job for N Credits" → proposal modal (pitch, delivery, quote), escrow explainer, save/share, similar jobs |
| `/services` | Service marketplace | Cards with packages, ratings, Sponsored/Top Rated badges |
| `/services/[id]` | Service detail | Package picker → escrow confirmation → **insufficient-balance → Buy More Credits** flow |
| `/dashboard` | Member dashboard | Balance strip (available/escrow/earned/monthly), needs-attention queue, recommendations, performance score, subscription card |
| `/wallet` | Wallet & ledger | Credit-source breakdown (subscription/earned/purchased/promotional), credit packs with GST math, immutable double-entry ledger table |
| `/workroom` | Workroom | Live chat with **cash-solicitation detection & warning**, milestones with per-milestone escrow release, deliverables, contract summary |
| `/leaderboard` | Top 10 | Podium + ranked list, transparent weighted-algorithm explanation, period/category tabs |
| `/members/[id]` | Public profile | Trust stats (rating, jobs, on-time, dispute rate, credits earned), reviews, badges — spendable balance never shown |
| `/onboarding` | 5-step wizard | Account → profile types → what you offer → what you need → subscription checkout with GST breakdown |
| `/pricing` | Pricing | Membership, lapse policy, credit packs (`10k/₹1,199 · 20k/₹2,398 · 30k/₹3,597` + GST), legal wording |
| `/advertise` | Advertiser flow | Placements, ₹5,000 + GST campaign form with GSTIN, "Sponsored" labelling rules |
| `/admin` | Admin panel | KPIs, dispute queue, fraud flags (human review), credit adjustment with mandatory reason, platform config |
| `/policies` | Legal | Barter Credit Policy, Community Guidelines, Dispute/Refund policies |

Design system: `tailwind.config.ts` + `src/app/globals.css` — deep-navy ink, electric
violet `#7C4DFF`, coral `#FF5C1F`, Inter variable font, dark-mode-ready CSS variables,
skeleton/empty/confirmation states, accessible focus rings.

---

## Target production architecture

**Stack**: Next.js (App Router, TypeScript) · Tailwind + this design system · PostgreSQL ·
Prisma · Supabase (auth, storage, realtime) · Razorpay (subscriptions, credit packs, ads;
webhook + signature verification) · Zod validation · S3-compatible storage · transactional
email abstraction · rate limiting · structured logging.

### Token economy rules (non-negotiable)

- **Double-entry ledger** — never a bare editable balance column. Every entry: id, user,
  type, credit, debit, balance-after, job/escrow/counterparty refs, timestamp, status,
  reason, admin notes.
- Transaction types: monthly allocation, escrow deposit/release/refund, job earning,
  dispute hold/release, admin adjustment (reason required), promotional credit, reversal,
  expired promo, **credit-pack purchase** (differentiated from earned/subscription/promo).
- Allocation only after verified payment; webhook retries are idempotent (unique
  `payment_id` constraint) — never double-allocate.
- Escrow locks at hire; releases atomically on approval/auto-approval/dispute resolution.
- Balances can never go negative; releases can never execute twice (state machine +
  idempotency keys). Refund-after-spend freezes the account for admin review.
- No member↔member transfers, no withdrawal, no cash value. Members' money only buys
  membership, approved credit packs and advertising — each with GST invoices.
- Subscription lapse: balance visible but unspendable, active contracts/disputes remain
  accessible, earned credits never erased (admin-configurable).

### Database model (normalised, minimum set)

`users` · `profiles` · `roles` / `user_roles` · `skills` / `profile_skills` ·
`categories` / `category_fields` (dynamic per-category attributes) · `locations` ·
`social_links` · `portfolios` · `verification_records` · `subscription_plans` ·
`subscriptions` · `payments` · `invoices` (GST) · `token_accounts` ·
`token_ledger_entries` · `escrow_accounts` · `jobs` · `job_field_values` · `services` ·
`service_packages` · `applications` / `proposals` · `contracts` · `milestones` ·
`deliverables` · `messages` · `attachments` · `reviews` · `rankings` · `saved_listings` ·
`notifications` · `disputes` · `reports` · `advertisements` · `ad_payments` · `coupons` ·
`referrals` · `moderation_actions` · `fraud_flags` · `audit_logs` · `platform_settings`.

### Job feed ordering (as implemented in the UI)

1. Newly posted verified jobs → 2. newly posted standard jobs → 3. urgent jobs →
4. recommended (skills + location) → 5. other active. Newest first within each section.
Sorts: newest, best match, highest credits, lowest competition, urgent, nearest, fastest,
ending soon. Job statuses: Open / Almost filled / In discussion / Assigned / Closed /
Expired — applications close instantly at provider limit. Urgent-badge usage is
admin-limited.

### Trust & safety

Ranking = weighted (completed jobs, verified reviews, rating, on-time %, repeat clients,
response rate, dispute rate, recency, quality, fraud risk) — **never credits held, never
sponsorship**. Fraud signals (multi-accounts, self-hiring, circular trades, fake reviews,
device/IP overlap, referral abuse, cash solicitation) are *flagged for human review*, not
auto-banned. Workrooms run configurable cash-payment detection (see
`src/app/workroom/WorkroomView.tsx` for the client-side mirror of the pattern).

### Legal positioning (use verbatim)

> "Credits are closed-loop platform credits used to request eligible services on the
> platform. Members may receive credits through membership, purchase approved credit packs
> or earn credits by completing work. Credits cannot be withdrawn, redeemed for cash, sold
> directly, gifted or transferred outside a legitimate platform contract."

Never market credits as cryptocurrency, investment, stored money or an appreciating
asset. Have the final model reviewed by an Indian lawyer and tax professional (GST on
barter, service invoices, consumer protection).

---

## What still needs real credentials / backend work

- Supabase project (auth incl. Google/LinkedIn OAuth, Postgres, storage, realtime)
- Razorpay keys + webhook secret (subscriptions, credit packs, advertising; GST invoices)
- Transactional email provider; OTP/SMS provider; WhatsApp provider (opt-in)
- Prisma schema + migrations + seed for the model above; automated tests for the
  ledger/escrow/webhook acceptance criteria listed in the product brief

The UI in this repo is the contract for how all of that should look and behave.
