export async function getRadicals() {
  const rawResponse = await fetch("./data/radicals.json");
  return await rawResponse.json();
}
