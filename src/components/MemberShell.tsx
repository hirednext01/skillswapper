"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Nav from "./Nav";
import Footer from "./Footer";
import { Avatar } from "./ui";

const menu = [
  { href: "/dashboard", label: "Dashboard", icon: "▦" },
  { href: "/wallet", label: "Wallet & Credits", icon: "⬡" },
  { href: "/workroom", label: "Workroom", icon: "◨" },
  { href: "/jobs", label: "Find Jobs", icon: "◎" },
  { href: "/services", label: "Find Services", icon: "✦" },
  { href: "/admin", label: "Admin Panel", icon: "⚙" },
];

export default function MemberShell({
  children,
  title,
  sub,
}: {
  children: React.ReactNode;
  title: string;
  sub?: string;
}) {
  const pathname = usePathname();

  return (
    <>
      <Nav />
      <div className="container-page grid gap-8 py-8 lg:grid-cols-[240px_1fr]">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="card mb-4 flex items-center gap-3 p-4">
            <Avatar name="Tarushikha Demo" hue={265} size={42} ring />
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-ink">Tarushikha</p>
              <p className="text-[11px] text-mint-700">● Active member</p>
            </div>
          </div>
          <nav className="card flex gap-1 overflow-x-auto p-2 scrollbar-none lg:flex-col" aria-label="Member menu">
            {menu.map((m) => (
              <Link
                key={m.href}
                href={m.href}
                className={`flex shrink-0 items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition ${
                  pathname === m.href
                    ? "bg-violet-600 text-white shadow-[0_6px_16px_-6px_rgba(106,47,245,0.5)]"
                    : "text-ink-soft hover:bg-surface-soft hover:text-ink"
                }`}
              >
                <span aria-hidden>{m.icon}</span>
                {m.label}
              </Link>
            ))}
          </nav>
        </aside>

        <main>
          <div className="mb-6">
            <h1 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">{title}</h1>
            {sub && <p className="mt-1.5 text-sm text-ink-soft">{sub}</p>}
          </div>
          {children}
        </main>
      </div>
      <Footer />
    </>
  );
}
