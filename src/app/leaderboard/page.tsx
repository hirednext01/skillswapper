import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Avatar, Stars, VerifiedBadge } from "@/components/ui";
import { members } from "@/lib/data";

export const metadata: Metadata = {
  title: "Top Members — Leaderboards",
  description:
    "The Top 10 members in every skill and category, ranked by a transparent weighted algorithm — never by credits held.",
};

const ranked = [...members].sort(
  (a, b) =>
    b.rating * 20 + b.jobsDone * 0.4 + b.onTimePct - (a.rating * 20 + a.jobsDone * 0.4 + a.onTimePct)
);

const medal = ["🥇", "🥈", "🥉"];

export default function LeaderboardPage() {
  return (
    <>
      <Nav />
      <main className="container-page py-10">
        <div className="mb-8 text-center">
          <p className="eyebrow mb-2">Leaderboards</p>
          <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            This month&apos;s Top 10
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-ink-soft">
            Rankings use a transparent weighted score: completed jobs, verified
            reviews, on-time delivery, repeat clients, response rate and dispute
            rate. <strong className="text-ink">Credits held play no part</strong> — and sponsored
            placements never influence rankings.
          </p>
        </div>

        <div className="mb-6 flex flex-wrap justify-center gap-2">
          {["This month", "This week", "All-time"].map((t, i) => (
            <button key={t} className={`chip ${i === 0 ? "bg-ink text-white" : "bg-white text-ink-soft shadow-card"}`}>{t}</button>
          ))}
          <span className="mx-2 hidden w-px bg-surface-line sm:block" />
          {["All categories", "Developers", "Designers", "Influencers", "Video Editors", "Consultants"].map((t, i) => (
            <button key={t} className={`chip ${i === 0 ? "bg-violet-600 text-white" : "bg-white text-ink-soft shadow-card"}`}>{t}</button>
          ))}
        </div>

        {/* Podium */}
        <div className="mb-10 grid gap-4 sm:grid-cols-3">
          {ranked.slice(0, 3).map((m, i) => (
            <Link
              key={m.id}
              href={`/members/${m.id}`}
              className={`card card-hover p-6 text-center ${i === 0 ? "ring-2 ring-gold-500/60 sm:order-2 sm:-translate-y-2" : i === 1 ? "sm:order-1" : "sm:order-3"}`}
            >
              <span className="text-3xl" aria-hidden>{medal[i]}</span>
              <div className="mx-auto my-3 w-fit">
                <Avatar name={m.name} hue={m.avatarHue} size={72} ring />
              </div>
              <p className="flex items-center justify-center gap-1 text-lg font-extrabold text-ink">
                {m.name} {m.verified && <VerifiedBadge />}
              </p>
              <p className="mb-3 text-xs text-ink-faint">{m.headline}</p>
              <div className="flex items-center justify-center gap-3 text-xs text-ink-soft">
                <Stars rating={m.rating} />
                <span>{m.jobsDone} jobs</span>
                <span>{m.onTimePct}% on-time</span>
              </div>
              <p className="mt-4 rounded-xl bg-surface-soft p-2.5 text-[11px] text-ink-faint">
                Ranks high for {m.jobsDone} completed jobs with {m.reviews} verified
                reviews and a {m.onTimePct}% on-time rate.
              </p>
            </Link>
          ))}
        </div>

        {/* Rest of top 10 */}
        <ol className="card divide-y divide-surface-line overflow-hidden">
          {ranked.slice(3).map((m, i) => (
            <li key={m.id}>
              <Link href={`/members/${m.id}`} className="flex flex-wrap items-center gap-4 p-4 transition hover:bg-surface-soft sm:px-6">
                <span className="w-8 text-center text-lg font-black text-ink-faint">#{i + 4}</span>
                <Avatar name={m.name} hue={m.avatarHue} size={44} />
                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-1.5 text-sm font-bold text-ink">
                    {m.name} {m.verified && <VerifiedBadge size={13} />}
                  </p>
                  <p className="truncate text-xs text-ink-faint">{m.headline}</p>
                </div>
                <div className="hidden items-center gap-6 text-xs text-ink-soft md:flex">
                  <span className="w-16 text-center"><strong className="block text-sm text-ink">{m.jobsDone}</strong> jobs</span>
                  <span className="w-16 text-center"><strong className="block text-sm text-ink">{m.onTimePct}%</strong> on-time</span>
                  <span className="w-16 text-center"><strong className="block text-sm text-ink">{m.responseTime}</strong> response</span>
                </div>
                <Stars rating={m.rating} />
                <span className="chip bg-violet-50 text-violet-700">{m.topSkill}</span>
              </Link>
            </li>
          ))}
        </ol>

        <p className="mt-6 text-center text-xs text-ink-faint">
          Weights are published and admin-configurable. Suspected fraud (circular
          trades, self-hiring, fake reviews) is flagged for human review and
          excluded from rankings.
        </p>
      </main>
      <Footer />
    </>
  );
}
