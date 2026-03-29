import { Toolbar } from "../Toolbar/toolbar";
import "./table.css";

export function Table<T extends Record<string, unknown>>({
  data,
  columns,
  mode,
  toolbar,
  selectionChange,
  getKey,
}: {
  data: T[];
  columns: (keyof T & string)[];
  mode?: string;
  toolbar?: React.ReactElement<typeof Toolbar>;
  selectionChange?: (row: T) => void;
  getKey: (row: T) => React.Key;
}) {
  return (
    <div className="table">
      <div className="table__toolbar">{toolbar}</div>
      <table className="table__table">
        <thead>
          <tr className="table__row">
            {columns.map((column) => (
              <th key={column} className="table__header-cell">
                {column[0].toUpperCase() + column.slice(1)}
              </th>
            ))}
            {mode == "Navigation" && (
              <th className="table__header-cell table__header-cell--nav"></th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr
              key={getKey(row)}
              onClick={(e) => {
                if (mode) {
                  const currentSelection = document.querySelector(
                    ".table__row--selected",
                  );
                  if (currentSelection !== e.currentTarget) {
                    currentSelection?.classList.remove("table__row--selected");
                    e.currentTarget.classList.add("table__row--selected");
                    if (selectionChange) selectionChange(row);
                  }
                }
              }}
              className={`table__row ${mode == "Navigation" ? "table__row--clickable" : ""}`}
            >
              {columns.map((column) => (
                <td key={column} className="table__cell">
                  {row[column] as React.ReactNode}
                </td>
              ))}
              {mode == "Navigation" && (
                <td className="table__cell">
                  <span className="icon--nav table__icon"></span>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
