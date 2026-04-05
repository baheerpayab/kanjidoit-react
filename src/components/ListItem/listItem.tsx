import { Avatar } from "../Avatar/avatar";
import "./listItem.css";
import { Text } from "../Text/text";

type Props = {
  text: string;
  byline?: string;
  avatar?: React.ReactElement<typeof Avatar>;
  mode?: string;
};

export function StandardListItem({ text, byline, avatar, mode = "" }: Props) {
  return (
    <li className={`standard-list-item ${byline ? "standard-list-item--byline" : ""}`}>
      <div className="standard-list-item__info-container">
        {avatar}
        <div className="standard-list-item__text-container">
          <Text variant="primary" text={text}></Text>

          {byline && <Text variant="secondary" text={byline}></Text>}

        </div>
      </div>
      {mode && (
        <span className="icon--nav standard-list-item__icon"></span>
      )}
    </li>
  );
}
