import { num } from "@/lib/config";

/** The platform credit mark — a rounded hexagon with a bolt. */
export function CreditIcon({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={`inline-block shrink-0 ${className}`}
      aria-hidden
    >
      <path
        d="M12 1.8c.6 0 1.2.16 1.73.46l6.06 3.5a3.46 3.46 0 0 1 1.73 3v7a3.46 3.46 0 0 1-1.73 3l-6.06 3.5a3.46 3.46 0 0 1-3.46 0l-6.06-3.5a3.46 3.46 0 0 1-1.73-3v-7a3.46 3.46 0 0 1 1.73-3l6.06-3.5A3.46 3.46 0 0 1 12 1.8Z"
        fill="url(#creditGrad)"
      />
      <path
        d="M13.2 6.5 8.6 12.8h2.9l-.7 4.7 4.6-6.3h-2.9l.7-4.7Z"
        fill="#fff"
      />
      <defs>
        <linearGradient id="creditGrad" x1="4" y1="3" x2="20" y2="21">
          <stop stopColor="#8B5CFF" />
          <stop offset="1" stopColor="#5B21D6" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function CreditAmount({
  amount,
  size = "md",
  className = "",
}: {
  amount: number;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}) {
  const sizes = {
    sm: { icon: 13, text: "text-xs" },
    md: { icon: 16, text: "text-sm" },
    lg: { icon: 19, text: "text-lg" },
    xl: { icon: 26, text: "text-3xl" },
  }[size];
  return (
    <span className={`inline-flex items-center gap-1.5 font-bold tabular-nums text-ink ${sizes.text} ${className}`}>
      <CreditIcon size={sizes.icon} />
      {num(amount)}
    </span>
  );
}

export function Avatar({
  name,
  hue,
  size = 40,
  ring = false,
}: {
  name: string;
  hue: number;
  size?: number;
  ring?: boolean;
}) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
  return (
    <span
      className={`inline-flex shrink-0 select-none items-center justify-center rounded-full font-bold text-white ${ring ? "ring-2 ring-white shadow-card" : ""}`}
      style={{
        width: size,
        height: size,
        fontSize: size * 0.38,
        background: `linear-gradient(135deg, hsl(${hue} 75% 62%), hsl(${hue + 40} 70% 48%))`,
      }}
      aria-hidden
    >
      {initials}
    </span>
  );
}

export function VerifiedBadge({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" className="inline-block shrink-0" aria-label="Verified member">
      <path
        d="M10 1.5l2.1 1.6 2.6-.3 1 2.4 2.4 1-.3 2.6 1.6 2.2-1.6 2.1.3 2.6-2.4 1-1 2.4-2.6-.3L10 20.4l-2.1-1.6-2.6.3-1-2.4-2.4-1 .3-2.6L.6 11l1.6-2.2-.3-2.6 2.4-1 1-2.4 2.6.3L10 1.5z"
        fill="#7C4DFF"
        transform="translate(0 -1)"
      />
      <path d="M6.4 9.9l2.3 2.3 4.6-4.6" stroke="#fff" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Stars({ rating, className = "" }: { rating: number; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1 text-sm font-semibold text-ink ${className}`}>
      <svg width="14" height="14" viewBox="0 0 20 20" fill="#E8A912" aria-hidden>
        <path d="M10 1.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L10 14.9l-5.3 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
      </svg>
      {rating.toFixed(1)}
    </span>
  );
}

const STATUS_STYLES: Record<string, string> = {
  Open: "bg-mint-100 text-mint-700",
  "Almost filled": "bg-gold-100 text-gold-700",
  "In discussion": "bg-violet-100 text-violet-700",
  Assigned: "bg-surface-sunken text-ink-soft",
  Closed: "bg-surface-sunken text-ink-faint",
  Expired: "bg-surface-sunken text-ink-faint",
};

export function StatusPill({ status }: { status: string }) {
  return (
    <span className={`chip ${STATUS_STYLES[status] ?? "bg-surface-sunken text-ink-soft"}`}>
      {status === "Open" && (
        <span className="h-1.5 w-1.5 rounded-full bg-mint-500 animate-pulse-dot" aria-hidden />
      )}
      {status}
    </span>
  );
}

export function UrgentBadge() {
  return (
    <span className="chip bg-coral-100 text-coral-700">
      <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M13.2 2 4.6 13.8h5.5L10.8 22l8.6-11.8h-5.5L13.2 2Z" />
      </svg>
      Urgent
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  sub,
  center = false,
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
  center?: boolean;
}) {
  return (
    <div className={`mb-8 ${center ? "text-center" : ""}`}>
      {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
      <h2 className="section-title text-balance">{title}</h2>
      {sub && <p className={`mt-3 max-w-2xl text-ink-soft ${center ? "mx-auto" : ""}`}>{sub}</p>}
    </div>
  );
}
