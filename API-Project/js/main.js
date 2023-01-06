const URL = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";

async function getData(URL) {
  const response = await fetch(URL);
  console.log(response);
}
getData(URL);
const DOMSelector = {
  search: document.getElementById("search-buttons"),
};
