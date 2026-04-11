import type { DynamicPageHeader } from "../DynamicPageHeader/DynamicPageHeader";
import "./dynamicPage.css";
import { SubheaderContext } from "./DynamicPageContexts";

export function DynamicPage({
  content,
  dynamicPageHeader,
  subheaderProvider,
}: {
  content: React.ReactNode;
  dynamicPageHeader: React.ReactElement<typeof DynamicPageHeader>;
  subheaderProvider?: string;
}) {

  let subheader;
  if (subheaderProvider) {
    subheader = document.getElementById(subheaderProvider);
  }

  return (
    <div className="dynamic-page">
      <SubheaderContext value={!!subheader}>
        {dynamicPageHeader}
        <main
          className={`dynamic-page__content ${subheader ? "no-padding" : ""}`}
        >
          {content}
        </main>
      </SubheaderContext>
    </div>
  );
}
