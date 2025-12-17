export const scoreCards = [
  {
    gameTitle: "Test Game 1",
    gameThumbnail: {
      url: "http://metric-gamer.local/wp-content/uploads/2024/11/image-4.png",
      alt: "",
    },
    gameMetrics: [
      {
        metricTitle: [
          {
            id: 37,
            name: "Diversity",
            slug: "diversity",
            description: "",
          },
        ],
        metricScore: "1",
      },
      {
        metricTitle: [
          {
            id: 39,
            name: "Co-op",
            slug: "co-op",
            description: "",
          },
        ],
        metricScore: "2",
      },
    ],
    handleHideClick: () => {},
  },
  {
    gameTitle: "Test Game 2",
    gameThumbnail: {
      url: "http://metric-gamer.local/wp-content/uploads/2024/11/image-4.png",
      alt: "",
    },
    gameMetrics: [
      {
        metricTitle: [
          {
            id: 37,
            name: "Diversity",
            slug: "diversity",
            description: "",
          },
        ],
        metricScore: "1",
      },
      {
        metricTitle: [
          {
            id: 39,
            name: "Co-op",
            slug: "co-op",
            description: "",
          },
        ],
        metricScore: "2",
      },
    ],
    handleHideClick: () => console.log("click hide"),
  },
  {
    gameTitle: "Test Game 3",
    gameThumbnail: {
      url: "http://metric-gamer.local/wp-content/uploads/2024/11/image-4.png",
      alt: "",
    },
    gameMetrics: [
      {
        metricTitle: [
          {
            id: 37,
            name: "Diversity",
            slug: "diversity",
            description: "",
          },
        ],
        metricScore: "1",
      },
      {
        metricTitle: [
          {
            id: 39,
            name: "Co-op",
            slug: "co-op",
            description: "",
          },
        ],
        metricScore: "2",
      },
    ],
    handleHideClick: () => console.log("click hide"),
  },
  {
    gameTitle: "Test Game 4",
    gameThumbnail: {
      url: "http://metric-gamer.local/wp-content/uploads/2024/11/image-4.png",
      alt: "",
    },
    gameMetrics: [
      {
        metricTitle: [
          {
            id: 37,
            name: "Diversity",
            slug: "diversity",
            description: "",
          },
        ],
        metricScore: "1",
      },
      {
        metricTitle: [
          {
            id: 39,
            name: "Co-op",
            slug: "co-op",
            description: "",
          },
        ],
        metricScore: "2",
      },
    ],
    handleHideClick: () => console.log("click hide"),
  },
  {
    gameTitle: "Test Game 5",
    gameThumbnail: {
      url: "http://metric-gamer.local/wp-content/uploads/2024/11/image-4.png",
      alt: "",
    },
    gameMetrics: [
      {
        metricTitle: [
          {
            id: 37,
            name: "Diversity",
            slug: "diversity",
            description: "",
          },
        ],
        metricScore: "1",
      },
      {
        metricTitle: [
          {
            id: 39,
            name: "Co-op",
            slug: "co-op",
            description: "",
          },
        ],
        metricScore: "2",
      },
    ],
    handleHideClick: () => console.log("click hide"),
  },
];

/**
 * An array of game blocks, each representing a game with its title, thumbnail, and associated metrics.
 *
 * @remarks
 * Each game block contains:
 * - `gameTitle`: The name of the game.
 * - `gameThumbnail`: An object with the game's thumbnail image URL and alt text.
 * - `gameMetrics`: An array of metrics, where each metric includes:
 *    - `metricTitle`: An array of metric objects with id, name, slug, and description.
 *    - `metricScore`: The score assigned to the metric.
 *
 * @example
 * // Accessing the first game's title
 * const title = blockGames[0].gameTitle;
 */
export type GameMetric = {
  metricTitle: {
    id: number;
    name: string;
    slug: string;
    description: string;
  }[];
  metricScore: string;
};

export type BlockGame = {
  gameTitle: string;
  gameThumbnail: {
    url: string;
    alt: string;
  };
  gameMetrics: GameMetric[];
};

export type GameMetricControlled = GameMetric & { hidden: boolean };

//controlled states
export type BlockGameControlled = BlockGame & {
    averageScore: number;
    gameMetrics: GameMetricControlled[];
}

export const blockGames: BlockGame[] = [
  {
    gameTitle: "Test Game 1",
    gameThumbnail: {
      url: "http://metric-gamer.local/wp-content/uploads/2024/11/image-4.png",
      alt: "",
    },
    gameMetrics: [
      {
        metricTitle: [
          {
            id: 37,
            name: "Diversity",
            slug: "diversity",
            description: "",
          },
        ],
        metricScore: "1",
      },
      {
        metricTitle: [
          {
            id: 39,
            name: "Co-op",
            slug: "co-op",
            description: "",
          },
        ],
        metricScore: "2",
      },
    ],
  },
  {
    gameTitle: "Test Game 1",
    gameThumbnail: {
      url: "http://metric-gamer.local/wp-content/uploads/2024/11/image-3.png",
      alt: "",
    },
    gameMetrics: [
      {
        metricTitle: [
          {
            id: 37,
            name: "Diversity",
            slug: "diversity",
            description: "",
          },
        ],
        metricScore: "1",
      },
      {
        metricTitle: [
          {
            id: 39,
            name: "Co-op",
            slug: "co-op",
            description: "",
          },
        ],
        metricScore: "2",
      },
    ],
  },
];
