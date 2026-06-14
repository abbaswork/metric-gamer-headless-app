import { print } from "graphql/language/printer";
import { fetchGraphQL } from "./fetchGraphQL";
import { AllGamesQuery } from "@/queries/game/AllGamesQuery";

const BATCH_SIZE = 20;

export async function fetchAllGames(): Promise<{ games: { nodes: any[] } }> {
  const allNodes: any[] = [];
  let cursor: string | null = null;
  let hasMore = true;

  while (hasMore) {
    const data = await fetchGraphQL<any>(print(AllGamesQuery), {
      first: BATCH_SIZE,
      after: cursor,
    });

    const page = data?.games;
    allNodes.push(...(page?.nodes || []));
    hasMore = page?.pageInfo?.hasNextPage ?? false;
    cursor = page?.pageInfo?.endCursor ?? null;
  }

  return { games: { nodes: allNodes } };
}
