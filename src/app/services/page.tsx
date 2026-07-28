import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ServiceCard from "@/components/ServiceCard";
import { services } from "@/lib/data";

export const metadata: Metadata = {
  title: "Browse Services",
  description:
    "Hire top-rated members with your Skill Credits. Clear packages, fixed credit pricing, escrow-protected delivery.",
};

export default function ServicesPage() {
  return (
    <>
      <Nav />
      <main className="container-page py-10">
        <div className="mb-8">
          <p className="eyebrow mb-2">Services marketplace</p>
          <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Hire brilliant members with your credits
          </h1>
          <p className="mt-2 max-w-2xl text-ink-soft">
            Every service has transparent credit pricing and packages. Your
            credits are safely held in escrow until you approve the work.
          </p>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {["All", "Graphic Design", "Development", "Influencer Promotion", "Video Production", "Content Writing", "Performance Marketing"].map((c, i) => (
            <button
              key={c}
              className={`chip ${i === 0 ? "bg-violet-600 text-white" : "bg-white text-ink-soft shadow-card hover:text-violet-700"}`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {services.map((s) => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
