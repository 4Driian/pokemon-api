const axios = require('axios');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function mostrarMenu() {
  console.log('1. Buscar Pokémon por nombre');
  console.log('2. Listar tipos de Pokémon');
  console.log('3. Salir');
  rl.question('Selecciona una opción: ', (opcion) => {
    switch (opcion) {
      case '1':
        buscarPokemonPorNombre();
        break;
      case '2':
        listarTiposPokemon();
        break;
      case '3':
        console.log('¡Hasta luego!');
        rl.close();
        break;
      default:
        console.log('Opción inválida. Por favor, selecciona una opción válida.');
        mostrarMenu();
        break;
    }
  });
}

function buscarPokemonPorNombre() {
  rl.question('Ingresa el nombre de un Pokémon: ', (pokemonName) => {
    const formattedPokemonName = pokemonName.toLowerCase();
    axios.get(`https://pokeapi.co/api/v2/pokemon/${formattedPokemonName}`)
      .then(response => {
        const pokemon = response.data;
        console.log(`Nombre: ${pokemon.name}`);
        console.log(`Tipo: ${pokemon.types.map(type => type.type.name).join(', ')}`);
        console.log(`Altura: ${pokemon.height}cm`);
        console.log(`Peso: ${pokemon.weight}kg`);
        mostrarMenu();
      })
      .catch(error => {
        console.log('No se encontró el Pokémon:', error.response.data);
        mostrarMenu();
      });
  });
}

function listarTiposPokemon() {
  axios.get('https://pokeapi.co/api/v2/type')
    .then(response => {
      const types = response.data.results;
      console.log('Tipos de Pokémon:');
      types.forEach(type => {
        console.log(type.name);
      });
      mostrarMenu();
    })
    .catch(error => {
      console.log('Error al obtener los tipos de Pokémon:', error);
      mostrarMenu();
    });
}

mostrarMenu();