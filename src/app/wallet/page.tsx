import type { Metadata } from "next";
import Link from "next/link";
import MemberShell from "@/components/MemberShell";
import { CreditIcon } from "@/components/ui";
import { PRODUCT, inr, num } from "@/lib/config";

export const metadata: Metadata = {
  title: "Wallet & Credits",
  robots: { index: false },
};

type LedgerRow = {
  id: string;
  type: string;
  detail: string;
  credit?: number;
  debit?: number;
  balance: number;
  date: string;
  status: "Completed" | "In escrow" | "Pending";
};

const ledger: LedgerRow[] = [
  { id: "TXN-90411", type: "Escrow deposit", detail: "Landing page for fintech startup · Rahul Menon", debit: 15000, balance: 14200, date: "26 Jul 2026, 4:12 PM", status: "In escrow" },
  { id: "TXN-90322", type: "Job earning", detail: "Instagram reel promotion · escrow released by Karan Bhatia", credit: 8000, balance: 29200, date: "24 Jul 2026, 11:03 AM", status: "Completed" },
  { id: "TXN-90217", type: "Credit pack purchase", detail: "10,000-credit pack · ₹1,199 + GST · Invoice INV-2214", credit: 10000, balance: 21200, date: "19 Jul 2026, 9:47 PM", status: "Completed" },
  { id: "TXN-90105", type: "Escrow release", detail: "Pitch deck design · approved by you · Ananya Iyer", debit: 9000, balance: 11200, date: "15 Jul 2026, 6:31 PM", status: "Completed" },
  { id: "TXN-90014", type: "Monthly allocation", detail: "July membership · payment pay_Oa8… verified", credit: 10000, balance: 20200, date: "12 Jul 2026, 8:00 AM", status: "Completed" },
  { id: "TXN-89877", type: "Job earning", detail: "LinkedIn ghostwriting sprint · escrow released", credit: 6500, balance: 10200, date: "8 Jul 2026, 2:19 PM", status: "Completed" },
  { id: "TXN-89740", type: "Promotional credit", detail: "Referral bonus · friend completed first contract", credit: 1000, balance: 3700, date: "2 Jul 2026, 10:00 AM", status: "Completed" },
];

const typeStyle = (t: string) =>
  t.includes("earning") || t.includes("allocation") || t.includes("purchase") || t.includes("Promotional")
    ? "bg-mint-100 text-mint-700"
    : t.includes("Escrow deposit")
      ? "bg-violet-100 text-violet-700"
      : "bg-surface-sunken text-ink-soft";

export default function WalletPage() {
  return (
    <MemberShell
      title="Wallet & Credits"
      sub="Every credit movement is recorded in a double-entry ledger. Balances can never be edited directly. (Demo data)"
    >
      {/* ---- Balance breakdown ---- */}
      <section className="mb-6 grid gap-4 lg:grid-cols-[1.2fr_1fr]">
        <div className="gradient-cta-panel card border-0 p-6 text-white">
          <p className="text-xs font-bold uppercase tracking-wider text-white/70">Available to spend</p>
          <p className="mt-2 flex items-center gap-2.5 text-4xl font-extrabold tabular-nums">
            <CreditIcon size={30} /> {num(14200)}
          </p>
          <div className="mt-5 grid grid-cols-3 gap-3 text-sm">
            {[
              ["In escrow", 15000],
              ["Earned", 38500],
              ["This cycle", 10000],
            ].map(([l, v]) => (
              <div key={l as string} className="rounded-xl bg-white/10 p-3 backdrop-blur">
                <p className="text-[11px] font-semibold text-white/70">{l}</p>
                <p className="mt-0.5 font-bold tabular-nums">{num(v as number)}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-2.5">
            <Link href="/pricing#credit-packs" className="btn btn-md bg-white text-violet-800 hover:bg-violet-50">
              Buy More Credits
            </Link>
            <Link href="/jobs" className="btn btn-md border border-white/40 text-white hover:bg-white/10">
              Earn by grabbing a job
            </Link>
          </div>
        </div>

        <div className="card p-6">
          <h2 className="mb-4 text-sm font-bold text-ink">Credit sources</h2>
          <ul className="space-y-3">
            {[
              { label: "Subscription credits", value: 10000, pct: 26, color: "bg-violet-500" },
              { label: "Earned credits", value: 38500, pct: 44, color: "bg-mint-500" },
              { label: "Purchased credits", value: 10000, pct: 26, color: "bg-coral-400" },
              { label: "Promotional credits", value: 1000, pct: 4, color: "bg-gold-500" },
            ].map((s) => (
              <li key={s.label}>
                <div className="mb-1 flex justify-between text-xs font-semibold">
                  <span className="text-ink-soft">{s.label}</span>
                  <span className="tabular-nums text-ink">{num(s.value)}</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-pill bg-surface-sunken">
                  <div className={`h-full rounded-pill ${s.color}`} style={{ width: `${s.pct}%` }} />
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-4 rounded-xl bg-surface-soft p-3 text-[11px] leading-relaxed text-ink-faint">
            Credit types are tracked separately for accounting and audit.
            {" "}{PRODUCT.legal.creditPolicy.split(".")[0]}.
          </p>
        </div>
      </section>

      {/* ---- Credit packs ---- */}
      <section className="card mb-6 p-6" id="packs">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-bold text-ink">Buy More Credits</h2>
          <p className="text-xs text-ink-faint">GST invoice generated automatically · Razorpay secure checkout</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {PRODUCT.creditPacks.map((p, i) => {
            const gst = Math.round(p.priceInr * PRODUCT.subscription.gstRatePct / 100);
            return (
              <div key={p.id} className={`rounded-2xl border p-5 transition hover:shadow-card-hover ${i === 1 ? "border-violet-400 bg-violet-50/50 ring-1 ring-violet-200" : "border-surface-line"}`}>
                {i === 1 && <span className="chip mb-2 bg-violet-600 text-white">Most popular</span>}
                <p className="flex items-center gap-1.5 text-2xl font-extrabold text-ink">
                  <CreditIcon size={20} /> {num(p.credits)}
                </p>
                <p className="mt-1 text-sm text-ink-soft">{inr(p.priceInr)} <span className="text-xs text-ink-faint">+ {inr(gst)} GST</span></p>
                <p className="text-[11px] text-ink-faint">Total {inr(p.priceInr + gst)}</p>
                <button className={`${i === 1 ? "btn-primary" : "btn-secondary"} btn-md mt-4 w-full`}>
                  Buy pack
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* ---- Ledger ---- */}
      <section className="card overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-surface-line p-5">
          <h2 className="text-lg font-bold text-ink">Transaction history</h2>
          <div className="flex gap-2">
            {["All", "Earnings", "Escrow", "Purchases"].map((f, i) => (
              <button key={f} className={`chip ${i === 0 ? "bg-ink text-white" : "bg-surface-soft text-ink-soft"}`}>
                {f}
              </button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="border-b border-surface-line bg-surface-soft text-left text-xs font-bold uppercase tracking-wide text-ink-faint">
                <th className="px-5 py-3">Transaction</th>
                <th className="px-5 py-3">Type</th>
                <th className="px-5 py-3 text-right">Credit</th>
                <th className="px-5 py-3 text-right">Debit</th>
                <th className="px-5 py-3 text-right">Balance</th>
                <th className="px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {ledger.map((r) => (
                <tr key={r.id} className="border-b border-surface-line/70 transition hover:bg-surface-soft/60">
                  <td className="px-5 py-4">
                    <p className="font-semibold text-ink">{r.detail}</p>
                    <p className="mt-0.5 text-xs text-ink-faint">{r.id} · {r.date}</p>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`chip whitespace-nowrap ${typeStyle(r.type)}`}>{r.type}</span>
                  </td>
                  <td className="px-5 py-4 text-right font-bold tabular-nums text-mint-700">
                    {r.credit ? `+${num(r.credit)}` : "—"}
                  </td>
                  <td className="px-5 py-4 text-right font-bold tabular-nums text-coral-600">
                    {r.debit ? `−${num(r.debit)}` : "—"}
                  </td>
                  <td className="px-5 py-4 text-right font-bold tabular-nums text-ink">{num(r.balance)}</td>
                  <td className="px-5 py-4">
                    <span className={`chip whitespace-nowrap ${r.status === "In escrow" ? "bg-violet-100 text-violet-700" : "bg-mint-100 text-mint-700"}`}>
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="border-t border-surface-line p-4 text-center text-[11px] text-ink-faint">
          Ledger entries are immutable. Admin adjustments always require a recorded reason and appear in your history.
        </p>
      </section>
    </MemberShell>
  );
}
