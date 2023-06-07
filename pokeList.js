const axios = require('axios');

axios.get(`https://pokeapi.co/api/v2/pokemon?&limit=20`)
  .then(response => {
    const pokemon = response.data.results;
    pokemon.forEach(pokemon => {
      console.log(`Pokemon: ${pokemon.name}, Número: ${getPokemonNumber(pokemon.url)}`)
    });
  })
  .catch(error => {
    console.log('Error al buscar el pokemon', error);
  });

function getPokemonNumber(url) {
  const regex = /\/(\d+)\/$/;
  const match = url.match(regex);
  return match ? match[1] : 'Desconocido';
}