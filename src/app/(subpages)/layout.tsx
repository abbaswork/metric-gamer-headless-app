import { PageContent } from "@/stories/layouts/page-content/PageContent";
import { SidePanel } from "@/stories/layouts/side-panel/SidePanel";
import { ListContainer } from "@/stories/core/list-container/ListContainer";
import ScrollUpButton from "@/stories/core/scroll-up-button/ScrollUpButton";

export default function SubpagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PageContent>{children}</PageContent>
      <SidePanel>
        <ListContainer title="Sidebar">
          <>
            <li>New Blogs Coming Soon</li>
          </>
        </ListContainer>
      </SidePanel>
      <ScrollUpButton />
    </>
  );
}
