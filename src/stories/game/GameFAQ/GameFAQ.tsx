"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQItem({ question, answer, isOpen, onToggle }: FAQItemProps) {
  return (
    <div className="border-b border-white/5 last:border-0">
      <button
        onClick={onToggle}
        className="w-full py-6 flex items-center justify-between text-left group transition-all duration-300"
      >
        <h3 className="text-lg font-medium text-white group-hover:text-[#F6CA56] transition-colors pr-8 leading-tight">
          {question}
        </h3>
        <div className={`p-2 rounded-full bg-white/5 group-hover:bg-white/10 transition-all duration-300 ${isOpen ? 'rotate-180 bg-[#F6CA56]/10' : ''}`}>
          <ChevronDown className={`w-5 h-5 transition-colors ${isOpen ? 'text-[#F6CA56]' : 'text-gray-400'}`} />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-6 text-gray-300 leading-relaxed font-light">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export interface GameFAQProps {
  gameTitle: string;
  platforms: string[];
  isCrossPlatform: boolean;
  players: string;
}

export function GameFAQ({ gameTitle, platforms, isCrossPlatform, players }: GameFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: `What platforms is ${gameTitle} on?`,
      answer: `${gameTitle} is available to play on ${platforms.join(", ")}.`
    },
    {
      question: `Is ${gameTitle} cross-platform?`,
      answer: isCrossPlatform
        ? `Yes, ${gameTitle} supports cross-platform play, allowing you to play with friends across different systems.`
        : `No, ${gameTitle} does not currently support cross-platform play.`
    },
    {
      question: `How many players is ${gameTitle}?`,
      answer: `${gameTitle} is a ${players} game.`
    }
  ];

  return (
    <div className="space-y-8 py-12">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-[#F6CA56]/10">
          <HelpCircle className="w-6 h-6 text-[#F6CA56]" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white font-heading tracking-tight">
          Frequently Asked Questions
        </h2>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl md:rounded-3xl px-6 md:px-10 overflow-hidden backdrop-blur-sm">
        {faqs.map((faq, index) => (
          <FAQItem
            key={index}
            question={faq.question}
            answer={faq.answer}
            isOpen={openIndex === index}
            onToggle={() => setOpenIndex(openIndex === index ? null : index)}
          />
        ))}
      </div>
    </div>
  );
}
