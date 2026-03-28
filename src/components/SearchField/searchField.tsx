import "./searchField.css";

export function SearchField({ onChange }: { onChange: (input: string) => void }) {
  return (
    <div className="search-input-field input-field">
      <input
        className="input-field__input"
        placeholder="Search"
        onChange={(e) => {
          console.log("pressed");
          onChange(e.currentTarget.value);
        }}
      ></input>
      <span className="input-field__icon icon--search"></span>
    </div>
  );
}
