"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowDownCircle } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export interface GameHeaderProps {
  title: string;
  genre: string;
  platforms: string[];
  developer: string;
  releaseDate: string;
  heroImage: string | any;
  onScrollToSimilar?: () => void;
}

export function GameHeader({ 
  title, 
  genre, 
  platforms, 
  developer, 
  releaseDate, 
  heroImage,
  onScrollToSimilar 
}: GameHeaderProps) {
  const imageSrc = typeof heroImage === 'string' ? heroImage : heroImage.src;

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

      <div className="relative h-full max-w-7xl mx-auto px-4 md:px-8 flex flex-col justify-end pb-12">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl space-y-6"
        >
          <div className="flex flex-wrap gap-3">
            <Badge className="bg-[#F6CA56] text-black hover:bg-[#F6CA56] font-bold text-sm px-3 py-1">
              {genre}
            </Badge>
            {platforms.map(p => (
              <Badge key={p} variant="outline" className="border-white/30 text-gray-300">
                {p}
              </Badge>
            ))}
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white font-heading leading-none drop-shadow-2xl">
            {title}
          </h1>

          <div className="flex items-center gap-6 text-gray-300 text-sm md:text-base">
            <span className="font-bold text-white">{developer}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#F6CA56]" />
            <span>Released {releaseDate}</span>
          </div>

          {/* Scroll Button */}
          {onScrollToSimilar && (
            <div className="pt-4">
              <Button 
                onClick={onScrollToSimilar}
                className="bg-white/10 hover:bg-white/20 text-white backdrop-blur border border-white/20 gap-2 rounded-full pl-4 pr-5 h-10"
              >
                <ArrowDownCircle className="w-4 h-4 text-[#F6CA56]" />
                Find Similar Games
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
