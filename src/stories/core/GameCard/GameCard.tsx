import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import Image from "next/image";

export interface GameCardProps {
  id: string; // Using string ID for consistency
  rank: number;
  title: string;
  genre: string;
  image: string | any;
  rating?: number;
  delay?: number;
  onClick?: () => void;
  isSelected?: boolean;
}

export function GameCard({ rank, title, genre, image, rating, delay = 0, onClick, isSelected }: GameCardProps) {
  const imageSrc = typeof image === 'string' ? image : image.src;

  const handleExternalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Assuming game pages are at /game/[title] or similar. Using simplified slug for now or rank
    const slug = title.toLowerCase().replace(/ /g, '-').replace(/[:']/g, '');
    window.open(`/game/${slug}`, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      onClick={onClick}
      className={`group relative h-[300px] w-full overflow-hidden rounded-2xl cursor-pointer shadow-lg border bg-[#160026] transition-all duration-300 active:scale-95 ${isSelected
        ? "border-[#F6CA56] ring-2 ring-[#F6CA56]/50 scale-[1.02] shadow-[#F6CA56]/20"
        : "border-white/5 group-hover:border-[#F6CA56]/50 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-[#F6CA56]/10"
        }`}
    >
      {/* Dark gradient overlay for text readability - stronger at bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#160026] via-[#160026]/20 to-transparent z-10 pointer-events-none" />

      {/* Image container ensuring fill */}
      <div className="absolute inset-0 w-full h-full bg-black">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover object-top transition-transform duration-700 group-hover:scale-110 block"
        />
      </div>

      {/* <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-start">
        <Badge className="bg-[#F6CA56] text-black hover:bg-[#F6CA56]/90 font-bold font-sans text-xs px-3 py-1 flex items-center justify-center rounded-lg shadow-md uppercase tracking-wider h-10">
          {genre}
        </Badge>

        {rating && (
          <div className="relative pointer-events-none">
            <div className="relative group/score">
              <div className="absolute -inset-3 bg-[#F6CA56]/60 rounded-full blur-xl opacity-40 group-hover/score:opacity-70 transition duration-500" />
              <div className="absolute -inset-1 bg-[#F6CA56]/40 rounded-full blur-lg opacity-60" />

              <div className="relative w-16 h-16 rounded-full bg-[#160026] border-2 border-[#F6CA56] flex flex-col items-center justify-center text-[#F6CA56] shadow-[0_0_20px_rgba(246,202,86,0.5)] overflow-hidden">
                <span className="text-2xl font-black leading-none drop-shadow-[0_0_12px_rgba(246,202,86,0.7)]">{rating}</span>
              </div>
            </div>
          </div>
        )}
      </div> */}

      {/* Open in New Tab Button - Moved to Bottom Right */}
      <button
        onClick={handleExternalClick}
        className="absolute bottom-4 right-4 z-30 w-10 h-10 bg-black/50 backdrop-blur-md rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-[#F6CA56] hover:border-[#F6CA56]/50 transition-all group/tab opacity-0 group-hover:opacity-100"
        title="Open in new tab"
      >
        <ExternalLink className="w-4 h-4" />
      </button>

      <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
        <h3 className={`text-2xl font-bold mb-3 font-heading tracking-wide transition-colors line-clamp-2 leading-tight drop-shadow-lg ${isSelected ? "text-[#F6CA56]" : "text-white group-hover:text-[#F6CA56]"
          }`}>
          {title}
        </h3>
        <div className={`h-1 rounded-full transform origin-left transition-all duration-300 ${isSelected ? "w-full bg-[#F6CA56]" : "w-8 bg-[#F6CA56] group-hover:w-24"
          }`} />
      </div>
    </motion.div>
  );
}
