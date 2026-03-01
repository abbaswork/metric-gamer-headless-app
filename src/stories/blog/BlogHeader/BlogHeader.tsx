import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { GameBlogHeader } from "@/stories/components/GameBlogHeader/GameBlogHeader";

export interface BlogHeaderProps {
  title: string;
  author: string;
  date: string;
  readTime: string;
  image: string | any;
  description: string;
  topGames?: any[]; // For the podium layout
}

export function BlogHeader({
  title,
  author,
  date,
  readTime,
  image,
  description,
  topGames
}: BlogHeaderProps) {
  const imageSrc = typeof image === 'string' ? image : image.src;

  return (
    <div className="space-y-6">
      <Badge className="bg-[#F6CA56] text-black hover:bg-[#F6CA56] font-bold text-sm px-3 py-1">
        Top Ranking
      </Badge>
      <h1 className="text-4xl md:text-5xl font-bold text-white font-heading leading-tight">
        {title}
      </h1>

      <div className="flex items-center gap-6 text-gray-400 text-sm border-b border-white/10 pb-8">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" /> {date}
        </div>
      </div>

      {/* Hero Section: GameBlogHeader or Default Image */}
      {topGames && topGames.length >= 3 ? (
        <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl bg-[#0a0014]">
          <GameBlogHeader
            leftImage={typeof topGames[1].image === 'string' ? topGames[1].image : topGames[1].image.src}
            rightImage={typeof topGames[2].image === 'string' ? topGames[2].image : topGames[2].image.src}
          />
        </div>
      ) : (
        <div className="relative aspect-video rounded-3xl overflow-hidden border border-[#351150] shadow-2xl">
          <Image
            src={imageSrc}
            alt="Hero"
            fill
            priority
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#160026] via-transparent to-transparent opacity-60" />
        </div>
      )}

      <div className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed">
        <p>{description}</p>
      </div>
    </div>
  );
}
