class Kanji {
  id;
  kanji;
  meaning;
  onyomi;
  kunyomi;
  radicals;
  mneumonic;
  learned;

  constructor(kanji, meaning, radicals) {
    this.id = kanji;
    this.kanji = kanji;
    this.meaning = meaning;
    this.onyomi = [];
    this.kunyomi = [];
    this.radicals = radicals;
    this.mneumonic = "";
    this.learned = false;
  }
}

export { Kanji };
