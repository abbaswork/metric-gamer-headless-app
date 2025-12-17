import { BarChart3 } from "lucide-react";
import { GameCard, GameCardProps } from "@/stories/core/GameCard/GameCard";

interface FeaturedGamesProps {
  title?: string;
  games: GameCardProps[];
  onGameClick?: (id: string) => void;
  selectedGameId?: string;
}

export function FeaturedGames({ title = "Featured Games", games, onGameClick, selectedGameId }: FeaturedGamesProps) {
  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-2 bg-[#F6CA56] text-black font-bold px-5 py-2 h-10 rounded-lg text-base shadow-none">
          <BarChart3 className="w-4 h-4" />
          {title}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {games.map((game, i) => (
          <GameCard 
            key={i}
            {...game}
            delay={0.1 * i}
            onClick={() => onGameClick?.(game.title)} // Using title as ID proxy or assume game has ID
            isSelected={selectedGameId === game.title}
          />
        ))}
      </div>
    </div>
  );
}
