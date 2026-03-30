import "./text.css";

type TextVariants = "primary" | "secondary";

type TextProps = {
  text: string,
  variant: TextVariants,
}

export function Text({text, variant} : TextProps){
  return (<span className={`text--${variant}`}>{text}</span>)
}
