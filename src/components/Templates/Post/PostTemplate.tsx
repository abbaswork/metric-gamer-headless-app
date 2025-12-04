import { print } from "graphql/language/printer";

import { ContentNode, Post } from "@/gql/graphql";
import { fetchGraphQL } from "@/utils/fetchGraphQL";

import styles from "./PostTemplate.module.css";
import { PostQuery } from "./PostQuery";
import { ScoreCardSection } from "@/stories/sections/filterBlogsSection/ScoreCardSection";
import { HeroImage } from "@/stories/core/hero-image/HeroImage";

interface TemplateProps {
  node: ContentNode;
}

const componentMapper = (posts: Post, renderBlock?: string, renderComponent?: string) => {
  //check if content blocks exist on page
  if (posts && posts.contentBlocks) {
    //map the blocks to components
    return posts.contentBlocks.map((block, index) => {
      //if renderOnly is set, ensure the block name matches
      if (renderBlock && block?.blockName !== renderBlock) return;

      //map blocks into components
      switch (block?.blockName) {
        case "game-metrics-block":
          return <ScoreCardSection key={index} blockGames={block.data.blockGames} />;
          
        default:
      }
    });
  }

  return null;
};

export default async function PostTemplate({ node }: TemplateProps) {
  const { post } = await fetchGraphQL<{ post: Post }>(print(PostQuery), {
    id: node.databaseId,
  });

  console.log("post", post.contentBlocks);

  return (
    <div className={styles.post}>

      {/* <HeroImage src={}/>
      <h1 className={styles.title}>{post.title}</h1>
      <div className={styles.author}>By {post.author?.node.name}</div>
      {componentMapper(post)} */}

      <div dangerouslySetInnerHTML={{ __html: post.content || "" }} />
    </div>
  );
}
