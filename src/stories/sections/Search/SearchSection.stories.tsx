import type { Meta, StoryObj } from "@storybook/react";
import { SearchSection } from "./SearchSection";
import robotImage from "@/assets/generated_images/futuristic_robot_combat_game_scene.png";
import gothicImage from "@/assets/generated_images/gothic_horror_action_game_scene_for_bloodborne_full_screen.png";
import metroidImage from "@/assets/generated_images/metroidvania_platformer_game_art.png";
import darkFantasyImage from "@/assets/generated_images/dark_fantasy_action_rpg_scene_with_a_knight_facing_a_dragon.png";

const meta: Meta<typeof SearchSection> = {
  title: "Sections/SearchSection",
  component: SearchSection,
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
type Story = StoryObj<typeof SearchSection>;

// Reusing Mock Data logic
const GAMES = [
  { 
    id: "elden-ring",
    type: "game",
    title: "Elden Ring", 
    genre: "Open World RPG", 
    image: darkFantasyImage,
    metrics: { story: 4, graphics: 5, combat: 5, difficulty: 5, learning: 4, replay: 5 },
    uniqueMetric: { label: "World Scale", value: 5, icon: "Map" },
    genres: ["RPG", "Open World", "Action"],
    platforms: ["PC", "PS5", "PS4", "Xbox Series X/S", "Xbox One"]
  },
  { 
    id: "ds3",
    type: "game",
    title: "Dark Souls 3", 
    genre: "Action RPG", 
    image: darkFantasyImage,
    metrics: { story: 3, graphics: 4, combat: 5, difficulty: 5, learning: 3, replay: 4 },
    uniqueMetric: { label: "Boss Design", value: 5, icon: "Skull" },
    genres: ["RPG", "Action"],
    platforms: ["PC", "PS4", "Xbox One"]
  },
  { 
    id: "nier",
    type: "game",
    title: "NieR: Automata", 
    genre: "Sci-Fi Action", 
    image: robotImage,
    metrics: { story: 5, graphics: 4, combat: 4, difficulty: 3, learning: 2, replay: 5 },
    uniqueMetric: { label: "Soundtrack", value: 5, icon: "Music" },
    genres: ["Sci-Fi", "Action", "RPG"],
    platforms: ["PC", "PS4", "Xbox One", "Switch"]
  },
];

const BLOGS = [
  { 
    id: "elden-ring-analysis",
    type: "blog",
    title: "Why Elden Ring's Open World Ruined Other Games For Me", 
    excerpt: "An in-depth look at how FromSoftware revolutionized exploration through verticality and lack of hand-holding.",
    image: darkFantasyImage,
    metrics: ["World Design", "Difficulty", "Art Direction"], 
    genres: ["RPG", "Open World"],
    date: "Oct 12, 2024",
    readTime: "8 min",
    blogType: "Best Of",
    platforms: ["PC", "PS5", "PS4", "Xbox Series X/S", "Xbox One"]
  },
  { 
    id: "nier-philosophy",
    type: "blog",
    title: "The Philosophy of Automata: Can Robots Cry?", 
    excerpt: "Examining the existential themes and narrative structure that makes NieR: Automata a masterpiece of storytelling.",
    image: robotImage,
    metrics: ["Story", "Music", "Innovation"], 
    genres: ["Sci-Fi", "Action"],
    date: "Nov 05, 2024",
    readTime: "12 min",
    blogType: "Hidden Gems",
    platforms: ["PC", "PS4", "Xbox One", "Switch"]
  },
];

export const Default: Story = {
  args: {
    initialGames: GAMES,
    initialBlogs: BLOGS
  }
};
