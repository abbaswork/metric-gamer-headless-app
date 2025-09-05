import gql from "graphql-tag";

export const PageQuery = gql`
  query PageQuery($id: ID!, $preview: Boolean = false) {
    page(id: $id, idType: DATABASE_ID, asPreview: $preview) {
      isFrontPage
      title
      content
    }
    posts(first: 5, where: { orderby: { field: DATE, order: DESC } }) {
      nodes {
        id
        uri
        excerpt
        title
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
    }
  }
`;
