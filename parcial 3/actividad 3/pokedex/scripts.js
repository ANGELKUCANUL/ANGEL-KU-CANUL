document.addEventListener('DOMContentLoaded', () => {
    fetchPokemonData();
});

function fetchPokemonData() {
    const url = 'https://pokeapi.co/api/v2/pokemon/ditto';

    fetch(url)
        .then(res => res.json())
        .then(data => displayPokemon(data))
        .catch(error => console.error('Error fetching data:', error));
}

function displayPokemon(pokemon) {
    document.getElementById('pokemon-image').src = pokemon.sprites.front_default;
    document.getElementById('description-text').innerText = `${pokemon.name} - ${pokemon.base_experience} XP`;
    document.getElementById('hp').innerText = pokemon.stats[0].base_stat;
    document.getElementById('attack').innerText = pokemon.stats[1].base_stat;
    document.getElementById('defense').innerText = pokemon.stats[2].base_stat;
    document.getElementById('special-attack').innerText = pokemon.stats[3].base_stat;
    document.getElementById('special-defense').innerText = pokemon.stats[4].base_stat;
    document.getElementById('speed').innerText = pokemon.stats[5].base_stat;
    document.getElementById('type').innerText = pokemon.types.map(type => type.type.name).join(', ');

    // Evolution line (for demonstration purposes, using the same image)
    document.getElementById('evo1').src = pokemon.sprites.front_default;
    document.getElementById('evo2').src = pokemon.sprites.front_default;
    document.getElementById('evo3').src = pokemon.sprites.front_default;
}
