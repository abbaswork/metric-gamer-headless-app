import Image from "next/image";
import Link from "next/link";
import "./feature-hero-card.scss";

export type StatIcon = "difficulty" | "bosses" | "time";

export interface FeatureStat {
  icon: StatIcon;
  label: string;   // e.g., "Difficulty"
  value: string;   // e.g., "9.2/10"
}

export interface FeatureHeroCardProps {
  href: string;
  imageSrc: string;
  imageAlt: string;
  monthLabel: string;     // e.g., "December 2025"
  title: string;          // e.g., "Souls-like: Elden Ring"
  description?: string;   // short paragraph
  stats?: FeatureStat[];  // up to 3 items
  cta?: string;           // e.g., "Read more"
}

const Icon = ({ type }: { type: StatIcon }) => {
  // simple inline SVGs to avoid extra deps
  if (type === "difficulty") {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d="M12 2l2.39 4.84L20 8l-4 3.9L17 18l-5-2.6L7 18l1-6.1L4 8l5.61-1.16L12 2z" />
      </svg>
    );
  }
  if (type === "bosses") {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d="M12 12a5 5 0 100-10 5 5 0 000 10zm-7 9v-1a7 7 0 0114 0v1H5z" />
      </svg>
    );
  }
  // time
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M12 8v5l3 3m6-4a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
};

export const FeatureHeroCard = ({
  href,
  imageSrc,
  imageAlt,
  monthLabel,
  title,
  description = "",
  stats = [],
  cta = "Read more",
}: FeatureHeroCardProps) => {
  // guard against missing critical fields
  if (!href || !imageSrc || !title) return <></>;

  return (
    <div className="feature-hero-card">
      <Link href={href} aria-label={`${title}`}>
        {/* Background media */}
        <div className="media">
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={1920}
            height={1080}
            priority
            style={{ width: "100%", height: "100%" }}
          />
          <div className="scrim" />
        </div>

        {/* Top-left content */}
        <div className="content">
          <span className="pill">{monthLabel}</span>
          <h2 className="title">{title}</h2>
          {description && <p className="subtitle">{description}</p>}
        </div>

        {/* Bottom translucent bar */}
        <div className="meta-bar">
          <div className="stats">
            {stats.slice(0, 3).map((s, i) => (
              <div className="stat" key={`${s.label}-${i}`}>
                <div className="stat-head">
                  <Icon type={s.icon} />
                  <span className="stat-label">{s.label}</span>
                </div>
                <div className="stat-value">{s.value}</div>
              </div>
            ))}
          </div>

          <div className="cta">{cta}</div>
        </div>
      </Link>
    </div>
  );
};

export default FeatureHeroCard;
