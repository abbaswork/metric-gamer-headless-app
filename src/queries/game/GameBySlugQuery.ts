import gql from "graphql-tag";

export const GameBySlugQuery = gql`
  query GameBySlug($slug: ID!) {
    game(id: $slug, idType: SLUG) {
      title
      slug
      propertiesGame {
        gameTitle
        gameDescription
        playtime
        releaseDate
        theBad {
          badPoint
        }
        theGood {
          goodPoint
        }
        metrics {
          description
          score
          metric {
            nodes {
              name
            }
          }
        }
      }
    }
  }
`;
