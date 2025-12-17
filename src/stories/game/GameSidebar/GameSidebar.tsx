import { Button } from "@/components/ui/button";
import { Clock, Brain, User } from "lucide-react";

export interface GameStats {
  playtime: string;
  difficulty: string;
  players: string;
}

export interface GameSidebarProps {
  score: number;
  stats: GameStats;
  buyLink?: string;
}

export function GameSidebar({ score, stats }: GameSidebarProps) {
  return (
    <div className="relative">
      <div className="space-y-8 sticky top-24">
        
        {/* Game Stats Card */}
        <div className="bg-[#160026] border border-[#351150] rounded-2xl overflow-hidden p-6 space-y-6 shadow-xl">
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
                <span className="text-white font-bold">{stats.playtime}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5">
                <div className="flex items-center gap-3 text-gray-300">
                  <Brain className="w-4 h-4 text-[#F6CA56]" />
                  <span className="text-sm font-bold">Difficulty</span>
                </div>
                <span className="text-white font-bold">{stats.difficulty}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5">
                <div className="flex items-center gap-3 text-gray-300">
                  <User className="w-4 h-4 text-[#F6CA56]" />
                  <span className="text-sm font-bold">Players</span>
                </div>
                <span className="text-white font-bold text-sm">{stats.players}</span>
              </div>
           </div>

           <Button className="w-full bg-[#F6CA56] hover:bg-[#e0b545] text-black font-bold h-12 text-lg shadow-lg shadow-[#F6CA56]/20">
              Buy Now
           </Button>
        </div>

      </div>
    </div>
  );
}
