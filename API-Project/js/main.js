import "../styles/style.css";
const URL = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";
function getPokemon(event) {
  event.preventDefault();
  const inputField = document.getElementById("pokemon-search");
  const pokemon = inputField.value;
  console.log(pokemon);
  getData(URL, pokemon);
}
async function getData(URL, pokemon) {
  document.getElementById("results").innerHTML = "";
  try {
    const response = await fetch(URL);
    if (response.status < 200 || response.status > 299) {
      console.log(response.status);
      throw error(response);
    } else {
      const data = await response.json();
      console.log(data);
      let allPokemon = data.results;

      const specificPokemon = allPokemon.filter((e) =>
        e.name.includes(pokemon)
      );
      const resultsContainer = document.getElementById("results");
      specificPokemon.forEach(async (element) => {
        const response = await fetch(element.url);
        const pokemonData = await response.json();
        const sprite = pokemonData.sprites.front_default;
        resultsContainer.insertAdjacentHTML(
          `beforeend`,
          `
          <div class="cards">
          <h2>${element.name}</h2>
          <img src="${sprite}" alt="${element.name}">
          </div>
        `
        );
      });
      console.log(specificPokemon);
    }
  } catch (error) {
    console.log(error);
    document.getElementById("error").textContent =
      "Sorry I couldn't find that one";
  }
}
const DOMSelectors = {
  button: document.getElementById("btn"),
};
document.getElementById("search-form").addEventListener("submit", getPokemon);
// DOMSelectors.button.addEventListener("click", getData(URL));
// document.getElementById("search-form").addEventListener("submit");
