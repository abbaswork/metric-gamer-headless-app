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
        className="flex overflow-x-auto pb-6 gap-6 px-1 scrollbar-hide snap-x snap-mandatory w-full"
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
              className="relative rounded-2xl overflow-hidden border border-white/10 group h-[480px] shadow-2xl cursor-pointer w-[350px] snap-start shrink-0 flex flex-col bg-[#160026]"
            >
              {/* Top Section: Image & Metrics */}
              <div className="relative flex-1 overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 bg-black">
                  <Image
                    src={imageSrc}
                    alt={game.title}
                    fill
                    className="w-full h-full object-cover opacity-40 transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#160026] via-[#160026]/60 to-transparent" />
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 p-5 pt-14 flex flex-col justify-evenly">
                  {/* Rank Badge - Top Left */}
                  <div className="absolute top-0 left-0 bg-[#F6CA56] text-black font-bold text-xl px-4 py-3 rounded-br-2xl z-20 font-heading shadow-[5px_5px_15px_rgba(0,0,0,0.3)]">
                    #{game.rank}
                  </div>

                  {/* Dynamic Score - Large Glowing Bubble (Positioned higher with even spacing) */}
                  <div className="flex justify-center relative z-10">
                    <div className="w-20 h-20 rounded-full border-4 border-[#F6CA56] bg-[#160026] flex items-center justify-center text-3xl font-bold text-[#F6CA56] shadow-[0_0_30px_rgba(246,202,86,0.4)] group-hover:shadow-[0_0_50px_rgba(246,202,86,0.6)] transition-all duration-300 shrink-0">
                      {game.dynamicScore}
                    </div>
                  </div>

                  {/* Interactive Metrics - Scrollable/Wrapped and readable */}
                  <div
                    className="space-y-2.5 bg-black/70 backdrop-blur-md rounded-xl p-4 border border-white/10 relative z-10"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {Object.entries(game.metrics).map(([key, val]) => (
                      <div key={key} className="flex items-center justify-between group/metric gap-3">
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                          <button
                            onClick={() => onToggleMetric(key)}
                            className="text-gray-500 hover:text-[#F6CA56] transition-colors p-0.5 shrink-0 flex items-center justify-center"
                            title={activeMetrics[key] ? "Hide metric" : "Show metric"}
                          >
                            {activeMetrics[key] ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5 text-red-400 font-bold" />}
                          </button>
                          <span className={`text-[10px] uppercase tracking-widest font-black transition-colors leading-relaxed ${activeMetrics[key] ? 'text-gray-300' : 'text-gray-600 line-through'}`}>
                            {key}
                          </span>
                        </div>
                        <div className={`flex items-center gap-1 shrink-0 ${activeMetrics[key] ? 'opacity-100' : 'opacity-20 grayscale'}`}>
                          <span className="text-[#F6CA56] font-bold text-[11px]">{val.toFixed(1)}</span>
                          <Star className="w-2.5 h-2.5 text-[#F6CA56] fill-[#F6CA56]" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Section: Title (Split Effect) - Fixed Height for consistency */}
              <div className="h-[80px] bg-[#1a0030] border-t border-white/10 flex items-center justify-center text-center">
                <h3 className="text-lg font-bold text-white font-heading tracking-tight leading-tight px-4 group-hover:text-[#F6CA56] transition-colors line-clamp-2">
                  {game.title}
                </h3>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div >
  );
}
