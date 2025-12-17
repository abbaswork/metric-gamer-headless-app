import { draftMode } from "next/headers";
import { Inter, Space_Grotesk, Rajdhani } from "next/font/google";

import "@/styles/globals.css";
// import "@/app/globals.scss";

import Navigation from "@/components/Globals/Navigation/Navigation";
import { PreviewNotice } from "@/components/Globals/PreviewNotice/PreviewNotice";
import { PageContent } from "@/stories/layouts/page-content/PageContent";
import { SidePanel } from "@/stories/layouts/side-panel/SidePanel";
import { ListContainer } from "@/stories/core/list-container/ListContainer";
import ScrollUpButton from "@/stories/core/scroll-up-button/ScrollUpButton";

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
       <Navigation />
        {isEnabled && <PreviewNotice />}
        <PageContent>{children}</PageContent>
        <SidePanel>
          <ListContainer title="Sidebar">
            <>
              <li>New Blogs Coming Soon</li>
            </>
          </ListContainer>
        </SidePanel>
        <ScrollUpButton />
      </body>
    </html>
  );
}
