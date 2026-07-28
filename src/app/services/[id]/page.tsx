import { notFound } from "next/navigation";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { memberById, services } from "@/lib/data";
import { Avatar, Stars, VerifiedBadge } from "@/components/ui";
import PackagePicker from "./PackagePicker";

export function generateStaticParams() {
  return services.map((s) => ({ id: s.id }));
}

export function generateMetadata({ params }: { params: { id: string } }) {
  const svc = services.find((s) => s.id === params.id);
  return svc ? { title: svc.title } : {};
}

export default function ServiceDetail({ params }: { params: { id: string } }) {
  const svc = services.find((s) => s.id === params.id);
  if (!svc) notFound();
  const provider = memberById(svc.providerId);

  return (
    <>
      <Nav />
      <main className="container-page py-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
          <article>
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="chip bg-surface-soft text-ink-soft">{svc.category}</span>
              {svc.badge && (
                <span className={`chip ${svc.badge === "Sponsored" ? "bg-ink text-white" : "bg-gold-100 text-gold-700"}`}>
                  {svc.badge === "Sponsored" ? "● Sponsored" : svc.badge}
                </span>
              )}
            </div>

            <h1 className="text-2xl font-extrabold leading-tight tracking-tight text-ink sm:text-3xl text-balance">
              {svc.title}
            </h1>

            <div className="mt-5 flex flex-wrap items-center gap-4">
              <Link href={`/members/${provider.id}`} className="flex items-center gap-3">
                <Avatar name={provider.name} hue={provider.avatarHue} size={48} ring />
                <div>
                  <p className="flex items-center gap-1.5 font-bold text-ink">
                    {provider.name} {provider.verified && <VerifiedBadge />}
                  </p>
                  <p className="text-xs text-ink-faint">{provider.headline}</p>
                </div>
              </Link>
              <div className="flex items-center gap-3 text-sm text-ink-soft">
                <Stars rating={svc.rating} />
                <span className="text-ink-faint">({svc.orders} orders)</span>
                <span className="text-ink-faint">· Responds in {provider.responseTime}</span>
              </div>
            </div>

            {/* Gallery */}
            <div className="mt-6 grid grid-cols-3 gap-3">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className={`rounded-2xl ${i === 0 ? "col-span-3 h-64 sm:h-80" : "h-28 sm:h-36"}`}
                  style={{
                    background: `linear-gradient(135deg, hsl(${svc.coverHue + i * 15} 70% ${90 - i * 4}%), hsl(${svc.coverHue + 40 + i * 15} 62% ${82 - i * 4}%))`,
                  }}
                  aria-label={`Portfolio sample ${i + 1}`}
                />
              ))}
            </div>

            <section className="card mt-6 p-6">
              <h2 className="mb-3 text-lg font-bold text-ink">About this service</h2>
              <p className="leading-relaxed text-ink-soft">
                {provider.name.split(" ")[0]} delivers {svc.category.toLowerCase()} work
                trusted by {svc.orders}+ members. Every order includes {svc.revisions}{" "}
                revision round{svc.revisions === 1 ? "" : "s"}, delivery inside the
                platform workroom, and clear requirements collected up-front so
                work starts immediately after your credits enter escrow.
              </p>
              <h3 className="mb-2 mt-6 text-sm font-bold text-ink">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {provider.skills.map((s) => (
                  <span key={s} className="chip bg-violet-50 text-violet-700">{s}</span>
                ))}
              </div>
            </section>

            <section className="card mt-6 p-6">
              <h2 className="mb-4 text-lg font-bold text-ink">How ordering works</h2>
              <ol className="space-y-3">
                {[
                  "Pick a package and answer the provider's requirement questions.",
                  "Your credits move into escrow — the provider is notified instantly.",
                  "The provider accepts within 24 hours (or credits auto-return to you).",
                  "Work is delivered in the workroom; request revisions if needed.",
                  "You approve — credits release to the provider and you both leave reviews.",
                ].map((step, i) => (
                  <li key={i} className="flex gap-3 text-sm text-ink-soft">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-100 text-xs font-bold text-violet-700">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </section>
          </article>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <PackagePicker service={svc} />
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}
