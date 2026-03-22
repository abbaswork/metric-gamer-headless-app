"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowDownCircle, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { AUTHORS } from "@/stories/sections/About/AuthorProfiles";

export interface GameHeaderProps {
  title: string;
  genre: string;
  platforms: string[];
  tags: string[];
  developer: string;
  releaseDate: string;
  heroImage: string | any;
  author?: string;
  onScrollToSimilar?: () => void;
  onScrollToFAQ?: () => void;
}

const FALLBACK_AUTHORS = ["Pixel Pirate", "Arcane Archer", "Raging Racer", "8-Bit Bandit"];

export function GameHeader({
  title,
  platforms,
  tags,
  // genre,
  // developer,
  // releaseDate,
  heroImage,
  author,
  onScrollToSimilar,
  onScrollToFAQ
}: GameHeaderProps) {
  const imageSrc = typeof heroImage === 'string' ? heroImage : heroImage.src;
  const displayAuthor = author || FALLBACK_AUTHORS[title.length % FALLBACK_AUTHORS.length];
  const authorAvatar = AUTHORS.find(a => a.name === displayAuthor)?.avatar || "/images/authors/arcane-archer.jpg";

  return (
    <div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={imageSrc}
          alt={title}
          fill
          priority
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#160026] via-[#160026]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#160026]/90 via-transparent to-transparent" />
      </div>

      <div className="relative h-full max-w-7xl mx-auto px-4 md:px-8 flex flex-col justify-end pb-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl space-y-6"
        >
          <div className="space-y-4">
            <div className="flex flex-wrap gap-3">
              {platforms.map(p => (
                <Badge key={p} variant="outline" className="border-white/30 text-gray-300">
                  {p}
                </Badge>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {tags.map(t => (
                <Badge key={t} className="bg-white/10 hover:bg-white/20 text-white border-0 text-xs font-normal">
                  {t}
                </Badge>
              ))}
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white font-heading leading-none drop-shadow-2xl">
            {title}{' Review'}
          </h1>

          <div className="flex items-center gap-3 text-gray-300 text-sm md:text-base">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full overflow-hidden border border-white/20">
                <img src={authorAvatar} alt={displayAuthor} className="w-full h-full object-cover scale-150" />
              </div>
              <span>By</span>
              <Link href="/about#team" className="text-[#F6CA56] font-bold hover:text-white transition-colors">
                {displayAuthor}
              </Link>
            </div>
          </div>

          {/* <div className="flex items-center gap-6 text-gray-300 text-sm md:text-base">
            <span className="font-bold text-white">{developer}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#F6CA56]" />
            <span>Released {releaseDate}</span>
          </div> */}

          {/* Scroll Buttons */}
          <div className="flex flex-wrap gap-4 pt-4">
            {onScrollToSimilar && (
              <Button
                onClick={onScrollToSimilar}
                className="bg-white/10 hover:bg-white/20 text-white backdrop-blur border border-white/20 gap-2 rounded-full pl-4 pr-5 h-10"
              >
                <ArrowDownCircle className="w-4 h-4 text-[#F6CA56]" />
                Find Similar Games
              </Button>
            )}

            {onScrollToFAQ && (
              <Button
                onClick={onScrollToFAQ}
                className="bg-white/10 hover:bg-white/20 text-white backdrop-blur border border-white/20 gap-2 rounded-full pl-4 pr-5 h-10"
              >
                <HelpCircle className="w-4 h-4 text-[#F6CA56]" />
                FAQ
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
