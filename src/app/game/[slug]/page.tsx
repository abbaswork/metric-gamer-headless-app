import { notFound } from "next/navigation";
import { print } from "graphql/language/printer";

import { fetchGraphQL } from "@/utils/fetchGraphQL";
import { sanitizeImageUrl } from "@/utils/sanitizeUrl";
import { GameBySlugQuery } from "@/queries/game/GameBySlugQuery";
import { AllRankingsQuery } from "@/queries/ranking/AllRankingsQuery";
import { GameBySlugQuery as GameBySlugQueryType } from "@/gql/graphql";
import { GamePost } from "@/stories/pages/GamePost/GamePost";
import { Metadata } from "next";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await fetchGraphQL<GameBySlugQueryType>(print(GameBySlugQuery), { slug });

  const seo = data?.game?.seo;

  return {
    title: seo?.title || `${data?.game?.title} Review & Metrics | Metric Gamer`,
    description: seo?.metaDesc || `Discover deep performance metrics and detailed analysis for ${data?.game?.title} on Metric Gamer.`,
  };
}


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
    heroImage: sanitizeImageUrl(game.featuredImage?.node?.sourceUrl),
  };

  // INFO
  const infoData = {
    description: propertiesGame.gameDescription || "",
    verdict: propertiesGame.verdict || "A masterpiece of game design that sets a new standard for the genre.",
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
      image: sanitizeImageUrl(node.featuredImage?.node?.sourceUrl || gamesContent[0]?.featuredImage?.node?.sourceUrl),
      leftImage: sanitizeImageUrl(gamesContent[1]?.featuredImage?.node?.sourceUrl),
      rightImage: sanitizeImageUrl(gamesContent[2]?.featuredImage?.node?.sourceUrl),
      excerpt: node.propertiesGamePost?.description || "",
      metrics: rankingMetrics,
      platforms: rankingPlatforms,
      slug: node.slug,
    };
  });

  // Calculate actual average score
  let totalScore = 0;
  const gameMetrics = propertiesGame.metrics || [];
  gameMetrics.forEach((m: any) => {
    totalScore += m.score || 0;
  });
  const averageScore = gameMetrics.length > 0
    ? parseFloat((totalScore / gameMetrics.length).toFixed(1))
    : 0;

  // SIDEBAR
  const sidebarData = {
    score: averageScore,
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
