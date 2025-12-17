"use client";

import { motion } from "framer-motion";
import { BookOpen, Swords, Monitor, TrendingUp, Trophy, LucideIcon } from "lucide-react";

export interface MetricItem {
  id: string;
  score: number;
  label: string;
  icon: any; // LucideIcon
  analysis: string;
}

export interface MetricDeepDiveProps {
  metrics: MetricItem[];
}

export function MetricDeepDive({ metrics }: MetricDeepDiveProps) {
  return (
    <div className="space-y-12">
       <h2 className="text-4xl font-bold text-white font-heading">In-Depth Analysis</h2>
       
       <div className="space-y-16">
         {metrics.map((metric) => (
           <div key={metric.id} className="group">
              <div className="flex items-end justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#351150] flex items-center justify-center text-[#F6CA56] shadow-lg shadow-[#F6CA56]/10 group-hover:scale-110 transition-transform duration-300">
                     <metric.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white font-heading">{metric.label}</h3>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-[#F6CA56]">{metric.score}</span>
                  <span className="text-gray-500 font-bold">/5.0</span>
                </div>
              </div>

              {/* Visual Bar */}
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden mb-8">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(metric.score / 5) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full bg-[#F6CA56] shadow-[0_0_10px_rgba(246,202,86,0.5)]"
                />
              </div>

              <div className="prose prose-invert prose-lg max-w-none text-gray-400 leading-relaxed">
                 <p>{metric.analysis}</p>
              </div>
           </div>
         ))}
       </div>
    </div>
  );
}
