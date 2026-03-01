import { NextResponse } from "next/server";

export async function GET() {
  const xsl = `<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
	<xsl:template match="/">
		<html xmlns="http://www.w3.org/1999/xhtml">
			<head>
				<title>XML Sitemap</title>
				<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
				<style type="text/css">
					body {
						font-family: Helvetica, Arial, sans-serif;
						font-size: 13px;
						color: #545353;
						background-color: #f7f7f7;
						margin: 0;
					}
					table {
						border: none;
						border-collapse: collapse;
						width: 100%;
						margin-top: 10px;
					}
					#sitemap tr:nth-child(odd) td {
						background-color: #eee !important;
					}
					#sitemap tbody tr:hover td {
						background-color: #ccc;
					}
					#sitemap tbody tr:hover td, #sitemap tbody tr:hover td a {
						color: #000;
					}
					#content {
						margin: 0 auto;
						width: 1000px;
						padding: 40px 20px;
						background-color: #fff;
						box-shadow: 0 0 20px rgba(0,0,0,0.05);
						min-height: 100vh;
					}
					.expl {
						margin: 18px 3px;
						line-height: 1.2em;
					}
					.expl a {
						color: #da3114;
						font-weight: 600;
					}
					.expl a:visited {
						color: #da3114;
					}
					a {
						color: #000;
						text-decoration: none;
					}
					a:visited {
						color: #777;
					}
					a:hover {
						text-decoration: underline;
					}
					td {
						font-size:11px;
						padding: 10px 5px;
					}
					th {
						text-align:left;
						padding: 10px 5px;
						font-size:11px;
					}
					thead th {
						border-bottom: 1px solid #000;
					}
					h1 {
						color: #000;
						font-size: 24px;
						margin: 0;
					}
				</style>
			</head>
			<body>
				<div id="content">
					<h1>XML Sitemap</h1>
					<p class="expl">
						This is an XML Sitemap, meant for consumption by search engines.<br/>
						You can find more information about XML sitemaps on <a href="https://sitemaps.org" target="_blank" rel="noopener">sitemaps.org</a>.
					</p>
					<xsl:if test="sitemap:sitemapindex">
						<p class="expl">
							This XML Sitemap Index file contains <xsl:value-of select="count(sitemap:sitemapindex/sitemap:sitemap)"/> sitemaps.
						</p>
						<table id="sitemap" cellpadding="3">
							<thead>
								<tr>
									<th width="75%">Sitemap</th>
									<th width="25%">Last Modified</th>
								</tr>
							</thead>
							<tbody>
								<xsl:for-each select="sitemap:sitemapindex/sitemap:sitemap">
									<xsl:variable name="sitemapURL">
										<xsl:value-of select="sitemap:loc"/>
									</xsl:variable>
									<tr>
										<td>
											<a href="{$sitemapURL}"><xsl:value-of select="sitemap:loc"/></a>
										</td>
										<td>
											<xsl:value-of select="concat(substring(sitemap:lastmod,0,11),concat(' ', substring(sitemap:lastmod,12,5)))"/>
										</td>
									</tr>
								</xsl:for-each>
							</tbody>
						</table>
					</xsl:if>
					<xsl:if test="sitemap:urlset">
						<p class="expl">
							This XML Sitemap contains <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/> URLs.
						</p>
						<table id="sitemap" cellpadding="3">
							<thead>
								<tr>
									<th width="70%">URL</th>
									<th width="5%">Priority</th>
									<th width="10%">Change Freq.</th>
									<th width="15%">Last Change</th>
								</tr>
							</thead>
							<tbody>
								<xsl:for-each select="sitemap:urlset/sitemap:url">
									<xsl:variable name="itemURL">
										<xsl:value-of select="sitemap:loc"/>
									</xsl:variable>
									<tr>
										<td>
											<a href="{$itemURL}"><xsl:value-of select="sitemap:loc"/></a>
										</td>
										<td>
											<xsl:value-of select="sitemap:priority"/>
										</td>
										<td>
											<xsl:value-of select="sitemap:changefreq"/>
										</td>
										<td>
											<xsl:value-of select="concat(substring(sitemap:lastmod,0,11),concat(' ', substring(sitemap:lastmod,12,5)))"/>
										</td>
									</tr>
								</xsl:for-each>
							</tbody>
						</table>
					</xsl:if>
				</div>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>`;

  return new NextResponse(xsl, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
