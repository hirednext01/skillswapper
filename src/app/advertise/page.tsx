import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { SectionHeading } from "@/components/ui";
import { PRODUCT, inr } from "@/lib/config";

export const metadata: Metadata = {
  title: "Advertise",
  description:
    "Sponsored placements across India's work-barter marketplace. ₹5,000 + GST per month, clearly labelled, with GST invoices.",
};

export default function AdvertisePage() {
  const price = PRODUCT.advertising.monthlyPriceInr;
  const gst = Math.round((price * PRODUCT.advertising.gstRatePct) / 100);

  return (
    <>
      <Nav />
      <main>
        <section className="gradient-hero py-16">
          <div className="container-page grid items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="eyebrow mb-3">Advertising</p>
              <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-5xl text-balance">
                Put your brand in front of 12,000+ doers
              </h1>
              <p className="mt-4 max-w-lg text-lg text-ink-soft">
                Founders, freelancers, creators and agencies live here.
                Sponsored placements are paid in real currency to the platform —
                clearly labelled, and never mixed into organic rankings.
              </p>
              <div className="mt-6 flex items-baseline gap-2">
                <span className="text-4xl font-extrabold text-ink">{inr(price)}</span>
                <span className="text-ink-faint">+ {inr(gst)} GST / month per placement</span>
              </div>
              <a href="#book" className="btn-coral btn-lg mt-6">Book a placement</a>
            </div>

            {/* Ad preview */}
            <div className="card p-5">
              <p className="mb-3 text-xs font-bold uppercase tracking-wide text-ink-faint">Live preview — homepage featured</p>
              <div className="rounded-2xl border border-surface-line p-5">
                <span className="chip mb-3 bg-ink text-white">● Sponsored</span>
                <div className="mb-3 h-28 rounded-xl bg-gradient-to-br from-violet-100 to-coral-100" aria-label="Ad creative placeholder" />
                <h3 className="font-bold text-ink">Your headline here</h3>
                <p className="mt-1 text-sm text-ink-soft">A concise description of your offer for the marketplace audience.</p>
                <span className="btn-primary btn-sm mt-3">Your CTA →</span>
              </div>
            </div>
          </div>
        </section>

        <section className="container-page py-14">
          <SectionHeading center eyebrow="Placements" title="Where your ad can appear" />
          <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["🏠", "Homepage featured", "Prime slot in the featured opportunities strip"],
              ["🗂️", "Category pages", "Target members browsing your exact category"],
              ["🔍", "Search results", "Appear alongside relevant organic results"],
              ["📊", "Dashboard banner", "Seen by active members every day"],
              ["✦", "Featured service", "Boost one of your service listings"],
              ["📣", "Featured job", "Get your job filled faster"],
            ].map(([icon, t, d]) => (
              <div key={t} className="card card-hover p-5">
                <span className="text-2xl" aria-hidden>{icon}</span>
                <h3 className="mt-2 text-sm font-bold text-ink">{t}</h3>
                <p className="mt-1 text-xs leading-relaxed text-ink-soft">{d}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="book" className="border-t border-surface-line bg-white py-14">
          <div className="container-page">
            <SectionHeading center eyebrow="Book now" title="Set up your campaign" sub="Campaigns go live after moderation review. GST invoice generated automatically." />
            <form className="card mx-auto max-w-2xl space-y-4 p-6 sm:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <div><label className="label" htmlFor="ad-place">Placement</label>
                  <select id="ad-place" className="input"><option>Homepage featured</option><option>Category page</option><option>Search results</option><option>Dashboard banner</option><option>Featured service</option><option>Featured job</option></select>
                </div>
                <div><label className="label" htmlFor="ad-cat">Target categories</label>
                  <select id="ad-cat" className="input"><option>All categories</option><option>Development</option><option>Design</option><option>Marketing</option><option>Creators</option></select>
                </div>
                <div><label className="label" htmlFor="ad-start">Start date</label><input id="ad-start" type="date" className="input" /></div>
                <div><label className="label" htmlFor="ad-end">End date</label><input id="ad-end" type="date" className="input" /></div>
              </div>
              <div><label className="label" htmlFor="ad-headline">Headline</label><input id="ad-headline" className="input" maxLength={60} placeholder="Max 60 characters" /></div>
              <div><label className="label" htmlFor="ad-desc">Description</label><textarea id="ad-desc" rows={3} className="input resize-none" maxLength={140} placeholder="Max 140 characters" /></div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div><label className="label" htmlFor="ad-url">Destination URL</label><input id="ad-url" type="url" className="input" placeholder="https://" /></div>
                <div><label className="label" htmlFor="ad-gstin">GSTIN (for invoice)</label><input id="ad-gstin" className="input" placeholder="22AAAAA0000A1Z5" /></div>
              </div>
              <div className="rounded-xl bg-surface-soft p-4 text-sm">
                <div className="flex justify-between"><span className="text-ink-faint">Placement (30 days)</span><span className="font-semibold tabular-nums text-ink">{inr(price)}</span></div>
                <div className="mt-1 flex justify-between"><span className="text-ink-faint">GST ({PRODUCT.advertising.gstRatePct}%)</span><span className="font-semibold tabular-nums text-ink">{inr(gst)}</span></div>
                <div className="mt-2 flex justify-between border-t border-surface-line pt-2"><span className="font-bold text-ink">Total payable</span><span className="font-extrabold tabular-nums text-ink">{inr(price + gst)}</span></div>
              </div>
              <button type="button" className="btn-coral btn-lg w-full">Continue to payment</button>
              <p className="text-center text-[11px] text-ink-faint">
                Advertising is paid in INR to the platform — never in credits. All creatives reviewed before going live.
              </p>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
