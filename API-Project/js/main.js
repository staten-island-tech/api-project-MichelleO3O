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
      document.getElementById("api-response").textContent =
        data.data[0].entry[0].title;
      `<div class = 'card>
          <h2 class = "title">${title}</h2>
          <img src = "${Image}' alt = "" />
          </div>`;
      console.log(data.data[0].entry[0].title);
    }
  } catch (error) {
    console.log(error);
    document.getElementById("error").textContent =
      "Sorry I couldn't find that one";
  }
}
getData(URL);
