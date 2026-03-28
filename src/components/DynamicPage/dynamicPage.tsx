import type { DynamicPageHeader } from "../DynamicPageHeader/dynamicPageHeader";
import "./dynamicPage.css"

export function DynamicPage({
  content,
  dynamicPageHeader,
}: {
  content: React.ReactNode,
  dynamicPageHeader: React.ReactElement<typeof DynamicPageHeader>
}) {
  return (
    <div className="dynamic-page">
      {dynamicPageHeader}
      <main className="dynamic-page__content">
        {content}
      </main>
    </div>
  );
}

