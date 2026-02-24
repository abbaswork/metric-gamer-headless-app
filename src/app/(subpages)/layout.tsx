import { PageContent } from "@/stories/layouts/page-content/PageContent";
import ScrollUpButton from "@/stories/core/scroll-up-button/ScrollUpButton";

export default function SubpagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PageContent>{children}</PageContent>
      <ScrollUpButton />
    </>
  );
}
