import { notFound } from "next/navigation";
import { print } from "graphql/language/printer";

import { fetchGraphQL } from "@/utils/fetchGraphQL";
import { sanitizeImageUrl } from "@/utils/sanitizeUrl";
import { RankingBySlugQuery } from "@/queries/ranking/RankingBySlugQuery";
import { AllRankingsQuery } from "@/queries/ranking/AllRankingsQuery";
import { RankingBySlugQuery as RankingType } from "@/gql/graphql";
import { BlogPost } from "@/stories/pages/BlogPost/BlogPost";
import { Metadata } from "next";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await fetchGraphQL<RankingType>(print(RankingBySlugQuery), { slug });

  const seo = data?.ranking?.seo;

  return {
    title: seo?.title || `${data?.ranking?.title} | Metric Gamer Ranking`,
    description: seo?.metaDesc || `Check out our expert ranking for ${data?.ranking?.title} based on core performance metrics.`,
    alternates: {
      canonical: `/ranking/${slug}/`,
    },
  };
}

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function RankingPage({ params }: Props) {
  const { slug } = await params;

  // 1. Fetch Data
  const [data, sidebarData] = await Promise.all([
    fetchGraphQL<RankingType>(print(RankingBySlugQuery), { slug }),
    fetchGraphQL<any>(print(AllRankingsQuery), { first: 5 })
  ]);

  const ranking = data.ranking;

  if (!ranking || !ranking.propertiesGamePost) {
    return notFound();
  }

  const { propertiesGamePost } = ranking;

  // GAMES
  const allGames = propertiesGamePost.selectGames?.flatMap((selection: any) => {
    return selection?.selectedGame?.nodes || [];
  }) || [];

  // HEADER
  const headerData = {
    title: ranking.title || "Untitled Ranking",
    author: "Metric Gamer Team",
    date: new Date().toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' }),
    readTime: "8 min read",
    image: sanitizeImageUrl(ranking.featuredImage?.node?.sourceUrl || allGames[0]?.featuredImage?.node?.sourceUrl),
    description: propertiesGamePost.description || "",
  };

  const gamesData = allGames.map((node: any, index: number) => {
    const g = node.propertiesGame;

    // Map metrics from array to record
    const metricsRecord: Record<string, number> = {};
    g?.metrics?.forEach((m: any) => {
      const name = m?.metric?.nodes?.[0]?.name || "Unknown";
      metricsRecord[name] = m?.score || 0;
    });

    // If no metrics found, provide defaults to avoid layout breaking
    if (Object.keys(metricsRecord).length === 0) {
      metricsRecord["Story"] = 4;
      metricsRecord["Combat"] = 4;
      metricsRecord["World"] = 4;
      metricsRecord["Difficulty"] = 3;
      metricsRecord["Replayability"] = 4;
    }

    return {
      id: node.slug || `game-${index}`,
      rank: index + 1,
      title: g?.gameTitle || node.title || "Unknown Game",
      image: sanitizeImageUrl(node.featuredImage?.node?.sourceUrl),
      dynamicScore: 0,
      tags: ["RPG", "Action"],
      releaseDate: "2024",
      metrics: metricsRecord,
      description: g?.gameDescription || "",
      analysis: {
        pros: g?.theGood?.map((item: any) => item?.goodPoint || "") || [],
        cons: g?.theBad?.map((item: any) => item?.badPoint || "") || [],
        verdict: g?.verdict || "A must-play for fans of the genre."
      },
      slug: node.slug
    };
  });

  // SIDEBAR RANKINGS
  const latestRankingsData = (sidebarData.rankings?.nodes || []).map((node: any, i: number) => {
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
      id: node.slug || `sidebar-ranking-${i}`,
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

  return (
    <BlogPost
      header={headerData}
      games={gamesData}
      relatedPosts={latestRankingsData}
    />
  );
}
