import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export interface GameCardProps {
  rank: number; // Kept for prop compatibility but not displayed as rank number
  title: string;
  genre: string;
  image: string | any; // Supports static import (object) or string url
  delay?: number;
  onClick?: () => void;
  isSelected?: boolean;
}

export function GameCard({ rank, title, genre, image, delay = 0, onClick, isSelected }: GameCardProps) {
  const imageSrc = typeof image === 'string' ? image : image.src;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      onClick={onClick}
      className={`group relative h-[300px] w-full overflow-hidden rounded-2xl cursor-pointer shadow-lg border bg-[#160026] transition-all duration-300 active:scale-95 ${
        isSelected 
          ? "border-[#F6CA56] ring-2 ring-[#F6CA56]/50 scale-[1.02] shadow-[#F6CA56]/20" 
          : "border-white/5 hover:border-[#F6CA56]/50 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#F6CA56]/10"
      }`}
    >
      {/* Dark gradient overlay for text readability - stronger at bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#160026] via-[#160026]/20 to-transparent z-10" />
      
      {/* Image container ensuring fill */}
      <div className="absolute inset-0 w-full h-full bg-black">
        <Image 
          src={imageSrc} 
          alt={title}
          fill
          className="object-cover object-center transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100 block"
        />
      </div>

      <div className="absolute top-4 left-4 z-20 flex gap-2">
        {/* Rank Badge */}
        <div className="flex flex-col items-center justify-center w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-[#F6CA56] shadow-[0_0_10px_rgba(246,202,86,0.2)]">
           <span className="text-sm font-bold text-[#F6CA56]">#{rank}</span>
        </div>
        
        {/* Genre Badge - Now Yellow as requested */}
        <Badge className="bg-[#F6CA56] text-black hover:bg-[#F6CA56]/90 font-bold text-xs px-3 py-1 flex items-center justify-center rounded-lg shadow-md uppercase tracking-wider h-10">
          {genre}
        </Badge>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
        <h3 className={`text-2xl font-bold mb-3 font-heading tracking-wide transition-colors truncate drop-shadow-lg ${
          isSelected ? "text-[#F6CA56]" : "text-white group-hover:text-[#F6CA56]"
        }`}>
          {title}
        </h3>
        <div className={`h-1 rounded-full transform origin-left transition-all duration-300 ${
          isSelected ? "w-full bg-[#F6CA56]" : "w-8 bg-[#F6CA56] group-hover:w-24"
        }`} />
      </div>
    </motion.div>
  );
}
