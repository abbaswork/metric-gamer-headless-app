import gql from "graphql-tag";

export const HomeFeaturedGamesQuery = gql`
  query HomeFeaturedGames {
    page(id: 8, idType: DATABASE_ID) {
      id
      title
      slug
      seo {
        title
        metaDesc
      }
      propertiesHome {
        featuredTitle
        featuredMetrics {
          nodes {
            name
          }
        }
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
                tags {
                  nodes {
                    name
                  }
                }
                platform {
                  nodes {
                    name
                  }
                }
                propertiesGame {
                  gameTitle
                  gameDescription
                  verdict
                  playtime
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
    }
  }
`;
