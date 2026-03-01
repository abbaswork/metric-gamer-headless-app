"use client";

import { useRef } from "react";
import { Navbar } from "@/stories/header/Navbar/Navbar";
import { GameHeader } from "@/stories/game/GameHeader/GameHeader";
import { GameInfo } from "@/stories/game/GameInfo/GameInfo";
import { MetricDeepDive } from "@/stories/game/MetricDeepDive/MetricDeepDive";
import { SimilarGames } from "@/stories/game/SimilarGames/SimilarGames";
import { GameSidebar } from "@/stories/game/GameSidebar/GameSidebar";
import { Separator } from "@/components/ui/separator";

export interface GamePostProps {
  header: any;
  info: any;
  metrics: any[];
  similarGames: any[];
  sidebar: any;
}

export function GamePost({ header, info, metrics, similarGames, sidebar }: GamePostProps) {
  const similarGamesRef = useRef<HTMLDivElement>(null);

  const scrollToSimilarGames = () => {
    similarGamesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-[#F6CA56] selection:text-black">
      <Navbar />
      <GameHeader {...header} onScrollToSimilar={scrollToSimilarGames} />

      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-2 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 md:gap-12">

          {/* Main Content Area */}
          <div className="flex flex-col gap-12">

            {/* Mobile-only Sidebar Card at top */}
            <div className="lg:hidden">
              <GameSidebar {...sidebar} isInline={true} score={sidebar.score} stats={sidebar.stats} gameTitle={header.title} platforms={header.platforms} />
            </div>

            <GameInfo {...info} />

            <Separator className="bg-white/10" />

            <MetricDeepDive metrics={metrics} />

            <Separator className="bg-white/10" />

            <div ref={similarGamesRef}>
              <SimilarGames games={similarGames} currentGameTitle={header.title} />
            </div>

          </div>

          {/* Desktop Sidebar */}
          <div className="hidden lg:block">
            <GameSidebar {...sidebar} score={sidebar.score} stats={sidebar.stats} gameTitle={header.title} platforms={header.platforms} />
          </div>

        </div>
      </div>
    </div>
  );
}
