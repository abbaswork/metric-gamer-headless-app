import { print } from "graphql/language/printer";
import { fetchGraphQL } from "./fetchGraphQL";
import { AllRankingsQuery } from "@/queries/ranking/AllRankingsQuery";

const BATCH_SIZE = 20;

export async function fetchAllRankings(): Promise<{ rankings: { nodes: any[] } }> {
  const allNodes: any[] = [];
  let cursor: string | null = null;
  let hasMore = true;

  while (hasMore) {
    const data: any = await fetchGraphQL<any>(print(AllRankingsQuery), {
      first: BATCH_SIZE,
      after: cursor,
    });

    const page = data?.rankings;
    allNodes.push(...(page?.nodes || []));
    hasMore = page?.pageInfo?.hasNextPage ?? false;
    cursor = page?.pageInfo?.endCursor ?? null;
  }

  return { rankings: { nodes: allNodes } };
}

export async function fetchRankingsForGame(
  slug: string,
  maxResults = 6,
): Promise<{ rankings: { nodes: any[] } }> {
  const matchingNodes: any[] = [];
  let cursor: string | null = null;
  let hasMore = true;

  while (hasMore && matchingNodes.length < maxResults) {
    const data: any = await fetchGraphQL<any>(print(AllRankingsQuery), {
      first: BATCH_SIZE,
      after: cursor,
    });

    const page = data?.rankings;
    const batch: any[] = page?.nodes || [];

    for (const ranking of batch) {
      const games = ranking.propertiesGamePost?.selectGames?.flatMap(
        (s: any) => s?.selectedGame?.nodes || [],
      ) || [];
      if (games.some((g: any) => g.slug === slug)) {
        matchingNodes.push(ranking);
        if (matchingNodes.length >= maxResults) break;
      }
    }

    hasMore = page?.pageInfo?.hasNextPage ?? false;
    cursor = page?.pageInfo?.endCursor ?? null;
  }

  return { rankings: { nodes: matchingNodes } };
}
