"use client";

import { SearchSection } from "@/stories/sections/Search/SearchSection";
import { Footer } from "@/stories/layouts/Footer/Footer";
import { FEATURED_GAMES } from "@/const/content/home";

export default function MetricsPage() {
  return (
    <main className="bg-[#160026] min-h-screen text-white">
      {/* Container for main content with padding */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 pt-32 pb-20 space-y-12">
        
        {/* Page Title */}
        <div className="space-y-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white font-heading drop-shadow-xl">
            Search Games
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Explore our database of ranked and reviewed games using the Metric Method.
          </p>
        </div>

        {/* Search Section */}
        <SearchSection 
          initialGames={FEATURED_GAMES["dec-2024"].map((g, i) => ({
             ...g,
             id: `game-${i}`,
             type: 'game',
             genres: g.tags || [g.genre]
          }))} 
          initialBlogs={[]}
        />

      </div>

      {/* Footer spans full width */}
      <Footer />
    </main>
  );
}
