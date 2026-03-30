import type React from "react";
import "./toolbar.css";
import "../Table/table.css";
import { Title } from "../Title/title";

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
      {title && <Title text={title} level="h5"></Title>}
      <span className="toolbar-spacer"></span>
      {items?.map((item) => item)}
    </div>
  );
}
