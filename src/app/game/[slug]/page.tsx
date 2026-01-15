import { notFound } from "next/navigation";
import { print } from "graphql/language/printer";

import { fetchGraphQL } from "@/utils/fetchGraphQL";
import { GameBySlugQuery } from "@/queries/game/GameBySlugQuery";
import { GameBySlugQuery as GameBySlugQueryType } from "@/gql/graphql";
import { GamePost } from "@/stories/pages/GamePost/GamePost";

// Mock Icons for Metrics
// import { BookOpen, Swords, Monitor, TrendingUp, Trophy, Gamepad2 } from "lucide-react";

// Mock Images
import darkFantasyImage from "@/assets/generated_images/dark_fantasy_action_rpg_scene_with_a_knight_facing_a_dragon.png";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function GamePage({ params }: Props) {
  const { slug } = await params;

  // 1. Fetch Data
  const { game } = await fetchGraphQL<GameBySlugQueryType>(
    print(GameBySlugQuery),
    {
      slug: slug,
    }
  );

  if (!game || !game.propertiesGame) {
    return notFound();
  }

  const { propertiesGame } = game;

  // 2. Map Data to Component Props

  // HEADER
  const headerData = {
    title: propertiesGame.gameTitle || game.title || "Untitled Game",
    genre: "Action RPG", // MOCK: Field missing in query
    platforms: ["PS5", "Xbox Series X/S", "PC"], // MOCK: Field missing in query
    developer: "Unknown Developer", // MOCK: Field missing in query
    // propertiesGame.releaseDate is "2022-03-25T00:00:00+00:00"
    releaseDate: propertiesGame.releaseDate 
      ? new Date(propertiesGame.releaseDate).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' }) 
      : "Coming Soon",
    heroImage: darkFantasyImage, // MOCK: Field missing in query (would usually come from featuredImage or ACF)
  };

  // INFO
  const infoData = {
    description: propertiesGame.gameDescription || "",
    verdict: "A masterpiece of game design that sets a new standard for the genre.", // MOCK: Field missing in query
    pros: propertiesGame.theGood?.map((item) => item?.goodPoint || "") || [],
    cons: propertiesGame.theBad?.map((item) => item?.badPoint || "") || [],
  };

  // METRICS
  const metricIconsMap: Record<string, string> = {
    "Gameplay": "Gamepad2",
    "Story": "BookOpen",
    "Graphics": "Monitor",
    "Co-op and Multiplayer": "Swords",
    "Co-op Customisation": "Trophy",
  };
  
  // Helper to safely get metric name
  const getMetricName = (metricNode: any) => {
    return metricNode?.metric?.nodes?.[0]?.name || "Unknown Metric";
  };

  const metricsData = propertiesGame.metrics?.map((m: any, index: number) => {
    const name = getMetricName(m);
    return {
      id: name.toLowerCase().replace(/\s+/g, '-'),
      score: m?.score || 0,
      label: name,
      icon: metricIconsMap[name] || "TrendingUp",
      analysis: m?.description || "",
    };
  }) || [];

  // SIMILAR GAMES (MOCK)
  const similarGamesData = [
    {
      title: "Similar Game 1",
      image: darkFantasyImage,
      date: "Oct 12, 2024",
      author: "Metric Gamer Team",
      slug: "#"
    },
    {
      title: "Similar Game 2",
      image: darkFantasyImage,
      date: "Jun 20, 2024",
      author: "Metric Gamer Team",
      slug: "#"
    }
  ];

  // SIDEBAR (MOCK)
  const sidebarData = {
    score: 4.5, // Could calculate average from metrics if desired, but mocking for now
    stats: {
      playtime: propertiesGame.playtime || "Unknown",
      players: "1-4" // MOCK
    }
  };

  return (
    <GamePost 
      header={headerData}
      info={infoData}
      metrics={metricsData}
      similarGames={similarGamesData}
      sidebar={sidebarData}
    />
  );
}
