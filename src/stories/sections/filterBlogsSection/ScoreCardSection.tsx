'use client';
import { ScoreCardProps, ScoreCard } from "@/stories/core/score-card/ScoreCard";
import "./score-card-section.scss";
import {
  BlockGame,
  BlockGameControlled,
  GameMetric,
  GameMetricControlled,
} from "@/stories/const/score";
import React from "react";

export interface ScoreCardSectionProps {
  // scoreCards: ScoreCardProps[];
  blockGames: BlockGame[];
}

const calculateAverageScore = (gameMetrics: GameMetricControlled[]) => {
  const visibleMetrics = gameMetrics?.filter((m) => !m.hidden) ?? [];
  console.log("visibleMetrics: ", visibleMetrics);
  const averageScore =
    visibleMetrics.length > 0
      ? Number(
          (
            visibleMetrics
              .map((m) => Number(m.metricScore))
              .reduce((sum, score) => sum + score, 0) / visibleMetrics.length
          ).toFixed(1)
        )
      : 0;

  return averageScore;
};

const setCardsWithMetrics = (
  games: BlockGame[] | BlockGameControlled[],
  hideMetricID?: number
) => {
  const toggleHide = (metric: GameMetricControlled | GameMetric) => {
    
    if (metric.metricTitle[0].id === hideMetricID) return (!(metric as GameMetricControlled).hidden);

    if ("hidden" in metric && metric.hidden) {
      return metric.hidden;
    }
    
    else {
      return false;
    }
    
  };

  const withMetrics = games.map((game) => {
    const gameMetrics = game.gameMetrics.map(
      (metric) => (
        console.log("metric: ", metric),
        {
          //add hidden to every metric
          ...metric,
          //check if we should use default value or hide
          hidden: toggleHide(metric),
        }
      )
    );
    const averageScore = calculateAverageScore(gameMetrics);
    return {
      //add average score to each game
      ...game,
      gameMetrics,
      averageScore,
    };
  });

  return withMetrics.sort((a, b) => b.averageScore - a.averageScore);
};

export const ScoreCardSection = ({ blockGames }: ScoreCardSectionProps) => {

  console.log("blockGames: ", blockGames);

  //set the card score
  const [scoreCards, setScoreCards] = React.useState<BlockGameControlled[]>(
    setCardsWithMetrics(blockGames)
  );

  //function handler that
  const handleHideClick = (hideMetricID: number) => {
    setScoreCards(setCardsWithMetrics(scoreCards, hideMetricID));
  };

  return (
    <div className="score-card-section">
      {scoreCards.map((scoreCard, index) => (
        <ScoreCard
          key={'score-' + index}
          gameTitle={scoreCard.gameTitle}
          gameMetrics={scoreCard.gameMetrics}
          gameThumbnail={scoreCard.gameThumbnail}
          averageScore={calculateAverageScore(scoreCard.gameMetrics)}
          handleHideClick={handleHideClick}
        />
      ))}
    </div>
  );
};
