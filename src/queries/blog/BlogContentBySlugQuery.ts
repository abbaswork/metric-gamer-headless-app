import gql from "graphql-tag";

export const BlogContentBySlugQuery = gql`
  query BlogContentBySlug($slug: String!) {
    blogContentBy(slug: $slug) {
      title
      slug
      date
      modified
      featuredImage {
        node {
          sourceUrl(size: LARGE)
        }
      }
      propertiesBlogContent {
        contentBlock
      }
      seo {
        title
        metaDesc
      }
    }
  }
`;
