"use client";

import { useState } from "react";
import { Job } from "@/lib/data";
import { num } from "@/lib/config";
import { CreditAmount, CreditIcon } from "@/components/ui";

export default function GrabJobPanel({ job }: { job: Job }) {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");
  const [days, setDays] = useState(job.deadlineDays);
  const [quote, setQuote] = useState(job.credits);
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const closed = job.status === "Assigned" || job.status === "Closed";

  const share = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable in some browsers */
    }
  };

  return (
    <>
      <div className="card p-6">
        <p className="text-xs font-bold uppercase tracking-wide text-ink-faint">
          {job.budgetType === "Fixed" ? "Fixed credit reward" : "Open to proposals"}
        </p>
        <div className="mt-2">
          <CreditAmount amount={job.credits} size="xl" />
        </div>
        <p className="mt-1 text-xs text-ink-faint">
          Locked in escrow the moment {`you're`} hired. Released when your work is approved.
        </p>

        <button
          className="btn-coral btn-lg mt-5 w-full"
          onClick={() => setOpen(true)}
          disabled={closed}
        >
          {closed ? "No longer accepting applications" : `Grab This Job for ${num(job.credits)} Credits`}
        </button>
        <p className="mt-2 text-center text-[11px] text-ink-faint">
          Opens the application — no binding contract until the poster accepts you.
        </p>

        <div className="mt-4 grid grid-cols-2 gap-2.5">
          <button
            className={`btn-secondary btn-md ${saved ? "border-violet-400 text-violet-700" : ""}`}
            onClick={() => setSaved(!saved)}
            aria-pressed={saved}
          >
            {saved ? "★ Saved" : "☆ Save"}
          </button>
          <button className="btn-secondary btn-md" onClick={share}>
            {copied ? "✓ Link copied" : "↗ Share"}
          </button>
        </div>

        <dl className="mt-6 space-y-3 border-t border-surface-line pt-5 text-sm">
          {[
            ["Providers needed", `${job.maxProviders}`],
            ["Applications so far", `${job.applications}`],
            ["Experience level", job.experience],
            ["Estimated effort", job.effort],
            ["Budget type", job.budgetType],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4">
              <dt className="text-ink-faint">{k}</dt>
              <dd className="font-semibold text-ink">{v}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="card mt-4 flex items-start gap-3 p-4">
        <span className="text-xl" aria-hidden>🛡️</span>
        <p className="text-xs leading-relaxed text-ink-soft">
          <strong className="text-ink">Escrow protected.</strong> Credits are
          held by the platform until work is approved, auto-approved or a
          dispute is resolved. No cash ever changes hands between members.
        </p>
      </div>

      {/* ---- Application modal ---- */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-ink/50 p-0 backdrop-blur-sm sm:items-center sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Apply for this job"
          onClick={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <div className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-white p-6 shadow-pop animate-fade-up sm:rounded-3xl">
            {submitted ? (
              <div className="py-8 text-center">
                <span className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-mint-100 text-3xl">✓</span>
                <h2 className="text-xl font-extrabold text-ink">Proposal sent!</h2>
                <p className="mx-auto mt-2 max-w-sm text-sm text-ink-soft">
                  {`We'll`} notify you the moment the poster responds. If {`you're`}{" "}
                  accepted, <strong>{num(quote)} credits</strong> lock in escrow
                  and your workroom opens automatically.
                </p>
                <button className="btn-primary btn-md mt-6" onClick={() => setOpen(false)}>
                  Done
                </button>
              </div>
            ) : (
              <>
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-extrabold text-ink">Apply for this job</h2>
                    <p className="mt-0.5 line-clamp-1 text-sm text-ink-faint">{job.title}</p>
                  </div>
                  <button className="btn-ghost btn-sm" onClick={() => setOpen(false)} aria-label="Close">
                    ✕
                  </button>
                </div>

                <form
                  className="space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                >
                  <div>
                    <label className="label" htmlFor="proposal-msg">Your pitch</label>
                    <textarea
                      id="proposal-msg"
                      required
                      minLength={30}
                      rows={4}
                      className="input resize-none"
                      placeholder="Explain why you're the right member for this job — relevant work, approach, timeline…"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                    <p className="mt-1 text-[11px] text-ink-faint">{message.length}/30 characters minimum</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="label" htmlFor="proposal-days">Delivery (days)</label>
                      <input
                        id="proposal-days"
                        type="number"
                        min={1}
                        max={60}
                        required
                        className="input"
                        value={days}
                        onChange={(e) => setDays(Number(e.target.value))}
                      />
                    </div>
                    <div>
                      <label className="label" htmlFor="proposal-quote">
                        Credit quote
                      </label>
                      <div className="relative">
                        <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2">
                          <CreditIcon size={15} />
                        </span>
                        <input
                          id="proposal-quote"
                          type="number"
                          min={500}
                          step={100}
                          required
                          disabled={job.budgetType === "Fixed"}
                          className="input pl-9 disabled:bg-surface-soft"
                          value={quote}
                          onChange={(e) => setQuote(Number(e.target.value))}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl bg-surface-soft p-3.5 text-xs leading-relaxed text-ink-soft">
                    By applying you agree to deliver through the platform
                    workroom. If accepted, the poster&apos;s credits lock in
                    escrow before you start — <strong>your work is always protected</strong>.
                  </div>

                  <button type="submit" className="btn-coral btn-lg w-full">
                    Send proposal
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
