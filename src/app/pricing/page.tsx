import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { CreditIcon, SectionHeading } from "@/components/ui";
import { PRODUCT, inr, num } from "@/lib/config";

export const metadata: Metadata = {
  title: "Pricing & Credit Packs",
  description:
    "₹1,199/month membership with 10,000 credits per cycle. Buy approved credit packs whenever you need more. GST invoices included.",
};

export default function PricingPage() {
  const gstPct = PRODUCT.subscription.gstRatePct;

  return (
    <>
      <Nav />
      <main>
        <section className="gradient-hero py-16 text-center">
          <div className="container-page">
            <p className="eyebrow mb-3">Simple, honest pricing</p>
            <h1 className="mx-auto max-w-2xl text-3xl font-extrabold tracking-tight text-ink sm:text-5xl text-balance">
              One membership. A whole economy of skills.
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-ink-soft">
              No cash between members — ever. Your money only buys membership and
              approved credit packs from the platform, with GST invoices included.
            </p>
          </div>
        </section>

        {/* Membership card */}
        <section className="container-page -mt-6 pb-16">
          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
            <div className="card relative overflow-hidden p-8 ring-2 ring-violet-500">
              <span className="chip absolute right-6 top-6 bg-violet-600 text-white">Monthly</span>
              <h2 className="text-lg font-bold text-ink">Membership</h2>
              <p className="mt-3 flex items-baseline gap-1.5">
                <span className="text-5xl font-extrabold tracking-tight text-ink">{inr(PRODUCT.subscription.priceInr)}</span>
                <span className="text-ink-faint">/month + GST</span>
              </p>
              <ul className="mt-6 space-y-3 text-sm text-ink-soft">
                {[
                  `${num(PRODUCT.subscription.creditsPerCycle)} credits added after every successful payment`,
                  "Earned credits stay in your wallet — they don't expire while you're active",
                  "Post jobs and offer services from one account",
                  "Escrow protection on every contract",
                  "GST-ready invoice for every payment",
                  "Cancel anytime — finish accepted work even if you lapse",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <svg className="mt-0.5 shrink-0 text-mint-500" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/onboarding" className="btn-primary btn-lg mt-8 w-full">
                Start membership
              </Link>
              <p className="mt-3 text-center text-[11px] text-ink-faint">
                Secure Razorpay checkout · UPI, cards & netbanking
              </p>
            </div>

            <div className="card p-8">
              <h2 className="text-lg font-bold text-ink">Annual plan</h2>
              <p className="mt-3 flex items-baseline gap-1.5">
                <span className="text-5xl font-extrabold tracking-tight text-ink-faint">Soon</span>
              </p>
              <p className="mt-6 text-sm leading-relaxed text-ink-soft">
                An annual membership with bonus allocation is on the roadmap.
                Join the monthly plan now — {`you'll`} be able to switch plans
                without losing a single earned credit.
              </p>
              <div className="mt-8 rounded-2xl bg-surface-soft p-5">
                <h3 className="text-sm font-bold text-ink">If your membership lapses</h3>
                <ul className="mt-3 space-y-2 text-xs leading-relaxed text-ink-soft">
                  <li>· Your credit balance stays visible — nothing is erased</li>
                  <li>· Active contracts and disputes remain accessible</li>
                  <li>· You can complete already-accepted obligations</li>
                  <li>· Spending resumes the moment you reactivate</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Credit packs */}
        <section id="credit-packs" className="border-t border-surface-line bg-white py-16">
          <div className="container-page">
            <SectionHeading
              center
              eyebrow="Buy More Credits"
              title="Need more credits? Top up anytime."
              sub="Approved credit packs, priced by the platform, with GST invoices. Purchased credits work exactly like earned ones — and can never be cashed out."
            />
            <div className="mx-auto grid max-w-4xl gap-5 sm:grid-cols-3">
              {PRODUCT.creditPacks.map((p, i) => {
                const gst = Math.round((p.priceInr * gstPct) / 100);
                return (
                  <div key={p.id} className={`card card-hover p-6 text-center ${i === 1 ? "ring-2 ring-coral-400" : ""}`}>
                    {i === 1 && <span className="chip mx-auto mb-3 bg-coral-500 text-white">Best value</span>}
                    <p className="flex items-center justify-center gap-2 text-3xl font-extrabold text-ink">
                      <CreditIcon size={24} /> {num(p.credits)}
                    </p>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-ink-faint">credits</p>
                    <div className="my-5 rounded-xl bg-surface-soft p-4 text-sm">
                      <div className="flex justify-between"><span className="text-ink-faint">Base price</span><span className="font-semibold tabular-nums text-ink">{inr(p.priceInr)}</span></div>
                      <div className="mt-1 flex justify-between"><span className="text-ink-faint">GST ({gstPct}%)</span><span className="font-semibold tabular-nums text-ink">{inr(gst)}</span></div>
                      <div className="mt-2 flex justify-between border-t border-surface-line pt-2"><span className="font-bold text-ink">Payable</span><span className="font-extrabold tabular-nums text-ink">{inr(p.priceInr + gst)}</span></div>
                    </div>
                    <button className={`${i === 1 ? "btn-coral" : "btn-primary"} btn-md w-full`}>
                      Buy this pack
                    </button>
                  </div>
                );
              })}
            </div>
            <p className="mx-auto mt-8 max-w-2xl rounded-2xl bg-surface-soft p-5 text-center text-xs leading-relaxed text-ink-faint">
              Credits are added only after Razorpay confirms your payment — never
              on webhook retries, never twice. Failed, pending or refunded
              payments produce no usable credits. {PRODUCT.legal.creditPolicy}
            </p>
          </div>
        </section>

        {/* Advertising cross-sell */}
        <section className="container-page py-16 text-center">
          <SectionHeading
            center
            eyebrow="For businesses"
            title="Want more eyes on your services?"
            sub={`Sponsored placements across the marketplace from ${inr(PRODUCT.advertising.monthlyPriceInr)} + GST per month. Clearly labelled, never mixed into organic rankings.`}
          />
          <Link href="/advertise" className="btn-secondary btn-lg">
            Explore advertising →
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
