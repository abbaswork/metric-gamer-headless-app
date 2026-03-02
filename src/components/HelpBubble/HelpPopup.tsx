"use client";

import { motion } from "framer-motion";
import { X, Search, Microscope, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface HelpPopupProps {
  onClose: () => void;
}

export function HelpPopup({ onClose }: HelpPopupProps) {
  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
      />

      {/* Popup */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed bottom-24 right-4 left-4 md:left-auto md:right-8 z-50 md:w-full md:max-w-md bg-[#160026] border border-[#F6CA56]/30 rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="relative bg-gradient-to-r from-[#351150] to-[#160026] p-6 border-b border-[#F6CA56]/20">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <h3 className="text-2xl font-bold text-white font-heading">
            Need Help?
          </h3>
          <p className="text-gray-400 text-sm mt-1">
            Learn how to find your perfect game
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Metric Method Section - Now First */}
          <Link href="/about" onClick={onClose} className="block">
            <div className="bg-[#351150]/30 border border-[#F6CA56]/20 rounded-xl p-5 hover:border-[#F6CA56]/40 transition-all group cursor-pointer hover:bg-[#351150]/40">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#F6CA56]/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-[#F6CA56]/20 transition-colors">
                  <Microscope className="w-6 h-6 text-[#F6CA56]" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-white font-heading mb-2">
                    The Metric Method
                  </h4>
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                    Every metric score is based on real gamer feedback and broken down into curated scores. Find your next game based on the metrics that matter to you or browse our ranked lists.
                  </p>
                  <div className="text-[#F6CA56] hover:text-[#e0b545] font-bold text-sm flex items-center gap-1">
                    Learn More
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          </Link>

          {/* How To Section - Now Second */}
          <Link href="/about#how-to" onClick={onClose} className="block">
            <div className="bg-[#351150]/30 border border-[#F6CA56]/20 rounded-xl p-5 hover:border-[#F6CA56]/40 transition-all group cursor-pointer hover:bg-[#351150]/40">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#F6CA56]/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-[#F6CA56]/20 transition-colors">
                  <Search className="w-6 h-6 text-[#F6CA56]" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-white font-heading mb-2">
                    How To Find Your Game
                  </h4>
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                    Use our advanced search and filtering system to discover games that match your playstyle based on metrics most relevant to you!
                  </p>
                  <div className="text-[#F6CA56] hover:text-[#e0b545] font-bold text-sm flex items-center gap-1">
                    Learn More
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </motion.div>
    </>
  );
}
