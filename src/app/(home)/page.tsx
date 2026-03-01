// "use client";
// Forced re-sync for dev server
import { HomeHero } from "@/stories/sections/HomeHero/HomeHero";
import { SearchSection } from "@/stories/sections/Search/SearchSection";
import { Footer } from "@/stories/layouts/Footer/Footer";

import { print } from "graphql/language/printer";
import { fetchGraphQL } from "@/utils/fetchGraphQL";
import { AllGamesQuery } from "@/queries/game/AllGamesQuery";
import { AllRankingsQuery } from "@/queries/ranking/AllRankingsQuery";
import { HomeFeaturedGamesQuery } from "@/queries/home/HomeFeaturedGamesQuery";
import { AllMetricsQuery } from "@/queries/general/AllMetricsQuery";
import {
  AllGamesQuery as GamesType,
  AllRankingsQuery as RankingsType
} from "@/gql/graphql";

export default async function HomePage() {
  // 1. Fetch Data Concurrently
  const [gamesData, rankingsData, featuredData, metricsData] = await Promise.all([
    fetchGraphQL<GamesType>(print(AllGamesQuery), { first: 50 }),
    fetchGraphQL<RankingsType>(print(AllRankingsQuery), { first: 20 }),
    fetchGraphQL<any>(print(HomeFeaturedGamesQuery)),
    fetchGraphQL<any>(print(AllMetricsQuery))
  ]);

  // Extract preferred order from CMS
  const PREFERRED_METRIC_ORDER = (featuredData as any).page?.propertiesHome?.featuredMetrics?.nodes?.map((n: any) => n.name) || [];

  // Handle Featured Games Mapping
  const featuredTitle = featuredData.page?.propertiesHome?.featuredTitle || "Featured Rankings";
  const rawFeaturedGames = featuredData.page?.propertiesHome?.selectGames?.flatMap((selection: any) => {
    return selection?.selectedGame?.nodes || [];
  }) || [];

  const mappedFeaturedGames = rawFeaturedGames.map((node: any, index: number) => {
    const g = node.propertiesGame;

    // Map all available metrics
    const allAvailableMetrics = (g?.metrics || []).map((m: any) => ({
      label: m?.metric?.nodes?.[0]?.name || "Metric",
      value: m?.score?.toString() || "0"
    }));

    if (g?.playtime) {
      allAvailableMetrics.push({
        label: "Playtime",
        value: `${g.playtime}h`
      });
    }

    // Sort according to preferred order from CMS
    const sortedMetrics = allAvailableMetrics.sort((a: any, b: any) => {
      const indexA = PREFERRED_METRIC_ORDER.indexOf(a.label);
      const indexB = PREFERRED_METRIC_ORDER.indexOf(b.label);

      if (indexA !== -1 && indexB !== -1) return indexA - indexB;
      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;
      return 0;
    });

    // Take exactly 3 metrics for consistent UI
    const displayMetrics = sortedMetrics.slice(0, 3);

    const tags = node.tags?.nodes?.map((t: any) => t.name) || [];
    const platforms = node.platform?.nodes?.map((p: any) => p.name) || [];

    return {
      id: node.slug || `featured-${index}`,
      rank: index + 1,
      title: g?.gameTitle || node.title || "Unknown Game",
      genre: platforms[0] || (tags[0] || "Game"),
      description: g?.verdict || "",
      image: node.featuredImage?.node?.sourceUrl || "http://ec2-18-213-34-154.compute-1.amazonaws.com/wp-content/uploads/2024/09/efootball.jpg",
      metrics: displayMetrics,
      tags: tags,
      slug: node.slug
    };
  });

  // HomeHero expects a map of month -> games. 
  // For now we'll put all featured games into a "featured" key and use that.
  const gamesMap = {
    "featured": mappedFeaturedGames
  };

  // Rest of the mapping...
  const fetchedGames = (gamesData.games?.nodes || []).map((node, i) => {
    // Map metrics array back to record style if needed, or extract values directly.
    // For the unified search map, we pass a simplified metrics object or keep it as what it expects.
    const metricsRecord: Record<string, number> = {};
    node.metrics?.nodes?.forEach(m => {
      if (m.name) metricsRecord[m.name.toLowerCase()] = 4; // Mocking score for now if not available in this query node type structure
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

    const leftImage = gamesContent[1]?.featuredImage?.node?.sourceUrl || undefined;
    const rightImage = gamesContent[2]?.featuredImage?.node?.sourceUrl || undefined;

    return {
      id: node.slug || `ranking-${i}`,
      type: 'blog',
      blogType: 'Ranking',
      title: node.title || "Unknown Ranking",
      image: node.featuredImage?.node?.sourceUrl || gamesContent[0]?.featuredImage?.node?.sourceUrl || "http://ec2-18-213-34-154.compute-1.amazonaws.com/wp-content/uploads/2024/09/efootball.jpg",
      leftImage,
      rightImage,
      excerpt: node.propertiesGamePost?.description || "",
      slug: node.slug,
    };
  });

  return (
    <main className="bg-[#160026] min-h-screen text-white">
      {/* Container for main content with padding */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 pt-20 pb-20 space-y-24">

        {/* Hero Section */}
        <HomeHero featuredTitle={featuredTitle} gamesMap={gamesMap} />

        {/* Glowing Divider */}
        <div className="relative w-full h-px bg-gradient-to-r from-transparent via-[#F6CA56] to-transparent opacity-50 shadow-[0_0_20px_rgba(246,202,86,0.5)]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1 bg-[#F6CA56] blur-[20px] rounded-full" />
        </div>

        {/* Search Section Title */}
        <div className="space-y-4 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white font-heading drop-shadow-xl relative z-10">
            Find Your Next Game
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Filter by metrics, genre, platform and more to discover your perfect match
          </p>
        </div>

        {/* Search Section */}
        <SearchSection
          initialGames={fetchedGames}
          initialBlogs={rankingsData.rankings?.nodes?.map((node: any, i: number) => {
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

            return {
              id: node.slug || `ranking-${i}`,
              type: 'blog',
              blogType: 'Ranking',
              title: node.title || "Unknown Ranking",
              image: node.featuredImage?.node?.sourceUrl || gamesContent[0]?.featuredImage?.node?.sourceUrl || "http://ec2-18-213-34-154.compute-1.amazonaws.com/wp-content/uploads/2024/09/efootball.jpg",
              leftImage: gamesContent[1]?.featuredImage?.node?.sourceUrl,
              rightImage: gamesContent[2]?.featuredImage?.node?.sourceUrl,
              metrics: rankingMetrics,
              platforms: rankingPlatforms,
              slug: node.slug,
            };
          }) || []}
          availableMetrics={(metricsData as any).metrics?.nodes || []}
        />

      </div>

    </main>
  );
}
