import type { Metadata } from "next";
import Link from "next/link";
import MemberShell from "@/components/MemberShell";
import JobCard from "@/components/JobCard";
import { CreditAmount, Avatar, Stars } from "@/components/ui";
import { jobs, members } from "@/lib/data";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false },
};

const wallet = {
  available: 14_200,
  escrow: 15_000,
  earnedTotal: 38_500,
  monthlyAllocation: 10_000,
};

export default function DashboardPage() {
  const recommended = jobs.filter((j) => j.status === "Open").slice(0, 2);
  const providers = members.slice(0, 3);

  return (
    <MemberShell
      title="Good morning, Tarushikha 👋"
      sub="Here's what's happening in your barter economy today. (Demo data)"
    >
      {/* ---- Wallet strip ---- */}
      <section className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Credit balances">
        {[
          { label: "Available credits", value: wallet.available, accent: "text-ink", note: "Ready to spend" },
          { label: "Held in escrow", value: wallet.escrow, accent: "text-violet-700", note: "1 active contract" },
          { label: "Earned all-time", value: wallet.earnedTotal, accent: "text-mint-700", note: "From 12 completed jobs" },
          { label: "Monthly allocation", value: wallet.monthlyAllocation, accent: "text-ink", note: "Renews 12 Aug 2026" },
        ].map((c) => (
          <div key={c.label} className="card p-5">
            <p className="text-xs font-bold uppercase tracking-wide text-ink-faint">{c.label}</p>
            <div className={`mt-2 ${c.accent}`}>
              <CreditAmount amount={c.value} size="lg" />
            </div>
            <p className="mt-1 text-[11px] text-ink-faint">{c.note}</p>
          </div>
        ))}
      </section>

      <div className="mb-6 flex flex-wrap gap-3">
        <Link href="/jobs" className="btn-coral btn-md">Grab a New Job</Link>
        <Link href="/pricing#credit-packs" className="btn-primary btn-md">Buy More Credits</Link>
        <Link href="/onboarding" className="btn-secondary btn-md">Post a Job</Link>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <div className="space-y-6">
          {/* ---- Needs attention ---- */}
          <section className="card p-6">
            <h2 className="mb-4 text-lg font-bold text-ink">Needs your attention</h2>
            <ul className="space-y-3">
              {[
                { icon: "📦", text: "Rahul submitted the landing page deliverable", cta: "Review & approve", href: "/workroom", tone: "bg-violet-50" },
                { icon: "💬", text: "3 unread messages in “Product launch video”", cta: "Open workroom", href: "/workroom", tone: "bg-surface-soft" },
                { icon: "⭐", text: "Review pending for your completed reel promotion", cta: "Leave review", href: "/workroom", tone: "bg-surface-soft" },
              ].map((item) => (
                <li key={item.text} className={`flex flex-wrap items-center gap-3 rounded-xl p-3.5 ${item.tone}`}>
                  <span className="text-xl" aria-hidden>{item.icon}</span>
                  <p className="min-w-0 flex-1 text-sm font-medium text-ink">{item.text}</p>
                  <Link href={item.href} className="btn-primary btn-sm shrink-0">{item.cta}</Link>
                </li>
              ))}
            </ul>
          </section>

          {/* ---- Recommended jobs ---- */}
          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-ink">Recommended for your skills</h2>
              <Link href="/jobs" className="text-sm font-semibold text-violet-700 hover:underline">See all →</Link>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {recommended.map((j) => (
                <JobCard key={j.id} job={j} />
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-6">
          {/* ---- Performance ---- */}
          <section className="card p-6">
            <h2 className="mb-4 text-lg font-bold text-ink">Your performance</h2>
            <dl className="space-y-3.5 text-sm">
              {[
                ["Profile views (7 days)", "142", "+18%"],
                ["Proposal win rate", "38%", "+4%"],
                ["On-time delivery", "97%", "—"],
                ["Response time", "~1 hr", "—"],
              ].map(([k, v, d]) => (
                <div key={k} className="flex items-center justify-between">
                  <dt className="text-ink-faint">{k}</dt>
                  <dd className="flex items-center gap-2 font-bold text-ink">
                    {v}
                    {d !== "—" && <span className="chip bg-mint-100 text-mint-700">{d}</span>}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-5 rounded-xl bg-violet-50 p-4">
              <div className="mb-1.5 flex justify-between text-xs font-bold">
                <span className="text-violet-800">Performance score</span>
                <span className="text-violet-700">86 / 100</span>
              </div>
              <div className="h-2 overflow-hidden rounded-pill bg-white">
                <div className="h-full w-[86%] rounded-pill bg-gradient-to-r from-violet-500 to-coral-400" />
              </div>
              <p className="mt-2 text-[11px] text-violet-700/80">
                Complete 2 more on-time jobs to reach Top Rated status.
              </p>
            </div>
          </section>

          {/* ---- Subscription ---- */}
          <section className="card p-6">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-bold text-ink">Subscription</h2>
              <span className="chip bg-mint-100 text-mint-700">Active</span>
            </div>
            <p className="text-sm text-ink-soft">₹1,199/month · renews <strong className="text-ink">12 Aug 2026</strong></p>
            <p className="mt-1 text-xs text-ink-faint">Next allocation: 10,000 credits after successful payment.</p>
            <div className="mt-4 flex gap-2.5">
              <Link href="/pricing" className="btn-secondary btn-sm flex-1">Manage</Link>
              <Link href="/wallet" className="btn-ghost btn-sm flex-1">Invoices</Link>
            </div>
          </section>

          {/* ---- Providers for you ---- */}
          <section className="card p-6">
            <h2 className="mb-4 text-lg font-bold text-ink">Providers for your needs</h2>
            <ul className="space-y-4">
              {providers.map((p) => (
                <li key={p.id}>
                  <Link href={`/members/${p.id}`} className="flex items-center gap-3 rounded-xl p-2 transition hover:bg-surface-soft">
                    <Avatar name={p.name} hue={p.avatarHue} size={40} />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold text-ink">{p.name}</p>
                      <p className="truncate text-xs text-ink-faint">{p.headline}</p>
                    </div>
                    <Stars rating={p.rating} />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </MemberShell>
  );
}
