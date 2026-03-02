// "use client";
// Forced re-sync for dev server
import { HomeHero } from "@/stories/sections/HomeHero/HomeHero";
import { SearchSection } from "@/stories/sections/Search/SearchSection";
import { print } from "graphql/language/printer";
import { fetchGraphQL } from "@/utils/fetchGraphQL";
import { sanitizeImageUrl } from "@/utils/sanitizeUrl";
import { AllGamesQuery } from "@/queries/game/AllGamesQuery";
import { AllRankingsQuery } from "@/queries/ranking/AllRankingsQuery";
import { HomeFeaturedGamesQuery } from "@/queries/home/HomeFeaturedGamesQuery";
import { AllMetricsQuery } from "@/queries/general/AllMetricsQuery";
import {
  AllGamesQuery as GamesType,
  AllRankingsQuery as RankingsType
} from "@/gql/graphql";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const data = await fetchGraphQL<any>(print(HomeFeaturedGamesQuery));
  const seo = data?.page?.seo;

  return {
    title: seo?.title || "Metric Gamer | Expert Game Performance Analysis & Metrics",
    description: seo?.metaDesc || "Find your next favorite game using our deep performance metrics and expert game analysis. The ultimate destination for core gamers.",
  };
}

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
      image: sanitizeImageUrl(node.featuredImage?.node?.sourceUrl),
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
    // Calculate actual rating from metrics
    const gameMetrics = node.propertiesGame?.metrics || [];
    const metricsRecord: Record<string, number> = {};
    let totalScore = 0;

    gameMetrics.forEach((m: any) => {
      const name = m?.metric?.nodes?.[0]?.name;
      if (name) {
        metricsRecord[name.toLowerCase()] = m.score || 0;
        totalScore += m.score || 0;
      }
    });

    const averageRating = gameMetrics.length > 0
      ? parseFloat((totalScore / gameMetrics.length).toFixed(1))
      : 0;

    return {
      id: node.slug || `game-${i}`,
      type: 'game',
      title: node.propertiesGame?.gameTitle || node.title || "Unknown Game",
      image: sanitizeImageUrl(node.featuredImage?.node?.sourceUrl),
      genres: [
        ...(node.tags?.nodes?.map((t: any) => t.name) || []),
        ...(node.crossplatform?.nodes?.map((c: any) => c.taxonomyName) || []),
      ].filter(Boolean) as string[],
      platforms: node.platform?.nodes?.map((p: any) => p.name).filter(Boolean) as string[],
      metrics: metricsRecord,
      rating: averageRating,
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
              image: sanitizeImageUrl(node.featuredImage?.node?.sourceUrl || gamesContent[0]?.featuredImage?.node?.sourceUrl),
              leftImage: sanitizeImageUrl(gamesContent[1]?.featuredImage?.node?.sourceUrl),
              rightImage: sanitizeImageUrl(gamesContent[2]?.featuredImage?.node?.sourceUrl),
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
