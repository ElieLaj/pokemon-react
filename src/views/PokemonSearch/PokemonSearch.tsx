import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ShowPokemon from '../../components/pokemon/ShowPokemon/ShowPokemon';
import useFetchPokemons from '../../hooks/pokemon/fetchPokemons';
import { Pokemon } from '../../models/pokemon';

import { fetchPokemons } from '../../repository/PokemonRepository';
import { set } from 'express/lib/application';
const PokemonSearch: React.FC = () => {
    const { searchName } = useParams<{ searchName: string }>();

    const [pokemons, setPokemons] = useState<Pokemon[]>([]);

    useEffect(() => {
        if (searchName) {
            fetchPokemon();
        }
    }, [searchName]);

    const fetchPokemon = async () => {
        if (!searchName) return;

        setPokemons([]);

        const allPokemons = await fetchPokemons();
        const filteredPokemons = allPokemons.filter((pokemon: Pokemon) =>
            pokemon.name.toLowerCase().includes(searchName.toLowerCase())
        );

        setPokemons(filteredPokemons);

    }

    return (
        <div className="pokemon-generation">
            {pokemons.length === 0 ? (
                <p className="loading">Recherche de: {searchName}...</p>
            ) : (
                <div className="generation-container">
                    <h2 className="generation-title">Résultat pour: {searchName}</h2>
                    <div className="pokemon-list">
                        {pokemons?.map((pokemon: Pokemon) => (
                            <div className="pokemon-card" key={pokemon.id}>
                                <ShowPokemon pokemon={pokemon} allowRedirect={true}/>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PokemonSearch;