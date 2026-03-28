import { Toolbar } from "../Toolbar/toolbar";
import "./dynamicPageHeader.css";

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
  return (
    <header className="dynamic-page-header">
      <div className="dynamic-page-header__title-container">
        <div className="dynamic-page-header__heading-container">
          <h2 className="dynamic-page-header__heading">{heading}</h2>
          <p className="dynamic-page-header__subheading">{subheading}</p>
        </div>
        {actions && <Toolbar items={actions}></Toolbar>}
      </div>
      <div className="dynamic-page-header__header-content">
        {headerContent}
      </div>
    </header>
  );
}
