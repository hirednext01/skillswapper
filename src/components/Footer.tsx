import Link from "next/link";
import { PRODUCT } from "@/lib/config";
import { Logo } from "./Nav";

const cols: { title: string; links: [string, string][] }[] = [
  {
    title: "Marketplace",
    links: [
      ["Browse Jobs", "/jobs"],
      ["Browse Services", "/services"],
      ["Categories", "/jobs"],
      ["Top Members", "/leaderboard"],
      ["Success Stories", "/how-it-works"],
    ],
  },
  {
    title: "Membership",
    links: [
      ["Pricing", "/pricing"],
      ["Buy Credits", "/pricing#credit-packs"],
      ["How It Works", "/how-it-works"],
      ["Advertise", "/advertise"],
      ["Help & Support", "/how-it-works#faq"],
    ],
  },
  {
    title: "Policies",
    links: [
      ["Terms of Service", "/policies"],
      ["Privacy Policy", "/policies"],
      ["Community Guidelines", "/policies"],
      ["Barter Credit Policy", "/policies"],
      ["Dispute Policy", "/policies"],
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-surface-line bg-white">
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-soft">
              {PRODUCT.tagline} Earn credits by helping others, then use your
              skills instead of cash.
            </p>
            <p className="mt-5 rounded-xl bg-surface-soft p-4 text-xs leading-relaxed text-ink-faint">
              {PRODUCT.legal.creditPolicy}
            </p>
          </div>
          {cols.map((c) => (
            <nav key={c.title} aria-label={c.title}>
              <h3 className="mb-3.5 text-sm font-bold text-ink">{c.title}</h3>
              <ul className="space-y-2.5">
                {c.links.map(([label, href]) => (
                  <li key={label}>
                    <Link href={href} className="text-sm text-ink-soft transition hover:text-violet-700">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-surface-line pt-6 text-xs text-ink-faint sm:flex-row sm:items-center">
          <p>© 2026 {PRODUCT.name}. All rights reserved. Credits have no monetary or withdrawal value.</p>
          <p>Made in India 🇮🇳 · GST-compliant invoicing</p>
        </div>
      </div>
    </footer>
  );
}
