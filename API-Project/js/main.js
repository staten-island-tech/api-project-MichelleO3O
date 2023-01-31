import "../styles/style.css";
const URL = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";
function getPokemon(event) {
  event.preventDefault();
  const inputField = document.getElementById("pokemon-search");
  const pokemon = inputField.value;
  console.log(pokemon);
  getData(URL, pokemon);
}

const typeColors = {
  normal: "A8A77A",
  fire: "EE8130",
  water: "6390F0",
  electric: "F7D02C",
  grass: "7AC74C",
  ice: "96D9D6",
  fighting: "E27773",
  poison: "D48CD1",
  ground: "E2BF65",
  flying: "A98FF3",
  psychic: "F95587",
  bug: "A6B91A",
  rock: "B6A136",
  ghost: "A590BB",
  dragon: "C7B6FC",
  dark: "B29885",
  steel: "B7B7CE",
  fairy: "D685AD",
};

async function getData(URL, pokemon) {
  document.getElementById("results").innerHTML = "";
  document.getElementById("error").innerHTML = "";
  try {
    const response = await fetch(URL);
    console.log(response.status);
    const data = await response.json();
    console.log(data);
    if (response.status < 200 || response.status > 299) {
      console.log(response.status);
      throw new Error(response);
    } else {
      console.log(data);
      let allPokemon = data.results;

      const specificPokemon = allPokemon.filter((e) =>
        e.name.includes(pokemon)
      );
      if (specificPokemon.length === 0) {
        throw new Error("no pokémon");
      }
      const resultsContainer = document.getElementById("results");
      let i = 0;
      specificPokemon.forEach(async (element) => {
        const response = await fetch(element.url);
        const pokemonData = await response.json();
        const pokemonType = pokemonData.types[0].type.name;
        console.log(pokemonType);

        const sprite = pokemonData.sprites.front_default;
        const pokeID = i;
        resultsContainer.insertAdjacentHTML(
          `beforeend`,
          `
          <div id="${pokeID}" class="cards">
          <h2>${element.name}</h2>
          <img src="${sprite}" alt="${element.name}">
          </div>
          `
        );
        // const createdCard = document.querySelector(`#${pokeID}`);
        const createdCard = document.getElementById(pokeID);
        createdCard.style.backgroundColor = "#" + typeColors[pokemonType];
        // styles.background = type[typeColors];
        i++;
      });
      console.log(specificPokemon);
    }
  } catch (error) {
    console.log(error);
    document.getElementById("error").textContent = "no pokémon found";
  }
}

const DOMSelectors = {
  button: document.getElementById("btn"),
};

document.getElementById("search-form").addEventListener("submit", getPokemon);
// DOMSelectors.button.addEventListener("click", getData(URL));
// document.getElementById("search-form").addEventListener("submit");
