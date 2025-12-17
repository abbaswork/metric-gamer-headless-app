import type { Meta, StoryObj } from "@storybook/react";
import { GameInfo } from "./GameInfo";

const meta: Meta<typeof GameInfo> = {
  title: "Game/GameInfo",
  component: GameInfo,
  parameters: {
    layout: "padded",
    backgrounds: {
      default: "dark",
      values: [
        { name: "dark", value: "#160026" },
      ],
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof GameInfo>;

export const Default: Story = {
  args: {
    description: "Elden Ring is an expansive fantasy action-RPG game developed by FromSoftware, Inc. under the direction of Hidetaka Miyazaki and created in collaboration with George R. R. Martin.",
    verdict: "Elden Ring is a masterpiece of open-world design, successfully translating the tight, claustrophobic tension of Dark Souls into a massive, sprawling kingdom.",
    pros: [
      "Unmatched sense of exploration",
      "Incredible build variety",
      "Stunning art direction"
    ],
    cons: [
      "Late-game difficulty spike",
      "Obtuse quest design"
    ]
  }
};
