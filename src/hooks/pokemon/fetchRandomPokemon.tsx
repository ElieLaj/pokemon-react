import { useState, useEffect } from 'react';
import { Pokemon } from '../../models/pokemon';
import { set } from 'express/lib/application';

const useFetchRandomPokemon = (pkmNumber: number = 1) => {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchRandomPokemon = async () => {
            const totalReFetch = Math.ceil(pkmNumber / 6);
            const _pokemons: Pokemon[] = [];
            for (let i = 0; i < totalReFetch; i++ ){
                try {
                    const response = await fetch(`https://pokebuildapi.fr/api/v1/random/team`);
                    if (!response.ok) {
                        throw new Error(`Erreur HTTP ! statut : ${response.status}`);
                    }
                    const data = await response.json();

                    while (_pokemons?.length < pkmNumber && data.length > 0) {
                        const pokemonInstances = new Pokemon(data[0]);
                        if (pokemonInstances) {
                            _pokemons.push(pokemonInstances);
                            setPokemons((prev) => [...prev, pokemonInstances]);
                        }
                        data.shift();
                    }

                } catch (err) {
                    setError(err as Error);
                } finally {
                    setLoading(false);
                }
        }
        };

        fetchRandomPokemon();
    }, []);

    return { pokemons, loading, error };
};

export default useFetchRandomPokemon;
