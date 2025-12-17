import type { Meta, StoryObj } from "@storybook/react";
import { GameHeader } from "./GameHeader";
import darkFantasyImage from "@/assets/generated_images/dark_fantasy_action_rpg_scene_with_a_knight_facing_a_dragon.png";

const meta: Meta<typeof GameHeader> = {
  title: "Game/GameHeader",
  component: GameHeader,
  parameters: {
    layout: "fullscreen",
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
type Story = StoryObj<typeof GameHeader>;

export const Default: Story = {
  args: {
    title: "Elden Ring",
    genre: "Action RPG",
    platforms: ["PS5", "PS4", "Xbox Series X/S", "Xbox One", "PC"],
    developer: "FromSoftware",
    releaseDate: "Feb 25, 2022",
    heroImage: darkFantasyImage,
    onScrollToSimilar: () => console.log("Scroll to similar games")
  }
};
