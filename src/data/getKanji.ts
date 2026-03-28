export async function getKanji() {

  const rawResponse = await fetch("./data/kanji.json");
  return await rawResponse.json();

}

