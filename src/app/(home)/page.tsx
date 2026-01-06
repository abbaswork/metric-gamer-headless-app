// "use client";
import { HomeHero } from "@/stories/sections/HomeHero/HomeHero";
import { AboutSection } from "@/stories/sections/About/About";
import { Footer } from "@/stories/layouts/Footer/Footer";
import { FEATURED_GAMES } from "@/const/content/home";

export default function HomePage() {
  return (
    <main className="bg-[#160026] min-h-screen text-white">
      {/* Container for main content with padding */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 pt-6 pb-20 space-y-24">
        
        {/* Navigation is Global in Layout, but we might want spacing or a header wrapper if needed. 
            RootLayout handles Nav, so we just focus on page content. 
        */}

        {/* Hero Section */}
        <HomeHero gamesMap={FEATURED_GAMES} />

        {/* About / Metric Method Section */}
        <AboutSection />

      </div>

      {/* Footer spans full width */}
      <Footer />
    </main>
  );
}
