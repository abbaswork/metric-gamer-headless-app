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
          metrics {
            score
            metric {
              nodes {
                name
              }
            }
          }
        }
        platform {
          nodes {
            name
          }
        }
        tags {
          nodes {
            name
          }
        }
        crossplatform {
          nodes {
            taxonomyName
          }
        }
      }
    }
  }
`;
