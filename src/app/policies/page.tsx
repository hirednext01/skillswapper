import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { PRODUCT } from "@/lib/config";

export const metadata: Metadata = {
  title: "Policies",
  description: "Terms, privacy, community guidelines and the Barter Credit Policy.",
};

const policies = [
  {
    title: "Barter Credit Policy",
    body: [
      PRODUCT.legal.creditPolicy,
      "Credits are not cryptocurrency, an investment, stored money or an appreciating asset. They carry no interest, no redemption value and no expectation of monetary gain.",
      "Monthly membership credits are allocated only after a successful, verified payment. Earned credits do not expire while the account remains active, unless an admin-configurable policy states otherwise.",
      "Credits move between members exclusively through legitimate platform contracts protected by escrow. Direct transfers, gifts, sales and withdrawals are not possible.",
    ],
  },
  {
    title: "Community Guidelines",
    body: [
      "Treat every member professionally. Deliver what you commit to, on time, through the platform workroom.",
      "Requesting or offering cash payment between members is prohibited and automatically flagged. Legitimate contact sharing is allowed after a contract starts — off-platform payment never is.",
      "Self-dealing, duplicate accounts, circular credit trades, fabricated jobs and fake reviews are detected, flagged for human review and may lead to warnings or suspension.",
    ],
  },
  {
    title: "Dispute Policy",
    body: [
      "Either party may raise a structured dispute on an active contract or milestone with evidence and a desired resolution.",
      "Moderators may release escrow in full, refund in full, order a split settlement, grant a revision period or cancel the contract. Every decision is recorded in the ledger and audit log.",
    ],
  },
  {
    title: "Refund & Cancellation Policy",
    body: [
      "Membership renewals can be cancelled anytime; access continues until the end of the paid period. Credit-pack purchases are refundable only where required by law; refunded payments never leave spendable credits behind.",
      "If a provider declines or fails to accept an order in time, escrowed credits return to the buyer automatically.",
    ],
  },
  {
    title: "Terms of Service & Privacy (summary)",
    body: [
      "Full legal terms, privacy policy and prohibited-services policy are configurable pages managed by platform admins.",
      "This business model — including GST on barter transactions, service invoicing, consumer protection and credit treatment — should be reviewed by an Indian lawyer and tax professional before launch.",
    ],
  },
];

export default function PoliciesPage() {
  return (
    <>
      <Nav />
      <main className="container-page py-12">
        <div className="mx-auto max-w-3xl">
          <p className="eyebrow mb-2">Legal</p>
          <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">Platform policies</h1>
          <p className="mt-3 text-ink-soft">
            Clear rules keep the barter economy fair. These pages are editable by
            admins and versioned in production.
          </p>
          <div className="mt-8 space-y-6">
            {policies.map((p) => (
              <section key={p.title} className="card p-6 sm:p-8">
                <h2 className="mb-3 text-lg font-bold text-ink">{p.title}</h2>
                <div className="space-y-3">
                  {p.body.map((para, i) => (
                    <p key={i} className="text-sm leading-relaxed text-ink-soft">{para}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
