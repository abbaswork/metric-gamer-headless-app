"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Gamepad2, Trophy, Microscope, Binary, Target, Search, ArrowRight, Sparkles, Sliders, BarChart3, BookOpen, Monitor, Swords, TrendingUp, Brain, Repeat, FileText, ListFilter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Send } from "lucide-react";
import { useHubSpotForm } from "@/hooks/useHubSpotForm";
import { METRIC_ICONS } from "@/utils/metricIcons";
import { AuthorProfiles } from "./AuthorProfiles";





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
            Every game is scored against its own unique set of metrics unique to its genre. Find your next game based on the metrics that matter to you or browse our ranked lists.
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
              <h3 className="text-2xl font-bold text-white mb-4 font-heading">1. The Right Questions</h3>
              <p className="text-gray-400">
                At Metric Gamer, we don't just ask if a game is good, but rather, is this game for me? Whatever matters to you, be it handling in racing games or the inclusion of fully licenced teams in sports games, our customisable metrics allow you to tailor every game to what you value and the way you play. We also rank games based on a whole host of niches, for example, the best games on a certain console, or top rated free or multiplayer titles.
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
              <h3 className="text-2xl font-bold text-white mb-4 font-heading">2. The Rubric</h3>
              <p className="text-gray-400">
                The metrics for each genre don't change between games. Every racing game on the site is scored against the same rubric, so a 4 on handling model for Gran Turismo 7 means the same thing as a 4 on handling model for any other racing game we cover. The rubrics we score each game on are built from the team's own extensive experience in each genre (almost 3 decades of gaming for some of us), shaped by input from our Metric Gamer community and extensive research into what players all around the world actually want from a game.
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
                The overall score is the average of the five metric scores. There’s no weighting and no editorial adjustment, even for a game we happen to like. Each game comes with a full metric breakdown explaining the exact aspects of that metric that make it worth it or not. If you’re not interested in, say, the graphics in the games you’re looking at, simply toggle the graphics metric off and watch the scores dynamically adjust based on your preferences!
              </p>
            </div>
          </div>
        </div>

        {/* Author Profiles Section */}
        <div id="team" className="pt-20 border-t border-white/5">
          <AuthorProfiles />
        </div>

        {/* Founder's Story Section */}
        <div className="pt-20 border-t border-white/5 mb-24">
          <div className="text-center mb-12 space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-[#F6CA56] text-black font-bold px-4 py-1 rounded-full text-sm mb-4"
            >
              <BookOpen className="w-4 h-4" />
              The Founder
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-white font-heading"
            >
              Our Founder&apos;s Story
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto space-y-6 text-gray-300 leading-relaxed text-lg"
          >
            <p>
              I didn&apos;t set out to build a games website. I set out to find one that already did what I wanted, and after spending more hours than I&apos;d like to admit scrolling through review sites and obscure forum threads, I gave up and built it myself.
            </p>
            <p>
              The problem wasn&apos;t that good information didn&apos;t exist. It was spread across the tenth page of Google, buried inside Steam discussions, tucked into Reddit threads from years back. That&apos;s actually where the most useful stuff was, ironically. The players who really knew a game had long been pushed off the front pages by press coverage that told you something was good without ever telling you whether it was good for you specifically.
            </p>
            <p>
              I&apos;ve been a full stack developer for over a decade, so when I couldn&apos;t find the tool I wanted, I built it. The first version of Metric Gamer went live in 2022, about six months after I started. It was rough around the edges, but the core idea held: score every game against a consistent rubric so that a number on one title actually means something when you put it next to the same number on another.
            </p>
            <p>
              The critic bias thing was what really pushed me over the edge. Not because critics are always wrong, but because their tastes aren&apos;t yours. A game can pull a strong score from the press and still have the one flaw that happens to be the thing you care about most, and you&apos;d never know from the aggregate. I wanted something gamer to gamer, full stop.
            </p>
            <p>
              I&apos;m not trying to build the biggest games site on the internet. I just want it to help people find games they&apos;ll actually enjoy. If someone finds their next favourite game because of something they read here, that&apos;s what it&apos;s for.
            </p>
          </motion.div>
        </div>

        {/* Our Mission Section */}
        <div className="pt-20 border-t border-white/5 mb-24">
          <div className="text-center mb-12 space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-[#F6CA56] text-black font-bold px-4 py-1 rounded-full text-sm mb-4"
            >
              <Target className="w-4 h-4" />
              Why We Exist
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-white font-heading"
            >
              Our Mission
            </motion.h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-lg text-gray-300 leading-relaxed"
            >
              A lot of gaming scores out there tell you whether (predominantly) critics liked a game, but we want Metric Gamer to answer something more useful than that; is this game worth it <em>for you</em>? Our unique rubric system is what makes that question answerable. Every game in a genre gets scored the same way, which means you can compare games, metrics, and scores based on the metrics that actually matter to you!
            </motion.p>
          </div>
        </div>

        {/* How to Get Started Section - Tabbed Interface */}
        <div className="pt-20 border-t border-white/5">
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
        </div>

      </div>
    </section>
  );
}
