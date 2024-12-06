import { useState, useEffect } from 'react';
import { Pokemon } from '../../models/pokemon';

const useFetchPokemons = () => {
    const [pokemons, setPokemons] = useState<Pokemon[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const response = await fetch(`https://pokebuildapi.fr/api/v1/pokemon`);
                if (!response.ok) {
                    throw new Error(`Erreur HTTP ! statut : ${response.status}`);
                }
                const data = await response.json();

                const pokemonInstances = data.map((pokemon: any) => new Pokemon(pokemon));

                setPokemons(pokemonInstances);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchPokemon();
    }, []);

    return { pokemons, loading, error };
};

export default useFetchPokemons;
