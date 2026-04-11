import "./Button.css";

type ButtonTypes = "primary" | "secondary" | "tertiary";

type ButtonProps = {
  text?: string;
  type?: ButtonTypes;
  icon?: string;
  onPress: () => void;
};

export function Button({ text="", type="tertiary", icon="", onPress }: ButtonProps) {
  return (
    <button onClick={onPress} className="button" type="button">
      <span className={`button__inner button__inner--${type}`}>
      {icon && <span className={`icon--${icon} button__icon`}></span>}
      {text && <span>{text}</span>}
      </span>
    </button>
  );
}
