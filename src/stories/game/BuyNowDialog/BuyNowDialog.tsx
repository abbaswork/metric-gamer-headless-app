"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Gamepad2, Monitor, Disc } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface BuyNowDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BuyNowDialog({ isOpen, onClose }: BuyNowDialogProps) {
  const stores = [
    { name: "Steam", icon: Monitor, color: "hover:bg-[#1b2838] hover:text-white" },
    { name: "PlayStation Store", icon: Gamepad2, color: "hover:bg-[#00439c] hover:text-white" },
    { name: "Xbox Store", icon: Gamepad2, color: "hover:bg-[#107c10] hover:text-white" },
    { name: "Nintendo eShop", icon: Gamepad2, color: "hover:bg-[#e60012] hover:text-white" },
    { name: "Epic Games", icon: Monitor, color: "hover:bg-[#313131] hover:text-white" },
  ];

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
              className="bg-[#160026]/90 backdrop-blur-xl border border-[#F6CA56]/30 w-full max-w-4xl rounded-3xl p-8 shadow-2xl relative overflow-hidden"
            >
              {/* Decorative Glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-20 bg-[#F6CA56]/20 blur-[100px] pointer-events-none" />

              <button 
                onClick={onClose}
                className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors z-10 bg-white/5 p-2 rounded-full hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center space-y-3 mb-12 relative z-10">
                <h3 className="text-3xl md:text-4xl font-bold text-white font-heading tracking-wide">
                  Choose Your Platform
                </h3>
                <p className="text-gray-400 text-lg">
                  Select a store to purchase the digital edition
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 relative z-10">
                {stores.map((store) => (
                  <motion.button
                    key={store.name}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex flex-col items-center justify-center gap-4 p-6 rounded-2xl bg-black/40 border border-[#F6CA56]/50 hover:border-[#F6CA56] hover:bg-[#F6CA56] hover:text-black transition-all group h-40"
                    onClick={() => {
                        console.log(`Navigating to ${store.name}`);
                    }}
                  >
                    <div className="p-3 rounded-full bg-white/5 group-hover:bg-black/10 transition-colors">
                      <store.icon className="w-8 h-8 group-hover:text-black text-[#F6CA56] transition-colors" />
                    </div>
                    <span className="font-bold text-sm text-center group-hover:text-black text-gray-200 transition-colors leading-tight">
                      {store.name}
                    </span>
                  </motion.button>
                ))}
              </div>

            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
