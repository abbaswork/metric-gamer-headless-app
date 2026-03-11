import { Gamepad2 } from "lucide-react";
import { ContentCard } from "@/stories/core/ContentCard/ContentCard";

export interface SimilarGame {
  id: string;
  title: string;
  image: string | any;
  slug: string;
  excerpt?: string;
  leftImage?: string;
  rightImage?: string;
  metrics?: string[];
  platforms?: string[];
}

export interface SimilarGamesProps {
  games: SimilarGame[];
  currentGameTitle: string;
}

export function SimilarGames({ games, currentGameTitle }: SimilarGamesProps) {
  return (
    <div className="space-y-8 scroll-mt-24">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-white font-heading flex items-center gap-3">
            <Gamepad2 className="w-8 h-8 text-[#F6CA56]" />
            What are {currentGameTitle} similar games
          </h2>
        </div>
        <p className="text-gray-400 text-lg">
          Discover more games like {currentGameTitle} through our curated lists and collections that feature this title.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {games.map((game) => (
          <ContentCard
            key={game.id}
            type="blog"
            blogType="Ranking"
            {...game}
          />
        ))}
      </div>
    </div>
  );
}
