"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SearchHeader } from "@/stories/search/SearchHeader/SearchHeader";
import { FilterBar } from "@/stories/search/FilterBar/FilterBar";
import { ContentCard } from "@/stories/core/ContentCard/ContentCard";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export interface SearchSectionProps {
  initialGames: any[];
  initialBlogs: any[];
}

export function SearchSection({ initialGames, initialBlogs }: SearchSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [resultType, setResultType] = useState("all");
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedBlogTypes, setSelectedBlogTypes] = useState<string[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);

  const COMBINED_DATA = [...initialGames, ...initialBlogs];

  // Helper toggles
  const toggle = (set: any) => (val: string) => 
    set((p: string[]) => p.includes(val) ? p.filter(x => x !== val) : [...p, val]);
  
  // Blog type toggle needs side effect to switch tab
  const toggleBlogType = (type: string) => {
    setSelectedBlogTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
    if (resultType !== 'blog') setResultType('blog');
  };

  const clearFilters = () => {
    setSelectedMetrics([]);
    setSelectedGenres([]);
    setSelectedBlogTypes([]);
    setSelectedPlatforms([]);
    setSearchQuery("");
    setResultType("all");
  };

  // Logic from MetricsPage
  const filteredResults = COMBINED_DATA.filter(item => {
    // 1. Filter by Type (Game vs Blog)
    if (resultType !== "all" && item.type !== resultType) return false;

    // 2. Filter by Search Query
    const searchLower = searchQuery.toLowerCase();
    const titleMatch = item.title.toLowerCase().includes(searchLower);
    const genreMatch = item.genres?.some((g: string) => g.toLowerCase().includes(searchLower));
    const excerptMatch = item.type === "blog" && item.excerpt?.toLowerCase().includes(searchLower);
    
    if (searchQuery && !titleMatch && !genreMatch && !excerptMatch) return false;

    // 3. Filter by Metrics
    if (selectedMetrics.length > 0) {
      const hasMetric = selectedMetrics.some(m => {
        if (item.type === "blog") {
          return item.metrics?.includes(m);
        } else {
          // Map tag ID to game metric key
          const key = m.toLowerCase();
          const gameVal = item.metrics?.[key];
          // Or check unique metric
          const uniqueLabel = item.uniqueMetric?.label;
          return (gameVal && gameVal >= 4) || (uniqueLabel && uniqueLabel.includes(m)); 
        }
      });
      if (!hasMetric) return false;
    }

    // 4. Filter by Genres
    if (selectedGenres.length > 0) {
      const hasGenre = selectedGenres.some(g => item.genres?.includes(g));
      if (!hasGenre) return false;
    }

    // 5. Filter by Blog Type
    if (selectedBlogTypes.length > 0) {
      if (item.type !== 'blog') return false; 
      const hasBlogType = selectedBlogTypes.includes(item.blogType);
      if (!hasBlogType) return false;
    }

    // 6. Filter by Platform
    if (selectedPlatforms.length > 0) {
      const platforms = item.platforms || [];
      const hasPlatform = selectedPlatforms.some(p => platforms.includes(p));
      if (!hasPlatform) return false;
    }

    return true;
  });

  const showClearAll = selectedMetrics.length > 0 || selectedGenres.length > 0 || selectedBlogTypes.length > 0 || selectedPlatforms.length > 0 || !!searchQuery;

  return (
    <div className="space-y-8">
      {/* Filter Control Center */}
      <div className="bg-[#160026] border border-[#351150] rounded-3xl overflow-hidden shadow-2xl relative z-20">
         <div className="p-6 md:p-8 space-y-8">
           <SearchHeader 
             searchQuery={searchQuery}
             onSearchChange={setSearchQuery}
             resultType={resultType}
             onResultTypeChange={setResultType}
           />
           
           <FilterBar 
             selectedMetrics={selectedMetrics}
             selectedPlatforms={selectedPlatforms}
             selectedGenres={selectedGenres}
             selectedBlogTypes={selectedBlogTypes}
             onMetricToggle={toggle(setSelectedMetrics)}
             onPlatformToggle={toggle(setSelectedPlatforms)}
             onGenreToggle={toggle(setSelectedGenres)}
             onBlogTypeToggle={toggleBlogType}
             onClearAll={clearFilters}
             showClearAll={showClearAll}
             resultType={resultType}
           />
         </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between px-4">
        <p className="text-gray-400">
          Showing <span className="text-[#F6CA56] font-bold">{filteredResults.length}</span> results
        </p>
      </div>

      {/* Combined Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredResults.length > 0 ? (
            filteredResults.map((item) => (
              <ContentCard 
                key={item.id}
                {...item}
                // Adapt logic for GameCard props as needed if mismatch
                rating={item.type === 'game' ? 4.8 : undefined} // Mocking rating if missing in unified data or map it properly
              />
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
               <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-8 h-8 text-gray-600" />
               </div>
               <h3 className="text-2xl font-bold text-white mb-2">No results found</h3>
               <p className="text-gray-400">Try adjusting your filters or search query</p>
               <Button 
                  variant="link" 
                  onClick={clearFilters}
                  className="text-[#F6CA56] mt-4"
               >
                  Clear all filters
               </Button>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
