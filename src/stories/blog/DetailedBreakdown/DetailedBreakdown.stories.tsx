import type { Meta, StoryObj } from "@storybook/react";
import { DetailedBreakdown } from "./DetailedBreakdown";
import darkFantasyImage from "@/assets/generated_images/dark_fantasy_action_rpg_scene_with_a_knight_facing_a_dragon.png";
import gothicImage from "@/assets/generated_images/gothic_horror_action_game_scene_for_bloodborne_full_screen.png";

const meta: Meta<typeof DetailedBreakdown> = {
  title: "Blog/DetailedBreakdown",
  component: DetailedBreakdown,
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
type Story = StoryObj<typeof DetailedBreakdown>;

const GAMES = [
  {
    id: "elden-ring",
    rank: 1,
    title: "Elden Ring",
    image: darkFantasyImage,
    dynamicScore: 4.8,
    tags: ["Open World", "Co-op"],
    releaseDate: "Feb 2022",
    metrics: { Story: 4.8, Combat: 5, World: 5, Difficulty: 4.5 },
    description: "A masterclass in open-world design that successfully translates the tight, claustrophobic tension of Dark Souls into a massive, sprawling kingdom.",
    analysis: {
      pros: ["Unmatched exploration freedom", "Incredible build variety"],
      cons: ["Late game balancing issues"],
      verdict: "The new gold standard for action RPGs."
    }
  },
  {
    id: "bloodborne",
    rank: 2,
    title: "Bloodborne",
    image: gothicImage,
    dynamicScore: 4.8,
    tags: ["Horror", "Fast-Paced"],
    releaseDate: "Mar 2015",
    metrics: { Story: 4.5, Combat: 5, World: 5, Difficulty: 4 },
    description: "Trading shields for guns and patience for aggression, Bloodborne remains the most stylish and atmospherically dense entry in the genre.",
    analysis: {
      pros: ["Aggressive, satisfying combat", "Best-in-class atmosphere"],
      cons: ["30 FPS lock"],
      verdict: "A masterpiece of gothic horror and action."
    }
  }
];

export const Default: Story = {
  args: {
    games: GAMES
  }
};
