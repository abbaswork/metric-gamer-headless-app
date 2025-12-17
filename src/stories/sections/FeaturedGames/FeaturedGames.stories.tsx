import type { Meta, StoryObj } from "@storybook/react";
import { FeaturedGames } from "./FeaturedGames";
import darkFantasyImage from "@/assets/generated_images/dark_fantasy_action_rpg_scene_with_a_knight_facing_a_dragon.png";
import robotImage from "@/assets/generated_images/futuristic_robot_combat_game_scene.png";

const meta: Meta<typeof FeaturedGames> = {
  title: "Sections/FeaturedGames",
  component: FeaturedGames,
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
type Story = StoryObj<typeof FeaturedGames>;

const MOCK_GAMES = [
  {
    rank: 1,
    title: "Elden Ring",
    genre: "Open World RPG",
    image: darkFantasyImage,
  },
  {
    rank: 2,
    title: "NieR: Automata",
    genre: "Sci-Fi Action",
    image: robotImage,
  },
  {
    rank: 3,
    title: "Dark Souls 3",
    genre: "Action RPG",
    image: darkFantasyImage,
  },
  {
    rank: 4,
    title: "Bloodborne",
    genre: "Horror RPG",
    image: darkFantasyImage,
  },
  {
    rank: 5,
    title: "Sekiro",
    genre: "Action",
    image: darkFantasyImage,
  },
];

export const Default: Story = {
  args: {
    games: MOCK_GAMES,
    onGameClick: (id) => console.log("Game clicked:", id),
    selectedGameId: "Elden Ring",
  },
};
