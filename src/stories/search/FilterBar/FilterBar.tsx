import { Button } from "@/components/ui/button";
import { 
  SlidersHorizontal, X, Monitor, Swords, 
  TrendingUp, Brain, Repeat, BookOpen, LayoutGrid, 
  MonitorPlay, FileText, Hash, ListFilter
} from "lucide-react";

export interface FilterBarProps {
  selectedMetrics: string[];
  selectedPlatforms: string[];
  selectedGenres: string[];
  selectedBlogTypes: string[];
  onMetricToggle: (id: string) => void;
  onPlatformToggle: (id: string) => void;
  onGenreToggle: (id: string) => void;
  onBlogTypeToggle: (id: string) => void;
  onClearAll: () => void;
  showClearAll: boolean;
  resultType: string;
}

// Configuration Constants
const METRIC_TAGS = [
  { id: "Story", icon: BookOpen },
  { id: "Graphics", icon: Monitor },
  { id: "Combat", icon: Swords },
  { id: "Difficulty", icon: TrendingUp },
  { id: "World Design", icon: LayoutGrid },
  { id: "Mechanics", icon: Brain },
  { id: "Music", icon: Repeat },
  { id: "Atmosphere", icon: BookOpen },
];

const GENRE_TAGS = [
  "RPG", "Action", "Horror", "Sci-Fi", "Indie", "Metroidvania", "Open World", "Strategy"
];

const BLOG_TYPE_TAGS = ["Top 5", "Best Of", "Hidden Gems"];

const PLATFORM_TAGS = ["PS5", "PS4", "Xbox Series X/S", "Xbox One", "PC", "Switch"];

export function FilterBar({
  selectedMetrics,
  selectedPlatforms,
  selectedGenres,
  selectedBlogTypes,
  onMetricToggle,
  onPlatformToggle,
  onGenreToggle,
  onBlogTypeToggle,
  onClearAll,
  showClearAll,
  resultType
}: FilterBarProps) {
  return (
    <div>
      <div className="flex items-center justify-between gap-4 border-b border-white/5 pb-6">
         <div className="flex items-center gap-3">
            <div className="bg-[#F6CA56] p-2 rounded-lg text-black">
              <ListFilter className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-white">Filters</h3>
         </div>

         {/* Clear All */}
         {showClearAll && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClearAll}
              className="text-gray-400 hover:text-[#F6CA56] hover:bg-white/5 transition-colors"
            >
              Clear All <X className="w-4 h-4 ml-2" />
            </Button>
          )}
      </div>

      <div className="space-y-8 mt-6">
        {/* Metrics Selection */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-wider">
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filter by Metric</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {METRIC_TAGS.map((metric) => {
              const isSelected = selectedMetrics.includes(metric.id);
              return (
                <button
                  key={metric.id}
                  onClick={() => onMetricToggle(metric.id)}
                  className={`
                    flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all duration-200 text-sm
                    ${isSelected 
                      ? "bg-[#F6CA56] text-black border-[#F6CA56] shadow-[0_0_15px_rgba(246,202,86,0.3)] font-bold transform -translate-y-0.5" 
                      : "bg-black/30 text-gray-300 border-white/10 hover:border-[#F6CA56]/50 hover:bg-white/5 hover:text-white"
                    }
                  `}
                >
                  <metric.icon className={`w-3.5 h-3.5 ${isSelected ? "text-black" : "text-[#F6CA56]"}`} />
                  <span>{metric.id}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Advanced Filters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
          {/* Platform Selection */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-wider">
              <MonitorPlay className="w-4 h-4" />
              <span>Filter by Platform</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {PLATFORM_TAGS.map((platform) => {
                const isSelected = selectedPlatforms.includes(platform);
                return (
                  <button
                    key={platform}
                    onClick={() => onPlatformToggle(platform)}
                    className={`
                      px-3 py-1.5 rounded-lg text-xs font-bold border transition-all duration-200
                      ${isSelected 
                        ? "bg-[#F6CA56] text-black border-[#F6CA56]" 
                        : "bg-black/30 text-gray-400 border-white/10 hover:border-white/30 hover:text-white"
                      }
                    `}
                  >
                    {platform}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Blog Type Selection (Blogs Only or All) */}
          <div className={`space-y-3 transition-opacity ${resultType === 'game' ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
            <div className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-wider">
              <FileText className="w-4 h-4" />
              <span>Filter by Blog Type</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {BLOG_TYPE_TAGS.map((type) => {
                const isSelected = selectedBlogTypes.includes(type);
                return (
                  <button
                    key={type}
                    onClick={() => onBlogTypeToggle(type)}
                    className={`
                      px-3 py-1.5 rounded-lg text-xs font-bold border transition-all duration-200
                      ${isSelected 
                        ? "bg-[#F6CA56] text-black border-[#F6CA56]" 
                        : "bg-black/30 text-gray-400 border-white/10 hover:border-white/30 hover:text-white"
                      }
                    `}
                  >
                    {type}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Genre Selection */}
        <div className="space-y-3 pt-6 border-t border-white/5">
          <div className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-wider">
            <Hash className="w-4 h-4" />
            <span>Filter by Genre</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {GENRE_TAGS.map((genre) => {
              const isSelected = selectedGenres.includes(genre);
              return (
                <button
                  key={genre}
                  onClick={() => onGenreToggle(genre)}
                  className={`
                    px-4 py-1.5 rounded-full text-sm border transition-all duration-200
                    ${isSelected 
                      ? "bg-[#F6CA56] text-black border-[#F6CA56] font-bold shadow-md" 
                      : "bg-transparent text-gray-400 border-white/10 hover:border-white/30 hover:text-white"
                    }
                  `}
                >
                  {genre}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
