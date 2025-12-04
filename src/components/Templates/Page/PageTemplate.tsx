import { print } from "graphql/language/printer";
import { ContentNode, Page } from "@/gql/graphql";
import { fetchGraphQL } from "@/utils/fetchGraphQL";
import { PageQuery } from "./PageQuery";
import { BlogCard } from "@/stories/core/blog-card/BlogCard";

interface TemplateProps {
  node: ContentNode;
}

export default async function PageTemplate({ node }: TemplateProps) {
  const { page, posts } = await fetchGraphQL<{ page: Page; posts: any }>(
    print(PageQuery),
    {
      id: node.databaseId,
    }
  );

  console.log("Page data:", page);
  console.log("Posts data:", posts);

  return (
    <>
      {page.isFrontPage ? (
        <div className="home-page">
          <h1>{page.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: page?.content || " " }} />
          <div className="featured-posts">
            <h2>Featured Posts</h2>
            {posts.nodes.map((post: any) => (
              <BlogCard
                key={post.id}
                src={post.featuredImage?.node?.sourceUrl}
                alt={post.title}
                title={post.title}
                href={post.uri}
                description={post.excerpt}
                postCard={true}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="home-page">
          <h1>{page.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: page?.content || " " }} />
          <div className="featured-posts">
            <h2>Featured Posts</h2>
            {posts.nodes.map((post: any) => (
              <BlogCard
                key={post.id}
                src={post.featuredImage?.node?.sourceUrl}
                alt={post.title}
                title={post.title}
                href={post.uri}
                description={post.excerpt}
                postCard={true}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
