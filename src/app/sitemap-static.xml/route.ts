import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL || "https://www.metricgamer.com").replace(/\/$/, "");
  const now = new Date().toISOString();

  const pages = [
    "",
    "/about",
    "/privacy-policy",
    "/metrics",
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages
    .map(
      (page) => `
    <url>
      <loc>${baseUrl}${page.endsWith("/") ? page : page + "/"}</loc>
      <lastmod>${now}</lastmod>
      <changefreq>daily</changefreq>
      <priority>${page === "" ? "1.0" : "0.8"}</priority>
    </url>`,
    )
    .join("")}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
