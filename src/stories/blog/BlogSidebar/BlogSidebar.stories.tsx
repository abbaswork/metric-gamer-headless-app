import type { Meta, StoryObj } from "@storybook/react";
import { BlogSidebar } from "./BlogSidebar";
import darkFantasyImage from "@/assets/generated_images/dark_fantasy_action_rpg_scene_with_a_knight_facing_a_dragon.png";
import metroidImage from "@/assets/generated_images/metroidvania_platformer_game_art.png";

const meta: Meta<typeof BlogSidebar> = {
  title: "Blog/BlogSidebar",
  component: BlogSidebar,
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
type Story = StoryObj<typeof BlogSidebar>;

const POSTS = [
  {
    title: "Why Elden Ring's Open World Changed Gaming",
    image: darkFantasyImage,
    date: "Sep 15, 2024",
    author: "Alex Chen",
    slug: "#"
  },
  {
    title: "Top 10 Indie Games of 2024 So Far",
    image: metroidImage,
    date: "Aug 10, 2024",
    author: "Metric Gamer Team",
    slug: "#"
  }
];

export const Default: Story = {
  args: {
    posts: POSTS
  }
};
