"use client";
import Image from "next/image";
import Link from "next/link";
import { useId, useState } from "react";
import "./game-metrics-card.scss";

type StarRow = { label: string; value: number }; // 0..5 (should be able to set the value to .5)

export interface GameMetricsCardProps {
  href: string;
  imageSrc: string;
  imageAlt: string;

  monthLabel: string; // "March 2019"
  genreName: string; // "action-adventure"
  featuredGame: string; // "Game Title: Sekiro"

  subtitle?: string; // short paragraph under the stars
  // Stars + small round rating
  rating?: number | string; // 4.7
  starRows?: StarRow[]; // 3 rows of stars

  // Pills
  features?: string[]; // e.g., "2 Player","Cross Platform"
  tags?: string[]; // e.g., "Tag 1","Tag 2"

  // Accordion
  accordionLabel?: string; // bar text when collapsed
  accordionTitle?: string; // expanded panel title
  accordionBody?: string; // expanded panel text
}

//rendering unicode stars based on value
const Stars = ({ value }: { value: number }) => {
  const full = Math.floor(value); //number of full stars
  const half = value - full >= 0.5 ? 1 : 0; // half stars if .5+
  const empty = 5 - full - half; //empty
  return (
    <span className="stars" aria-label={`${value} out of 5`}>
      {Array.from({ length: full }).map((_, i) => (
        <span key={`f${i}`} className="star full" aria-hidden>
          ★
        </span>
      ))}
      {half === 1 && (
        <span className="star half" aria-hidden>
          ★
        </span>
      )}
      {Array.from({ length: empty }).map((_, i) => (
        <span key={`e${i}`} className="star empty" aria-hidden>
          ★
        </span>
      ))}
    </span>
  );
};

/**
 * Metrics game card.
 * Layout: left column = text/metrics, right column = image.
 * The entire content is wrapped in a <Link> so the whole card is clickable.
 */
export const GameMetricsCard = ({
  href,
  imageSrc,
  imageAlt,
  monthLabel,
  genreName,
  featuredGame,

  subtitle = "Some text here about the game and its metrics",
  rating = 4.7,
  starRows = [
    { label: "Story", value: 5 },
    { label: "Combat", value: 4.5 },
    { label: "Skill Ceiling", value: 4 },
  ],
  features = ["2 Player", "Cross Platform"],
  tags = ["Tag 1", "Tag 1"],

  accordionLabel = "some text here",
  accordionTitle = "Skill Ceiling",
  accordionBody = "",
}: GameMetricsCardProps) => {
  const [open, setOpen] = useState(false);
  const regionId = useId();

  if (!href || !imageSrc || !featuredGame) return null;

  return (
    <div className={`game-metrics-card ${open ? "is-open" : ""}`}>
      {/* IMPORTANT: <a> stays the grid container for side-by-side layout */}
      <Link
        href={href}
        aria-label={`Explore ${genreName}, featuring ${featuredGame}`}
      >
        {/* Left Side : Text and metrics */}
        <div className="content">
          <div className="meta">
            <span className="badge month">{monthLabel}</span>
            <span className="badge genre">{genreName}</span>
          </div>

          <div className="title-row">
            <h2 className="title">{featuredGame}</h2>
            <span className="rating" aria-label={`Rating ${rating}`}>
              {typeof rating === "number" ? rating.toFixed(1) : rating}
            </span>
          </div>

          <div className="star-rows">
            {starRows.slice(0, 3).map((r, i) => (
              <div className="row" key={`${r.label}-${i}`}>
                <span className="row-label">{r.label}:</span>
                <Stars value={r.value} />
              </div>
            ))}
          </div>

          {subtitle && <p className="subtitle">{subtitle}</p>}

          <div className="pills">
            <div className="pill-group">
              {features.map((f, i) => (
                <span key={`f-${i}`} className="pill feature">
                  {f}
                </span>
              ))}
            </div>
            <div className="pill-group">
              {tags.map((t, i) => (
                <span key={`t-${i}`} className="pill tag">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Game Image */}
        <div className="media">
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={1200}
            height={800}
            priority
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </Link>

      {/* Yellow Accordion section  */}
      <div className="accordion">
        <button
          type="button"
          className="acc-trigger"
          aria-expanded={open}
          aria-controls={regionId}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="acc-label">{open ? "close" : accordionLabel}</span>
          <span className="caret" aria-hidden />
        </button>

        <div id={regionId} className="acc-region" role="region">
          <div className="acc-inner">
            {accordionTitle && <h3 className="acc-title">{accordionTitle}</h3>}
            {accordionBody && <p className="acc-body">{accordionBody}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameMetricsCard;
