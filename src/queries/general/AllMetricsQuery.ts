import gql from "graphql-tag";

export const AllMetricsQuery = gql`
  query AllMetrics {
    metrics(where: { hideEmpty: false }, first: 100) {
      nodes {
        id
        name
        slug
      }
    }
  }
`;
