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
      <div className={`bg-[#160026] border rounded-2xl overflow-hidden hover:border-[#F6CA56]/50 transition-all duration-300 hover:shadow-2xl hover:shadow-[#F6CA56]/10 h-full flex flex-col hover:-translate-y-2 ${type === 'game' ? 'border-[#F6CA56]/20' : 'border-[#351150]'}`}>
        
        {/* Image */}
        <div className="relative h-56 overflow-hidden bg-black">
          <Image 
            src={imageSrc} 
            alt={title}
            fill
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#160026] to-transparent opacity-60" />
          
          {/* Type Badge */}
          <div className="absolute top-4 right-4 z-10">
            <Badge className={`border-0 shadow-lg font-bold uppercase tracking-wider text-[10px] ${type === 'game' ? 'bg-[#F6CA56] text-black' : 'bg-white text-black'}`}>
              {type === 'game' ? 'Game' : 'Analysis'}
            </Badge>
          </div>

          {/* Score Badge (for games) */}
          {type === 'game' && rating && (
             <div className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-[#160026] border-2 border-[#F6CA56] flex items-center justify-center text-[#F6CA56] font-bold shadow-xl z-10">
                {rating}
             </div>
          )}
        </div>

        <div className="p-6 flex flex-col flex-1">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#F6CA56] transition-colors line-clamp-1 font-heading">
              {title}
            </h3>
            
            {type === 'blog' && excerpt && (
              <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed">
                {excerpt}
              </p>
            )}

            {type === 'game' && genres && (
               <div className="flex flex-wrap gap-2 mt-2">
                  {genres.slice(0, 3).map(g => (
                    <Badge key={g} variant="outline" className="text-[10px] text-gray-500 border-white/10">
                      {g}
                    </Badge>
                  ))}
               </div>
            )}
          </div>

          <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between text-xs text-gray-500 font-medium uppercase tracking-wider">
            <span>
               {type === 'game' ? genre : blogType}
            </span>
            <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform text-[#F6CA56]">
              View Details <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
