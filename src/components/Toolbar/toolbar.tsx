import type React from "react";
import "./toolbar.css";
import "../Table/table.css";

export function Toolbar({
  title,
  items,
  className,
}: {
  title?: string;
  items?: React.ReactElement[];
  className?: string;
}) {
  return (
    <div className={`toolbar ${className ?? ""}`}>
      {title && <h5>{title}</h5>}
      <span className="toolbar-spacer"></span>
      {items?.map((item) => item)}
    </div>
  );
}
