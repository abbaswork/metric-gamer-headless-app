import gql from "graphql-tag";

export const GameBySlugQuery = gql`
  query GameBySlug($slug: ID!) {
    game(id: $slug, idType: SLUG) {
      title
      slug
      featuredImage {
        node {
          sourceUrl(size: LARGE)
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
          name
        }
      }
      players {
        nodes {
          name
        }
      }
      propertiesGame {
        gameTitle
        gameDescription
        verdict
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
      seo {
        title
        metaDesc
      }
    }
  }
`;
