import Link from "next/link";
import { Service, memberById } from "@/lib/data";
import { Avatar, CreditAmount, Stars, VerifiedBadge } from "./ui";

const badgeStyles: Record<string, string> = {
  "Top Rated": "bg-gold-100 text-gold-700",
  "Rising Talent": "bg-mint-100 text-mint-700",
  Sponsored: "bg-ink text-white",
};

export default function ServiceCard({ service }: { service: Service }) {
  const provider = memberById(service.providerId);

  return (
    <article className="card card-hover relative flex flex-col overflow-hidden">
      {/* Cover */}
      <div
        className="relative flex h-32 items-end p-4"
        style={{
          background: `linear-gradient(135deg, hsl(${service.coverHue} 70% 92%), hsl(${service.coverHue + 30} 60% 84%))`,
        }}
      >
        {service.badge && (
          <span className={`chip absolute left-4 top-4 ${badgeStyles[service.badge]}`}>
            {service.badge === "Sponsored" ? "● Sponsored" : service.badge}
          </span>
        )}
        <span
          className="text-5xl font-black opacity-20"
          style={{ color: `hsl(${service.coverHue} 60% 35%)` }}
          aria-hidden
        >
          {service.category.slice(0, 1)}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-center gap-2.5">
          <Avatar name={provider.name} hue={provider.avatarHue} size={34} />
          <div className="min-w-0">
            <p className="flex items-center gap-1 truncate text-xs font-semibold text-ink">
              {provider.name}
              {provider.verified && <VerifiedBadge size={13} />}
            </p>
            <p className="truncate text-[11px] text-ink-faint">{provider.headline}</p>
          </div>
        </div>

        <h3 className="mb-3 text-[15px] font-bold leading-snug text-ink">
          <Link href={`/services/${service.id}`} className="after:absolute after:inset-0 hover:text-violet-700">
            {service.title}
          </Link>
        </h3>

        <div className="mb-4 flex items-center gap-3 text-xs text-ink-soft">
          <Stars rating={service.rating} />
          <span className="text-ink-faint">({service.orders} orders)</span>
          <span className="ml-auto font-medium">{service.deliveryDays}-day delivery</span>
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-surface-line pt-4">
          <span className="text-xs font-medium text-ink-faint">Starting at</span>
          <CreditAmount amount={service.startingCredits} size="lg" />
        </div>
      </div>
    </article>
  );
}
