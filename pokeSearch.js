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
      const pokemon = response.data;
      console.log(`Nombre: ${pokemon.name}`);
      console.log(`Tipo: ${pokemon.types.map(type => type.type.name).join(', ')}`);
      console.log(`Altura: ${pokemon.height}cm`);
      console.log(`Peso: ${pokemon.weight}kg`);
      rl.close();
    })
    .catch(error => {
      console.log('No se encontró el Pokémon:', error.response.data);
      rl.close();
    });
});