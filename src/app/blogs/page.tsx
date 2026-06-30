import { print } from "graphql/language/printer";
import { fetchGraphQL } from "@/utils/fetchGraphQL";
import { sanitizeImageUrl } from "@/utils/sanitizeUrl";
import { AllBlogContentsQuery } from "@/queries/blog/AllBlogContentsQuery";
import { Metadata } from "next";
import { Navbar } from "@/stories/header/Navbar/Navbar";
import { ContentCard } from "@/stories/core/ContentCard/ContentCard";
import { Newspaper } from "lucide-react";

export const metadata: Metadata = {
  title: "News & Blogs | Metric Gamer",
  description: "The latest news, guides, and blog posts from the Metric Gamer team.",
  alternates: {
    canonical: "/blogs/",
  },
};

export default async function BlogsPage() {
  let posts: any[] = [];

  try {
    const data = await fetchGraphQL<any>(print(AllBlogContentsQuery), { first: 50 });
    posts = (data?.allBlogContent?.nodes || []).map((node: any) => ({
      id: node.slug || node.id,
      title: node.title || "Untitled",
      image: sanitizeImageUrl(node.featuredImage?.node?.sourceUrl) || "",
      slug: node.slug,
      href: `/blogs/${node.slug}`,
    }));
  } catch {
    // blogContents query may not be available yet
  }

  return (
    <main className="min-h-screen bg-background text-foreground font-sans selection:bg-[#F6CA56] selection:text-black">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-32 pb-20">
        {/* Header */}
        <div className="space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 bg-[#F6CA56] text-black font-bold px-4 py-1 rounded-full text-sm">
            <Newspaper className="w-4 h-4" />
            News & Blogs
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white font-heading leading-tight">
            Latest from Metric Gamer
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            Guides, opinions, and gaming news from people who actually play.
          </p>
        </div>

        {/* Grid */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <ContentCard
                key={post.id}
                type="blog"
                blogType="Blog"
                id={post.id}
                title={post.title}
                image={post.image}
                slug={post.slug}
                href={post.href}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center space-y-4">
            <Newspaper className="w-12 h-12 text-gray-600" />
            <p className="text-gray-400 text-lg">No blog posts found yet.</p>
            <p className="text-gray-600 text-sm">Check back soon!</p>
          </div>
        )}
      </div>
    </main>
  );
}
