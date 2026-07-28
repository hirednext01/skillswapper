import { notFound } from "next/navigation";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ServiceCard from "@/components/ServiceCard";
import { members, services } from "@/lib/data";
import { Avatar, Stars, VerifiedBadge } from "@/components/ui";
import { num } from "@/lib/config";

export function generateStaticParams() {
  return members.map((m) => ({ id: m.id }));
}

export function generateMetadata({ params }: { params: { id: string } }) {
  const m = members.find((x) => x.id === params.id);
  return m ? { title: `${m.name} — Member Profile`, description: m.headline } : {};
}

export default function MemberProfile({ params }: { params: { id: string } }) {
  const m = members.find((x) => x.id === params.id);
  if (!m) notFound();
  const memberServices = services.filter((s) => s.providerId === m.id);

  return (
    <>
      <Nav />
      <main className="container-page py-10">
        {/* Header card */}
        <section className="card relative overflow-hidden p-6 sm:p-8">
          <div
            className="absolute inset-x-0 top-0 h-24"
            style={{ background: `linear-gradient(120deg, hsl(${m.avatarHue} 70% 92%), hsl(${m.avatarHue + 50} 65% 88%))` }}
            aria-hidden
          />
          <div className="relative flex flex-wrap items-end gap-5 pt-8">
            <Avatar name={m.name} hue={m.avatarHue} size={96} ring />
            <div className="min-w-0 flex-1">
              <h1 className="flex flex-wrap items-center gap-2 text-2xl font-extrabold text-ink">
                {m.name} {m.verified && <VerifiedBadge size={20} />}
              </h1>
              <p className="text-ink-soft">{m.headline}</p>
              <p className="mt-1 text-sm text-ink-faint">
                📍 {m.city} · Member since {m.memberSince} · Responds in {m.responseTime}
              </p>
            </div>
            <div className="flex gap-2.5">
              <button className="btn-secondary btn-md">Message</button>
              <button className="btn-primary btn-md">Invite to job</button>
            </div>
          </div>

          <div className="relative mt-6 grid grid-cols-2 gap-4 border-t border-surface-line pt-6 text-center sm:grid-cols-5">
            {[
              [m.rating.toFixed(1) + "★", `${m.reviews} verified reviews`],
              [String(m.jobsDone), "jobs completed"],
              [`${m.onTimePct}%`, "on-time delivery"],
              [num(m.creditsEarned), "credits earned"],
              ["2%", "dispute rate"],
            ].map(([v, l]) => (
              <div key={l}>
                <p className="text-xl font-extrabold text-ink">{v}</p>
                <p className="text-[11px] font-medium text-ink-faint">{l}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
          <div className="space-y-8">
            {memberServices.length > 0 && (
              <section>
                <h2 className="mb-4 text-lg font-bold text-ink">Services by {m.name.split(" ")[0]}</h2>
                <div className="grid gap-5 sm:grid-cols-2">
                  {memberServices.map((s) => (
                    <ServiceCard key={s.id} service={s} />
                  ))}
                </div>
              </section>
            )}

            <section className="card p-6">
              <h2 className="mb-4 text-lg font-bold text-ink">Recent reviews</h2>
              <ul className="space-y-5">
                {[
                  { name: "Devika P.", text: "Delivered ahead of schedule and nailed the brief on the first pass. The workroom made revisions painless.", rating: 5, when: "2 weeks ago" },
                  { name: "Sameer K.", text: "Great communication throughout. Would absolutely trade credits with them again.", rating: 5, when: "1 month ago" },
                  { name: "Ritu J.", text: "Solid quality. One revision round needed but handled quickly and professionally.", rating: 4, when: "2 months ago" },
                ].map((r) => (
                  <li key={r.name} className="border-b border-surface-line pb-5 last:border-0 last:pb-0">
                    <div className="mb-1.5 flex items-center justify-between">
                      <p className="text-sm font-bold text-ink">{r.name}</p>
                      <span className="text-xs text-ink-faint">{r.when}</span>
                    </div>
                    <Stars rating={r.rating} />
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">{r.text}</p>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            <section className="card p-5">
              <h2 className="mb-3 text-sm font-bold text-ink">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {m.skills.map((s) => (
                  <span key={s} className="chip bg-violet-50 text-violet-700">{s}</span>
                ))}
              </div>
            </section>
            <section className="card p-5">
              <h2 className="mb-3 text-sm font-bold text-ink">Badges</h2>
              <ul className="space-y-2.5 text-sm text-ink-soft">
                <li>🏆 Top 10 — {m.topSkill}</li>
                <li>⚡ Fast responder</li>
                <li>🔁 High repeat-client rate</li>
                {m.verified && <li>✅ Identity verified</li>}
              </ul>
            </section>
            <section className="card p-5">
              <h2 className="mb-3 text-sm font-bold text-ink">Roles</h2>
              <div className="flex flex-wrap gap-2">
                {m.roles.map((r) => (
                  <span key={r} className="chip bg-surface-soft text-ink-soft">{r}</span>
                ))}
              </div>
              <p className="mt-4 rounded-xl bg-surface-soft p-3 text-[11px] leading-relaxed text-ink-faint">
                Spendable credit balances are never shown publicly. Only earned
                credits from completed contracts appear on profiles.
              </p>
            </section>
            <Link href="/leaderboard" className="btn-secondary btn-md w-full">← Back to leaderboard</Link>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}
