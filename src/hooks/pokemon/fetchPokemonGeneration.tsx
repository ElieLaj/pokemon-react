import { useState, useEffect } from 'react';
import { Pokemon } from '../../models/pokemon';

const useFetchPokemonGeneration = (pokemonGeneration: number) => {
    const [pokemons, setPokemons] = useState<Pokemon[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchPokemons = async () => {
            try {
                const response = await fetch(`https://pokebuildapi.fr/api/v1/pokemon/generation/${pokemonGeneration}`);
                if (!response.ok) {
                    throw new Error(`Erreur HTTP ! statut : ${response.status}`);
                }
                const data = await response.json();

                const pokemonInstances = data.map((pokemonData: any) => new Pokemon(pokemonData));
                setPokemons(pokemonInstances);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchPokemons();
    }, [pokemonGeneration]);

    return { pokemons, loading, error };
};

export default useFetchPokemonGeneration;
