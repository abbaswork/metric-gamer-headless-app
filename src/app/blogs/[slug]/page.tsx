import { notFound } from "next/navigation";
import { print } from "graphql/language/printer";
import { fetchGraphQL } from "@/utils/fetchGraphQL";
import { sanitizeImageUrl } from "@/utils/sanitizeUrl";
import { BlogContentBySlugQuery } from "@/queries/blog/BlogContentBySlugQuery";
import { Metadata } from "next";
import { Navbar } from "@/stories/header/Navbar/Navbar";
import { WYSIWYGContent } from "@/components/ui/WYSIWYGContent";
import { BlogContentHeader } from "@/stories/blog/BlogContentHeader/BlogContentHeader";
import { Bookmark } from "lucide-react";

type BlogContentBySlugQueryType = any;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await fetchGraphQL<BlogContentBySlugQueryType>(print(BlogContentBySlugQuery), { slug });
  const seo = data?.blogContentBy?.seo;

  return {
    title: seo?.title || "Blog Content | Metric Gamer",
    description: seo?.metaDesc || "Read the latest blog content on Metric Gamer.",
    alternates: {
      canonical: `/blogs/${slug}/`,
    },
  };
}

export default async function BlogContentPage({ params }: Props) {
  const { slug } = await params;

  const data = await fetchGraphQL<BlogContentBySlugQueryType>(print(BlogContentBySlugQuery), { slug });

  const blogContent = data.blogContentBy;

  if (!blogContent || !blogContent.propertiesBlogContent) {
    return notFound();
  }

  const contentBlock = blogContent.propertiesBlogContent.contentBlock;
  const featuredImage = sanitizeImageUrl(blogContent.featuredImage?.node?.sourceUrl);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background text-foreground font-sans selection:bg-[#F6CA56] selection:text-black">
        {featuredImage ? (
          <BlogContentHeader
            title={blogContent.title}
            heroImage={featuredImage}
            date={blogContent.date}
            modified={blogContent.modified}
          />
        ) : (
          <div className="pt-28 pb-8 max-w-7xl mx-auto px-4 md:px-8">
            <h1 className="text-4xl md:text-6xl font-bold text-white font-heading leading-tight">
              {blogContent.title}
            </h1>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12">
            <div className="min-w-0">
              {contentBlock && <WYSIWYGContent html={contentBlock} />}
            </div>

            <div className="relative">
              <div className="bg-[#160026] border border-[#351150] rounded-2xl sticky top-24 p-6">
                <h3 className="text-lg font-bold text-white font-heading flex items-center gap-2 mb-4">
                  <Bookmark className="w-5 h-5 text-[#F6CA56]" />
                  Latest News / Blogs
                </h3>
                <p className="text-gray-500 text-sm">Coming soon.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
