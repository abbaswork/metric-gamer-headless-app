import { NextResponse } from "next/server";
import { fetchGraphQL } from "@/utils/fetchGraphQL";
import { AllRankingsQuery } from "@/queries/ranking/AllRankingsQuery";
import { print } from "graphql/language/printer";

export async function GET() {
  const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL || "https://www.metricgamer.com").replace(/\/$/, "");
  const now = new Date().toISOString();

  try {
    const data = await fetchGraphQL(print(AllRankingsQuery), { first: 1000 });
    const rankings = data.rankings.nodes || [];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${rankings
    .map(
      (ranking: any) => `
    <url>
      <loc>${baseUrl}/ranking/${ranking.slug}/</loc>
      <lastmod>${now}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.7</priority>
    </url>`,
    )
    .join("")}
</urlset>`;

    return new NextResponse(xml, {
      headers: {
        "Content-Type": "application/xml",
      },
    });
  } catch (error) {
    console.error("Error generating rankings sitemap:", error);
    return new NextResponse("Error generating sitemap", { status: 500 });
  }
}
