"use client";
import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { SearchHeader } from "@/stories/search/SearchHeader/SearchHeader";
import { FilterBar } from "@/stories/search/FilterBar/FilterBar";
import { ContentCard } from "@/stories/core/ContentCard/ContentCard";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const PAGE_SIZE = 20;

export interface SearchSectionProps {
  initialGames: any[];
  initialBlogs: any[];
  availableMetrics?: any[];
}

export function SearchSection({ initialGames, initialBlogs, availableMetrics = [] }: SearchSectionProps) {
  return (
    <Suspense fallback={<div className="text-center py-20 text-gray-500">Loading search...</div>}>
      <SearchSectionContent
        initialGames={initialGames}
        initialBlogs={initialBlogs}
        availableMetrics={availableMetrics}
      />
    </Suspense>
  );
}

function SearchSectionContent({ initialGames, initialBlogs, availableMetrics }: SearchSectionProps) {
  const searchParams = useSearchParams();
  const typeParam = searchParams.get('type');

  const [searchQuery, setSearchQuery] = useState("");
  const [resultType, setResultType] = useState(() => {
    if (typeParam === 'blog' || typeParam === 'game') return typeParam;
    return "game";
  });
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedBlogTypes, setSelectedBlogTypes] = useState<string[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const sentinelRef = useRef<HTMLDivElement>(null);

  const COMBINED_DATA = [...initialGames, ...initialBlogs];

  const toggle = (set: any) => (val: string) =>
    set((p: string[]) => p.includes(val) ? p.filter(x => x !== val) : [...p, val]);

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
    setResultType("game");
  };

  const filteredResults = COMBINED_DATA.filter(item => {
    if (resultType !== "all" && item.type !== resultType) return false;

    const searchLower = searchQuery.toLowerCase();
    const titleMatch = item.title.toLowerCase().includes(searchLower);
    const genreMatch = item.genres?.some((g: string) => g.toLowerCase().includes(searchLower));
    const excerptMatch = item.type === "blog" && item.excerpt?.toLowerCase().includes(searchLower);
    if (searchQuery && !titleMatch && !genreMatch && !excerptMatch) return false;

    if (selectedMetrics.length > 0) {
      const hasMetric = selectedMetrics.some(m => {
        if (item.type === "blog") {
          return item.metrics?.includes(m);
        } else {
          const key = m.toLowerCase();
          const gameVal = item.metrics?.[key];
          const uniqueLabel = item.uniqueMetric?.label;
          return (gameVal && gameVal >= 4) || (uniqueLabel && uniqueLabel.includes(m));
        }
      });
      if (!hasMetric) return false;
    }

    if (selectedGenres.length > 0) {
      const hasGenre = selectedGenres.some(g => item.genres?.includes(g));
      if (!hasGenre) return false;
    }

    if (selectedBlogTypes.length > 0) {
      if (item.type !== 'blog') return false;
      if (!selectedBlogTypes.includes(item.blogType)) return false;
    }

    if (selectedPlatforms.length > 0) {
      const platforms = item.platforms || [];
      if (!selectedPlatforms.some(p => platforms.includes(p))) return false;
    }

    return true;
  });

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [searchQuery, resultType, selectedMetrics, selectedGenres, selectedBlogTypes, selectedPlatforms]);

  // Infinite scroll via IntersectionObserver
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount(prev => Math.min(prev + PAGE_SIZE, filteredResults.length));
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [filteredResults.length]);

  const visibleResults = filteredResults.slice(0, visibleCount);
  const hasMore = visibleCount < filteredResults.length;
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
            availableMetrics={availableMetrics || []}
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
          Showing <span className="text-[#F6CA56] font-bold">{visibleResults.length}</span> of{" "}
          <span className="text-[#F6CA56] font-bold">{filteredResults.length}</span> results
        </p>
      </div>

      {/* Combined Grid */}
      <div id="results" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 scroll-mt-32">
        {visibleResults.length > 0 ? (
          visibleResults.map((item) => (
            <ContentCard
              key={item.id}
              {...item}
              rank={item.rank}
              rating={item.rating}
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
      </div>

      {/* Infinite scroll sentinel */}
      {hasMore && (
        <div ref={sentinelRef} className="py-8 text-center text-gray-500 text-sm">
          Loading more...
        </div>
      )}
    </div>
  );
}
