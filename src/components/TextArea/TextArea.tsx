import { useState } from "react";
import "./textArea.css";

type Props = {
  placeholder: string;
  characterLimit: number;
  showCharacterCount: boolean;
  rows: number;
};

export function TextArea({
  placeholder,
  characterLimit,
  showCharacterCount,
  rows,
}: Props) {
  const [charCount, setCharCount] = useState(characterLimit);

  return (
    <div className="text-area">
      <div className="text-area__text-area-wrapper">
        <textarea
          className="text-area__text-area"
          placeholder={placeholder}
          maxLength={characterLimit}
          rows={rows}
          onChange={(e) => {
            setCharCount(characterLimit - e.currentTarget.value.length);
          }}
        ></textarea>
      </div>
      {showCharacterCount && (
        <span className="character-count">
          {charCount} characters remaining
        </span>
      )}
    </div>
  );
}
