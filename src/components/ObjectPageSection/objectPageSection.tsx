import { Toolbar } from "../Toolbar/toolbar"
import "./objectPageSection.css"

export function ObjectPageSection({
  heading,
  actions,
  content,
}:{
  heading: string,
  actions?: React.ReactElement[],
  content: React.ReactNode
}) {
  return (
    <section className="object-page-section">
      <Toolbar title={heading} items={actions} className="object-page-section__toolbar"></Toolbar>
      <div className="object-page-section__body">
        {content}
      </div>
    </section>
  )
}
