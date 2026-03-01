"use client";
import { useState, useRef } from "react";
import { HeroSection, GameData } from "../Hero/Hero";
import { FeaturedGames } from "../FeaturedGames/FeaturedGames";
import { GameCardProps } from "@/stories/core/GameCard/GameCard";
import { AnimatePresence, motion } from "framer-motion";

interface HomeHeroProps {
  gamesMap: Record<string, (GameData & GameCardProps)[]>;
  featuredTitle: string;
}

export function HomeHero({ gamesMap, featuredTitle }: HomeHeroProps) {
  const [selectedMonth, setSelectedMonth] = useState("featured");
  const [selectedGameTitle, setSelectedGameTitle] = useState("");
  const heroRef = useRef<HTMLDivElement>(null);

  const currentGames = gamesMap[selectedMonth] || [];

  // Reset selection when month changes if needed, or find currently selected game
  const selectedGame = currentGames.find(g => g.title === selectedGameTitle) || currentGames[0];

  // Safety check
  if (!selectedGame) return null;

  const handleGameClick = (title: string) => {
    setSelectedGameTitle(title);

    // Auto-scroll to hero on mobile when game card is clicked
    if (typeof window !== 'undefined' && window.innerWidth < 768 && heroRef.current) {
      heroRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleMonthChange = (month: string) => {
    setSelectedMonth(month);
    setSelectedGameTitle(""); // Reset selection to default (first game)
  };

  return (
    <div className="space-y-12">
      <div ref={heroRef}>
        <HeroSection
          selectedMonth={selectedMonth}
          onMonthChange={handleMonthChange}
          game={selectedGame}
          featuredTitle={featuredTitle}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={selectedMonth}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <FeaturedGames
            games={currentGames}
            onGameClick={handleGameClick}
            selectedGameId={selectedGameTitle}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
