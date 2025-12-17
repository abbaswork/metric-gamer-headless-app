import type { Meta, StoryObj } from "@storybook/react";
import { GameCard } from "./GameCard";
import darkFantasyImage from "@/assets/generated_images/dark_fantasy_action_rpg_scene_with_a_knight_facing_a_dragon.png";

const meta: Meta<typeof GameCard> = {
  title: "Core/GameCard",
  component: GameCard,
  parameters: {
    layout: "centered",
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
type Story = StoryObj<typeof GameCard>;

export const Default: Story = {
  args: {
    rank: 1,
    title: "Elden Ring",
    genre: "Open World RPG",
    image: darkFantasyImage,
    delay: 0,
    isSelected: false,
  },
  decorators: [
    (Story) => (
      <div className="w-[300px]">
        <Story />
      </div>
    ),
  ],
};
