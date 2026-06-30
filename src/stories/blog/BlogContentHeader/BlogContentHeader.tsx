"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CalendarDays } from "lucide-react";
import Link from "next/link";
import { AUTHORS } from "@/stories/sections/About/AuthorProfiles";

interface BlogContentHeaderProps {
  title: string;
  heroImage: string;
  author?: string;
  date?: string;
  modified?: string;
}

export function BlogContentHeader({ title, heroImage, author, date, modified }: BlogContentHeaderProps) {
  const displayAuthor = author || "Metric Gamer";
  const authorAvatar = AUTHORS.find(a => a.name === displayAuthor)?.avatar;

  const rawDate = modified || date;
  const displayDate = rawDate
    ? new Date(rawDate).toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })
    : null;

  return (
    <div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt={title}
          fill
          priority
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#160026] via-[#160026]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#160026]/90 via-transparent to-transparent" />
      </div>

      <div className="relative h-full max-w-7xl mx-auto px-4 md:px-8 flex flex-col justify-end pb-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl space-y-4"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white font-heading leading-tight drop-shadow-2xl">
            {title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
            <div className="flex items-center gap-2">
              {authorAvatar && (
                <div className="w-6 h-6 rounded-full overflow-hidden border border-white/20 relative flex-shrink-0">
                  <Image
                    src={authorAvatar}
                    alt={displayAuthor}
                    width={24}
                    height={24}
                    className="w-full h-full object-cover scale-150"
                  />
                </div>
              )}
              <span>By</span>
              <Link href="/about#team" className="text-[#F6CA56] font-bold hover:text-white transition-colors">
                {displayAuthor}
              </Link>
            </div>

            {displayDate && (
              <>
                <span className="w-1 h-1 rounded-full bg-white/30 flex-shrink-0" />
                <div className="flex items-center gap-1.5">
                  <CalendarDays className="w-3.5 h-3.5 text-[#F6CA56] flex-shrink-0" />
                  <span>Last updated {displayDate}</span>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
