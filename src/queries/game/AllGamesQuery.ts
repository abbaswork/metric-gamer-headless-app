import gql from "graphql-tag";

export const AllGamesQuery = gql`
  query AllGames($where: RootQueryToGameConnectionWhereArgs) {
    games(where: $where) {
      nodes {
        gameId
        title
        slug
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
