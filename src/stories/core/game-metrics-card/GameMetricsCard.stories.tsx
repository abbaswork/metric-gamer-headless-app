// GameMetricsCard.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { GameMetricsCard } from "./GameMetricsCard";
import { PageContent } from "../../layouts/page-content/PageContent";

const meta: Meta<typeof GameMetricsCard> = {
  title: "Core/Hero/GameMetricsCard",
  component: GameMetricsCard,
  args: {
    href: "/games/sekiro",
    imageSrc: "https://cdn.mos.cms.futurecdn.net/8qtEqyNPpy7owiSoZER9d4-1200-80.jpg.webp", //replace with downloaded image later
    imageAlt: "Sekiro duel scene",
    monthLabel: "March 2019",
    genreName: "action-adventure",
    featuredGame: "Sekiro",
    subtitle: "Some text here about the game and its metrics",
    rating: 4.7,
    starRows: [
      { label: "Story", value: 5 },
      { label: "Combat", value: 4.5 },
      { label: "Skill Ceiling", value: 4 },
    ],
    features: ["2 Player", "Cross Platform"],
    tags: ["Tag 1", "Tag 1"],
    accordionLabel: "Click to learn more",
    accordionTitle: "Skill Ceiling",
    accordionBody:
      "The skill ceiling in Under Night In-Birth Exe:Late[cl-r] is remarkably high, offering a deep well of techniques and strategies for players to master. The game’s unique GRD (Grind Grid) system adds a layer of resource management to fights, rewarding aggressive play and creating a constant ebb and flow to matches. Mastering the intricacies of the GRD system, along with character-specific combos and mixups, provides a satisfying long-term goal for dedicated players. The game’s balance between accessibility and depth ensures that while new players can enjoy the basics, there’s always room for improvement and optimization at higher levels of play.",
  },
};
export default meta;

type Story = StoryObj<typeof GameMetricsCard>;

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
