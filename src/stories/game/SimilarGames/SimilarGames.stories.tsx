import type { Meta, StoryObj } from "@storybook/react";
import { SimilarGames } from "./SimilarGames";
import darkFantasyImage from "@/assets/generated_images/dark_fantasy_action_rpg_scene_with_a_knight_facing_a_dragon.png";
import gothicImage from "@/assets/generated_images/gothic_horror_action_game_scene_for_bloodborne_full_screen.png";

const meta: Meta<typeof SimilarGames> = {
  title: "Game/SimilarGames",
  component: SimilarGames,
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
type Story = StoryObj<typeof SimilarGames>;

const GAMES = [
  {
    title: "Top 5 Soulslikes That Defined the Genre",
    image: darkFantasyImage,
    date: "Oct 12, 2024",
    author: "Metric Gamer Team",
    slug: "#"
  },
  {
    title: "Best Builds for Shadow of the Erdtree",
    image: gothicImage,
    date: "Jun 20, 2024",
    author: "Sarah Jones",
    slug: "#"
  }
];

export const Default: Story = {
  args: {
    games: GAMES,
    currentGameTitle: "Elden Ring"
  }
};
