

import { SearchSection } from "@/stories/sections/Search/SearchSection";
import { Footer } from "@/stories/layouts/Footer/Footer";

import { print } from "graphql/language/printer";
import { fetchGraphQL } from "@/utils/fetchGraphQL";
import { AllGamesQuery } from "@/queries/game/AllGamesQuery";
import { AllRankingsQuery } from "@/queries/ranking/AllRankingsQuery";
import { AllMetricsQuery } from "@/queries/general/AllMetricsQuery";
import {
  AllGamesQuery as AllGamesQueryType,
  AllRankingsQuery as AllRankingsQueryType
} from "@/gql/graphql";

export default async function MetricsPage() {
  const [data, rankingsData, metricsData] = await Promise.all([
    fetchGraphQL<AllGamesQueryType>(print(AllGamesQuery), { first: 100 }),
    fetchGraphQL<AllRankingsQueryType>(print(AllRankingsQuery), { first: 100 }),
    fetchGraphQL<any>(print(AllMetricsQuery))
  ]);

  const fetchedGames = (data.games?.nodes || []).map((node, i) => {
    const metricsRecord: Record<string, number> = {};
    node.metrics?.nodes?.forEach(m => {
      if (m.name) metricsRecord[m.name.toLowerCase()] = 4; // Mock score for filter demonstration
    });

    return {
      id: node.slug || `game-${i}`,
      type: 'game',
      title: node.propertiesGame?.gameTitle || node.title || "Unknown Game",
      image: node.featuredImage?.node?.sourceUrl || "http://ec2-18-213-34-154.compute-1.amazonaws.com/wp-content/uploads/2024/09/efootball.jpg",
      genres: [
        ...(node.tags?.nodes?.map(t => t.name) || []),
        ...(node.crossplatform?.nodes?.map(c => c.taxonomyName) || []),
      ].filter(Boolean) as string[],
      platforms: node.platform?.nodes?.map(p => p.name).filter(Boolean) as string[],
      metrics: metricsRecord,
      slug: node.slug,
    };
  });

  const fetchedRankings = (rankingsData.rankings?.nodes || []).map((node, i) => {
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
      type: 'blog',
      blogType: 'Ranking', // Required for standardizing the blog filter type "Ranking"
      title: node.title || "Unknown Ranking",
      image: node.featuredImage?.node?.sourceUrl || "http://ec2-18-213-34-154.compute-1.amazonaws.com/wp-content/uploads/2024/09/efootball.jpg",
      leftImage,
      rightImage,
      excerpt: node.propertiesGamePost?.description || "",
      metrics: rankingMetrics,
      platforms: rankingPlatforms,
      slug: node.slug,
    };
  });

  return (
    <main className="bg-[#160026] min-h-screen text-white">
      {/* Container for main content with padding */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 pt-20 pb-20 space-y-12">

        {/* Page Title */}
        <div className="space-y-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white font-heading drop-shadow-xl">
            Find Ranked Games and Lists
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Use our search tool with our metric rating system to find your games!
          </p>
        </div>

        {/* Search Section */}
        <SearchSection
          initialGames={fetchedGames}
          initialBlogs={fetchedRankings}
          availableMetrics={metricsData.metrics?.nodes || []}
        />

      </div>
    </main>
  );
}
