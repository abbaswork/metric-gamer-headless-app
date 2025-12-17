import { Gamepad2, User, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export interface SimilarGame {
  title: string;
  image: string | any;
  date: string;
  author: string;
  slug: string;
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
              Explore Similar Games Here
            </h2>
         </div>
         <p className="text-gray-400 text-lg">
            Discover more games like {currentGameTitle} through our curated lists and collections that feature this title.
         </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         {games.map((game, i) => {
            const imageSrc = typeof game.image === 'string' ? game.image : game.image.src;
            return (
              <Link key={i} href={game.slug}>
                <div className="group cursor-pointer bg-[#160026] border border-[#351150] rounded-2xl overflow-hidden hover:border-[#F6CA56]/50 transition-colors h-full flex flex-col">
                  <div className="aspect-video w-full relative overflow-hidden bg-black">
                    <Image 
                      src={imageSrc} 
                      alt={game.title}
                      fill
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#160026] to-transparent opacity-60" />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#F6CA56] transition-colors line-clamp-2">
                      {game.title}
                    </h3>
                    <div className="mt-auto flex items-center justify-between text-xs text-gray-500">
                       <span className="flex items-center gap-1"><User className="w-3 h-3" /> {game.author}</span>
                       <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {game.date}</span>
                    </div>
                  </div>
                </div>
              </Link>
            );
         })}
      </div>
    </div>
  );
}
