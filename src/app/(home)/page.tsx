// "use client";
// Forced re-sync for dev server
import { HomeHero } from "@/stories/sections/HomeHero/HomeHero";
import { SearchSection } from "@/stories/sections/Search/SearchSection";
import { Footer } from "@/stories/layouts/Footer/Footer";
import { FEATURED_GAMES } from "@/const/content/home";

export default function HomePage() {
  return (
    <main className="bg-[#160026] min-h-screen text-white">
      {/* Container for main content with padding */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 pt-32 pb-20 space-y-24">
        
        {/* Navigation is Global in Layout, but we might want spacing or a header wrapper if needed. 
            RootLayout handles Nav, so we just focus on page content. 
        */}

        {/* Hero Section */}
        <HomeHero gamesMap={FEATURED_GAMES} />

        {/* Glowing Divider */}
        <div className="relative w-full h-px bg-gradient-to-r from-transparent via-[#F6CA56] to-transparent opacity-50 shadow-[0_0_20px_rgba(246,202,86,0.5)]">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1 bg-[#F6CA56] blur-[20px] rounded-full" />
        </div>

        {/* Search Section Title */}
        <div className="space-y-4 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white font-heading drop-shadow-xl relative z-10">
            Find Your Next Game
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Filter by metrics, genre, platform and more to discover your perfect match
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
