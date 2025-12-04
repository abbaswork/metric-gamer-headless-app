import type { Meta, StoryObj } from "@storybook/react";

import { ScoreCard } from "./ScoreCard";
import { PageContent } from "../../layouts/page-content/PageContent";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof ScoreCard> = {
  title: "Core/ScoreCard",
  component: ScoreCard,
  args: {
    gameTitle: "Test Game 1",
    averageScore: 1.5,
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
        hidden: false,
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
        hidden: false,
      },
    ],
    gameThumbnail: {
      url: "http://metric-gamer.local/wp-content/uploads/2024/11/image-3.png",
      alt: "",
    },
    handleHideClick: () => console.log("click hide"),
  },
};

export default meta;
type Story = StoryObj<typeof ScoreCard>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  decorators: [
    (Story) => (
      <div className="flex-center">
        <PageContent>
          <Story />
        </PageContent>
      </div>
    ),
  ],
};
