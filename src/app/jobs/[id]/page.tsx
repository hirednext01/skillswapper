import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { jobs, memberById, timeAgo } from "@/lib/data";
import { Avatar, SectionHeading, Stars, StatusPill, UrgentBadge, VerifiedBadge } from "@/components/ui";
import GrabJobPanel from "./GrabJobPanel";
import JobCard from "@/components/JobCard";

export function generateStaticParams() {
  return jobs.map((j) => ({ id: j.id }));
}

export function generateMetadata({ params }: { params: { id: string } }) {
  const job = jobs.find((j) => j.id === params.id);
  return job
    ? { title: job.title, description: job.description.slice(0, 150) }
    : {};
}

export default function JobDetail({ params }: { params: { id: string } }) {
  const job = jobs.find((j) => j.id === params.id);
  if (!job) notFound();
  const poster = memberById(job.posterId);
  const similar = jobs.filter((j) => j.id !== job.id && j.category === job.category).slice(0, 2);

  return (
    <>
      <Nav />
      <main className="container-page py-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* ---- Main column ---- */}
          <article>
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <StatusPill status={job.status} />
              {job.urgent && <UrgentBadge />}
              <span className="chip bg-surface-soft text-ink-soft">{job.category}</span>
              <span className="chip bg-surface-soft text-ink-soft">{job.kind} work</span>
              <span className="ml-auto text-xs font-medium text-ink-faint">
                Posted {timeAgo(job.postedMinutesAgo)}
              </span>
            </div>

            <h1 className="text-2xl font-extrabold leading-tight tracking-tight text-ink sm:text-3xl text-balance">
              {job.title}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium text-ink-soft">
              <span>📍 {job.mode}{job.city ? ` · ${job.city}` : ""}</span>
              <span>⏱ Due in {job.deadlineDays} days</span>
              <span>💪 {job.effort}</span>
              <span>🎯 {job.experience} level</span>
              <span>👥 {job.applications} applications</span>
            </div>

            <section className="card mt-6 p-6">
              <h2 className="mb-3 text-lg font-bold text-ink">About this job</h2>
              <p className="leading-relaxed text-ink-soft">{job.description}</p>

              <h3 className="mb-2 mt-6 text-sm font-bold text-ink">Required skills</h3>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((s) => (
                  <span key={s} className="chip bg-violet-50 text-violet-700">{s}</span>
                ))}
              </div>

              <h3 className="mb-2 mt-6 text-sm font-bold text-ink">Deliverables</h3>
              <ul className="space-y-2">
                {job.deliverables.map((d) => (
                  <li key={d} className="flex items-start gap-2.5 text-sm text-ink-soft">
                    <svg className="mt-0.5 shrink-0 text-mint-500" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    {d}
                  </li>
                ))}
              </ul>
            </section>

            <section className="card mt-6 p-6">
              <h2 className="mb-4 text-lg font-bold text-ink">About the poster</h2>
              <div className="flex flex-wrap items-center gap-4">
                <Avatar name={poster.name} hue={poster.avatarHue} size={56} ring />
                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-1.5 font-bold text-ink">
                    {poster.name} {poster.verified && <VerifiedBadge />}
                  </p>
                  <p className="text-sm text-ink-soft">{poster.headline}</p>
                  <div className="mt-1.5 flex flex-wrap items-center gap-3 text-xs text-ink-faint">
                    <Stars rating={poster.rating} />
                    <span>{poster.jobsDone} jobs completed</span>
                    <span>{poster.onTimePct}% on-time</span>
                    <span>Member since {poster.memberSince}</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 rounded-xl bg-surface-soft p-4 text-xs leading-relaxed text-ink-faint">
                🔒 All communication and delivery happen inside the {`platform's`}{" "}
                workroom. Requesting or offering cash payment is against the
                Community Guidelines and is automatically flagged.
              </div>
            </section>

            {similar.length > 0 && (
              <section className="mt-10">
                <SectionHeading title="Similar jobs" />
                <div className="grid gap-5 md:grid-cols-2">
                  {similar.map((j) => (
                    <JobCard key={j.id} job={j} />
                  ))}
                </div>
              </section>
            )}
          </article>

          {/* ---- Sidebar ---- */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <GrabJobPanel job={job} />
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}
