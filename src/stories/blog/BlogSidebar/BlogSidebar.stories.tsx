import type { Meta, StoryObj } from "@storybook/react";
import { BlogSidebar, type BlogPostSummary } from "./BlogSidebar";
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

const POSTS: BlogPostSummary[] = [
  {
    id: "1",
    title: "10 Essential RPGs for Every Dark Fantasy Fan",
    image: darkFantasyImage,
    slug: "/ranking/essential-rpgs",
    excerpt: "Discover the dark fantasy worlds that defined a generation of RPG enthusiasts.",
    metrics: ["Combat", "Story", "World"],
    platforms: ["PS5", "PC"]
  },
  {
    id: "2",
    title: "The Evolution of Open World Games",
    image: darkFantasyImage,
    slug: "/ranking/open-world-evolution",
    excerpt: "From simple sprites to sprawling masterpieces, tracing the history of open worlds.",
    metrics: ["World", "Exploration"],
    platforms: ["PC", "Xbox"]
  },
  {
    id: "3",
    title: "Indie Gems You Might Have Missed",
    image: darkFantasyImage,
    slug: "/ranking/indie-gems",
    excerpt: "Highlighting five incredible indie titles that deserve your attention.",
    metrics: ["Art", "Music"],
    platforms: ["Switch", "PC"]
  }
];

export const Default: Story = {
  args: {
    posts: POSTS
  }
};
