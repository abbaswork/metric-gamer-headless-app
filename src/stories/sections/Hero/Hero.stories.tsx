import type { Meta, StoryObj } from "@storybook/react";
import { HeroSection } from "./Hero";
import darkFantasyImage from "@/assets/generated_images/dark_fantasy_action_rpg_scene_with_a_knight_facing_a_dragon.png";

const meta: Meta<typeof HeroSection> = {
  title: "Sections/Hero",
  component: HeroSection,
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
type Story = StoryObj<typeof HeroSection>;

const MOCK_GAME = {
  title: "Elden Ring",
  genre: "Open World RPG",
  image: darkFantasyImage,
  description: "The most challenging and rewarding action RPG that tests your skill and patience. A masterclass in open world design.",
  metrics: [
    { label: "Difficulty", value: "4.8/5" },
    { label: "Bosses", value: "5/5" },
    { label: "Design", value: "5/5" }
  ],
  tags: ["Open World", "Dark Fantasy", "Difficult", "RPG", "Masterpiece"]
};

export const Default: Story = {
  args: {
    selectedMonth: "dec-2024",
    onMonthChange: (value) => console.log("Month changed:", value),
    game: MOCK_GAME,
  },
};
