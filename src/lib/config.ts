/**
 * Product configuration — keep the brand name, pricing and credit
 * quantities configurable in one place. In production these come from
 * the platform_settings table managed in the admin panel.
 */
export const PRODUCT = {
  name: "SkillSwap",
  tagline: "Get work done by sharing what you do best.",
  creditName: "Credits",
  creditNameSingular: "Credit",
  subscription: {
    priceInr: 1199,
    creditsPerCycle: 10_000,
    gstRatePct: 18,
  },
  creditPacks: [
    { id: "pack-10k", credits: 10_000, priceInr: 1199 },
    { id: "pack-20k", credits: 20_000, priceInr: 2398 },
    { id: "pack-30k", credits: 30_000, priceInr: 3597 },
  ],
  advertising: {
    monthlyPriceInr: 5000,
    gstRatePct: 18,
  },
  legal: {
    creditPolicy:
      "Credits are closed-loop platform credits used to request eligible services on the platform. Members may receive credits through membership, purchase approved credit packs or earn credits by completing work. Credits cannot be withdrawn, redeemed for cash, sold directly, gifted or transferred outside a legitimate platform contract.",
  },
} as const;

export const inr = (n: number) =>
  "₹" + n.toLocaleString("en-IN", { maximumFractionDigits: 0 });

export const num = (n: number) => n.toLocaleString("en-IN");
