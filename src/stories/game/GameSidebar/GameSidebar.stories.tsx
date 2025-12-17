import type { Meta, StoryObj } from "@storybook/react";
import { GameSidebar } from "./GameSidebar";

const meta: Meta<typeof GameSidebar> = {
  title: "Game/GameSidebar",
  component: GameSidebar,
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
  decorators: [
    (Story) => (
      <div style={{ width: '360px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof GameSidebar>;

export const Default: Story = {
  args: {
    score: 4.9,
    stats: {
      playtime: "120h+",
      difficulty: "Hard",
      players: "1-4 (Co-op/PvP)"
    }
  }
};
