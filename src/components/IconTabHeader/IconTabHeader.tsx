import { useState } from "react";
import "./iconTabHeader.css";

export type TabProps = {
  value: string;
  text: string;
  onClick: () => void;
};

export function IconTabHeader({ tabs }: { tabs: TabProps[] }) {
  const [selectedTab, setSelectedTab] = useState(tabs[0].value);

  return (
    <div className="icon-tab-header">
      <nav className="icon-tab-header__nav-bar">
        {tabs.map((tab) => (
          <div
            className={`icon-tab-header__tab ${selectedTab === tab.value ? "icon-tab-header__tab--selected" : ""}`}
            onClick={() => {
              tab.onClick();
              setSelectedTab(tab.value);
            }}
          >
            {tab.text}
          </div>
        ))}
      </nav>
    </div>
  );
}
