import { draftMode } from "next/headers";
import { Inter } from "next/font/google";

// import "@/app/globals.css";
import "@/app/globals.scss";

// import Navigation from "@/components/Globals/Navigation/Navigation";
import { PreviewNotice } from "@/components/Globals/PreviewNotice/PreviewNotice";
import { Header } from "@/stories/header/Header";
import { PageContent } from "@/stories/layouts/page-content/PageContent";
import { SidePanel } from "@/stories/layouts/side-panel/SidePanel";
import { ListContainer } from "@/stories/core/list-container/ListContainer";
import ScrollUpButton from "@/stories/core/scroll-up-button/ScrollUpButton";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isEnabled } = await draftMode();

  return (
    <html lang="en">
      {/* <Navigation /> */}
      <body className="page-layout">
        <Header />
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
