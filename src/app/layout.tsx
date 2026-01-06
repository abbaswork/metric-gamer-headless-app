import { draftMode } from "next/headers";
import { Inter, Space_Grotesk, Rajdhani } from "next/font/google";

import "@/styles/globals.css";
// import "@/app/globals.scss";

import { Navbar } from "@/stories/header/Navbar/Navbar";
import { PreviewNotice } from "@/components/Globals/PreviewNotice/PreviewNotice";
// import { PageContent } from "@/stories/layouts/page-content/PageContent";
// import { SidePanel } from "@/stories/layouts/side-panel/SidePanel";
// import { ListContainer } from "@/stories/core/list-container/ListContainer";
// import ScrollUpButton from "@/stories/core/scroll-up-button/ScrollUpButton";

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
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${rajdhani.variable} antialiased bg-background text-foreground`}>
       <Navbar />
        {isEnabled && <PreviewNotice />}
        {children}
      </body>
    </html>
  );
}
