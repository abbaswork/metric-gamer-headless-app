"use client";

import { useState, useMemo } from "react";
import { BlogHeader } from "@/stories/blog/BlogHeader/BlogHeader";
import { GlanceCarousel } from "@/stories/blog/GlanceCarousel/GlanceCarousel";
import { DetailedBreakdown } from "@/stories/blog/DetailedBreakdown/DetailedBreakdown";
import { BlogSidebar } from "@/stories/blog/BlogSidebar/BlogSidebar";

export interface BlogPostProps {
  header: any;
  games: any[];
  relatedPosts: any[];
}

export function BlogPost({ header, games: initialGames, relatedPosts }: BlogPostProps) {
  
  // State for active metrics (global across cards)
  const [activeMetrics, setActiveMetrics] = useState<Record<string, boolean>>({
    Story: true,
    Combat: true,
    World: true,
    Difficulty: true
  });

  const toggleMetric = (metric: string) => {
    setActiveMetrics(prev => ({ ...prev, [metric]: !prev[metric] }));
  };

  // Recalculate scores based on active metrics
  const processedGames = useMemo(() => {
    return initialGames.map(game => {
      let totalScore = 0;
      let count = 0;

      // Calculate weighted score from metrics
      Object.entries(game.metrics).forEach(([key, val]) => {
        if (activeMetrics[key]) {
          totalScore += (val as number);
          count++;
        }
      });

      const newScore = count > 0 ? (totalScore / count).toFixed(1) : "N/A";
      
      return {
        ...game,
        dynamicScore: newScore
      };
    });
  }, [initialGames, activeMetrics]);

  const handleGameClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12">
        
        {/* Main Content Area */}
        <div className="space-y-12">
          
          <BlogHeader {...header} />
          
          <GlanceCarousel 
            games={processedGames} 
            activeMetrics={activeMetrics}
            onToggleMetric={toggleMetric}
            onGameClick={handleGameClick} 
          />
          
          <DetailedBreakdown 
            games={processedGames} 
            activeMetrics={activeMetrics}
          />
          
        </div>

        {/* Sidebar */}
        <BlogSidebar posts={relatedPosts} />

      </div>
    </div>
  );
}
