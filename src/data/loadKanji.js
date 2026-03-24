import { Kanji } from "./models/kanji.js";

async function loadKanji() {
  const response = await fetch('./data/processed/kanji.json');
  const result = await response.json();
  const kanji = result.map((x) => new Kanji(x.kanji, x.meaning, x.radicals));
  return kanji;
}

export { loadKanji }

