import "./flexibleColumnLayout.css";

export function FlexibleColumnLayout({
  masterColumn,
  detailColumn,
  showDetailColumn,
}: {
  masterColumn: React.ReactElement;
  detailColumn: React.ReactElement;
  showDetailColumn: boolean;
}) {
  return (
    <div className="fcl">
      <div className="fcl__master">{masterColumn}</div>
      {showDetailColumn && (
        <>
          <div className="splitter"></div>
          <div className="fcl__detail">{detailColumn}</div>
        </>
      )}
    </div>
  );
}
