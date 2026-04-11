import { Toolbar } from "../Toolbar/Toolbar";
import "./objectPageSection.css";

export type ObjectPageSectionProps = {
  heading: string;
  actions?: React.ReactElement[];
  content: React.ReactNode;
};

export function ObjectPageSection({
  heading,
  actions,
  content,
}: ObjectPageSectionProps) {
  return (
    <section id={`obs_${heading}`} className="object-page-section">
      <Toolbar
        title={heading}
        items={actions}
        className="object-page-section__toolbar"
      ></Toolbar>
      <div className="object-page-section__body">{content}</div>
    </section>
  );
}
