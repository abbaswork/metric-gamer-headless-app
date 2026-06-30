"use client";

import { Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ContentCard } from "@/stories/core/ContentCard/ContentCard";

export interface BlogPostSummary {
  id: string;
  title: string;
  image: string | any;
  slug: string;
  excerpt?: string;
  metrics?: string[];
  platforms?: string[];
  leftImage?: string;
  rightImage?: string;
  linkPrefix?: string;
}

export interface BlogSidebarProps {
  posts: BlogPostSummary[];
  title?: string;
  viewAllHref?: string;
  viewAllLabel?: string;
}

export function BlogSidebar({
  posts,
  title = "Latest Rankings",
  viewAllHref = "/metrics?type=blog#results",
  viewAllLabel = "Read More Rankings",
}: BlogSidebarProps) {
  return (
    <div className="relative">
      <div className="bg-[#160026] border border-[#351150] rounded-2xl sticky top-24 flex flex-col max-h-[calc(100vh-8rem)]">
        <div className="p-6 border-b border-white/10 bg-[#160026] z-10 rounded-t-2xl shrink-0">
          <h3 className="text-lg font-bold text-white font-heading flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-[#F6CA56]" />
            {title}
          </h3>
        </div>

        <div
          className="p-6 overflow-y-auto"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div className="space-y-6">
            {posts.map(({ linkPrefix, ...blog }) => (
              <ContentCard
                key={blog.id}
                type="blog"
                blogType="Ranking"
                isSidebar={true}
                href={linkPrefix ? `${linkPrefix}${blog.slug}` : undefined}
                {...blog}
              />
            ))}
          </div>
        </div>

        <div className="p-6 pt-0 border-t border-white/10 shrink-0">
          <div className="pt-6">
            <Link href={viewAllHref}>
              <Button className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/10">
                {viewAllLabel}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
