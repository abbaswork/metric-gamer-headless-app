import Image from "next/image";
import "./score-card.scss";
import { RatingIcons } from "../rating-icons/RatingIcons";
import { RatingIconsTypes } from "../rating-icons/types";
import { Icons } from "../icons/Icon";
import { icon } from "../icons/types";
import { MouseEventHandler } from "react";
import { BlockGameControlled, GameMetricControlled } from "@/stories/const/score";

export type ScoreCardProps = BlockGameControlled & {
  handleHideClick: (hideMetricID: number) => void;
};

export const ScoreCard = ({
  gameTitle,
  averageScore,
  gameMetrics,
  gameThumbnail,
  handleHideClick,
}: ScoreCardProps) => {
  return (
    <div className="score-card">
      {/* Use Next.js Image for background Image and optimized loading */}
      <Image
        src={gameThumbnail.url}
        alt={gameThumbnail.alt}
        layout="fill" // Makes the image fill the parent container
        objectFit="cover" // Ensures the image covers the container
        className="card-background-image"
        priority
      />

      <h3 className="card-title">{gameTitle}</h3>
      <p className="card-score">{averageScore}</p>

      {/* Metric Rankings */}
      <div className="card-rankings">
        {gameMetrics &&
          gameMetrics.map((metric: GameMetricControlled, index: number) => (
            <div className="card-ranking-row" key={index}>
              <div className="metric-text">
                <button
                  id={"" + metric.metricTitle[0].id}
                  className="hide-metric-button"
                  aria-label="Hide metric"
                  onClick={(e) => handleHideClick(metric.metricTitle[0].id)}
                >
                  <Icons
                    {...({ icon: icon.eyeSlash, color: metric.hidden ? "white" : "grey" } as any)}
                  />
                </button>
                <span>{metric.metricTitle[0].name}:</span>
              </div>
              <RatingIcons
                rank={Number(metric.metricScore)}
                icon={RatingIconsTypes.star}
              />
            </div>
          ))}
      </div>

      {/* Link Image as transparent background for card with black overlay */}
      <div className="card-overlay"></div>
    </div>
  );
};
