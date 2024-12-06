import { Pokemon, PokemonDTO } from "../models/pokemon";

export const fetchRandomPokemon = async () => {

    const response = await fetch(`https://pokebuildapi.fr/api/v1/random/team`);
    const data = await response.json();

    const pokemons = data.map((pokemon: PokemonDTO) => new Pokemon(pokemon));
    
    return pokemons[0];
};

export const fetchRandomPokemonsType = async (pkmNumber: number, type: string) => {

    const response = await fetch(`https://pokebuildapi.fr/api/v1/pokemon/type/${type}`);
    const data = await response.json();
    const _pokemons = data.map((pokemon: PokemonDTO) => new Pokemon(pokemon));

    const pokemons: Pokemon[] = [];

    for (let i = 0; i < pkmNumber; i++) {
        const randomIndex = Math.floor(Math.random() * _pokemons.length);
        pokemons.push(_pokemons[randomIndex]);
        _pokemons.splice(randomIndex, 1);
    }
    
    return pokemons;
};

export const fetchPokemons = async () => {

    const response = await fetch(`https://pokebuildapi.fr/api/v1/pokemon`);
    const data = await response.json();

    const pokemons = data.map((pokemon: PokemonDTO) => new Pokemon(pokemon));
    
    return pokemons;
};

export const fetchPokemonByType = async (type: string) => {
    const response = await fetch(`https://pokebuildapi.fr/api/v1/type/${type}`);
    const data = await response.json();

    const pokemons = data.map((pokemon: PokemonDTO) => new Pokemon(pokemon));
    
    return pokemons;
};