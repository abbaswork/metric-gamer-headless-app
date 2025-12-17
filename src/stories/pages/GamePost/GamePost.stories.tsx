import type { Meta, StoryObj } from "@storybook/react";
import { GamePost } from "./GamePost";
import darkFantasyImage from "@/assets/generated_images/dark_fantasy_action_rpg_scene_with_a_knight_facing_a_dragon.png";
import gothicImage from "@/assets/generated_images/gothic_horror_action_game_scene_for_bloodborne_full_screen.png";
import { BookOpen, Swords, Monitor, TrendingUp, Trophy } from "lucide-react";

const meta: Meta<typeof GamePost> = {
  title: "Pages/GamePost",
  component: GamePost,
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
type Story = StoryObj<typeof GamePost>;

const HEADER_DATA = {
  title: "Elden Ring",
  genre: "Action RPG",
  platforms: ["PS5", "PS4", "Xbox Series X/S", "Xbox One", "PC"],
  developer: "FromSoftware",
  releaseDate: "Feb 25, 2022",
  heroImage: darkFantasyImage,
};

const INFO_DATA = {
  description: "Elden Ring is an expansive fantasy action-RPG game developed by FromSoftware, Inc. under the direction of Hidetaka Miyazaki and created in collaboration with George R. R. Martin. Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring and become an Elden Lord in the Lands Between.",
  verdict: "Elden Ring is a masterpiece of open-world design, successfully translating the tight, claustrophobic tension of Dark Souls into a massive, sprawling kingdom. It sets a new gold standard for what an action RPG can be.",
  pros: [
    "Unmatched sense of exploration and discovery",
    "Incredible build variety and combat depth",
    "Stunning art direction and world design",
    "Massive amount of high-quality content"
  ],
  cons: [
    "Late-game difficulty spike can be frustrating",
    "Quest design is often obtuse and hard to follow",
    "Occasional performance issues on PC"
  ]
};

const METRICS_DATA = [
  { 
    id: "story", 
    score: 4.8, 
    label: "Narrative Depth", 
    icon: BookOpen, 
    analysis: "Elden Ring's narrative is fragmented, requiring players to piece together the history of the Lands Between through item descriptions, environmental cues, and cryptic NPC dialogue. This approach creates a sense of archaeological discovery that is unparalleled in the genre."
  },
  { 
    id: "combat", 
    score: 5.0, 
    label: "Combat Complexity", 
    icon: Swords, 
    analysis: "The introduction of jumping attacks and guard counters adds a new layer of dynamism to the familiar Souls combat foundation. However, the real star is the Ash of War system, which allows for unprecedented build variety."
  },
  { 
    id: "visuals", 
    score: 5.0, 
    label: "Visual Fidelity", 
    icon: Monitor, 
    analysis: "From the golden rays of the Erdtree dominating the skyline to the subterranean star-filled skies of Siofra River, the art direction is consistently breathtaking. FromSoftware has mastered the art of scale and spectacle."
  },
  { 
    id: "difficulty", 
    score: 4.5, 
    label: "Challenge", 
    icon: TrendingUp, 
    analysis: "Elden Ring is undeniably difficult, but it's the most accessible FromSoftware game to date. The open-world structure acts as a difficulty slider; if a boss is too hard, you can simply leave, explore elsewhere, and return later."
  },
  { 
    id: "content", 
    score: 5.0, 
    label: "Content Value", 
    icon: Trophy, 
    analysis: "The sheer density of content in Elden Ring is staggering. Even after 100 hours, players will still discover entire new regions, legacy dungeons, and questlines they completely missed."
  }
];

const SIMILAR_GAMES_DATA = [
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
  },
  {
    title: "Why Bloodborne Needs a Remaster",
    image: gothicImage,
    date: "May 15, 2024",
    author: "Alex Chen",
    slug: "#"
  },
  {
    title: "Sekiro: The Hardest FromSoft Game?",
    image: darkFantasyImage,
    date: "Apr 02, 2024",
    author: "Metric Gamer Team",
    slug: "#"
  }
];

const SIDEBAR_DATA = {
  score: 4.9,
  stats: {
    playtime: "120h+",
    difficulty: "Hard",
    players: "1-4 (Co-op/PvP)"
  }
};

export const Default: Story = {
  args: {
    header: HEADER_DATA,
    info: INFO_DATA,
    metrics: METRICS_DATA,
    similarGames: SIMILAR_GAMES_DATA,
    sidebar: SIDEBAR_DATA
  }
};
