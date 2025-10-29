// RankingStrip.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import RankingStrip from "./RankingStrip";
import { PageContent } from "../../../layouts/page-content/PageContent";

const meta: Meta<typeof RankingStrip> = {
  title: "Core/Lists/RankingStrip",
  component: RankingStrip,
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "Metric Gamer",
      values: [
        { name: "Metric Gamer", value: "#2a0f46" },
        { name: "Light", value: "#f6f6f6" },
      ],
    },
  },
  args: {
    heading: "Featured Ranking",
    items: [
      { rank: 2, src: "https://www.pluggedin.com/wp-content/uploads/2020/01/Bloodborne-large-1200x688.jpg", 
        alt: "Bloodborne", 
        title: "Bloodborne", 
        subtitle: "some text here" },


      { rank: 3, src: "http://static.bandainamcoent.eu/high/dark-souls/dark-souls-3/00-page-setup/ds3_game-thumbnail.jpg",
         alt: "Dark Souls III", 
         title: "Dark souls III", 
         subtitle: "some text here" },


      { rank: 4, src: "https://sm.ign.com/t/ign_nordic/review/d/demons-sou/demons-souls-review_b45f.1200.jpg",
         alt: "Demon Souls", 
         title: "Demon Souls", 
         subtitle: "some text here" },

      { rank: 5,  src: "https://aiptcomics.com/wp-content/uploads/2019/03/Screen-Shot-2019-03-23-at-8.54.29-AM-min.png", 
        alt: "Sekiro", 
        title: "Sekiro",
         subtitle: "some text here" },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof RankingStrip>;

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
