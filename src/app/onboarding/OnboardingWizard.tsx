"use client";

import { useState } from "react";
import Link from "next/link";
import { CreditIcon } from "@/components/ui";
import { PRODUCT, inr, num } from "@/lib/config";

const STEPS = ["Account", "Profile type", "What you offer", "What you need", "Membership"];

const PROFILE_TYPES = [
  "Founder", "Freelancer", "Influencer/Creator", "Developer", "Designer",
  "Marketer", "Consultant", "Student", "Agency", "Small business",
  "Professional", "Local service provider", "Other",
];

const CATEGORIES = [
  "Development", "AI & Automation", "Graphic Design", "UI/UX", "Video Production",
  "Photography", "Content Writing", "Social Media", "Influencer Promotions",
  "Performance Marketing", "SEO", "Consulting", "Finance & Accounting",
  "Legal", "HR & Recruitment", "Local Services",
];

export default function OnboardingWizard() {
  const [step, setStep] = useState(0);
  const [types, setTypes] = useState<string[]>([]);
  const [offers, setOffers] = useState<string[]>([]);
  const [needs, setNeeds] = useState<string[]>([]);
  const [agreed, setAgreed] = useState(false);
  const [done, setDone] = useState(false);

  const toggle = (list: string[], set: (v: string[]) => void, v: string) =>
    set(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

  const canNext =
    (step !== 1 || types.length > 0) &&
    (step !== 2 || offers.length > 0) &&
    (step !== 3 || needs.length > 0);

  const gst = Math.round((PRODUCT.subscription.priceInr * PRODUCT.subscription.gstRatePct) / 100);

  if (done) {
    return (
      <div className="container-page">
        <div className="card mx-auto max-w-lg p-10 text-center animate-fade-up">
          <span className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-mint-100 text-4xl">🎉</span>
          <h1 className="text-2xl font-extrabold text-ink">Welcome to {PRODUCT.name}!</h1>
          <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-ink-soft">
            Your membership is active and{" "}
            <strong className="text-ink">{num(PRODUCT.subscription.creditsPerCycle)} credits</strong>{" "}
            have landed in your wallet. Recommended jobs matching{" "}
            <strong className="text-ink">{offers.slice(0, 2).join(" & ") || "your skills"}</strong>{" "}
            are already waiting.
          </p>
          <div className="mt-7 flex flex-col gap-2.5 sm:flex-row sm:justify-center">
            <Link href="/dashboard" className="btn-primary btn-lg">Go to dashboard</Link>
            <Link href="/jobs" className="btn-secondary btn-lg">Grab your first job</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-page">
      <div className="mx-auto max-w-2xl">
        {/* Stepper */}
        <ol className="mb-8 flex items-center gap-1.5" aria-label="Onboarding progress">
          {STEPS.map((s, i) => (
            <li key={s} className="flex-1">
              <div className={`h-1.5 rounded-pill transition-all ${i <= step ? "bg-violet-600" : "bg-surface-line"}`} />
              <p className={`mt-1.5 hidden text-[11px] font-semibold sm:block ${i === step ? "text-violet-700" : "text-ink-faint"}`}>{s}</p>
            </li>
          ))}
        </ol>

        <div className="card p-6 sm:p-10 animate-fade-up" key={step}>
          {step === 0 && (
            <>
              <h1 className="text-2xl font-extrabold text-ink">Create your account</h1>
              <p className="mt-1.5 text-sm text-ink-soft">One account to hire and be hired.</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <button className="btn-secondary btn-md w-full">
                  <GoogleIcon /> Continue with Google
                </button>
                <button className="btn-secondary btn-md w-full">
                  <LinkedInIcon /> Continue with LinkedIn
                </button>
              </div>
              <div className="my-6 flex items-center gap-3 text-xs text-ink-faint">
                <span className="h-px flex-1 bg-surface-line" /> or with email <span className="h-px flex-1 bg-surface-line" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div><label className="label" htmlFor="ob-name">Full name</label><input id="ob-name" className="input" placeholder="Priya Sharma" /></div>
                <div><label className="label" htmlFor="ob-phone">Mobile number</label><input id="ob-phone" className="input" placeholder="+91 98765 43210" inputMode="tel" /></div>
                <div className="sm:col-span-2"><label className="label" htmlFor="ob-email">Email</label><input id="ob-email" type="email" className="input" placeholder="you@example.com" /></div>
                <div className="sm:col-span-2"><label className="label" htmlFor="ob-pass">Password</label><input id="ob-pass" type="password" className="input" placeholder="8+ characters" /></div>
              </div>
              <label className="mt-5 flex cursor-pointer items-start gap-2.5 text-xs leading-relaxed text-ink-soft">
                <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-0.5 h-4 w-4 rounded accent-violet-600" />
                <span>
                  I accept the <Link className="font-semibold text-violet-700 underline" href="/policies">Terms</Link>,{" "}
                  <Link className="font-semibold text-violet-700 underline" href="/policies">Privacy Policy</Link>,{" "}
                  <Link className="font-semibold text-violet-700 underline" href="/policies">Barter Credit Policy</Link> and{" "}
                  <Link className="font-semibold text-violet-700 underline" href="/policies">Community Guidelines</Link>. I understand credits have no cash value.
                </span>
              </label>
              <p className="mt-3 text-[11px] text-ink-faint">We&apos;ll verify your email and mobile with an OTP in the next step.</p>
            </>
          )}

          {step === 1 && (
            <>
              <h1 className="text-2xl font-extrabold text-ink">What describes you?</h1>
              <p className="mt-1.5 text-sm text-ink-soft">Pick as many as you like — most members wear several hats.</p>
              <div className="mt-6 flex flex-wrap gap-2.5">
                {PROFILE_TYPES.map((t) => (
                  <button
                    key={t}
                    onClick={() => toggle(types, setTypes, t)}
                    aria-pressed={types.includes(t)}
                    className={`rounded-pill border px-4 py-2.5 text-sm font-semibold transition ${
                      types.includes(t)
                        ? "border-violet-600 bg-violet-600 text-white shadow-[0_6px_16px_-6px_rgba(106,47,245,0.5)]"
                        : "border-surface-line bg-white text-ink-soft hover:border-violet-300 hover:text-violet-700"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h1 className="text-2xl font-extrabold text-ink">What can you offer?</h1>
              <p className="mt-1.5 text-sm text-ink-soft">These become the jobs we recommend so you can start earning credits immediately.</p>
              <div className="mt-6 flex flex-wrap gap-2.5">
                {CATEGORIES.map((c) => (
                  <button
                    key={c}
                    onClick={() => toggle(offers, setOffers, c)}
                    aria-pressed={offers.includes(c)}
                    className={`rounded-pill border px-4 py-2.5 text-sm font-semibold transition ${
                      offers.includes(c)
                        ? "border-coral-500 bg-coral-500 text-white shadow-[0_6px_16px_-6px_rgba(255,92,31,0.5)]"
                        : "border-surface-line bg-white text-ink-soft hover:border-coral-300 hover:text-coral-600"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div><label className="label" htmlFor="ob-exp">Years of experience</label>
                  <select id="ob-exp" className="input"><option>0–1</option><option>2–4</option><option>5–8</option><option>9+</option></select>
                </div>
                <div><label className="label" htmlFor="ob-mode">Work preference</label>
                  <select id="ob-mode" className="input"><option>Remote</option><option>Onsite</option><option>Hybrid</option><option>All</option></select>
                </div>
                <div className="sm:col-span-2"><label className="label" htmlFor="ob-links">Portfolio / social links</label>
                  <input id="ob-links" className="input" placeholder="LinkedIn, Instagram, GitHub, Behance…" />
                </div>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h1 className="text-2xl font-extrabold text-ink">What help do you need?</h1>
              <p className="mt-1.5 text-sm text-ink-soft">We&apos;ll recommend providers and services for these from day one.</p>
              <div className="mt-6 flex flex-wrap gap-2.5">
                {CATEGORIES.map((c) => (
                  <button
                    key={c}
                    onClick={() => toggle(needs, setNeeds, c)}
                    aria-pressed={needs.includes(c)}
                    className={`rounded-pill border px-4 py-2.5 text-sm font-semibold transition ${
                      needs.includes(c)
                        ? "border-violet-600 bg-violet-600 text-white"
                        : "border-surface-line bg-white text-ink-soft hover:border-violet-300 hover:text-violet-700"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <h1 className="text-2xl font-extrabold text-ink">Activate your membership</h1>
              <p className="mt-1.5 text-sm text-ink-soft">Credits are added only after your payment succeeds.</p>
              <div className="mt-6 rounded-2xl border-2 border-violet-500 bg-violet-50/50 p-6">
                <div className="flex items-baseline justify-between">
                  <p className="text-lg font-bold text-ink">Monthly membership</p>
                  <p className="text-2xl font-extrabold text-ink">{inr(PRODUCT.subscription.priceInr)}<span className="text-sm font-medium text-ink-faint">/mo</span></p>
                </div>
                <ul className="mt-4 space-y-2 text-sm text-ink-soft">
                  <li className="flex items-center gap-2"><CreditIcon size={15} /> {num(PRODUCT.subscription.creditsPerCycle)} credits after each successful payment</li>
                  <li>✓ Earned credits never expire while you&apos;re active</li>
                  <li>✓ Cancel anytime · no cash exchange between members</li>
                </ul>
                <div className="mt-4 rounded-xl bg-white p-4 text-sm">
                  <div className="flex justify-between"><span className="text-ink-faint">Membership</span><span className="tabular-nums font-semibold text-ink">{inr(PRODUCT.subscription.priceInr)}</span></div>
                  <div className="mt-1 flex justify-between"><span className="text-ink-faint">GST ({PRODUCT.subscription.gstRatePct}%)</span><span className="tabular-nums font-semibold text-ink">{inr(gst)}</span></div>
                  <div className="mt-2 flex justify-between border-t border-surface-line pt-2"><span className="font-bold text-ink">Total today</span><span className="tabular-nums font-extrabold text-ink">{inr(PRODUCT.subscription.priceInr + gst)}</span></div>
                </div>
              </div>
              <p className="mt-4 text-center text-[11px] text-ink-faint">
                Secure Razorpay checkout · UPI, cards, netbanking · GST invoice emailed instantly
              </p>
            </>
          )}

          {/* Nav buttons */}
          <div className="mt-8 flex items-center justify-between gap-3">
            <button
              className="btn-ghost btn-md"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
            >
              ← Back
            </button>
            {step < STEPS.length - 1 ? (
              <button
                className="btn-primary btn-lg"
                onClick={() => setStep((s) => s + 1)}
                disabled={!canNext || (step === 0 && !agreed)}
              >
                Continue →
              </button>
            ) : (
              <button className="btn-coral btn-lg" onClick={() => setDone(true)}>
                Pay {inr(PRODUCT.subscription.priceInr + gst)} & activate
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
      <path fill="#4285F4" d="M23.5 12.3c0-.9-.1-1.5-.3-2.2H12v4.1h6.5c-.1 1.1-.8 2.7-2.4 3.8l3.7 2.9c2.3-2.1 3.7-5.1 3.7-8.6z" />
      <path fill="#34A853" d="M12 24c3.2 0 5.9-1.1 7.9-2.9l-3.7-2.9c-1 .7-2.4 1.2-4.2 1.2-3.2 0-5.9-2.1-6.8-5H1.3v3C3.3 21.3 7.3 24 12 24z" />
      <path fill="#FBBC05" d="M5.2 14.4c-.3-.7-.4-1.5-.4-2.4s.1-1.7.4-2.4v-3H1.3C.5 8.2 0 10 0 12s.5 3.8 1.3 5.4l3.9-3z" />
      <path fill="#EA4335" d="M12 4.7c1.8 0 3 .8 3.7 1.4L19 2.9C17 1.1 14.7 0 12 0 7.3 0 3.3 2.7 1.3 6.6l3.9 3c.9-2.8 3.6-4.9 6.8-4.9z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="#0A66C2" aria-hidden>
      <path d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2zM8 19H5v-9h3zM6.5 8.3A1.8 1.8 0 1 1 6.5 4.7a1.8 1.8 0 0 1 0 3.6zM19 19h-3v-4.7c0-1.1 0-2.6-1.6-2.6s-1.9 1.2-1.9 2.5V19h-3v-9h2.9v1.2h.1a3.2 3.2 0 0 1 2.9-1.6c3.1 0 3.6 2 3.6 4.6z" />
    </svg>
  );
}
