import { Bookmark, User, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export interface BlogPostSummary {
  title: string;
  image: string | any;
  date: string;
  author: string;
  slug: string;
}

export interface BlogSidebarProps {
  posts: BlogPostSummary[];
}

export function BlogSidebar({ posts }: BlogSidebarProps) {
  return (
    <div className="relative">
      <div className="bg-[#160026] border border-[#351150] rounded-2xl sticky top-24 flex flex-col max-h-[calc(100vh-8rem)]">
        <div className="p-6 border-b border-white/10 bg-[#160026] z-10 rounded-t-2xl shrink-0">
          <h3 className="text-lg font-bold text-white font-heading flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-[#F6CA56]" />
            Latest Blog Posts
          </h3>
        </div>
        
        <div 
          className="p-6 overflow-y-auto"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div className="space-y-4">
            {posts.map((blog, i) => {
              const imageSrc = typeof blog.image === 'string' ? blog.image : blog.image.src;
              return (
                <Link key={i} href={blog.slug}>
                  <div className="group cursor-pointer flex flex-col gap-3 pb-4 border-b border-white/5 last:border-0 hover:bg-white/5 p-3 rounded-xl transition-colors">
                    <div className="w-full aspect-video rounded-lg overflow-hidden border border-white/10 group-hover:border-[#F6CA56] transition-colors relative shrink-0 bg-black">
                      <Image 
                        src={imageSrc} 
                        alt={blog.title}
                        fill
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm leading-tight mb-2 group-hover:text-[#F6CA56] transition-colors line-clamp-2">
                        {blog.title}
                      </h4>
                      <div className="flex flex-col gap-1 text-xs text-gray-500">
                        <span className="flex items-center gap-1"><User className="w-3 h-3" /> {blog.author}</span>
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {blog.date}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="p-6 pt-0 border-t border-white/10 shrink-0">
          <div className="pt-6">
            <Button className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/10">
              View All Articles
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
