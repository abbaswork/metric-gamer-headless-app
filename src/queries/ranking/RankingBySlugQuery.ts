import gql from "graphql-tag";

export const RankingBySlugQuery = gql`
  query RankingBySlug($slug: ID!) {
    ranking(id: $slug, idType: SLUG) {
      id
      title
      slug
      featuredImage {
        node {
          sourceUrl
        }
      }
      propertiesGamePost {
        description
        selectGames {
          selectedGame {
            nodes {
              ... on Game {
                id
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
                  theBad {
                    badPoint
                  }
                  theGood {
                    goodPoint
                  }
                  verdict
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
