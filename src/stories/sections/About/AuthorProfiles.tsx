"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { User, Gamepad2, ArrowRight } from "lucide-react";

const createSlug = (name: string) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
};

export const AUTHORS = [
  {
    id: "arcane-archer",
    name: "Arcane Archer",
    avatar: "/images/authors/arcane-archer.jpg",
    description: "Lead reviewer and award winning game modder. I am a gaming enthusiast who genuinely loves interacting with fellow gamers and really sinking my teeth into the mechanics of the games I play.",
    favoriteGenres: "Souls-like, JRPG, Story-Rich",
    favoriteGames: ["Elden Ring", "Skyrim", "Final Fantasy 16"],
    favoriteSetup: "I play across a wide range of consoles, with my favourite setups being PC with a PS4 controller, the Steam Deck, and PS4",
    postLink: "/author/arcane-archer",
  },
  {
    id: "pixel-pirate",
    name: "Pixel Pirate",
    avatar: "/images/authors/pixel-pirate.jpg",
    description: "I'm a huge fan of cozy Switch games and love finding that perfect balance between relaxing gameplay and a great story.",
    favoriteGenres: "RPG, Indie, Party",
    favoriteGames: ["Stardew Valley", "It Takes Two", "Mario Kart 8"],
    favoriteSetup: "Love anything handheld from mobile, Nintendo Switch, to the Steam Deck!",
    postLink: "/author/pixel-pirate",
  },
  {
    id: "raging-racer",
    name: "Raging Racer",
    avatar: "/images/authors/raging-racer.jpg",
    description: "I am a massive car enthusiast, which is reflected in the games I enjoy. I've played almost every Need for Speed game and am always on the hunt for new car games.",
    favoriteGenres: "Racing, First Person Shooters, Story-Rich",
    favoriteGames: ["Gran Turismo 7", "Call of Duty Modern Warfare 2", "Detroit Become Human"],
    favoriteSetup: "I mostly game on PC with keyboard and mouse for FPS and story driven games. For racing games, I use an 8bitdoo controller and a Logitech g29 wheel with a Logitech H pattern shifter",
    postLink: "/author/raging-racer",
  },
  {
    id: "8-bit-bandit",
    name: "8-Bit Bandit",
    avatar: "/images/authors/8-bit-bandit.jpg",
    description: "I'm passionate about finding the best multiplayer games to play with others and care deeply about great graphics. I also love a good retro console",
    favoriteGenres: "Multiplayer, RPG, Racing",
    favoriteGames: ["Red Dead Redemption 2", "Fortnite", "A Way Out"],
    favoriteSetup: "Always down for a good couch co-op session with multiple wireless controllers.",
    postLink: "/author/8-bit-bandit",
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 }
};

export function AuthorProfiles() {
  return (
    <div className="mb-24 relative z-10">
      <div className="text-center mb-16 space-y-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 bg-[#F6CA56] text-black font-bold px-4 py-1 rounded-full text-sm mb-4"
        >
          <User className="w-4 h-4" />
          The Team
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-white font-heading"
        >
          Meet The Reviewers
        </motion.h2>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16 mt-16"
      >
        {AUTHORS.map((author) => (
          <motion.div
            key={author.id}
            variants={itemVariants}
            whileHover={{ y: -8 }}
            className="relative group/card"
          >
            {/* Custom Vertical Card */}
            <div className="bg-[#160026]/80 backdrop-blur-xl border border-white/5 group-hover/card:border-white/10 transition-colors duration-500 rounded-[2rem] overflow-hidden flex flex-col h-full shadow-xl relative">
                
              {/* Top Banner Cover */}
              <div className="h-28 bg-gradient-to-br from-[#351150] to-[#160026] relative overflow-hidden border-b border-white/5 shrink-0">
                <div className="absolute inset-0 opacity-20 group-hover/card:opacity-40 transition-opacity duration-700">
                  <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-[#F6CA56] blur-3xl translate-x-12 -translate-y-12"></div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-[#451870] blur-3xl -translate-x-12 translate-y-12"></div>
                </div>
              </div>

              {/* Floating Avatar */}
              <div className="flex justify-center -mt-16 relative z-20 shrink-0">
                <div className="w-32 h-32 rounded-full border-4 border-[#160026] group-hover/card:border-[#F6CA56]/20 transition-colors duration-500 bg-[#0d0014] overflow-hidden shadow-2xl relative">
                  <Image
                    src={author.avatar}
                    alt={author.name}
                    fill
                    className="object-cover opacity-90 transition-all duration-700 scale-[1.53] group-hover/card:scale-[1.6]"
                  />
                  <div className="absolute inset-0 rounded-full ring-inset ring-1 ring-white/10 pointer-events-none"></div>
                </div>
              </div>

              {/* Content Box */}
              <div className="px-6 pb-8 pt-4 flex-1 flex flex-col items-center text-center">
                
                {/* Name & Bio */}
                <h3 className="text-2xl font-black text-white font-heading tracking-tight mb-4 group-hover/card:text-[#F6CA56] transition-colors duration-500">{author.name}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6 italic">
                  &quot;{author.description}&quot;
                </p>

                {/* Details Section */}
                <div className="w-full border-t border-white/5 pt-5 space-y-6 text-sm mt-auto">
                  <div className="flex flex-col gap-1 items-center">
                    <span className="text-[9px] text-gray-500 uppercase tracking-widest font-bold">Favourite Genres</span>
                    <span className="text-white font-medium">{author.favoriteGenres}</span>
                  </div>
                  
                  <div className="flex flex-col gap-1 items-center">
                    <span className="text-[9px] text-gray-500 uppercase tracking-widest font-bold flex items-center justify-center gap-1.5 shadow-md">
                      <Gamepad2 className="w-3 h-3 text-[#F6CA56]" />
                      Favourite Games
                    </span>
                    <div className="flex flex-col gap-1">
                      {author.favoriteGames.map((game) => (
                        <Link 
                          key={game} 
                          href={`/game/${createSlug(game)}`} 
                          className="text-[#F6CA56] font-bold"
                        >
                          {game}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Favourite Setup Section */}
                  <div className="flex flex-col gap-1 items-center">
                    <span className="text-[9px] text-gray-500 uppercase tracking-widest font-bold">Favourite Setup</span>
                    <p className="text-gray-400 text-xs leading-relaxed px-2">
                       {author.favoriteSetup}
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
