import "../styles/style.css";
const URL = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";
async function getData(URL) {
  try {
    const response = await fetch(URL);
    if (response.status < 200 || response.status > 299) {
      console.log(response.status);
      throw error(response);
    } else {
      const data = await response.json();
      let allPokemon = data.results;

      const pokemon = document.getElementById("pokemon-search").value;
      console.log(allPokemon);
      const specificPokemon = allPokemon.filter((e) => e.name === pokemon);

      document.getElementById("api-response").textContent =
        data.results[0].name;
      `<div class = 'card>
          <h2 class = "names">${data.results[0].name}</h2>
          <img src = "${data.results[0].url}' alt = "" />
          </div>`;
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
DOMSelectors.button.addEventListener("click", getData(URL));
