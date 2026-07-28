import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import JobCard from "@/components/JobCard";
import ServiceCard from "@/components/ServiceCard";
import {
  Avatar,
  CreditAmount,
  CreditIcon,
  SectionHeading,
  Stars,
  VerifiedBadge,
} from "@/components/ui";
import { categories, jobs, members, services } from "@/lib/data";
import { PRODUCT, inr, num } from "@/lib/config";

export default function Home() {
  const liveJobs = jobs.filter((j) => j.status === "Open").slice(0, 6);
  const topMembers = [...members].sort((a, b) => b.rating - a.rating).slice(0, 4);

  return (
    <>
      <Nav />
      <main>
        {/* ============ HERO ============ */}
        <section className="gradient-hero">
          <div className="container-page grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.1fr_1fr] lg:py-24">
            <div>
              <p className="chip mb-5 bg-white text-violet-700 shadow-card">
                <span className="h-2 w-2 rounded-full bg-mint-500 animate-pulse-dot" />
                2,300+ jobs completed this month with zero cash exchanged
              </p>
              <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-[3.4rem] text-balance">
                Get work done by sharing{" "}
                <span className="gradient-brand-text">what you do best.</span>
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
                {PRODUCT.name} is India&apos;s work-barter marketplace. Earn
                credits by helping other members — then spend them on design,
                development, marketing, editing, accounting and more.{" "}
                <strong className="text-ink">Use your skills instead of cash.</strong>
              </p>

              {/* Search */}
              <form action="/jobs" className="mt-8 flex max-w-xl gap-2 rounded-2xl border border-surface-line bg-white p-2 shadow-card">
                <svg className="ml-3 self-center text-ink-faint" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" />
                </svg>
                <input
                  name="q"
                  className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink-faint"
                  placeholder="Try “video editing”, “landing page”, “Instagram promotion”…"
                  aria-label="Search jobs and services"
                />
                <button className="btn-primary btn-md whitespace-nowrap">Search</button>
              </form>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link href="/jobs" className="btn-coral btn-lg">
                  Grab a New Job
                </Link>
                <Link href="/onboarding" className="btn-secondary btn-lg">
                  Offer a Service
                </Link>
              </div>

              <p className="mt-6 flex items-center gap-2 text-sm text-ink-faint">
                <CreditIcon size={16} />
                {inr(PRODUCT.subscription.priceInr)}/month membership ·{" "}
                {num(PRODUCT.subscription.creditsPerCycle)} credits every cycle · Cancel anytime
              </p>
            </div>

            {/* Hero visual: live escrow card stack */}
            <div className="relative mx-auto w-full max-w-md">
              <div className="card p-5 shadow-pop">
                <div className="mb-4 flex items-center justify-between">
                  <span className="chip bg-mint-100 text-mint-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-mint-500 animate-pulse-dot" />
                    Live · escrow protected
                  </span>
                  <CreditAmount amount={15000} size="md" />
                </div>
                <h3 className="mb-1 font-bold text-ink">Build a landing page for a fintech startup</h3>
                <p className="mb-4 text-sm text-ink-soft">Next.js · Remote · Due in 7 days</p>
                <div className="mb-4 rounded-xl bg-surface-soft p-3.5">
                  <div className="mb-2 flex justify-between text-xs font-semibold">
                    <span className="text-ink-soft">Credits held in escrow</span>
                    <span className="text-violet-700">15,000 / 15,000</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-pill bg-surface-line">
                    <div className="h-full w-full rounded-pill bg-gradient-to-r from-violet-500 to-coral-400" />
                  </div>
                  <p className="mt-2 text-[11px] text-ink-faint">
                    Your credits are safely held until the work is approved.
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar name="Rahul Menon" hue={205} size={34} ring />
                    <div>
                      <p className="flex items-center gap-1 text-xs font-bold text-ink">
                        Rahul Menon <VerifiedBadge size={13} />
                      </p>
                      <p className="text-[11px] text-ink-faint">Full-stack developer · Kochi</p>
                    </div>
                  </div>
                  <span className="btn-primary btn-sm">Approve work</span>
                </div>
              </div>

              <div className="card absolute -bottom-8 -left-6 hidden w-56 rotate-[-4deg] p-4 sm:block">
                <p className="mb-1 text-[11px] font-bold uppercase tracking-wide text-ink-faint">Credits released</p>
                <CreditAmount amount={8000} size="lg" />
                <p className="mt-1 text-xs text-mint-700">✓ Reel promotion approved</p>
              </div>
              <div className="card absolute -right-4 -top-7 hidden w-48 rotate-[4deg] p-4 sm:block">
                <p className="mb-1.5 text-[11px] font-bold uppercase tracking-wide text-ink-faint">You earned</p>
                <div className="flex items-center gap-2">
                  <Stars rating={4.9} />
                  <span className="text-xs text-ink-faint">· 87 reviews</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats bar */}
          <div className="border-y border-surface-line bg-white/70 backdrop-blur">
            <div className="container-page grid grid-cols-2 gap-6 py-6 text-center sm:grid-cols-4">
              {[
                ["12,400+", "Active members"],
                ["48.2M", "Credits in circulation"],
                ["9,100+", "Contracts completed"],
                ["4.8★", "Average job rating"],
              ].map(([v, l]) => (
                <div key={l}>
                  <p className="text-2xl font-extrabold text-ink">{v}</p>
                  <p className="text-xs font-medium text-ink-faint">{l}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ GRAB A NEW JOB ============ */}
        <section className="container-page py-16 sm:py-20">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow mb-2 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-coral-500 animate-pulse-dot" />
                Live feed · newest first
              </p>
              <h2 className="section-title">Grab a New Job</h2>
              <p className="mt-2 text-ink-soft">
                Fresh opportunities, posted minutes ago. Earn credits by helping others.
              </p>
            </div>
            <Link href="/jobs" className="btn-secondary btn-md">
              View all jobs →
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {liveJobs.map((j, i) => (
              <JobCard key={j.id} job={j} featured={i === 0} />
            ))}
          </div>
        </section>

        {/* ============ HOW IT WORKS ============ */}
        <section className="border-y border-surface-line bg-white py-16 sm:py-20">
          <div className="container-page">
            <SectionHeading
              center
              eyebrow="How it works"
              title="Cash never changes hands. Skills do."
              sub="A closed-loop credit economy with escrow at the centre of every job."
            />
            <div className="grid gap-6 md:grid-cols-4">
              {[
                { n: "1", icon: "🪪", t: "Join & subscribe", d: `${inr(PRODUCT.subscription.priceInr)}/month gets you ${num(PRODUCT.subscription.creditsPerCycle)} credits every billing cycle, added only after successful payment.` },
                { n: "2", icon: "📣", t: "Post or grab work", d: "Post what you need done, or grab jobs that match your skills. Every job has a clear credit value." },
                { n: "3", icon: "🔒", t: "Credits go to escrow", d: "When you hire, credits lock in escrow instantly. Your credits are safely held until the work is approved." },
                { n: "4", icon: "⚡", t: "Deliver & earn", d: "Approved work releases credits to the provider — atomically, with a full ledger trail. Spend them on your next need." },
              ].map((s) => (
                <div key={s.n} className="card card-hover relative p-6">
                  <span className="absolute right-5 top-5 text-4xl font-black text-surface-sunken">{s.n}</span>
                  <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 text-2xl">{s.icon}</span>
                  <h3 className="mb-2 font-bold text-ink">{s.t}</h3>
                  <p className="text-sm leading-relaxed text-ink-soft">{s.d}</p>
                </div>
              ))}
            </div>
            <p className="mx-auto mt-8 max-w-3xl rounded-2xl bg-surface-soft p-5 text-center text-sm leading-relaxed text-ink-soft">
              <strong className="text-ink">Credits are not money.</strong>{" "}
              {PRODUCT.legal.creditPolicy}
            </p>
          </div>
        </section>

        {/* ============ CATEGORIES ============ */}
        <section className="container-page py-16 sm:py-20">
          <SectionHeading
            eyebrow="Trending categories"
            title="Every skill has value here"
            sub="From code to camera work, consulting to local services."
          />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {categories.map((c) => (
              <Link
                key={c.name}
                href="/jobs"
                className="card card-hover group flex flex-col items-start gap-3 p-5"
              >
                <span className="text-3xl">{c.icon}</span>
                <div>
                  <p className="text-sm font-bold text-ink group-hover:text-violet-700">{c.name}</p>
                  <p className="text-xs text-ink-faint">{c.jobs} open jobs</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ============ FEATURED SERVICES ============ */}
        <section className="border-y border-surface-line bg-white py-16 sm:py-20">
          <div className="container-page">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <SectionHeading
                eyebrow="Featured services"
                title="Hire top talent with your credits"
                sub="Clear packages, fixed credit pricing, escrow-protected."
              />
              <Link href="/services" className="btn-secondary btn-md shrink-0">
                Browse all services →
              </Link>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {services.slice(0, 6).map((s) => (
                <ServiceCard key={s.id} service={s} />
              ))}
            </div>
          </div>
        </section>

        {/* ============ TOP MEMBERS ============ */}
        <section className="container-page py-16 sm:py-20">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Top members"
              title="This month's Top 10 achievers"
              sub="Ranked by completed jobs, verified reviews, on-time delivery and repeat clients — never by credits held."
            />
            <Link href="/leaderboard" className="btn-secondary btn-md shrink-0">
              Full leaderboard →
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {topMembers.map((m, i) => (
              <Link key={m.id} href={`/members/${m.id}`} className="card card-hover relative p-6 text-center">
                <span className="absolute left-4 top-4 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-gold-500 to-coral-500 text-xs font-black text-white">
                  #{i + 1}
                </span>
                <div className="mx-auto mb-3 w-fit">
                  <Avatar name={m.name} hue={m.avatarHue} size={64} ring />
                </div>
                <p className="flex items-center justify-center gap-1 font-bold text-ink">
                  {m.name} {m.verified && <VerifiedBadge />}
                </p>
                <p className="mb-3 mt-0.5 line-clamp-1 text-xs text-ink-faint">{m.headline}</p>
                <div className="flex items-center justify-center gap-3 text-xs">
                  <Stars rating={m.rating} />
                  <span className="text-ink-faint">{m.jobsDone} jobs</span>
                  <span className="text-ink-faint">{m.onTimePct}% on-time</span>
                </div>
                <span className="chip mt-4 bg-violet-50 text-violet-700">Top skill: {m.topSkill}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* ============ PRICING CTA ============ */}
        <section className="container-page pb-16 sm:pb-20">
          <div className="gradient-cta-panel relative overflow-hidden rounded-[2rem] px-6 py-14 text-center text-white sm:px-12 sm:py-16">
            <p className="chip mx-auto mb-5 bg-white/15 text-white backdrop-blur">
              Membership
            </p>
            <h2 className="mx-auto max-w-2xl text-3xl font-extrabold tracking-tight sm:text-4xl text-balance">
              {inr(PRODUCT.subscription.priceInr)}/month.{" "}
              {num(PRODUCT.subscription.creditsPerCycle)} credits. Unlimited possibility.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/85">
              Credits added after every successful payment. Earned credits stay in
              your wallet. Need more? Buy approved credit packs anytime. Cancel whenever you like.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href="/onboarding" className="btn btn-lg bg-white text-violet-800 hover:bg-violet-50 active:scale-[0.98]">
                Start your membership
              </Link>
              <Link href="/pricing" className="btn btn-lg border border-white/40 text-white hover:bg-white/10">
                See pricing & credit packs
              </Link>
            </div>
            <p className="mt-6 text-xs text-white/70">
              GST invoice included · Razorpay secure checkout · No cash exchange between members, ever
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
