import { useContext } from "react";
import { Toolbar } from "../Toolbar/Toolbar";
import "./objectPageHeader.css";
import { IconTabHeaderProvider } from "../ObjectPage/ObjectPageContexts";
import { IconTabHeader, type TabProps } from "../IconTabHeader/IconTabHeader";

export function ObjectPageHeader({
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
  const sectionNames = useContext(IconTabHeaderProvider);

  const shouldRenderHeader = sectionNames.length > 1;

  const tabs: TabProps[] = [];

  sectionNames.forEach((element) => {
    tabs.push({
      value: element,
      text: element,
      onClick: () => {
        const sectionDom = document.getElementById(`obs_${element}`);
        sectionDom?.scrollIntoView();
      },
    });
  });

  return (<>
    <header
      className={`object-page-header ${shouldRenderHeader ? "no-border" : ""}`}
    >
      <div className="object-page-header__title-container">
        <div className="object-page-header__heading-container">
          <h2 className="object-page-header__heading">{heading}</h2>
          <p className="object-page-header__subheading">{subheading}</p>
        </div>
        {actions && <Toolbar items={actions}></Toolbar>}
      </div>

      {headerContent && (
        <div className="object-page-header__header-content">
          {headerContent}
        </div>
      )}
      
    </header>
    {shouldRenderHeader && <IconTabHeader tabs={tabs}></IconTabHeader>}
    </>
  );
}
