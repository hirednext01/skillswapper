"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { PRODUCT } from "@/lib/config";
import { CreditIcon } from "./ui";

const links = [
  { href: "/jobs", label: "Browse Jobs" },
  { href: "/services", label: "Browse Services" },
  { href: "/leaderboard", label: "Top Members" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/pricing", label: "Pricing" },
];

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2" aria-label={`${PRODUCT.name} home`}>
      <CreditIcon size={28} />
      <span className={`text-xl font-extrabold tracking-tight ${light ? "text-white" : "text-ink"}`}>
        {PRODUCT.name}
      </span>
    </Link>
  );
}

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-surface-line/80 bg-white/85 backdrop-blur-lg">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-pill px-3.5 py-2 text-sm font-medium transition ${
                pathname.startsWith(l.href)
                  ? "bg-violet-50 text-violet-700"
                  : "text-ink-soft hover:bg-surface-soft hover:text-ink"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2.5 lg:flex">
          <Link href="/dashboard" className="btn-ghost btn-md">
            Log in
          </Link>
          <Link href="/onboarding" className="btn-primary btn-md">
            Join for ₹1,199/mo
          </Link>
        </div>

        <button
          className="btn-ghost btn-sm lg:hidden"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="border-t border-surface-line bg-white px-4 py-4 lg:hidden animate-fade-up" aria-label="Mobile">
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-medium text-ink-soft hover:bg-surface-soft"
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-2.5">
              <Link href="/dashboard" onClick={() => setOpen(false)} className="btn-secondary btn-md w-full">
                Log in
              </Link>
              <Link href="/onboarding" onClick={() => setOpen(false)} className="btn-primary btn-md w-full">
                Join for ₹1,199/mo
              </Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
