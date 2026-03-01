import { draftMode } from "next/headers";
import { Inter, Space_Grotesk, Rajdhani } from "next/font/google";

import "@/styles/globals.css";
// import "@/app/globals.scss";

import { Navbar } from "@/stories/header/Navbar/Navbar";
import { Footer } from "@/stories/layouts/Footer/Footer";
import { HelpBubble } from "@/components/HelpBubble/HelpBubble";
import { PreviewNotice } from "@/components/Globals/PreviewNotice/PreviewNotice";

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
