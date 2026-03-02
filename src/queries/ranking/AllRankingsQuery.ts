import gql from "graphql-tag";

export const AllRankingsQuery = gql`
  query AllRankings($first: Int) {
    rankings(first: $first) {
      nodes {
        id
        title
        slug
        featuredImage {
          node {
            sourceUrl(size: LARGE)
          }
        }
        propertiesGamePost {
          description
          selectGames {
            selectedGame {
              nodes {
                ... on Game {
                  title
                  slug
                  propertiesGame {
                    metrics {
                      metric {
                        nodes {
                          name
                        }
                      }
                      score
                    }
                    playtime
                  }
                  platform {
                    nodes {
                      name
                    }
                  }
                  featuredImage {
                    node {
                      sourceUrl
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
