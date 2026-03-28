import type { DynamicPageHeader } from "../DynamicPageHeader/dynamicPageHeader";
import type { ObjectPageSection } from "../ObjectPageSection/objectPageSection";
import "./objectPage.css"

export function ObjectPage({
  content,
  dynamicPageHeader,
}: {
  content: React.ReactElement<typeof ObjectPageSection>[],
  dynamicPageHeader: React.ReactElement<typeof DynamicPageHeader>
}) {
  return (
    <div className="dynamic-page">
      {dynamicPageHeader}
      <main className="dynamic-page__content">
        {content?.map((section) => section)}
      </main>
    </div>
  );
}

