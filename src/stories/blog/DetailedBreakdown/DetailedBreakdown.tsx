"use client";

import { useState } from "react";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown, Award, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// Reusing StarRating here
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

export interface DetailedGame {
  id: string;
  rank: number;
  title: string;
  image: string | any;
  dynamicScore: number | string;
  tags: string[];
  releaseDate: string;
  metrics: Record<string, number>;
  description: string;
  analysis: {
    pros: string[];
    cons: string[];
    verdict: string;
  }
}

export interface DetailedBreakdownProps {
  games: DetailedGame[];
  activeMetrics: Record<string, boolean>;
}

export function DetailedBreakdown({ games, activeMetrics }: DetailedBreakdownProps) {
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});

  const toggleCard = (title: string) => {
    setExpandedCards(prev => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <div className="space-y-12">
      <h2 className="text-3xl font-bold text-white font-heading border-b border-white/10 pb-4">Detailed Breakdown</h2>
      
      {games.map((game, index) => {
        const imageSrc = typeof game.image === 'string' ? game.image : game.image.src;
        const isExpanded = expandedCards[game.title];

        return (
          <motion.div
            id={game.id}
            key={game.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="scroll-mt-24"
          >
            <Collapsible 
              open={isExpanded}
              onOpenChange={() => toggleCard(game.title)}
              className="bg-[#160026] border border-[#351150] rounded-3xl overflow-hidden shadow-xl hover:shadow-[#F6CA56]/10 transition-shadow group relative"
            >
               {/* Rank Badge Absolute - Larger */}
               <div className="absolute top-0 left-0 bg-[#F6CA56] text-black font-bold text-2xl px-5 py-4 rounded-br-2xl z-20 font-heading">
                  #{game.rank}
               </div>

              {/* Card Body */}
              <div className="flex flex-col md:flex-row">
                {/* Image Section */}
                <div className="w-full md:w-5/12 relative bg-black min-h-[350px]">
                  <Image 
                    src={imageSrc} 
                    alt={game.title}
                    fill
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#160026] via-transparent to-transparent opacity-80" />
                  
                  {/* Overlay Score on Image */}
                  <div className="absolute bottom-6 left-6 right-6 z-10">
                     <div className="flex items-end justify-between">
                        <div>
                          <h3 className="text-3xl font-bold text-white font-heading leading-none mb-3 drop-shadow-lg">
                            {game.title}
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {game.tags.slice(0, 2).map(tag => (
                              <Badge key={tag} className="bg-black/60 backdrop-blur text-white border-0 text-[10px]">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="w-20 h-20 rounded-2xl bg-[#F6CA56] text-black flex items-center justify-center text-3xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300 shrink-0">
                          {game.dynamicScore}
                        </div>
                     </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 md:p-8 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 mb-6">
                     <Badge variant="outline" className="border-white/20 text-gray-400">
                      {game.releaseDate}
                    </Badge>
                    <div className="h-px bg-white/10 flex-1" />
                  </div>

                  {/* Metrics List */}
                  <div className="space-y-4 mb-8">
                    {Object.entries(game.metrics).map(([key, val]) => (
                      <div key={key} className={`flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-colors ${activeMetrics[key] ? 'opacity-100' : 'opacity-30'}`}>
                        <span className="text-sm text-gray-300 font-bold flex items-center gap-2 uppercase tracking-wide">
                           {key}
                        </span>
                        <StarRating rating={val} size="lg" />
                      </div>
                    ))}
                  </div>

                  {/* Description */}
                  <div className="text-gray-400 text-sm leading-relaxed mb-8 flex-1">
                    {game.description}
                  </div>

                  {/* Yellow Action Bar / Trigger */}
                  <CollapsibleTrigger asChild>
                    <div className="bg-[#F6CA56] px-6 py-3 flex items-center justify-center gap-2 cursor-pointer hover:bg-[#e0b545] transition-colors w-full rounded-b-xl md:rounded-b-none md:rounded-bl-none">
                       <span className="text-black font-bold text-sm uppercase tracking-wide">
                         {isExpanded ? "Hide Analysis" : "View Full Analysis"}
                       </span>
                       <ChevronDown className={`w-4 h-4 text-black transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                    </div>
                  </CollapsibleTrigger>
                </div>
              </div>

              {/* Collapsible Content */}
              <AnimatePresence>
                {isExpanded && (
                  <CollapsibleContent forceMount>
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 md:p-8 border-t border-white/10 bg-black/20">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="bg-green-500/5 rounded-xl p-4 border border-green-500/20">
                            <h4 className="text-green-400 font-bold mb-4 uppercase text-xs tracking-wider flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-green-500" /> The Good
                            </h4>
                            <ul className="space-y-3">
                              {game.analysis.pros.map((pro, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                                  <ArrowRight className="w-4 h-4 text-green-500 shrink-0 mt-0.5" /> {pro}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="bg-red-500/5 rounded-xl p-4 border border-red-500/20">
                            <h4 className="text-red-400 font-bold mb-4 uppercase text-xs tracking-wider flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-red-500" /> The Bad
                            </h4>
                            <ul className="space-y-3">
                              {game.analysis.cons.map((con, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                                  <ArrowRight className="w-4 h-4 text-red-500 shrink-0 mt-0.5" /> {con}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        
                        <div className="mt-8 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-[#F6CA56] flex items-center justify-center shrink-0">
                              <Award className="w-6 h-6 text-black" />
                            </div>
                            <div>
                              <h4 className="text-white font-bold mb-1">Our Verdict</h4>
                              <p className="text-gray-400 text-sm italic">&quot;{game.analysis.verdict}&quot;</p>
                            </div>
                          </div>
                          
                          <div className="flex gap-4 w-full md:w-auto">
                            <Button className="flex-1 md:flex-none bg-white/10 hover:bg-white/20">Read Full Review</Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </CollapsibleContent>
                )}
              </AnimatePresence>
            </Collapsible>
          </motion.div>
        );
      })}
    </div>
  );
}
