import type { Meta, StoryObj } from "@storybook/react";
import { BlogPost } from "./BlogPost";
import darkFantasyImage from "@/assets/generated_images/dark_fantasy_action_rpg_scene_with_a_knight_facing_a_dragon.png";
import gothicImage from "@/assets/generated_images/gothic_horror_action_game_scene_for_bloodborne_full_screen.png";
import metroidImage from "@/assets/generated_images/metroidvania_platformer_game_art.png";
import robotImage from "@/assets/generated_images/futuristic_robot_combat_game_scene.png";

const meta: Meta<typeof BlogPost> = {
  title: "Pages/BlogPost",
  component: BlogPost,
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
type Story = StoryObj<typeof BlogPost>;

const HEADER_DATA = {
  title: "Top 5 Soulslikes That Defined the Genre",
  author: "Metric Gamer Team",
  date: "October 12, 2024",
  readTime: "8 min read",
  image: darkFantasyImage,
  description: "The Soulslike genre has exploded in popularity, but few games manage to capture the magic of the originals. We've analyzed the data, crunched the numbers, and ranked the top 5 titles that every fan needs to play."
};

const GAMES_DATA = [
  {
    id: "elden-ring",
    rank: 1,
    title: "Elden Ring",
    image: darkFantasyImage,
    dynamicScore: 4.8,
    tags: ["Open World", "Co-op", "Cross-Platform"],
    releaseDate: "Feb 2022",
    metrics: {
      Story: 4.8,
      Combat: 5,
      World: 5,
      Difficulty: 4.5
    },
    description: "A masterclass in open-world design that successfully translates the tight, claustrophobic tension of Dark Souls into a massive, sprawling kingdom. The sheer scale and variety of builds make this the ultimate Soulslike experience.",
    analysis: {
      pros: ["Unmatched exploration freedom", "Incredible build variety", "Stunning art direction"],
      cons: ["Late game balancing issues", "Obtuse quest design"],
      verdict: "The new gold standard for action RPGs."
    }
  },
  {
    id: "bloodborne",
    rank: 2,
    title: "Bloodborne",
    image: gothicImage,
    dynamicScore: 4.6,
    tags: ["PS4 Exclusive", "Horror", "Fast-Paced"],
    releaseDate: "Mar 2015",
    metrics: {
      Story: 4.5,
      Combat: 5,
      World: 5,
      Difficulty: 4
    },
    description: "Trading shields for guns and patience for aggression, Bloodborne remains the most stylish and atmospherically dense entry in the genre. Its Lovecraftian twist on gothic horror is unmatched.",
    analysis: {
      pros: ["Aggressive, satisfying combat", "Best-in-class atmosphere", "Trick weapons are unique"],
      cons: ["30 FPS lock", "Farming blood vials"],
      verdict: "A masterpiece of gothic horror and action."
    }
  },
  {
    id: "sekiro",
    rank: 3,
    title: "Sekiro: Shadows Die Twice",
    image: darkFantasyImage,
    dynamicScore: 4.6,
    tags: ["Single Player", "Difficult", "Stealth"],
    releaseDate: "Mar 2019",
    metrics: {
      Story: 4.2,
      Combat: 5,
      World: 4,
      Difficulty: 5
    },
    description: "Stripping away RPG stats for pure skill-based action, Sekiro demands perfection. Its rhythm-based deflection system is perhaps the most satisfying combat mechanic ever created.",
    analysis: {
      pros: ["The best sword combat in gaming", "Tight, focused level design", "Incredible boss fights"],
      cons: ["No build variety", "Extremely punishing learning curve"],
      verdict: "For those who want to master the blade."
    }
  },
  {
    id: "hollow-knight",
    rank: 4,
    title: "Hollow Knight",
    image: metroidImage,
    dynamicScore: 4.3,
    tags: ["Indie", "2D", "Platformer"],
    releaseDate: "Feb 2017",
    metrics: {
      Story: 3.5,
      Combat: 4.5,
      World: 5,
      Difficulty: 4
    },
    description: "While technically a 2D Metroidvania, Hollow Knight captures the soul of the genre better than most 3D attempts. Exploration is rewarding, combat is precise, and the atmosphere is hauntingly beautiful.",
    analysis: {
      pros: ["Beautiful hand-drawn art", "Deep exploration", "Huge amount of content"],
      cons: ["Slow start", "Easy to get lost"],
      verdict: "The king of modern Metroidvanias."
    }
  },
  {
    id: "lies-of-p",
    rank: 5,
    title: "Lies of P",
    image: robotImage,
    dynamicScore: 4.1,
    tags: ["Steampunk", "Single Player", "RPG"],
    releaseDate: "Sep 2023",
    metrics: {
      Story: 4,
      Combat: 4.5,
      World: 4,
      Difficulty: 4
    },
    description: "The biggest surprise of 2023. This Pinocchio-inspired adventure nails the 'feel' of a FromSoftware game while adding its own unique weapon assembly system and lying mechanic.",
    analysis: {
      pros: ["Weapon assembly system", "Great optimization", "Linear but dense levels"],
      cons: ["Some enemy attacks feel cheap", "Linearity might put off open-world fans"],
      verdict: "The best non-FromSoftware Soulslike."
    }
  }
];

const RELATED_POSTS = [
  {
    title: "Why Elden Ring's Open World Changed Gaming",
    image: darkFantasyImage,
    date: "Sep 15, 2024",
    author: "Alex Chen",
    slug: "#"
  },
  {
    title: "Top 10 Indie Games of 2024 So Far",
    image: robotImage,
    date: "Aug 10, 2024",
    author: "Metric Gamer Team",
    slug: "#"
  }
];

export const Default: Story = {
  args: {
    header: HEADER_DATA,
    games: GAMES_DATA,
    relatedPosts: RELATED_POSTS
  }
};
