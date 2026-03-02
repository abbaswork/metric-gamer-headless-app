import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  if (!process.env.WP_USER || !process.env.WP_APP_PASS) {
    return NextResponse.next();
  }

  const basicAuth = `${process.env.WP_USER}:${process.env.WP_APP_PASS}`;

  const pathnameWithoutTrailingSlash = request.nextUrl.pathname.replace(
    /\/$/,
    "",
  );

  // 1. Internal Path Redirects
  if (pathnameWithoutTrailingSlash.startsWith("/blog/")) {
    const newPath = pathnameWithoutTrailingSlash.replace("/blog/", "/ranking/");
    return NextResponse.redirect(new URL(newPath, request.url), 301);
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/wp-json/redirection/v1/redirect/?filterBy%5Burl-match%5D=plain&filterBy%5Burl%5D=${pathnameWithoutTrailingSlash}`,
    {
      headers: {
        Authorization: `Basic ${Buffer.from(basicAuth).toString("base64")}`,
        "Content-Type": "application/json",
      },
    },
  );

  let data: any = null;
  try {
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    }
  } catch (e) {
    console.error("Middleware fetch failed to parse JSON:", e);
  }

  if (data?.items?.length > 0) {
    const redirect = data.items.find(
      (item: any) => item.url === pathnameWithoutTrailingSlash,
    );

    if (!redirect) {
      return NextResponse.next();
    }

    const newUrl = new URL(
      redirect.action_data.url,
      process.env.NEXT_PUBLIC_BASE_URL,
    ).toString();

    return NextResponse.redirect(newUrl, {
      status: redirect.action_code === 301 ? 308 : 307,
    });
  }
}
