import { notFound } from "next/navigation";
import { print } from "graphql/language/printer";

import { fetchGraphQL } from "@/utils/fetchGraphQL";
import { GameBySlugQuery } from "@/queries/game/GameBySlugQuery";
import { AllRankingsQuery } from "@/queries/ranking/AllRankingsQuery";
import { GameBySlugQuery as GameBySlugQueryType } from "@/gql/graphql";
import { GamePost } from "@/stories/pages/GamePost/GamePost";

// Mock Images
import darkFantasyImage from "@/assets/generated_images/dark_fantasy_action_rpg_scene_with_a_knight_facing_a_dragon.png";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function GamePage({ params }: Props) {
  const { slug } = await params;

  // 1. Fetch Data
  const [gameData, rankingsData] = await Promise.all([
    fetchGraphQL<GameBySlugQueryType>(print(GameBySlugQuery), { slug }),
    fetchGraphQL<any>(print(AllRankingsQuery), { first: 100 })
  ]);

  const game = gameData.game;

  if (!game || !game.propertiesGame) {
    return notFound();
  }

  const { propertiesGame } = game;

  // 2. Map Data to Component Props
  const platformsArr = (game as any).platform?.nodes?.map((n: any) => n.name) || [];
  const tagsArr = (game as any).tags?.nodes?.map((n: any) => n.name) || [];

  // HEADER
  const headerData = {
    title: propertiesGame.gameTitle || game.title || "Untitled Game",
    genre: "Action RPG", // MOCK: Field missing in query
    platforms: platformsArr.length > 0 ? platformsArr : ["PS5", "Xbox Series X/S", "PC"],
    tags: tagsArr,
    developer: "Unknown Developer", // MOCK: Field missing in query
    releaseDate: propertiesGame.releaseDate
      ? new Date(propertiesGame.releaseDate).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' })
      : "Coming Soon",
    heroImage: game.featuredImage?.node?.sourceUrl || "http://ec2-18-213-34-154.compute-1.amazonaws.com/wp-content/uploads/2024/09/efootball.jpg",
  };

  // INFO
  const infoData = {
    description: propertiesGame.gameDescription || "",
    verdict: "A masterpiece of game design that sets a new standard for the genre.",
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

  // SIMILAR GAMES (Ranked Lists featuring this game)
  const similarGamesData = (rankingsData.rankings?.nodes || []).filter((ranking: any) => {
    const selectedGames = ranking.propertiesGamePost?.selectGames?.flatMap((selection: any) => {
      return selection?.selectedGame?.nodes || [];
    }) || [];
    return selectedGames.some((g: any) => g.slug === slug);
  }).map((node: any, i: number) => {
    const gamesContent = node.propertiesGamePost?.selectGames?.flatMap((selection: any) => {
      return selection?.selectedGame?.nodes || [];
    }) || [];

    const firstGame = gamesContent[0]?.propertiesGame;
    const rankingMetrics: string[] = [];
    const rankingPlatforms: string[] = gamesContent[0]?.platform?.nodes?.map((p: any) => p.name) || [];

    if (firstGame) {
      (firstGame.metrics || []).forEach((m: any) => {
        const name = m?.metric?.nodes?.[0]?.name;
        if (name) rankingMetrics.push(name);
      });
      if (firstGame.playtime) rankingMetrics.push("Playtime");
    }

    const leftImage = gamesContent[1]?.featuredImage?.node?.sourceUrl || undefined;
    const rightImage = gamesContent[2]?.featuredImage?.node?.sourceUrl || undefined;

    return {
      id: node.slug || `ranking-${i}`,
      title: node.title || "Unknown Ranking",
      image: node.featuredImage?.node?.sourceUrl || gamesContent[0]?.featuredImage?.node?.sourceUrl || "http://ec2-18-213-34-154.compute-1.amazonaws.com/wp-content/uploads/2024/09/efootball.jpg",
      leftImage: gamesContent[1]?.featuredImage?.node?.sourceUrl,
      rightImage: gamesContent[2]?.featuredImage?.node?.sourceUrl,
      excerpt: node.propertiesGamePost?.description || "",
      metrics: rankingMetrics,
      platforms: rankingPlatforms,
      slug: node.slug,
    };
  });

  // SIDEBAR
  const sidebarData = {
    score: 4.5,
    stats: {
      playtime: propertiesGame.playtime || "Unknown",
      players: "1-4"
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
