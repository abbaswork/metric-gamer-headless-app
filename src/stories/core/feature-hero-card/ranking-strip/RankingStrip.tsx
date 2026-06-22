import Image from "next/image";
import Link from "next/link";
import "./ranking-strip.scss";

export interface RankingTile {
  rank: number;
  src: string;
  alt: string;
  title: string;
  subtitle?: string;
  href?: string;
}

export interface RankingStripProps {
  heading?: string;
  items: RankingTile[];
  className?: string;
  /** Scales tile/badge/spacing to better match your hero card */
  size?: "compact" | "regular";
}

export default function RankingStrip({
  heading = "Featured Ranking",
  items,
  className,
  size = "compact",   // <- default to compact
}: RankingStripProps) {
  const tiles = (items ?? []).filter(i => i?.src && i?.title).slice(0, 4);
  if (!tiles.length) return null;

  return (
    <section className={`ranking-strip ranking-strip--${size} ${className ?? ""}`}>
      <h2 className="ranking-strip__heading">{heading}</h2>

      <div className="ranking-strip__grid">
        {tiles.map((t, idx) => {
          const Tag: any = t.href ? Link : "div";
          const lp = t.href ? { href: t.href } : {};
          return (
            <Tag className="ranking-tile" key={`${t.title}-${idx}`} {...lp}>
              <Image
                src={t.src}
                alt={t.alt}
                width={1200}
                height={675}
                style={{ width: "100%", height: "100%" }}
              />
              <span className="ranking-tile__badge">{t.rank}</span>
              <span className="ranking-tile__scrim" />
              <div className="ranking-tile__caption">
                <div className="ranking-tile__title">{t.title}</div>
                {t.subtitle && <div className="ranking-tile__subtitle">{t.subtitle}</div>}
              </div>
            </Tag>
          );
        })}
      </div>
    </section>
  );
}
