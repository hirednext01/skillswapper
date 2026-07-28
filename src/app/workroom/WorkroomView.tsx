"use client";

import { useState } from "react";
import { Avatar, CreditAmount, VerifiedBadge } from "@/components/ui";
import { num } from "@/lib/config";

type Msg = {
  id: number;
  from: "me" | "them" | "system";
  text: string;
  time: string;
  warning?: boolean;
};

const initialMessages: Msg[] = [
  { id: 1, from: "system", text: "Contract started · 15,000 credits locked in escrow · Deadline 2 Aug 2026", time: "26 Jul, 4:12 PM" },
  { id: 2, from: "them", text: "Hi Tarushikha! Excited to get started. I've reviewed the brief — I'll share the wireframe by tomorrow evening.", time: "26 Jul, 4:30 PM" },
  { id: 3, from: "me", text: "Perfect. The brand colours are in the attached guidelines. Waitlist form should connect to our mailing list.", time: "26 Jul, 4:41 PM" },
  { id: 4, from: "system", text: "Milestone 1 “Wireframe & design” submitted for approval", time: "27 Jul, 7:55 PM" },
  { id: 5, from: "them", text: "Wireframes are up! I went with a hero + social proof + waitlist layout. Let me know your thoughts.", time: "27 Jul, 7:56 PM" },
];

const milestones = [
  { name: "Wireframe & design", credits: 5000, status: "Awaiting your approval", tone: "bg-gold-100 text-gold-700", due: "28 Jul" },
  { name: "Build & integrations", credits: 7000, status: "In progress", tone: "bg-violet-100 text-violet-700", due: "31 Jul" },
  { name: "Deploy & handover", credits: 3000, status: "In escrow", tone: "bg-surface-sunken text-ink-soft", due: "2 Aug" },
];

/** Configurable cash-solicitation patterns — mirrors the server-side detector. */
const CASH_PATTERN = /(₹|rs\.?\s?\d|rupee|paytm|gpay|google pay|phonepe|upi|bank transfer|cash|paypal|\b\d{10}\b)/i;

export default function WorkroomView() {
  const [messages, setMessages] = useState<Msg[]>(initialMessages);
  const [draft, setDraft] = useState("");
  const [warn, setWarn] = useState(false);
  const [approved, setApproved] = useState(false);

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.trim()) return;
    const flagged = CASH_PATTERN.test(draft);
    setWarn(flagged);
    setMessages((m) => [
      ...m,
      { id: m.length + 1, from: "me", text: draft, time: "Just now", warning: flagged },
    ]);
    setDraft("");
  };

  const approveMilestone = () => {
    setApproved(true);
    setMessages((m) => [
      ...m,
      { id: m.length + 1, from: "system", text: "Milestone 1 approved · 5,000 credits released to Rahul Menon · recorded in ledger TXN-90455", time: "Just now" },
    ]);
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
      {/* ---- Chat ---- */}
      <section className="card flex min-h-[560px] flex-col overflow-hidden">
        <header className="flex items-center justify-between gap-3 border-b border-surface-line p-4">
          <div className="flex items-center gap-3">
            <Avatar name="Rahul Menon" hue={205} size={40} ring />
            <div>
              <p className="flex items-center gap-1 text-sm font-bold text-ink">
                Rahul Menon <VerifiedBadge size={13} />
              </p>
              <p className="text-[11px] text-mint-700">● Online · responds in ~2 hrs</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="btn-secondary btn-sm">Request revision</button>
            <button className="btn-ghost btn-sm text-coral-600">Raise dispute</button>
          </div>
        </header>

        <div className="flex-1 space-y-4 overflow-y-auto p-5" aria-live="polite">
          {messages.map((m) =>
            m.from === "system" ? (
              <p key={m.id} className="mx-auto max-w-md rounded-pill bg-surface-soft px-4 py-2 text-center text-[11px] font-medium text-ink-faint">
                ⚙ {m.text} · {m.time}
              </p>
            ) : (
              <div key={m.id} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  m.from === "me"
                    ? "rounded-br-md bg-violet-600 text-white"
                    : "rounded-bl-md bg-surface-soft text-ink"
                }`}>
                  <p>{m.text}</p>
                  <p className={`mt-1 text-[10px] ${m.from === "me" ? "text-white/60" : "text-ink-faint"}`}>{m.time}</p>
                  {m.warning && (
                    <p className="mt-2 rounded-lg bg-white/15 p-2 text-[11px]">
                      ⚠ This message may reference off-platform payment. Cash
                      payment between members is prohibited and this message was
                      flagged for review.
                    </p>
                  )}
                </div>
              </div>
            )
          )}
        </div>

        {warn && (
          <div className="mx-5 mb-2 rounded-xl border border-coral-200 bg-coral-50 p-3 text-xs leading-relaxed text-coral-700 animate-fade-up" role="alert">
            <strong>Heads-up:</strong> asking for or offering cash payment is
            against the Community Guidelines. All work must be paid in credits
            through escrow — that&apos;s what keeps both of you protected.
          </div>
        )}

        <form onSubmit={send} className="flex items-end gap-2.5 border-t border-surface-line p-4">
          <button type="button" className="btn-ghost btn-sm" aria-label="Attach file">📎</button>
          <textarea
            rows={1}
            className="input resize-none"
            placeholder="Write a message…"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send(e);
              }
            }}
            aria-label="Message"
          />
          <button type="submit" className="btn-primary btn-md">Send</button>
        </form>
      </section>

      {/* ---- Contract sidebar ---- */}
      <aside className="space-y-5">
        <section className="card p-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-bold text-ink">Contract summary</h2>
            <span className="chip bg-mint-100 text-mint-700">Active</span>
          </div>
          <dl className="space-y-2.5 text-sm">
            <div className="flex justify-between"><dt className="text-ink-faint">Total value</dt><dd><CreditAmount amount={15000} /></dd></div>
            <div className="flex justify-between"><dt className="text-ink-faint">In escrow</dt><dd className="font-bold tabular-nums text-violet-700">{num(approved ? 10000 : 15000)}</dd></div>
            <div className="flex justify-between"><dt className="text-ink-faint">Released</dt><dd className="font-bold tabular-nums text-mint-700">{num(approved ? 5000 : 0)}</dd></div>
            <div className="flex justify-between"><dt className="text-ink-faint">Deadline</dt><dd className="font-semibold text-ink">2 Aug 2026</dd></div>
            <div className="flex justify-between"><dt className="text-ink-faint">Revisions left</dt><dd className="font-semibold text-ink">2</dd></div>
          </dl>
        </section>

        <section className="card p-5">
          <h2 className="mb-4 text-sm font-bold text-ink">Milestones</h2>
          <ol className="space-y-3">
            {milestones.map((ms, i) => (
              <li key={ms.name} className="rounded-xl border border-surface-line p-3.5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-bold text-ink">{i + 1}. {ms.name}</p>
                    <p className="mt-0.5 text-[11px] text-ink-faint">Due {ms.due} · {num(ms.credits)} credits</p>
                  </div>
                  <span className={`chip whitespace-nowrap ${i === 0 && approved ? "bg-mint-100 text-mint-700" : ms.tone}`}>
                    {i === 0 && approved ? "Approved ✓" : ms.status}
                  </span>
                </div>
                {i === 0 && !approved && (
                  <div className="mt-3 flex gap-2">
                    <button onClick={approveMilestone} className="btn-primary btn-sm flex-1">
                      Approve & release {num(ms.credits)}
                    </button>
                    <button className="btn-secondary btn-sm">Revise</button>
                  </div>
                )}
              </li>
            ))}
          </ol>
        </section>

        <section className="card p-5">
          <h2 className="mb-3 text-sm font-bold text-ink">Deliverables</h2>
          <ul className="space-y-2.5">
            {[
              { name: "wireframes-v1.fig", size: "4.2 MB", time: "27 Jul" },
              { name: "brand-guidelines.pdf", size: "1.8 MB", time: "26 Jul" },
            ].map((f) => (
              <li key={f.name} className="flex items-center gap-3 rounded-xl bg-surface-soft p-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-lg shadow-card" aria-hidden>📄</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-bold text-ink">{f.name}</p>
                  <p className="text-[10px] text-ink-faint">{f.size} · {f.time}</p>
                </div>
                <button className="btn-ghost btn-sm">↓</button>
              </li>
            ))}
          </ul>
        </section>
      </aside>
    </div>
  );
}
