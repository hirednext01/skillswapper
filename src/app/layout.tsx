import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "./globals.css";
import { PRODUCT } from "@/lib/config";

export const metadata: Metadata = {
  title: {
    default: `${PRODUCT.name} — Get work done by sharing what you do best`,
    template: `%s — ${PRODUCT.name}`,
  },
  description:
    "A closed-loop barter marketplace. Members earn and spend Skill Credits by completing real work for each other — no cash between members, ever.",
  openGraph: {
    siteName: PRODUCT.name,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
