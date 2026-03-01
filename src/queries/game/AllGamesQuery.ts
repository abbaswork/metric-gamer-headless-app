import gql from "graphql-tag";

export const AllGamesQuery = gql`
  query AllGames($where: RootQueryToGameConnectionWhereArgs, $first: Int) {
    games(first: $first, where: $where) {
      nodes {
        gameId
        title
        slug
        featuredImage {
          node {
            sourceUrl
          }
        }
        propertiesGame {
          gameTitle
          gameDescription
        }
        uri
        crossplatform {
          nodes {
            taxonomyName
          }
        }
        platform {
          nodes {
            name
          }
        }
        players {
          nodes {
            name
          }
        }
        tags {
          nodes {
            name
          }
        }
        metrics {
          nodes {
            name
          }
        }
      }
    }
  }
`;
