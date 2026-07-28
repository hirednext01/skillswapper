"use client";

import { useState } from "react";
import { Service } from "@/lib/data";
import { num } from "@/lib/config";
import { CreditAmount } from "@/components/ui";

/** Demo wallet balance for the insufficient-credits state. */
const WALLET_AVAILABLE = 14_200;

export default function PackagePicker({ service }: { service: Service }) {
  const [selected, setSelected] = useState(0);
  const [confirming, setConfirming] = useState(false);
  const [ordered, setOrdered] = useState(false);
  const pkg = service.packages[selected];
  const insufficient = pkg.credits > WALLET_AVAILABLE;

  return (
    <div className="card overflow-hidden">
      {/* Package tabs */}
      <div className="grid" style={{ gridTemplateColumns: `repeat(${service.packages.length}, 1fr)` }}>
        {service.packages.map((p, i) => (
          <button
            key={p.name}
            onClick={() => { setSelected(i); setConfirming(false); setOrdered(false); }}
            className={`border-b-2 px-2 py-3.5 text-sm font-bold transition ${
              i === selected
                ? "border-violet-600 text-violet-700"
                : "border-surface-line text-ink-faint hover:text-ink"
            }`}
            aria-pressed={i === selected}
          >
            {p.name}
          </button>
        ))}
      </div>

      <div className="p-6">
        <div className="mb-1 flex items-center justify-between">
          <CreditAmount amount={pkg.credits} size="xl" />
          <span className="chip bg-surface-soft text-ink-soft">{pkg.deliveryDays}-day delivery</span>
        </div>
        <p className="mb-5 text-xs text-ink-faint">
          {service.revisions} revision{service.revisions === 1 ? "" : "s"} included · escrow protected
        </p>

        <ul className="mb-6 space-y-2.5">
          {pkg.features.map((f) => (
            <li key={f} className="flex items-start gap-2.5 text-sm text-ink-soft">
              <svg className="mt-0.5 shrink-0 text-mint-500" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5" />
              </svg>
              {f}
            </li>
          ))}
        </ul>

        {ordered ? (
          <div className="rounded-2xl bg-mint-100 p-4 text-center animate-fade-up">
            <p className="font-bold text-mint-700">✓ Order placed!</p>
            <p className="mt-1 text-xs text-mint-700/90">
              {num(pkg.credits)} credits moved to escrow. {`You'll`} be notified
              when the provider accepts — usually within a few hours.
            </p>
          </div>
        ) : confirming ? (
          <div className="animate-fade-up space-y-3">
            <div className="rounded-xl bg-surface-soft p-4 text-sm">
              <div className="flex justify-between">
                <span className="text-ink-faint">Your available credits</span>
                <span className="font-bold tabular-nums text-ink">{num(WALLET_AVAILABLE)}</span>
              </div>
              <div className="mt-1.5 flex justify-between">
                <span className="text-ink-faint">This order (to escrow)</span>
                <span className="font-bold tabular-nums text-coral-600">−{num(pkg.credits)}</span>
              </div>
              <div className="mt-2 flex justify-between border-t border-surface-line pt-2">
                <span className="text-ink-faint">Balance after</span>
                <span className={`font-bold tabular-nums ${insufficient ? "text-coral-600" : "text-ink"}`}>
                  {num(WALLET_AVAILABLE - pkg.credits)}
                </span>
              </div>
            </div>

            {insufficient ? (
              <div className="rounded-xl border border-coral-200 bg-coral-50 p-4">
                <p className="text-sm font-bold text-coral-700">Not enough credits</p>
                <p className="mt-1 text-xs text-coral-700/80">
                  You need {num(pkg.credits - WALLET_AVAILABLE)} more credits for
                  this package. Top up instantly — packs start at ₹1,199 + GST.
                </p>
                <a href="/pricing#credit-packs" className="btn-coral btn-md mt-3 w-full">
                  Buy More Credits
                </a>
              </div>
            ) : (
              <button className="btn-primary btn-lg w-full" onClick={() => setOrdered(true)}>
                Confirm — move {num(pkg.credits)} to escrow
              </button>
            )}
            <button className="btn-ghost btn-sm w-full" onClick={() => setConfirming(false)}>
              Back
            </button>
          </div>
        ) : (
          <button className="btn-primary btn-lg w-full" onClick={() => setConfirming(true)}>
            Continue with {pkg.name}
          </button>
        )}

        <p className="mt-4 text-center text-[11px] leading-relaxed text-ink-faint">
          Your credits are safely held until the work is approved. If the
          provider {`doesn't`} accept in time, credits return automatically.
        </p>
      </div>
    </div>
  );
}
