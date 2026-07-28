import Link from "next/link";
import { Job, memberById, timeAgo } from "@/lib/data";
import { num } from "@/lib/config";
import { Avatar, CreditAmount, StatusPill, UrgentBadge, VerifiedBadge } from "./ui";

export default function JobCard({ job, featured = false }: { job: Job; featured?: boolean }) {
  const poster = memberById(job.posterId);
  const closed = job.status === "Assigned" || job.status === "Closed";

  return (
    <article
      className={`card card-hover relative flex flex-col p-5 ${featured ? "ring-1 ring-violet-200" : ""}`}
    >
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <StatusPill status={job.status} />
        {job.urgent && <UrgentBadge />}
        <span className="chip bg-surface-soft text-ink-soft">{job.category}</span>
        <span className="ml-auto text-xs font-medium text-ink-faint">
          Posted {timeAgo(job.postedMinutesAgo)}
        </span>
      </div>

      <h3 className="mb-2 text-base font-bold leading-snug text-ink">
        <Link href={`/jobs/${job.id}`} className="after:absolute after:inset-0 hover:text-violet-700">
          {job.title}
        </Link>
      </h3>

      <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-ink-soft">{job.description}</p>

      <div className="mb-4 flex flex-wrap gap-1.5">
        {job.skills.map((s) => (
          <span key={s} className="chip bg-violet-50 text-violet-700">
            {s}
          </span>
        ))}
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs font-medium text-ink-soft">
        <span className="inline-flex items-center gap-1">
          <Dot /> {job.mode}
          {job.city ? ` · ${job.city}` : ""}
        </span>
        <span className="inline-flex items-center gap-1">
          <Dot /> {job.kind} work
        </span>
        <span className="inline-flex items-center gap-1">
          <Dot /> Due in {job.deadlineDays} days
        </span>
        <span className="inline-flex items-center gap-1">
          <Dot /> {job.applications} application{job.applications === 1 ? "" : "s"}
        </span>
      </div>

      <div className="mt-auto flex items-center justify-between gap-3 border-t border-surface-line pt-4">
        <div className="flex min-w-0 items-center gap-2.5">
          <Avatar name={poster.name} hue={poster.avatarHue} size={32} />
          <div className="min-w-0">
            <p className="flex items-center gap-1 truncate text-xs font-semibold text-ink">
              {poster.name}
              {job.verifiedPoster && <VerifiedBadge size={13} />}
            </p>
            <p className="truncate text-[11px] text-ink-faint">{poster.city}</p>
          </div>
        </div>
        <span
          className={`relative z-10 ${closed ? "btn-secondary" : "btn-coral"} btn-sm whitespace-nowrap`}
          aria-hidden
        >
          {closed ? "View Details" : `Grab · ${num(job.credits)}`}
          {!closed && (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          )}
        </span>
      </div>

      <div className="absolute right-4 top-4 hidden" aria-hidden>
        <CreditAmount amount={job.credits} />
      </div>
    </article>
  );
}

function Dot() {
  return <span className="h-1 w-1 rounded-full bg-surface-line" aria-hidden />;
}
