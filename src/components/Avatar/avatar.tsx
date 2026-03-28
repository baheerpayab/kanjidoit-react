import "./avatar.css";

export function Avatar({text}:{text: string}) {
  return (
    <div className="avatar">
      <span>{text.slice(0, 2)}</span>
    </div>
  )
}
