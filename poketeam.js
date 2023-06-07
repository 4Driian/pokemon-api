const axios = require('axios');

axios.get('https://pokeapi.co/api/v2/pokemon?limit=1000')
  .then(response => {
    const pokemons = response.data.results;
    const team = getRandomPokemon(pokemons, 6);
    console.log('Equipo de Pokémon:');
    team.forEach(pokemon => {
      console.log(`Nombre: ${pokemon.name} - Número: ${getPokemonNumber(pokemon.url)}`);
    });
  })
  .catch(error => {
    console.log('Error al obtener los Pokémon:', error);
  });

function getRandomPokemon(pokemons, count) {
  const shuffled = pokemons.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function getPokemonNumber(url) {
  const regex = /\/(\d+)\/$/;
  const match = url.match(regex);
  return match ? match[1] : 'Desconocido';
}