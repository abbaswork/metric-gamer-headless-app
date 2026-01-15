import { BarChart3 } from "lucide-react";
import { GameCard, GameCardProps } from "@/stories/core/GameCard/GameCard";

interface FeaturedGamesProps {
  title?: string;
  tagline?: string;
  games: GameCardProps[];
  onGameClick?: (id: string) => void;
  selectedGameId?: string;
}

export function FeaturedGames({ title, tagline, games, onGameClick, selectedGameId }: FeaturedGamesProps) {
  return (
    <div className="space-y-5">
      {title && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 bg-[#F6CA56] text-black font-bold font-sans px-5 py-2 h-10 w-fit rounded-lg text-base shadow-none">
            <BarChart3 className="w-4 h-4" />
            {title}
          </div>
          {tagline && (
            <p className="text-[20px] font-sans text-gray-300">
              {tagline}
            </p>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {games.map((game, i) => (
          <GameCard 
            key={i}
            {...game}
            delay={0.1 * i}
            onClick={() => onGameClick?.(game.title)} // Using title as ID proxy
            isSelected={selectedGameId === game.title}
          />
        ))}
      </div>
    </div>
  );
}
