import { Search, Gamepad2, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";

export interface SearchHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  resultType: string;
  onResultTypeChange: (value: string) => void;
}

export function SearchHeader({
  searchQuery,
  onSearchChange,
  resultType,
  onResultTypeChange
}: SearchHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row gap-6 items-stretch">
      {/* Search Bar */}
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Search className="w-5 h-5 text-gray-400" />
        </div>
        <Input
          type="text"
          placeholder="Search for games, genres, or topics..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full bg-black/40 border-[#351150] text-white pl-12 pr-4 h-[52px] rounded-2xl text-lg focus-visible:ring-[#F6CA56] focus-visible:border-[#F6CA56] shadow-inner placeholder:text-gray-500"
        />
      </div>

      {/* Type Toggle */}
      <div className="bg-black/40 p-1 rounded-2xl flex items-center h-[52px]">
        <button
          onClick={() => onResultTypeChange("game")}
          className={`flex-1 h-full px-6 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${resultType === "game" ? "bg-[#F6CA56] text-black shadow-lg" : "text-gray-400 hover:text-white"}`}
        >
          <Gamepad2 className="w-4 h-4" /> Games
        </button>
        <button
          onClick={() => onResultTypeChange("blog")}
          className={`flex-1 h-full px-6 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${resultType === "blog" ? "bg-[#F6CA56] text-black shadow-lg" : "text-gray-400 hover:text-white"}`}
        >
          <FileText className="w-4 h-4" /> Rankings
        </button>
      </div>
    </div>
  );
}
