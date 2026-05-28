import gql from "graphql-tag";

export const BlogContentByIdQuery = gql`
  query BlogContentById($id: ID!) {
    blogContent(id: $id, idType: DATABASE_ID) {
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
