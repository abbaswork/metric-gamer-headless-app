import { draftMode } from "next/headers";
import { Inter, Space_Grotesk, Rajdhani } from "next/font/google";

import "@/styles/globals.css";
// import "@/app/globals.scss";

import { Navbar } from "@/stories/header/Navbar/Navbar";
import { Footer } from "@/stories/layouts/Footer/Footer";
import { HelpBubble } from "@/components/HelpBubble/HelpBubble";
import { PreviewNotice } from "@/components/Globals/PreviewNotice/PreviewNotice";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Metric Gamer | Expert Game Performance Analysis & Metrics",
  description: "Discover the best games based on deep performance metrics, expert analysis, and community rankings. Find your next favorite game on Metric Gamer.",
  metadataBase: new URL("https://metricgamer.com"),
};

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-heading" });
const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-mono"
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isEnabled } = await draftMode();

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="http://ec2-18-213-34-154.compute-1.amazonaws.com" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5979443933088571"
          crossOrigin="anonymous"></script>
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${rajdhani.variable} antialiased font-sans bg-background text-foreground`}>
        <Navbar />
        {isEnabled && <PreviewNotice />}
        {children}
        <HelpBubble />
        <Footer />
      </body>
    </html>
  );
}
