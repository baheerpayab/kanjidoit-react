import "./avatar.css";

export function Avatar({text, size = "L", color = "accent6"}:{text: string, size?: string, color?: string}) {
  return (
    <div className={`avatar avatar--${size} avatar--${color}`}>
      <span>{text}</span>
    </div>
  )
}

