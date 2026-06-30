"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { User, Gamepad2 } from "lucide-react";

type SocialType = "steam" | "reddit" | "nexusmods";

interface Social {
  type: SocialType;
  url: string | null;
}

export const AUTHORS = [
  {
    id: "arcane-archer",
    name: "ABossProductions",
    avatar: "/images/authors/arcane-archer.jpg",
    description: "Lead reviewer and award winning game modder. I have been gaming for almost 3 decades and genuinely love interacting with fellow gamers and sinking my teeth into the mechanics of the games I play.",
    favoriteGenres: "Souls-like, RPGs, JRPGs",
    favoriteGames: [
      { name: "Elden Ring", url: null },
      { name: "Fire Emblem: Awakening", url: null },
      { name: "Skyrim", url: "/game/the-elder-scrolls-v-skyrim-review/" },
    ],
    favoriteSetup: "I play across a wide range of consoles, with my favourite setups being PC with a PS4 controller, the Steam Deck, and PS4",
    postLink: "/author/arcane-archer",
    socials: [
      { type: "nexusmods" as SocialType, url: "https://www.nexusmods.com/profile/ABossProductions" },
      { type: "reddit" as SocialType, url: "https://www.reddit.com/user/Dependent_Lemon351/" },
    ] as Social[],
  },
  {
    id: "pixel-pirate",
    name: "Cosy Crafter",
    avatar: "/images/authors/pixel-pirate.jpg",
    description: "The Switch lives on my nightstand, which should tell you everything about how I like to game. I cover any games that help you relax, from cozy games, handheld titles, or online board games. If a game respects your time and has a story worth following, I'm in.",
    favoriteGenres: "Cozy games, Indie games, Nintendo Switch games",
    favoriteGames: [
      { name: "Stardew Valley", url: "/game/stardew-valley-review/" },
      { name: "Slime Rancher", url: "/game/slime-rancher-review/" },
      { name: "Animal Crossing: New Horizons", url: "/game/animal-crossing-new-horizons-review/" },
    ],
    favoriteSetup: "Love anything handheld from mobile, Nintendo Switch, to the Steam Deck!",
    postLink: "/author/pixel-pirate",
    socials: [
      { type: "steam" as SocialType, url: "https://steamcommunity.com/id/CosyCrafter" },
      { type: "reddit" as SocialType, url: "https://www.reddit.com/user/CosyCrafterGaming/" },
    ] as Social[],
  },
  {
    id: "raging-racer",
    name: "Lobotomy Gaming",
    avatar: "/images/authors/raging-racer.jpg",
    description: "I am a massive car enthusiast, which is reflected in the games I enjoy. I've played almost every Need for Speed game and am always on the hunt for new car games.",
    favoriteGenres: "Racing games, Shooters (first person and third person)",
    favoriteGames: [
      { name: "Gran Turismo 7", url: "/game/gran-turismo-7-review/" },
      { name: "Call of Duty Modern Warfare 2", url: null },
      { name: "Need for Speed: Hot Pursuit 2", url: "/game/need-for-speed-hot-pursuit-2-review/" },
    ],
    favoriteSetup: "I mostly game on PC with keyboard and mouse for FPS and story driven games. For racing games, I use an 8bitdoo controller and a Logitech g29 wheel with a Logitech H pattern shifter",
    postLink: "/author/raging-racer",
    socials: [
      { type: "steam" as SocialType, url: "https://steamcommunity.com/profiles/76561199141792491/" },
      { type: "reddit" as SocialType, url: "https://www.reddit.com/user/Lobotomy_gaming02/" },
    ] as Social[],
  },
  {
    id: "8-bit-bandit",
    name: "8-Bit Bandit",
    avatar: "/images/authors/8-bit-bandit.jpg",
    description: "My gaming roots are in retro consoles and those early experiences shaped how I look at every game I cover. I review classic titles worth revisiting, multiplayer games (both local and online), and mobile games!",
    favoriteGenres: "Retro games and consoles, Multiplayer games, Mobile games",
    favoriteGames: [
      { name: "GoldenEye 007", url: null },
      { name: "A Way Out", url: null },
      { name: "Clash Royale", url: null },
    ],
    favoriteSetup: "Always down for a good couch co-op session with multiple wireless controllers.",
    postLink: "/author/8-bit-bandit",
    socials: [
      { type: "steam" as SocialType, url: "https://store.steampowered.com/curator/45037659-Metric-Gamer-Official/" },
      { type: "reddit" as SocialType, url: "https://www.reddit.com/user/No-Comparison-6338/" },
    ] as Social[],
  }
];

function SocialIcon({ type }: { type: SocialType }) {
  if (type === "steam") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.605 0 11.979 0zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25 1.297.539 2.793-.076 3.332-1.375.263-.63.264-1.319.005-1.949s-.75-1.121-1.377-1.383c-.624-.26-1.29-.249-1.878-.03l1.523.63c.956.4 1.409 1.5 1.009 2.455-.397.957-1.497 1.41-2.454 1.012H7.54zm11.415-9.303c0-1.662-1.353-3.015-3.015-3.015-1.665 0-3.015 1.353-3.015 3.015 0 1.665 1.35 3.015 3.015 3.015 1.663 0 3.015-1.35 3.015-3.015zm-5.273-.005c0-1.252 1.013-2.266 2.265-2.266 1.249 0 2.266 1.014 2.266 2.266 0 1.251-1.017 2.265-2.266 2.265-1.252 0-2.265-1.014-2.265-2.265z" />
      </svg>
    );
  }
  if (type === "reddit") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
      </svg>
    );
  }
  if (type === "nexusmods") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M16.496 0H7.504A7.504 7.504 0 0 0 0 7.504v8.992A7.504 7.504 0 0 0 7.504 24h8.992A7.504 7.504 0 0 0 24 16.496V7.504A7.504 7.504 0 0 0 16.496 0zM6.545 16.83V7.17h2.308l6.602 6.563V7.17h2.033v9.66H15.18L8.578 10.267v6.563z" />
      </svg>
    );
  }
  return null;
}

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
                    <span className="text-[9px] text-gray-500 uppercase tracking-widest font-bold">Expertise</span>
                    <span className="text-white font-medium">{author.favoriteGenres}</span>
                  </div>

                  <div className="flex flex-col gap-1 items-center">
                    <span className="text-[9px] text-gray-500 uppercase tracking-widest font-bold flex items-center justify-center gap-1.5 shadow-md">
                      <Gamepad2 className="w-3 h-3 text-[#F6CA56]" />
                      Favourite Games
                    </span>
                    <div className="flex flex-col gap-1">
                      {author.favoriteGames.map((game) => (
                        game.url ? (
                          <Link
                            key={game.name}
                            href={game.url}
                            className="text-[#F6CA56] font-bold"
                          >
                            {game.name}
                          </Link>
                        ) : (
                          <span key={game.name} className="text-[#F6CA56] font-bold">
                            {game.name}
                          </span>
                        )
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

                  {/* Socials */}
                  {author.socials.length > 0 && (
                    <div className="flex flex-col gap-2 items-center border-t border-white/5 pt-5">
                      <span className="text-[9px] text-gray-500 uppercase tracking-widest font-bold">Socials</span>
                      <div className="flex gap-2">
                        {author.socials.map((social) => {
                          const btn = (
                            <div className="w-10 h-10 rounded-xl border border-[#F6CA56] flex items-center justify-center transition-all">
                              <SocialIcon type={social.type} />
                            </div>
                          );
                          if (social.url) {
                            return (
                              <a
                                key={social.type}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`${author.name} on ${social.type}`}
                                className="text-[#F6CA56] hover:text-black [&>div]:hover:bg-[#F6CA56] transition-all"
                              >
                                {btn}
                              </a>
                            );
                          }
                          return (
                            <div key={social.type} className="text-[#F6CA56]/25 cursor-not-allowed">
                              {btn}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
