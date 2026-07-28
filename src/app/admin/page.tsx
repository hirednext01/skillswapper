import type { Metadata } from "next";
import MemberShell from "@/components/MemberShell";
import { num } from "@/lib/config";

export const metadata: Metadata = {
  title: "Admin Panel",
  robots: { index: false },
};

const kpis = [
  { label: "Total users", value: "12,412", delta: "+312 this week", up: true },
  { label: "Active subscribers", value: "8,976", delta: "+184 this week", up: true },
  { label: "MRR", value: "₹1.08 Cr", delta: "+4.2%", up: true },
  { label: "Payment failures (7d)", value: "63", delta: "-12%", up: true },
  { label: "Credits in circulation", value: "48.2M", delta: "+1.9M", up: true },
  { label: "Credits in escrow", value: "6.4M", delta: "412 contracts", up: true },
  { label: "Open disputes", value: "17", delta: "3 overdue", up: false },
  { label: "Fraud flags pending", value: "9", delta: "2 high priority", up: false },
];

const disputes = [
  { id: "DSP-1042", job: "Logo design sprint", parties: "Devika ↔ Arjun", reason: "Deliverable doesn't match brief", escrow: 6000, age: "2 days", status: "Awaiting response" },
  { id: "DSP-1041", job: "Reel promotion", parties: "Karan ↔ Priya", reason: "Proof-of-post missing", escrow: 8000, age: "3 days", status: "Under review" },
  { id: "DSP-1039", job: "SEO article pack", parties: "Nikhil ↔ Sneha", reason: "Late delivery", escrow: 4500, age: "5 days", status: "Settlement proposed" },
];

const flags = [
  { id: "FLG-2210", type: "Circular trades", detail: "3 accounts exchanging identical credit amounts in a loop", severity: "High" },
  { id: "FLG-2209", type: "Cash solicitation", detail: "UPI handle detected in workroom message (contract #C-8841)", severity: "Medium" },
  { id: "FLG-2207", type: "Duplicate accounts", detail: "Same device fingerprint on 2 new sign-ups", severity: "Medium" },
];

export default function AdminPage() {
  return (
    <MemberShell
      title="Admin Panel"
      sub="Platform health, moderation and the credit economy at a glance. (Demo data — every module here is admin-role gated in production)"
    >
      {/* KPI grid */}
      <section className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4" aria-label="Key metrics">
        {kpis.map((k) => (
          <div key={k.label} className="card p-4">
            <p className="text-[11px] font-bold uppercase tracking-wide text-ink-faint">{k.label}</p>
            <p className="mt-1.5 text-xl font-extrabold tabular-nums text-ink">{k.value}</p>
            <p className={`mt-0.5 text-[11px] font-semibold ${k.up ? "text-mint-700" : "text-coral-600"}`}>{k.delta}</p>
          </div>
        ))}
      </section>

      <div className="grid gap-6 xl:grid-cols-2">
        {/* Disputes */}
        <section className="card overflow-hidden">
          <header className="flex items-center justify-between border-b border-surface-line p-5">
            <h2 className="text-lg font-bold text-ink">Dispute queue</h2>
            <span className="chip bg-coral-100 text-coral-700">17 open</span>
          </header>
          <ul className="divide-y divide-surface-line">
            {disputes.map((d) => (
              <li key={d.id} className="flex flex-wrap items-center gap-3 p-4 transition hover:bg-surface-soft">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-ink">{d.job} <span className="font-normal text-ink-faint">· {d.parties}</span></p>
                  <p className="mt-0.5 text-xs text-ink-faint">{d.id} · {d.reason} · {num(d.escrow)} credits in escrow · open {d.age}</p>
                </div>
                <span className="chip bg-gold-100 text-gold-700">{d.status}</span>
                <button className="btn-secondary btn-sm">Review</button>
              </li>
            ))}
          </ul>
          <div className="border-t border-surface-line p-4 text-center">
            <button className="btn-ghost btn-sm">View all disputes →</button>
          </div>
        </section>

        {/* Fraud flags */}
        <section className="card overflow-hidden">
          <header className="flex items-center justify-between border-b border-surface-line p-5">
            <h2 className="text-lg font-bold text-ink">Fraud & abuse flags</h2>
            <span className="chip bg-violet-100 text-violet-700">Human review required</span>
          </header>
          <ul className="divide-y divide-surface-line">
            {flags.map((f) => (
              <li key={f.id} className="flex flex-wrap items-center gap-3 p-4 transition hover:bg-surface-soft">
                <span className={`chip ${f.severity === "High" ? "bg-coral-100 text-coral-700" : "bg-gold-100 text-gold-700"}`}>{f.severity}</span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-ink">{f.type}</p>
                  <p className="mt-0.5 text-xs text-ink-faint">{f.id} · {f.detail}</p>
                </div>
                <button className="btn-secondary btn-sm">Investigate</button>
              </li>
            ))}
          </ul>
          <p className="border-t border-surface-line p-4 text-center text-[11px] text-ink-faint">
            No automatic bans. Every flag gets a transparent human decision, recorded in the audit log.
          </p>
        </section>

        {/* Token adjustment */}
        <section className="card p-6">
          <h2 className="mb-1 text-lg font-bold text-ink">Administrative credit adjustment</h2>
          <p className="mb-4 text-xs text-ink-faint">Requires a reason. Writes a permanent, immutable audit-log entry and a ledger transaction.</p>
          <form className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div><label className="label" htmlFor="adj-user">Member</label><input id="adj-user" className="input" placeholder="Search by name, email or ID…" /></div>
              <div><label className="label" htmlFor="adj-amt">Amount (± credits)</label><input id="adj-amt" type="number" className="input" placeholder="e.g. -2000 or 5000" /></div>
            </div>
            <div>
              <label className="label" htmlFor="adj-reason">Reason (required, audited)</label>
              <textarea id="adj-reason" required rows={2} className="input resize-none" placeholder="e.g. Dispute DSP-1042 settlement: 60/40 split per moderator decision" />
            </div>
            <div className="flex items-center justify-between gap-3">
              <p className="text-[11px] text-ink-faint">Balances can never go negative — the ledger rejects invalid adjustments.</p>
              <button type="button" className="btn-primary btn-md">Apply adjustment</button>
            </div>
          </form>
        </section>

        {/* Config */}
        <section className="card p-6">
          <h2 className="mb-4 text-lg font-bold text-ink">Platform configuration</h2>
          <ul className="space-y-3">
            {[
              ["Subscription price", "₹1,199 / month"],
              ["Credits per cycle", "10,000"],
              ["Credit packs", "10k / 20k / 30k · ₹1,199 / ₹2,398 / ₹3,597"],
              ["GST rate", "18%"],
              ["Advertising price", "₹5,000 + GST / month"],
              ["Auto-approve window", "5 days after delivery"],
              ["Grace period on failed payment", "7 days"],
              ["Urgent-badge limit", "2 per member per week"],
              ["Ranking weights", "Jobs 30 · Reviews 25 · On-time 20 · Repeat 15 · Disputes -10"],
            ].map(([k, v]) => (
              <li key={k} className="flex items-center justify-between gap-4 rounded-xl bg-surface-soft px-4 py-3 text-sm">
                <span className="font-semibold text-ink">{k}</span>
                <span className="flex items-center gap-3 text-ink-soft">
                  {v}
                  <button className="btn-ghost btn-sm">Edit</button>
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </MemberShell>
  );
}
