import { Button } from "@/components/ui/button";
import { Clock, Monitor, Calendar, Tag, Users } from "lucide-react";
import { useState } from "react";
import { BuyNowDialog } from "@/stories/game/BuyNowDialog/BuyNowDialog";

export interface GameStats {
  playtime: string;
  platforms?: string[];
  releaseDate?: string;
  genres?: string[];
  players?: string;
}

export interface GameSidebarProps {
  score: number;
  stats: GameStats;
  isInline?: boolean;
  gameTitle?: string;
}

export function GameSidebar({ score, stats, isInline = false, gameTitle }: GameSidebarProps) {
  const [isBuyNowOpen, setIsBuyNowOpen] = useState(false);

  const playtimeDisplay = typeof stats.playtime === 'string' && stats.playtime.trim() ? stats.playtime : "N/A";
  const platformsDisplay = stats.platforms?.length ? stats.platforms.join(", ") : "N/A";
  const releaseDateDisplay = stats.releaseDate || "N/A";
  const genresDisplay = stats.genres?.length ? stats.genres.join(", ") : "N/A";
  const playersDisplay = stats.players || "N/A";

  return (
    <div className="relative">
      <div className={`space-y-8 ${!isInline ? 'sticky top-24' : ''}`}>

        {/* Game Stats Card */}
        <div className="bg-[#160026] border border-[#F6CA56]/50 rounded-2xl overflow-hidden p-6 space-y-6 shadow-[0_0_30px_rgba(246,202,86,0.1)] transition-all hover:border-[#F6CA56]">
          <div className="text-center space-y-2 pb-6 border-b border-white/10">
            <div className="text-sm text-gray-400 font-bold uppercase tracking-widest">Metric Score</div>
            <div className="text-6xl font-bold text-[#F6CA56] font-heading drop-shadow-[0_0_15px_rgba(246,202,86,0.3)]">
              {score}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5">
              <div className="flex items-center gap-3 text-gray-300">
                <Clock className="w-4 h-4 text-[#F6CA56]" />
                <span className="text-sm font-bold">Playtime</span>
              </div>
              <span className="text-white font-bold text-sm">{playtimeDisplay}</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5">
              <div className="flex items-center gap-3 text-gray-300">
                <Monitor className="w-4 h-4 text-[#F6CA56]" />
                <span className="text-sm font-bold">Platform(s)</span>
              </div>
              <span className="text-white font-bold text-sm">{platformsDisplay}</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5">
              <div className="flex items-center gap-3 text-gray-300">
                <Calendar className="w-4 h-4 text-[#F6CA56]" />
                <span className="text-sm font-bold">Release Date</span>
              </div>
              <span className="text-white font-bold text-sm">{releaseDateDisplay}</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5">
              <div className="flex items-center gap-3 text-gray-300">
                <Tag className="w-4 h-4 text-[#F6CA56]" />
                <span className="text-sm font-bold">Genre(s)</span>
              </div>
              <span className="text-white font-bold text-sm">{genresDisplay}</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5">
              <div className="flex items-center gap-3 text-gray-300">
                <Users className="w-4 h-4 text-[#F6CA56]" />
                <span className="text-sm font-bold">Players</span>
              </div>
              <span className="text-white font-bold text-sm">{playersDisplay}</span>
            </div>
          </div>

          <Button
            className="w-full bg-[#F6CA56] hover:bg-[#e0b545] text-black font-bold h-12 text-lg shadow-lg shadow-[#F6CA56]/20"
            onClick={() => setIsBuyNowOpen(true)}
          >
            Where To Play
          </Button>
        </div>

        <BuyNowDialog isOpen={isBuyNowOpen} onClose={() => setIsBuyNowOpen(false)} gameTitle={gameTitle} platforms={stats.platforms} />

      </div>
    </div>
  );
}
