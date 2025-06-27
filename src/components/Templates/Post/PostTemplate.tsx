import { print } from "graphql/language/printer";

import { ContentNode, GamesBlockGames, Post } from "@/gql/graphql";
import { fetchGraphQL } from "@/utils/fetchGraphQL";

import styles from "./PostTemplate.module.css";
import { PostQuery } from "./PostQuery";
import { ScoreCard } from "@/stories/core/score-card/ScoreCard";

interface TemplateProps {
  node: ContentNode;
}

export default async function PostTemplate({ node }: TemplateProps) {
  const { post } = await fetchGraphQL<{ post: Post }>(print(PostQuery), {
    id: node.databaseId,
  });

  // const games = post.gamesBlock?.games || [];
  // const gameCards = games
  //   .filter((game): game is GamesBlockGames => game !== null)
  //   .map((game: GamesBlockGames) => {
  //     return (
  //       <ScoreCard
  //         key={game.gameTitle}
  //         gameTitle={game.gameTitle || ""}
  //         gameMetrics={game.gameMetrics}
  //         src={game.gameThumbnail?.node.sourceUrl || ""}
  //         alt={game.gameThumbnail?.node.altText || ""}
  //       />
  //     );
  //   });

  console.log("post", post);
  // console.log("gamesBlock", post.gamesBlock?.games);

  return (
    <div className={styles.post}>
      <h1 className={styles.title}>{post.title}</h1>
      <div className={styles.author}>By {post.author?.node.name}</div>
      {/* {gameCards} */}
      <div dangerouslySetInnerHTML={{ __html: post.content || "" }} />
    </div>
  );
}
