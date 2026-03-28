import "./flexibleColumnLayout.css";

export function FlexibleColumnLayout({
  masterColumnPage,
  detailColumnPage,
}: {
  masterColumnPage: React.ReactElement;
  detailColumnPage: React.ReactElement;
}) {
  return (
    <div className="fcl">
      <div className="fcl__master">{masterColumnPage}</div>
      <div className="splitter"></div>
      <div className="fcl__detail">{detailColumnPage}</div>
    </div>
  );
}
