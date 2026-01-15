"use client";

import { useState } from "react";
import { HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpPopup } from "./HelpPopup";

export function HelpBubble() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Help Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 20 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 z-40 w-14 h-14 bg-[#F6CA56] hover:bg-[#e0b545] text-black rounded-full shadow-lg shadow-[#F6CA56]/30 hover:shadow-[#F6CA56]/50 flex items-center justify-center transition-all hover:scale-110 active:scale-95"
        aria-label="Help"
      >
        <HelpCircle className="w-6 h-6" />
      </motion.button>

      {/* Help Popup */}
      <AnimatePresence>
        {isOpen && <HelpPopup onClose={() => setIsOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
