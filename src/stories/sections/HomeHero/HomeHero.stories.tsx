import type { Meta, StoryObj } from "@storybook/react";
import { HomeHero } from "./HomeHero";
import darkFantasyImage from "@/assets/generated_images/dark_fantasy_action_rpg_scene_with_a_knight_facing_a_dragon.png";
import robotImage from "@/assets/generated_images/futuristic_robot_combat_game_scene.png";

const meta: Meta<typeof HomeHero> = {
  title: "Sections/HomeHero",
  component: HomeHero,
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
type Story = StoryObj<typeof HomeHero>;

const GAMES_Map = {
  "dec-2024": [
    {
      rank: 1,
      title: "Elden Ring",
      genre: "Open World RPG",
      description: "A vast world of shadow and light, where gods and monsters roam free. Master the art of combat.",
      image: darkFantasyImage,
      metrics: [
        { label: "Story", value: "10/10" },
        { label: "Gameplay", value: "9.8/10" },
        { label: "Visuals", value: "10/10" }
      ],
      tags: ["RPG", "Fantasy"],
    },
    {
      rank: 2,
      title: "NieR: Automata",
      genre: "Sci-Fi Action",
      description: "Invaders from another world attack without warning - unleashing the machine lifeforms.",
      image: robotImage,
      metrics: [
        { label: "Story", value: "9.5/10" },
        { label: "Gameplay", value: "9/10" },
        { label: "Music", value: "10/10" }
      ],
      tags: ["Action", "Sci-Fi"],
    }
  ],
  "nov-2024": [],
  "oct-2024": []
};

export const Default: Story = {
  render: () => <HomeHero gamesMap={GAMES_Map as any} />,
};
