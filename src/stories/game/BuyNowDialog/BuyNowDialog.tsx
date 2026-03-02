"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Gamepad2, Monitor, Disc } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface BuyNowDialogProps {
  isOpen: boolean;
  onClose: () => void;
  gameTitle?: string;
  platforms?: string[];
}

export function BuyNowDialog({ isOpen, onClose, gameTitle = "", platforms = [] }: BuyNowDialogProps) {
  const encodedTitle = encodeURIComponent(gameTitle);

  const allStores = [
    { name: "Steam", icon: Monitor, url: `https://store.steampowered.com/search/?term=${encodedTitle}`, platform: "PC" },
    { name: "PlayStation Store", icon: Gamepad2, url: `https://store.playstation.com/en-us/search/${encodedTitle}`, platform: "PlayStation" },
    { name: "Xbox Store", icon: Gamepad2, url: `https://www.xbox.com/en-us/search?q=${encodedTitle}`, platform: "Xbox" },
    { name: "Nintendo eShop", icon: Gamepad2, url: `https://www.nintendo.com/search/#q=${encodedTitle}`, platform: "Nintendo" },
    // { name: "Epic Games", icon: Monitor, url: `https://www.epicgames.com/store/en-US/browse?q=${encodedTitle}&sortBy=relevancy`, platform: "PC" },
  ];

  // Filter stores based on active platforms
  const stores = allStores.filter(store => {
    if (platforms.length === 0) return true; // Show all if no data
    return platforms.some(p => {
      const platform = p.toLowerCase();
      const storeType = store.platform.toLowerCase();

      if (storeType === 'playstation') return platform.includes('playstation') || platform.includes('ps');
      if (storeType === 'xbox') return platform.includes('xbox');
      if (storeType === 'nintendo') return platform.includes('nintendo') || platform.includes('switch');
      if (storeType === 'pc') return platform.includes('pc') || platform.includes('steam') || platform.includes('windows') || platform.includes('epic');

      return platform.includes(storeType);
    });
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            {/* Dialog */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#160026]/90 backdrop-blur-xl border border-[#F6CA56]/30 w-full max-w-4xl rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden"
            >
              {/* Decorative Glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-20 bg-[#F6CA56]/20 blur-[100px] pointer-events-none" />

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className="absolute top-4 right-4 md:top-6 md:right-6 text-gray-400 hover:text-white transition-all z-[60] bg-white/5 p-1.5 md:p-2 rounded-full hover:bg-white/10 hover:scale-110 active:scale-90"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5 md:w-6 md:h-6" />
              </button>

              <div className="text-center space-y-2 md:space-y-3 mb-8 md:mb-12 pt-6 md:pt-0 relative z-10">
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white font-heading tracking-wide px-10 md:px-0">
                  {gameTitle ? `Search ${gameTitle}` : "Choose Your Platform"}
                </h3>
                <p className="text-gray-400 text-sm md:text-lg">
                  Search Stores to find the game you&apos;re looking for
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-4 relative z-10">
                {stores.map((store) => (
                  <motion.a
                    key={store.name}
                    href={store.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex flex-col items-center justify-center gap-4 p-6 rounded-2xl bg-black/40 border border-[#F6CA56]/50 hover:border-[#F6CA56] hover:bg-[#F6CA56] hover:text-black transition-all group h-40 w-[160px] cursor-pointer"
                  >
                    <div className="p-3 rounded-full bg-white/5 group-hover:bg-black/10 transition-colors">
                      <store.icon className="w-8 h-8 group-hover:text-black text-[#F6CA56] transition-colors" />
                    </div>
                    <span className="font-bold text-sm text-center group-hover:text-black text-gray-200 transition-colors leading-tight">
                      {store.name}
                    </span>
                  </motion.a>
                ))}
              </div>

            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
