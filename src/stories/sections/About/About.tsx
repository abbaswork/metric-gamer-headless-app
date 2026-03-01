"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Gamepad2, Trophy, Microscope, Binary, Target, Search, ArrowRight, Sparkles, Sliders, BarChart3, BookOpen, Monitor, Swords, TrendingUp, Brain, Repeat, FileText, ListFilter } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Send } from "lucide-react";
import { useHubSpotForm } from "@/hooks/useHubSpotForm";
import { METRIC_ICONS } from "@/utils/metricIcons";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const FloatingNumber = () => {
  const [config, setConfig] = useState({
    x: 0,
    y: 0,
    duration: 10,
    delay: 0,
    fontSize: 10,
    value: 0
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setConfig({
      x: Math.random() * 1000,
      y: Math.random() * 500 + 500,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 10,
      fontSize: Math.random() * 20 + 10,
      value: Math.floor(Math.random() * 100)
    });
  }, []);

  if (config.duration === 10 && config.x === 0) return null; // Wait for hydration

  return (
    <motion.div
      className="absolute text-[#F6CA56] font-mono font-bold"
      initial={{
        x: config.x,
        y: config.y,
        opacity: 0
      }}
      animate={{
        y: -100,
        opacity: [0, 1, 0]
      }}
      transition={{
        duration: config.duration,
        repeat: Infinity,
        ease: "linear",
        delay: config.delay
      }}
      style={{ fontSize: config.fontSize }}
    >
      {config.value}%
    </motion.div>
  );
};

export function AboutSection() {
  const { submitForm, status } = useHubSpotForm("341872712", "91132ed5-cb00-409d-bc16-d39d90617349");
  const [isMounted, setIsMounted] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    await submitForm(email);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Elements removed for performance */}
      {/* <div className="absolute inset-0 bg-[#351150]/10" /> */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#F6CA56]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* The Metric Method Section */}
        <div id="metric-method" className="text-center mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-[#F6CA56] text-black font-bold px-4 py-1 rounded-full text-sm mb-4"
          >
            <Microscope className="w-4 h-4" />
            The Metric Method
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold text-white font-heading"
          >
            This isn’t just another critic review. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F6CA56] to-[#ffeba1]">
              This is gamer to gamer.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300 mx-auto leading-relaxed"
          >
            Every metric score is based on real gamer feedback and broken down into curated scores. Find your next game based on the metrics that matter to you or browse our ranked lists.
          </motion.p>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24"
        >
          {/* Step 1 */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-b from-[#F6CA56]/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="bg-[#160026] border border-[#351150] p-8 rounded-3xl relative z-10 hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 bg-[#351150] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Gamepad2 className="w-8 h-8 text-[#F6CA56]" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 font-heading">1. Deep Dive</h3>
              <p className="text-gray-400">
                We head straight into the heart of real gaming communities like Steam, Reddit, and Discord to sift through thousands of player reports. Our goal is to bring you a condensed summary of genuine player reviews, cutting through the marketing hype to find the truth about every game and ranking.
              </p>
            </div>
            {/* Arrow for desktop */}
            <div className="hidden md:block absolute top-1/2 -right-4 z-20 text-[#351150]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-b from-[#F6CA56]/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="bg-[#160026] border border-[#351150] p-8 rounded-3xl relative z-10 hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 bg-[#351150] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Binary className="w-8 h-8 text-[#F6CA56]" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 font-heading">2. Sentiment Extraction</h3>
              <p className="text-gray-400">
                We convert real player experiences into hard metrics, identifying specific pain points and standout features that critics often miss. By collating feedback from the people actually playing the game, we create a transparent metric score that reflects the true state of the title.
              </p>
            </div>
            {/* Arrow for desktop */}
            <div className="hidden md:block absolute top-1/2 -right-4 z-20 text-[#351150]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-b from-[#F6CA56]/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="bg-[#160026] border border-[#351150] p-8 rounded-3xl relative z-10 hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 bg-[#351150] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Target className="w-8 h-8 text-[#F6CA56]" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 font-heading">3. The Honest Verdict</h3>
              <p className="text-gray-400">
                Our final score gives you a reliable breakdown of the metrics that matter! Whether it’s a high-tier competitive grind or a casual indie gem, we deliver a verdict you can actually trust before you hit the Buy button.
              </p>
            </div>
          </div>
        </div>

        {/* How to Get Started Section - Tabbed Interface */}
        <motion.div
          id="how-to"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-[#351150]/30 border border-[#F6CA56]/20 rounded-3xl p-8 md:p-12 mb-16"
        >
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Sparkles className="w-32 h-32 text-[#F6CA56]" />
          </div>

          <h3 className="text-3xl font-bold text-white font-heading mb-8 text-center md:text-left">How to Find Your Next Game</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="shrink-0 w-12 h-12 rounded-2xl bg-[#F6CA56] text-black flex items-center justify-center font-bold text-xl shadow-lg shadow-[#F6CA56]/20">
                  <Sliders className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">1. Check out our Find Games page</h4>
                  <p className="text-gray-300 leading-relaxed">
                    Head to our Find Games page and filter by Metric, Platform, or simply browse all games on our database!
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="shrink-0 w-12 h-12 rounded-2xl bg-[#160026] border border-[#F6CA56] text-[#F6CA56] flex items-center justify-center font-bold text-xl">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">2. Explore the Find Ranked Lists page</h4>
                  <p className="text-gray-300 leading-relaxed">
                    Not sure what game to play? Why not check our Find Ranked Lists page to find a collection of games ranked by what matters most to you!
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="shrink-0 w-12 h-12 rounded-2xl bg-[#160026] border border-[#F6CA56] text-[#F6CA56] flex items-center justify-center font-bold text-xl">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">3. Compare Metrics</h4>
                  <p className="text-gray-300 leading-relaxed">
                    Compare a range of metrics from gameplay, graphics, or combat through our unique metric system, or completely hide the metrics that don’t matter to you to truly personalise your experience on Metric Gamer.
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <Link href="/metrics">
                  <Button className="bg-[#F6CA56] text-black hover:bg-[#e0b545] font-bold text-lg px-8 py-6 rounded-xl w-full md:w-auto shadow-lg shadow-[#F6CA56]/20 transition-all hover:scale-105">
                    Start Searching Now <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 h-full">
              {[
                { label: "Story", color: "text-blue-400" },
                { label: "Graphics", color: "text-green-400" },
                { label: "Combat", color: "text-red-400" },
                { label: "Skill Ceiling", color: "text-yellow-400" },
                { label: "Learning Curve", color: "text-purple-400" },
                { label: "Replay Value", color: "text-orange-400" },
              ].map((metric, i) => {
                const Icon = METRIC_ICONS[metric.label] || Sparkles;
                return (
                  <Link key={i} href="/metrics" className="group">
                    <div
                      className="bg-[#160026] hover:bg-[#351150] border border-white/5 hover:border-[#F6CA56]/50 rounded-xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all hover:-translate-y-1 h-full"
                    >
                      <div className={`p-2 rounded-lg bg-white/5 group-hover:bg-white/10 ${metric.color}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-bold text-gray-300 group-hover:text-white uppercase tracking-wider text-center">{metric.label}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Fun Stat Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#F6CA56] rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="flex items-center gap-4">
            <Trophy className="w-12 h-12 text-black" />
            <div>
              <h4 className="text-2xl font-bold text-black font-heading">Join 50,000+ Smart Gamers</h4>
              <p className="text-black/80 font-medium">Stop guessing. Start playing.</p>
            </div>
          </div>
          <div className="flex-1 w-full max-w-xl">
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-black/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-4 border border-black/5"
              >
                <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center shrink-0">
                  <Send className="w-5 h-5 text-[#F6CA56]" />
                </div>
                <div>
                  <div className="font-bold text-black">You&apos;re on the list!</div>
                  <div className="text-black/60 text-sm font-medium">Get ready for metrics in your inbox.</div>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  required
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-black/10 border-transparent placeholder:text-black/40 text-black h-12 rounded-xl focus-visible:ring-black/20"
                />
                <Button
                  type="submit"
                  disabled={status === "loading"}
                  className="bg-[#160026] text-white hover:bg-[#351150] h-12 px-8 rounded-xl font-bold transition-all active:scale-95 shrink-0"
                >
                  {status === "loading" ? "Joining..." : "Join Now"}
                </Button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
