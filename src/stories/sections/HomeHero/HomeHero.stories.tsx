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
      delay: 0,
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
      delay: 0.1,
    },
    {
      rank: 3,
      title: "Dark Souls 3",
      genre: "Action RPG",
      description: "As fires fade and the world falls into ruin, journey into a universe filled with more colossal enemies.",
      image: darkFantasyImage,
      metrics: [
        { label: "Difficulty", value: "Hard" },
        { label: "Atmosphere", value: "Dark" },
        { label: "Combat", value: "Deep" }
      ],
      tags: ["RPG", "Dark"],
      delay: 0.2,
    },
    {
      rank: 4,
      title: "Cyberpunk 2077",
      genre: "Open World RPG",
      description: "Cyberpunk 2077 is an open-world, action-adventure story set in Night City.",
      image: robotImage,
      metrics: [
        { label: "Immersion", value: "High" },
        { label: "Graphics", value: "Ultra" },
        { label: "Story", value: "Deep" }
      ],
      tags: ["Sci-Fi", "RPG"],
      delay: 0.3,
    },
    {
      rank: 5,
      title: "God of War",
      genre: "Action Adventure",
      description: "His vengeance against the Gods of Olympus years behind him, Kratos now lives as a man in the realm of Norse Gods.",
      image: darkFantasyImage,
      metrics: [
        { label: "Action", value: "Epic" },
        { label: "Story", value: "10/10" },
        { label: "Visuals", value: "Peak" }
      ],
      tags: ["Action", "Adventure"],
      delay: 0.4,
    },
  ],
  "nov-2024": [
    {
      rank: 1,
      title: "Starfield",
      genre: "Space RPG",
      description: "In the year 2330, humanity has ventured beyond our solar system, settling new planets, and living as a spacefaring people. From the creators of Skyrim.",
      image: robotImage,
      metrics: [
        { label: "Scale", value: "Massive" },
        { label: "Exploration", value: "10/10" },
        { label: "Ship Building", value: "Deep" }
      ],
      tags: ["Sci-Fi", "RPG"],
      delay: 0,
    },
    {
      rank: 2,
      title: "Baldur's Gate 3",
      genre: "CRPG",
      description: "Gather your party using 5th edition D&D rules.",
      image: darkFantasyImage,
      metrics: [
        { label: "Choice", value: "Infinite" },
        { label: "Story", value: "10/10" },
        { label: "Characters", value: "Peak" }
      ],
      tags: ["RPG", "Strategy"],
      delay: 0.1,
    },
    { rank: 3, title: "Spider-Man 2", genre: "Action", description: "Be greater. Together.", image: robotImage, metrics: [], tags: [], delay: 0.2 },
    { rank: 4, title: "Alan Wake 2", genre: "Survival Horror", description: "A mind-bending horror experience.", image: darkFantasyImage, metrics: [], tags: [], delay: 0.3 },
    { rank: 5, title: "Super Mario Wonder", genre: "Platformer", description: "Wonder happens.", image: robotImage, metrics: [], tags: [], delay: 0.4 },
  ],
  "oct-2024": [
    {
      rank: 1,
      title: "Assassin's Creed Mirage",
      genre: "Action Stealth",
      description: "Experience the story of Basim, a cunning street thief experiencing nightmarish visions.",
      image: darkFantasyImage,
      metrics: [
        { label: "Stealth", value: "return" },
        { label: "Parkour", value: "Fluid" },
        { label: "History", value: "Rich" }
      ],
      tags: ["Action", "Stealth"],
      delay: 0,
    },
    { rank: 2, title: "Forza Motorsport", genre: "Racing", description: "Build the competition.", image: robotImage, metrics: [], tags: [], delay: 0.1 },
    { rank: 3, title: "Lords of the Fallen", genre: "Soulslike", description: "A vast world awaits in the all-new, dark fantasy action-RPG.", image: darkFantasyImage, metrics: [], tags: [], delay: 0.2 },
    { rank: 4, title: "Cities Skylines II", genre: "Simulation", description: "If you can dream it, you can build it.", image: robotImage, metrics: [], tags: [], delay: 0.3 },
    { rank: 5, title: "Ghostrunner 2", genre: "Action", description: "Blood will run.", image: darkFantasyImage, metrics: [], tags: [], delay: 0.4 },
  ]
};

export const Default: Story = {
  render: () => <HomeHero gamesMap={GAMES_Map} />,
};
