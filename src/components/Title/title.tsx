import "./title.css"

type HeadingLevels = "h1" | "h2" | "h3" | "h4" | "h5"

type Props = {
  text: string,
  level: HeadingLevels,
}

export function Title({text, level}:Props) {
  const Tag = level;

  return (<Tag>{text}</Tag>)

}
