import type { Meta, StoryObj } from "@storybook/react";
import { BlogHeader } from "./BlogHeader";
import darkFantasyImage from "@/assets/generated_images/dark_fantasy_action_rpg_scene_with_a_knight_facing_a_dragon.png";

const meta: Meta<typeof BlogHeader> = {
  title: "Blog/BlogHeader",
  component: BlogHeader,
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
type Story = StoryObj<typeof BlogHeader>;

export const Default: Story = {
  args: {
    title: "Top 5 Soulslikes That Defined the Genre",
    author: "Metric Gamer Team",
    date: "October 12, 2024",
    readTime: "8 min read",
    image: darkFantasyImage,
    description: "The Soulslike genre has exploded in popularity, but few games manage to capture the magic of the originals. We've analyzed the data, crunched the numbers, and ranked the top 5 titles that every fan needs to play."
  }
};
