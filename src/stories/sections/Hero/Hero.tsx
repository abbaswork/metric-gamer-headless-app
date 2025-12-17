import { motion, AnimatePresence } from "framer-motion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sword, Brain, ArrowRight, Tag, Star, Trophy, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export interface GameData {
  title: string;
  genre: string;
  description: string;
  image: string | any; // Supports static import (object) or string url
  metrics: {
    label: string;
    value: string;
    icon?: any;
  }[];
  tags: string[];
}

interface HeroSectionProps {
  selectedMonth: string;
  onMonthChange: (value: string) => void;
  game: GameData;
}

export function HeroSection({ selectedMonth, onMonthChange, game }: HeroSectionProps) {
  // Handle Next.js static image object or string URL
  const imageSrc = typeof game.image === 'string' ? game.image : game.image.src;

  return (
    <section className="w-full space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl md:text-6xl font-bold text-white mb-2 font-heading leading-tight"
          >
            Games Of The Month
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg md:text-xl font-light"
          >
            Curated top picks from our data-driven analysis
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full md:w-auto"
        >
          {/* New Integrated Dropdown Design */}
          <div className="relative">
            <Select value={selectedMonth} onValueChange={onMonthChange}>
              <SelectTrigger className="w-full md:w-[160px] bg-transparent border border-white/10 text-gray-400 hover:text-white hover:border-white/20 focus:ring-0 focus:ring-offset-0 h-8 text-xs rounded-lg transition-colors">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3 h-3" />
                  <SelectValue placeholder="Select Month" />
                </div>
              </SelectTrigger>
              <SelectContent className="bg-[#160026] border-[#351150] text-white">
                <SelectItem value="dec-2024" className="text-xs">December 2024</SelectItem>
                <SelectItem value="nov-2024" className="text-xs">November 2024</SelectItem>
                <SelectItem value="oct-2024" className="text-xs">October 2024</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </motion.div>
      </div>

      {/* Featured Game Card */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={game.title}
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.98 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative w-full h-[600px] md:h-[550px] overflow-hidden rounded-[2.5rem] shadow-2xl border border-white/10 group"
        >
           {/* Full Background Image */}
           <div className="absolute inset-0">
             <Image 
               src={imageSrc}
               alt={game.title} 
               fill
               className="object-cover transition-transform duration-1000 group-hover:scale-105"
             />
             {/* Complex Gradient Overlay for Depth and Readability */}
             <div className="absolute inset-0 bg-gradient-to-t from-[#160026] via-[#160026]/80 to-transparent opacity-90" />
             <div className="absolute inset-0 bg-gradient-to-r from-[#160026] via-[#160026]/60 to-transparent opacity-90" />
           </div>

           {/* Content Container */}
           <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between z-10">
              
              {/* Top Row: Badges */}
              <div className="flex items-start justify-between">
                 <div className="flex flex-wrap gap-3">
                    <Badge className="bg-[#F6CA56] text-black hover:bg-[#F6CA56] font-bold text-sm px-4 py-1.5 rounded-full shadow-[0_0_15px_rgba(246,202,86,0.4)] uppercase tracking-wider flex items-center gap-2">
                       <Trophy className="w-4 h-4" /> Featured Pick
                    </Badge>
                    <Badge variant="outline" className="bg-black/30 backdrop-blur-md border-white/20 text-white font-bold px-4 py-1.5 rounded-full flex items-center gap-2">
                       <Sword className="w-4 h-4 text-[#F6CA56]" /> {game.genre}
                    </Badge>
                 </div>
                 
                 {/* Decorative Score Circle */}
                 <div className="hidden md:flex flex-col items-center justify-center w-24 h-24 rounded-full bg-black/40 backdrop-blur-xl border-2 border-[#F6CA56] shadow-[0_0_20px_rgba(246,202,86,0.2)]">
                    <span className="text-3xl font-bold text-[#F6CA56]">#1</span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Rank</span>
                 </div>
              </div>

              {/* Bottom Content */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
                 
                 {/* Text Content */}
                 <div className="lg:col-span-7 space-y-6">
                    <motion.h2 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-5xl md:text-7xl lg:text-8xl font-bold text-white font-heading leading-none tracking-tight drop-shadow-2xl"
                    >
                      {game.title}
                    </motion.h2>
                    
                    <motion.p 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-2xl font-light border-l-4 border-[#F6CA56] pl-6"
                    >
                      {game.description}
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="pt-4"
                    >
                       <Button 
                        className="bg-[#F6CA56] hover:bg-[#e0b545] text-black font-bold text-lg h-14 px-8 rounded-xl shadow-[0_0_20px_rgba(246,202,86,0.3)] hover:shadow-[0_0_30px_rgba(246,202,86,0.5)] transition-all transform hover:-translate-y-1 w-full md:w-auto"
                      >
                        Read Full Review
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                    </motion.div>
                 </div>

                 {/* Metrics Cards - Glassmorphism */}
                 <div className="lg:col-span-5 w-full">
                    <div className="grid grid-cols-3 gap-4">
                       {game.metrics.map((metric, i) => (
                          <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 + (i * 0.1) }}
                            className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex flex-col items-center justify-center text-center hover:bg-white/5 hover:border-[#F6CA56]/30 transition-all group/metric"
                          >
                             <div className="text-2xl md:text-3xl font-bold text-[#F6CA56] font-heading mb-1 group-hover/metric:scale-110 transition-transform">
                                {metric.value}
                             </div>
                             <div className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-wider">
                                {metric.label}
                             </div>
                          </motion.div>
                       ))}
                    </div>
                 </div>

              </div>
           </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
