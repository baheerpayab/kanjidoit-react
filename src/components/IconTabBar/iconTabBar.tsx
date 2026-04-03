import { useContext, useState } from "react";
import "./iconTabBar.css";
import { SubheaderContext } from "../DynamicPage/dynamicPageContexts";

type IconTab = {
  value: string,
  text: string;
  content: React.ReactNode;
};

export function IconTabBar({ id, tabs }: { id: string, tabs: IconTab[] }) {
  const [selectedTab, setSelectedTab] = useState(tabs[0].value);
  
  const isSubheaderProvider = useContext(SubheaderContext);

  return (
    <div id={id} className={`icon-tab-bar`}>
      <nav className={`icon-tab-bar__nav-bar`}>
        {tabs.map((tab) => (
          <div
            className={`icon-tab-bar__tab ${selectedTab === tab.value ? "icon-tab-bar__tab--selected" : ""}`}
            onClick={() => setSelectedTab(tab.value)}
          >
            {tab.text}
          </div>
        ))}
      </nav>
      <div className={`icon-tab-bar__content ${isSubheaderProvider ? "responsive-padding" : ""}`}>
        {tabs.find((tab) => tab.value === selectedTab)?.content}
      </div>
    </div>
  );
}
