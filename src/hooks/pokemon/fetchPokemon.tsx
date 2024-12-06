import { useState, useEffect } from 'react';
import { Pokemon } from '../../models/pokemon';

const useFetchPokemon = (pokemonId: string) => {
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const response = await fetch(`https://pokebuildapi.fr/api/v1/pokemon/${pokemonId}`);
                if (!response.ok) {
                    throw new Error(`Erreur HTTP ! statut : ${response.status}`);
                }
                const data = await response.json();

                const pokemonInstance = new Pokemon(data);
                setPokemon(pokemonInstance);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchPokemon();
    }, [pokemonId]);

    return { pokemon, loading, error };
};

export default useFetchPokemon;
