import { notFound } from "next/navigation";
import { print } from "graphql/language/printer";

import { fetchGraphQL } from "@/utils/fetchGraphQL";
import { RankingBySlugQuery } from "@/queries/ranking/RankingBySlugQuery";
import { RankingBySlugQuery as RankingType } from "@/gql/graphql";
import { BlogPost } from "@/stories/pages/BlogPost/BlogPost";

// Mock Images
import darkFantasyImage from "@/assets/generated_images/dark_fantasy_action_rpg_scene_with_a_knight_facing_a_dragon.png";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function RankingPage({ params }: Props) {
  const { slug } = await params;

  // 1. Fetch Data
  const data = await fetchGraphQL<RankingType>(
    print(RankingBySlugQuery),
    {
      slug: slug,
    }
  );

  const ranking = data.ranking;

  if (!ranking || !ranking.propertiesGamePost) {
    return notFound();
  }

  const { propertiesGamePost } = ranking;

  // 2. Map Data to Component Props
  
  // HEADER
  const headerData = {
    title: ranking.title || "Untitled Ranking",
    author: "Metric Gamer Team", // MOCK
    date: new Date().toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' }), // MOCK
    readTime: "8 min read", // MOCK
    image: darkFantasyImage, // MOCK
    description: propertiesGamePost.description || "",
  };

  // GAMES
  const gamesData = propertiesGamePost.selectGames?.flatMap((selection: any) => {
    return selection?.selectedGame?.nodes?.map((node: any, index: number) => {
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
      }

      return {
        id: node.slug || `game-${index}`,
        rank: index + 1, // Simple ranking for now
        title: g?.gameTitle || node.title || "Unknown Game",
        image: darkFantasyImage, // MOCK
        dynamicScore: 0, // Will be calculated by BlogPost component
        tags: ["RPG", "Action"], // MOCK
        releaseDate: "2024", // MOCK
        metrics: metricsRecord,
        description: g?.gameDescription || "",
        analysis: {
          pros: g?.theGood?.map((item: any) => item?.goodPoint || "") || [],
          cons: g?.theBad?.map((item: any) => item?.badPoint || "") || [],
          verdict: g?.verdict || "A must-play for fans of the genre."
        }
      };
    }) || [];
  }) || [];

  // RELATED POSTS (MOCK)
  const relatedPostsData = [
    {
      title: "Top 10 RPGs of 2024",
      image: darkFantasyImage,
      date: "Oct 12, 2024",
      slug: "#"
    },
    {
      title: "Best Indie Gems",
      image: darkFantasyImage,
      date: "Jun 20, 2024",
      slug: "#"
    }
  ];

  return (
    <BlogPost 
      header={headerData}
      games={gamesData}
      relatedPosts={relatedPostsData}
    />
  );
}
