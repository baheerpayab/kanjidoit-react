export type Kanji = {
    kanji: string,
    meaning: string,
    radicals: string[],
    readings: {
      onyomi: string[],
      kunyomi: string[]
    }
    mnemonic: string,
    words: Word[]
}

type Word = {
  word: string,
  meaning: string,
  pronunciation: string
}
