import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export interface ContentCardProps {
  id: string;
  type: 'game' | 'blog';
  title: string;
  image: string | any;
  // Game specific
  genre?: string;
  rating?: number;
  genres?: string[];
  // Blog specific
  excerpt?: string;
  blogType?: string;
  rank?: number;
  
  onClick?: () => void;
}

export function ContentCard({ 
  type, 
  title, 
  image, 
  genre, 
  rating, 
  genres, 
  excerpt, 
  blogType,
  rank,
  onClick 
}: ContentCardProps) {
  const imageSrc = typeof image === 'string' ? image : image.src;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="group cursor-pointer h-full"
      onClick={onClick}
    >
      {/* MOBILE GAME CARD (WHATOPLAY STYLE) */}
      {type === 'game' && (
        <div className="md:hidden flex items-center bg-[#160026] border border-[#F6CA56]/20 rounded-xl overflow-hidden p-3 gap-4 hover:border-[#F6CA56]/50 transition-all duration-300 shadow-lg">
           {/* Rank */}
           {rank && (
             <div className="text-gray-500 font-black text-lg min-w-[20px] text-center">
               {rank}
             </div>
           )}

           {/* Thumbnail */}
           <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border border-white/10">
              <Image 
                src={imageSrc} 
                alt={title}
                fill
                className="object-cover"
              />
           </div>

           {/* Details */}
           <div className="flex-1 min-w-0 flex flex-col justify-center">
              <h3 className="text-white font-bold text-base line-clamp-1 leading-tight mb-1">
                {title}
              </h3>
              <div className="flex flex-col gap-0.5">
                <span className="text-[#F6CA56] text-[10px] font-bold uppercase tracking-wider">
                  {genre || (genres && genres[0])}
                </span>
                <div className="flex items-center gap-1.5 overflow-hidden">
                   {genres?.slice(0, 2).map((g, i) => (
                     <span key={g} className="text-gray-500 text-[9px] flex items-center whitespace-nowrap">
                       {i > 0 && <span className="mr-1.5 opacity-30">•</span>}
                       {g}
                     </span>
                   ))}
                </div>
              </div>
           </div>

           {/* Score */}
           {rating && (
             <div className="relative flex-shrink-0">
                <div className="absolute -inset-2 bg-[#F6CA56]/40 rounded-full blur-md opacity-40" />
                <div className="relative w-12 h-12 rounded-full border-2 border-[#F6CA56] flex items-center justify-center bg-black/40 text-[#F6CA56] font-black text-lg shadow-xl">
                   {rating}
                </div>
             </div>
           )}
        </div>
      )}

      {/* DESKTOP GAME CARD & ALL BLOG CARDS */}
      <div className={`${type === 'game' ? 'hidden md:flex' : 'flex'} bg-[#160026] border rounded-2xl overflow-hidden hover:border-[#F6CA56]/50 transition-all duration-300 hover:shadow-2xl hover:shadow-[#F6CA56]/10 h-full flex flex-col hover:-translate-y-2 ${type === 'game' ? 'border-[#F6CA56]/20' : 'border-[#351150]'}`}>
        
        {/* Image & Overlays */}
        <div className="relative h-64 md:h-56 overflow-hidden bg-black flex-shrink-0">
          <Image 
            src={imageSrc} 
            alt={title}
            fill
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#160026] via-[#160026]/40 to-transparent" />
          
          {/* Top Left: Category/Genre Label (Balanced Size) */}
          <div className="absolute top-4 left-4 z-10">
            <Badge className="bg-[#F6CA56] text-black border-0 shadow-lg font-bold uppercase tracking-widest text-[10px] px-3 py-1 rounded-md flex items-center justify-center h-8 min-w-[80px]">
               {type === 'game' ? (genre || (genres && genres[0]) || 'Game') : 'Ranking'}
            </Badge>
          </div>

          {/* Top Right: Score Badge (Balanced & Glowing) */}
          {type === 'game' && rating && (
             <div className="absolute top-4 right-4 z-10">
                <div className="relative group/score">
                   {/* Intense Multi-layered Glow */}
                   <div className="absolute -inset-3 bg-[#F6CA56]/60 rounded-full blur-xl opacity-40 group-hover/score:opacity-70 transition duration-500" />
                   <div className="absolute -inset-1 bg-[#F6CA56]/40 rounded-full blur-lg opacity-60" />
                   
                   {/* Large Badge circle */}
                   <div className="relative w-16 h-16 rounded-full bg-[#160026] border-2 border-[#F6CA56] flex flex-col items-center justify-center text-[#F6CA56] shadow-[0_0_20px_rgba(246,202,86,0.5)] overflow-hidden">
                      <span className="text-3xl font-black leading-none drop-shadow-[0_0_12px_rgba(246,202,86,0.7)]">{rating}</span>
                   </div>
                </div>
             </div>
          )}
        </div>

        <div className="p-6 flex flex-col flex-1">
          <div className="mb-4">
            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#F6CA56] transition-colors line-clamp-1 font-heading tracking-tight">
              {title}
            </h3>
            
            {type === 'blog' && excerpt && (
              <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed">
                {excerpt}
              </p>
            )}

            {type === 'game' && genres && (
               <div className="flex flex-wrap gap-2 mt-3">
                  {genres.slice(0, 3).map(g => (
                    <Badge key={g} variant="outline" className="bg-white/5 text-[10px] text-gray-300 border-white/10 px-2 py-0.5">
                      {g}
                    </Badge>
                  ))}
               </div>
            )}
          </div>

          <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em]">
               {type === 'game' ? 'Game Review' : 'Performance Analysis'}
            </span>
            <span className="flex items-center gap-1.5 group-hover:translate-x-1.5 transition-transform text-[#F6CA56] text-xs font-black uppercase tracking-widest">
              View <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
