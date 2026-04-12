import { useContext } from "react";
import { Toolbar } from "../Toolbar/Toolbar";
import "./dynamicPageHeader.css";
import { SubheaderContext } from "../DynamicPage/DynamicPageContexts";

export function DynamicPageHeader({
  heading,
  subheading,
  headerContent,
  actions,
}: {
  heading: string;
  subheading?: string;
  headerContent?: React.ReactElement;
  actions?: React.ReactElement[];
}) {
  const hasSubheaderProvider = useContext(SubheaderContext);

  return (
    <header
      className={`dynamic-page-header ${hasSubheaderProvider ? "no-border" : ""}`}
    >
      <div className="dynamic-page-header__title-container">
        <div className="dynamic-page-header__heading-container">
          <h2 className="dynamic-page-header__heading">{heading}</h2>
          <p className="dynamic-page-header__subheading">{subheading}</p>
        </div>
        {actions && <Toolbar items={actions}></Toolbar>}
      </div>

      {headerContent && (
        <div className="dynamic-page-header__header-content">
          {headerContent}
        </div>
      )}
    </header>
  );
}

