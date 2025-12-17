import type { Meta, StoryObj } from "@storybook/react";
import { ContentCard } from "./ContentCard";
import darkFantasyImage from "@/assets/generated_images/dark_fantasy_action_rpg_scene_with_a_knight_facing_a_dragon.png";
import robotImage from "@/assets/generated_images/futuristic_robot_combat_game_scene.png";

const meta: Meta<typeof ContentCard> = {
  title: "Core/ContentCard",
  component: ContentCard,
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
  decorators: [
    (Story) => (
      <div style={{ width: '350px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ContentCard>;

export const GameCard: Story = {
  args: {
    id: "elden-ring",
    type: "game",
    title: "Elden Ring",
    image: darkFantasyImage,
    genre: "Open World RPG",
    rating: 9.8,
    genres: ["RPG", "Open World", "Action"],
  },
};

export const BlogCard: Story = {
  args: {
    id: "nier-philosophy",
    type: "blog",
    title: "The Philosophy of Automata",
    image: robotImage,
    excerpt: "Examining the existential themes and narrative structure that makes NieR: Automata a masterpiece of storytelling.",
    blogType: "Hidden Gems",
  },
};
