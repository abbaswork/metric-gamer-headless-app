"use client";

import { useState } from "react";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown, Award, Star, Eye, EyeOff, ExternalLink } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
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
  };
  slug: string;
}

export interface DetailedBreakdownProps {
  games: DetailedGame[];
  activeMetrics: Record<string, boolean>;
  onToggleMetric: (metric: string) => void;
}

export function DetailedBreakdown({ games, activeMetrics, onToggleMetric }: DetailedBreakdownProps) {
  const [collapsedCards, setCollapsedCards] = useState<Record<string, boolean>>({});

  const toggleCard = (title: string) => {
    setCollapsedCards(prev => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <div className="space-y-12">
      <h2 className="text-3xl font-bold text-white font-heading border-b border-white/10 pb-4">Detailed Breakdown</h2>

      {[...games].sort((a, b) => {
        const scoreA = typeof a.dynamicScore === 'number' ? a.dynamicScore : parseFloat(a.dynamicScore as string) || 0;
        const scoreB = typeof b.dynamicScore === 'number' ? b.dynamicScore : parseFloat(b.dynamicScore as string) || 0;
        return scoreB - scoreA;
      }).map((game, index) => {
        const imageSrc = typeof game.image === 'string' ? game.image : game.image.src;
        const isExpanded = !collapsedCards[game.title];

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
              <div className="absolute top-0 left-0 bg-[#F6CA56] text-black font-bold text-2xl px-5 py-4 rounded-br-2xl z-20 font-heading shadow-[5px_5px_15px_rgba(0,0,0,0.3)]">
                #{index + 1}
              </div>

              {/* Card Body */}
              <div className="flex flex-col md:flex-row">
                {/* Image Section */}
                <div className="w-full md:w-5/12 relative bg-black min-h-[400px]">
                  <Image
                    src={imageSrc}
                    alt={game.title}
                    fill
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#160026] via-transparent to-transparent opacity-80" />

                  {/* Overlay Score on Image */}
                  <div className="absolute bottom-6 left-6 right-6 z-10">
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <h3 className="text-3xl font-bold text-white font-heading leading-tight mb-3 drop-shadow-lg">
                          {game.title}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {game.tags.slice(0, 2).map(tag => (
                            <Badge key={tag} className="bg-black/60 backdrop-blur text-white border-0 text-[10px] uppercase tracking-wider font-bold">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      {/* Glowing Bubble Score */}
                      <div className="w-20 h-20 rounded-full bg-[#160026] border-4 border-[#F6CA56] text-[#F6CA56] flex items-center justify-center text-3xl font-bold shadow-[0_0_30px_rgba(246,202,86,0.4)] group-hover:shadow-[0_0_45px_rgba(246,202,86,0.6)] group-hover:scale-105 transition-all duration-500 shrink-0">
                        {game.dynamicScore}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 md:p-8 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 mb-6">
                    <Badge variant="outline" className="border-white/20 text-gray-400 font-mono">
                      {game.releaseDate}
                    </Badge>
                    <div className="h-px bg-white/10 flex-1" />
                  </div>

                  {/* Metrics List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 mb-8">
                    {Object.entries(game.metrics).map(([key, val]) => (
                      <div key={key} className={`flex flex-col gap-1.5 p-2 rounded-lg hover:bg-white/5 transition-all ${activeMetrics[key] ? 'opacity-100' : 'opacity-20'}`}>
                        <span className="text-[10px] text-gray-300 font-bold flex items-center gap-2 uppercase tracking-wide">
                          <button
                            onClick={() => onToggleMetric(key)}
                            className="text-gray-500 hover:text-white transition-colors"
                            title={activeMetrics[key] ? "Hide metric" : "Show metric"}
                          >
                            {activeMetrics[key] ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                          </button>
                          {key}
                        </span>
                        <div className={`transition-all duration-300 ${activeMetrics[key] ? 'opacity-100 scale-100' : 'opacity-20 grayscale scale-95 origin-left'}`}>
                          <StarRating rating={val} size="md" />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Description
                  <div className="text-gray-400 text-sm leading-relaxed mb-8 flex-1 italic border-l-2 border-[#F6CA56]/30 pl-4">
                    {game.description}
                  </div>
                   */}

                  {/* Subtle Hide Analysis Button */}
                  <div className="flex justify-start">
                    <CollapsibleTrigger asChild>
                      <button className="text-[#F6CA56]/60 hover:text-[#F6CA56] text-[10px] uppercase tracking-widest font-bold flex items-center gap-2 transition-colors py-2 group/btn">
                        {isExpanded ? "Minimize Analysis" : "Expand Full Analysis"}
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                      </button>
                    </CollapsibleTrigger>
                  </div>
                </div>
              </div>

              {/* Collapsible Content */}
              <CollapsibleContent forceMount>
                <motion.div
                  initial={false}
                  animate={{
                    height: isExpanded ? "auto" : 0,
                    opacity: isExpanded ? 1 : 0
                  }}
                  transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                  className="overflow-hidden"
                >
                  <div className="p-6 md:p-8 border-t border-white/10 bg-[#351150]/10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="bg-green-500/5 rounded-2xl p-6 border border-green-500/10">
                        <h4 className="text-green-400 font-bold mb-4 uppercase text-[10px] tracking-widest flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> The Good
                        </h4>
                        <ul className="space-y-3">
                          {game.analysis.pros.map((pro, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                              <ArrowRight className="w-4 h-4 text-green-500/50 shrink-0 mt-0.5" /> {pro}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-red-500/5 rounded-2xl p-6 border border-red-500/10">
                        <h4 className="text-red-400 font-bold mb-4 uppercase text-[10px] tracking-widest flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" /> The Bad
                        </h4>
                        <ul className="space-y-3">
                          {game.analysis.cons.map((con, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                              <ArrowRight className="w-4 h-4 text-red-500/50 shrink-0 mt-0.5" /> {con}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-8 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                      <div className="flex items-center gap-5">
                        <div className="w-14 h-14 rounded-full bg-[#F6CA56]/10 border border-[#F6CA56]/20 flex items-center justify-center shrink-0">
                          <Award className="w-7 h-7 text-[#F6CA56]" />
                        </div>
                        <div>
                          <h4 className="text-white font-bold mb-1 uppercase text-xs tracking-wider">Final Verdict</h4>
                          <p className="text-gray-400 text-sm italic pr-4 border-l border-white/10 pl-4">&quot;{game.analysis.verdict}&quot;</p>
                        </div>
                      </div>

                      <div className="flex gap-4 w-full md:w-auto">
                        <Button
                          asChild
                          id={`full-review-${game.slug}`}
                          className="flex-1 md:flex-none bg-[#F6CA56] text-black hover:bg-[#e0b545] font-bold rounded-xl px-8 h-12 shadow-[0_0_20px_rgba(246,202,86,0.2)] hover:shadow-[0_0_30px_rgba(246,202,86,0.4)] transition-all"
                        >
                          <Link href={`/game/${game.slug}`}>
                            Read Full Review
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </CollapsibleContent>
            </Collapsible>
          </motion.div>
        );
      })}
    </div>
  );
}
