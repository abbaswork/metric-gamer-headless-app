import gql from "graphql-tag";

export const AllBlogContentsQuery = gql`
  query AllBlogContents($first: Int) {
    allBlogContent(first: $first) {
      nodes {
        id
        slug
        title
        featuredImage {
          node {
            sourceUrl(size: MEDIUM)
          }
        }
      }
    }
  }
`;
