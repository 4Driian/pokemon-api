const axios = require('axios');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Ingresa el nombre de un Pokémon: ', (pokemonName) => {
  const formattedPokemonName = pokemonName.toLowerCase();
  axios.get(`https://pokeapi.co/api/v2/pokemon/${formattedPokemonName}`)
    .then(response => {
      const moves = response.data.moves;
      console.log(`Movimientos de ${formattedPokemonName}:`);
      moves.forEach((move, index) => {
        console.log(`${index + 1}. ${move.move.name}`);
      });
      rl.close();
    })
    .catch(error => {
      console.log('No se encontró el Pokémon:', error.response.data);
      rl.close();
    });
});