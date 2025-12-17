import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Award, Eye, EyeOff, Star } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

// Helper for Star Rating
const StarRating = ({ rating, size = "sm" }: { rating: number, size?: "sm" | "md" | "lg" }) => {
  const sizeClass = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5"
  }[size];

  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star 
          key={i} 
          className={`${sizeClass} ${i < Math.round(rating) ? "text-[#F6CA56] fill-[#F6CA56]" : "text-gray-600"}`} 
        />
      ))}
    </div>
  );
};

export interface GlanceGame {
  id: string;
  rank: number;
  title: string;
  image: string | any;
  dynamicScore: number | string;
  metrics: Record<string, number>;
}

export interface GlanceCarouselProps {
  games: GlanceGame[];
  activeMetrics: Record<string, boolean>;
  onToggleMetric: (metric: string) => void;
  onGameClick: (id: string) => void;
}

export function GlanceCarousel({ games, activeMetrics, onToggleMetric, onGameClick }: GlanceCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 350;
      carouselRef.current.scrollBy({
        left: direction === 'right' ? scrollAmount : -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white font-heading flex items-center gap-3">
          <Award className="w-6 h-6 text-[#F6CA56]" />
          At A Glance
        </h2>
        <div className="flex gap-2">
           <Button 
              size="icon" 
              onClick={() => scrollCarousel('left')}
              className="rounded-full bg-[#160026] text-[#F6CA56] hover:bg-[#351150] hover:text-[#F6CA56] border border-[#F6CA56]/30 h-10 w-10 shadow-[0_0_15px_rgba(246,202,86,0.15)] hover:shadow-[0_0_25px_rgba(246,202,86,0.4)] transition-all duration-300"
           >
              <ChevronLeft className="w-5 h-5" />
           </Button>
           <Button 
              size="icon" 
              onClick={() => scrollCarousel('right')}
              className="rounded-full bg-[#160026] text-[#F6CA56] hover:bg-[#351150] hover:text-[#F6CA56] border border-[#F6CA56]/30 h-10 w-10 shadow-[0_0_15px_rgba(246,202,86,0.15)] hover:shadow-[0_0_25px_rgba(246,202,86,0.4)] transition-all duration-300"
           >
              <ChevronRight className="w-5 h-5" />
           </Button>
        </div>
      </div>

      <div 
        ref={carouselRef}
        className="flex overflow-x-auto pb-6 gap-6 px-1 scrollbar-hide snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
          {games.map((game, i) => {
            const imageSrc = typeof game.image === 'string' ? game.image : game.image.src;
            return (
              <motion.div 
                key={game.title}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                onClick={() => onGameClick(game.id)}
                className="relative rounded-2xl overflow-hidden border border-white/10 group h-[420px] shadow-2xl cursor-pointer min-w-[260px] md:min-w-[28%] snap-start shrink-0"
              >
                {/* Background Image */}
                <div className="absolute inset-0 bg-black">
                  <Image 
                    src={imageSrc} 
                    alt={game.title}
                    fill
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#160026] via-[#160026]/80 to-transparent" />
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 p-6 flex flex-col">
                  <div className="flex items-start justify-between mb-4 z-10">
                    <Badge className="bg-[#F6CA56] text-black font-bold text-lg px-3 py-1">#{game.rank}</Badge>
                  </div>

                  <div className="mt-auto relative z-10">
                    {/* Dynamic Score */}
                    <div className="flex justify-center mb-6">
                      <div className="w-20 h-20 rounded-full border-4 border-[#F6CA56] bg-[#160026] flex items-center justify-center text-3xl font-bold text-[#F6CA56] shadow-[0_0_20px_rgba(246,202,86,0.3)] shrink-0">
                          {game.dynamicScore}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-white text-center mb-6 leading-tight min-h-[3rem] flex items-center justify-center group-hover:text-[#F6CA56] transition-colors">
                      {game.title}
                    </h3>

                    {/* Interactive Metrics */}
                    <div 
                      className="space-y-3 bg-black/40 backdrop-blur-sm rounded-xl p-4 border border-white/5"
                      onClick={(e) => e.stopPropagation()} 
                    >
                      {Object.entries(game.metrics).slice(0, 3).map(([key, val]) => (
                        <div key={key} className="flex items-center justify-between group/metric">
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => onToggleMetric(key)}
                              className="text-gray-500 hover:text-white transition-colors p-1 rounded hover:bg-white/10"
                              title={activeMetrics[key] ? "Hide metric" : "Show metric"}
                            >
                              {activeMetrics[key] ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3 text-red-400" />}
                            </button>
                            <span className={`text-xs font-bold transition-colors ${activeMetrics[key] ? 'text-gray-300' : 'text-gray-600 line-through'}`}>
                              {key}
                            </span>
                          </div>
                          <div className={activeMetrics[key] ? 'opacity-100' : 'opacity-30 grayscale'}>
                            <StarRating rating={val} size="sm" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
      </div>
    </div>
  );
}
