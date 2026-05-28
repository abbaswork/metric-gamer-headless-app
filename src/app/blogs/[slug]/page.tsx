import { notFound } from "next/navigation";
import { print } from "graphql/language/printer";
import { fetchGraphQL } from "@/utils/fetchGraphQL";
import { sanitizeImageUrl } from "@/utils/sanitizeUrl";
import { BlogContentBySlugQuery } from "@/queries/blog/BlogContentBySlugQuery";
import { Metadata } from "next";
import { Navbar } from "@/stories/header/Navbar/Navbar";
import { WYSIWYGContent } from "@/components/ui/WYSIWYGContent";

// TODO: Run codegen to generate BlogContentBySlugQuery type
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
        {featuredImage && (
          <div className="w-full max-h-96 overflow-hidden mb-8">
            <img src={featuredImage} alt="Featured" className="w-full object-cover max-h-96" />
          </div>
        )}
        <div className="max-w-2xl mx-auto px-4 md:px-8 py-8">
          {contentBlock && <WYSIWYGContent html={contentBlock} />}
        </div>
      </main>
    </>
  );
}
