import "./button.css";

type ButtonTypes = "primary" | "secondary" | "tertiary";

type ButtonProps = {
  text: string;
  type: ButtonTypes;
  icon?: string;
};

export function Button({ text, type, icon="" }: ButtonProps) {
  return (
    <button className={`button button--${type}`} type="button">
      {icon ?? <span className={`icon--${icon}`}></span>}
      <span>{text}</span>
    </button>
  );
}
