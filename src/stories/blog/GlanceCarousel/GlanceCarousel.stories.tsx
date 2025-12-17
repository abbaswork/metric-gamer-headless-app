import type { Meta, StoryObj } from "@storybook/react";
import { GlanceCarousel } from "./GlanceCarousel";
import darkFantasyImage from "@/assets/generated_images/dark_fantasy_action_rpg_scene_with_a_knight_facing_a_dragon.png";
import gothicImage from "@/assets/generated_images/gothic_horror_action_game_scene_for_bloodborne_full_screen.png";
import metroidImage from "@/assets/generated_images/metroidvania_platformer_game_art.png";

const meta: Meta<typeof GlanceCarousel> = {
  title: "Blog/GlanceCarousel",
  component: GlanceCarousel,
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
type Story = StoryObj<typeof GlanceCarousel>;

const GAMES = [
  {
    id: "elden-ring",
    rank: 1,
    title: "Elden Ring",
    image: darkFantasyImage,
    dynamicScore: 4.8,
    metrics: { Story: 4.8, Combat: 5, World: 5, Difficulty: 4.5 }
  },
  {
    id: "bloodborne",
    rank: 2,
    title: "Bloodborne",
    image: gothicImage,
    dynamicScore: 4.8,
    metrics: { Story: 4.5, Combat: 5, World: 5, Difficulty: 4 }
  },
  {
    id: "hollow-knight",
    rank: 3,
    title: "Hollow Knight",
    image: metroidImage,
    dynamicScore: 4.7,
    metrics: { Story: 3.5, Combat: 4.5, World: 5, Difficulty: 4 }
  }
];

export const Default: Story = {
  args: {
    games: GAMES,
    onGameClick: (id) => console.log("Clicked:", id)
  }
};
