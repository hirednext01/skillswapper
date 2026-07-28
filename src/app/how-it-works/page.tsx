import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { SectionHeading } from "@/components/ui";
import { PRODUCT, inr, num } from "@/lib/config";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "How the SkillSwap barter economy works — membership, credits, escrow, disputes and trust.",
};

const faqs = [
  { q: "Are credits real money?", a: "No. Credits are closed-loop platform credits with no cash value. They can't be withdrawn, sold, gifted or converted to money — they can only be spent on eligible services inside the platform." },
  { q: "How do I earn credits?", a: "Complete work for other members. When they approve your delivery, the escrowed credits release to your wallet instantly and atomically, with a full ledger record." },
  { q: "What if the work isn't delivered or isn't good?", a: "Credits sit in escrow until you approve. You can request revisions, and if things go wrong, raise a dispute — a human moderator can release, refund or split the escrow, with every decision recorded." },
  { q: "Can I be both a client and a provider?", a: "Yes — every account can post jobs and offer services. Most members do both: earn credits with their skills, spend them on what they need." },
  { q: "What happens if my subscription lapses?", a: "Your balance stays visible and earned credits are never erased. You can finish accepted work and access active disputes, but spending pauses until you reactivate." },
  { q: "Can I buy extra credits?", a: `Yes — approved packs only: ${PRODUCT.creditPacks.map((p) => `${num(p.credits)} for ${inr(p.priceInr)}`).join(", ")} (+ GST). Credits are added only after payment is verified, and every purchase gets a GST invoice.` },
  { q: "Why can't members pay each other cash?", a: "The closed loop is what keeps the marketplace fair, safe and honest. Cash solicitation is automatically detected, warned and reviewable by moderators." },
];

export default function HowItWorksPage() {
  return (
    <>
      <Nav />
      <main>
        <section className="gradient-hero py-16 text-center">
          <div className="container-page">
            <p className="eyebrow mb-3">How it works</p>
            <h1 className="mx-auto max-w-3xl text-3xl font-extrabold tracking-tight text-ink sm:text-5xl text-balance">
              A complete economy where <span className="gradient-brand-text">skills are the currency</span>
            </h1>
          </div>
        </section>

        <section className="container-page py-14">
          <div className="mx-auto max-w-3xl space-y-6">
            {[
              { icon: "🪪", t: "1 · Become a member", d: `Pay ${inr(PRODUCT.subscription.priceInr)}/month and receive ${num(PRODUCT.subscription.creditsPerCycle)} credits after every successful billing cycle. Complete your profile: what you offer, what you need.` },
              { icon: "📣", t: "2 · Post work or offer services", d: "Post jobs with a credit budget, or list services with packages. Collaborations, product-for-service deals, physical/local tasks, promotions and consultations are all first-class citizens." },
              { icon: "🔒", t: "3 · Escrow protects everyone", d: "When a provider is hired, the credits lock in escrow immediately. Providers know payment is guaranteed; posters know credits only release when work is approved." },
              { icon: "🛠️", t: "4 · Work happens in the workroom", d: "Messages, files, milestones, deliverables and revision requests all live in one place — with system-generated status updates and a full activity history." },
              { icon: "⚡", t: "5 · Approve, release, review", d: "Approval releases credits atomically to the provider's wallet. Both parties rate each other on quality, communication, timeliness and professionalism." },
              { icon: "⚖️", t: "6 · Disputes handled by humans", d: "If something goes wrong, structured disputes with evidence go to moderators who can release, refund or split escrow — every outcome is written to the permanent ledger." },
            ].map((s) => (
              <div key={s.t} className="card card-hover flex gap-5 p-6">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-violet-50 text-2xl">{s.icon}</span>
                <div>
                  <h2 className="font-bold text-ink">{s.t}</h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Success story */}
        <section className="border-y border-surface-line bg-white py-14">
          <div className="container-page">
            <SectionHeading center eyebrow="Success stories" title="Real barters, real outcomes" />
            <div className="mx-auto grid max-w-4xl gap-5 md:grid-cols-3">
              {[
                { quote: "I built a landing page for a founder, then spent those credits on a month of Instagram promotion. Zero rupees changed hands.", who: "Rahul M., Developer · Kochi" },
                { quote: "As a creator, my reach is my skill. I've traded promotions for video editing, a pitch deck and even my GST filing.", who: "Priya S., Creator · Mumbai" },
                { quote: "We staffed our seed-stage startup's entire design sprint with credits we earned doing recruitment for other members.", who: "Meera N., Recruiter · Pune" },
              ].map((s) => (
                <figure key={s.who} className="card p-6">
                  <blockquote className="text-sm leading-relaxed text-ink-soft">&ldquo;{s.quote}&rdquo;</blockquote>
                  <figcaption className="mt-4 text-xs font-bold text-ink">{s.who}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="container-page py-16">
          <SectionHeading center eyebrow="FAQ" title="Questions, answered" />
          <div className="mx-auto max-w-3xl space-y-3">
            {faqs.map((f) => (
              <details key={f.q} className="card group p-5 open:ring-1 open:ring-violet-200">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-ink">
                  {f.q}
                  <span className="text-violet-600 transition group-open:rotate-45" aria-hidden>＋</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{f.a}</p>
              </details>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/onboarding" className="btn-primary btn-lg">Join {PRODUCT.name} today</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
