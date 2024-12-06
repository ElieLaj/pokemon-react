import React, { useEffect, useState } from 'react';
import useFetchPokemonType from '../../hooks/pokemon/fetchPokemonByType';
import ShowPokemon from '../../components/pokemon/ShowPokemon/ShowPokemon';

import './PokemonByType.scss';
import { useParams } from 'react-router-dom';

const PokemonByType = () => {
    const { type } = useParams();
    
    if (!type) return <h1>Type introuvable</h1>;

    const { pokemons, loading, error } = useFetchPokemonType(type);
    

    return (
        <div className="pokemon-generation">
            {loading ? (
                <p className="loading">Chargement des pokémons de types {type}...</p>
            ) : (
                <div className="generation-container">
                    <h2 className="generation-title">Pokémon de type: {type}</h2>
                    <div className="pokemon-list">
                        {pokemons?.map((pokemon) => (
                            <div className="pokemon-card" key={pokemon.id}>
                                <ShowPokemon pokemon={pokemon} allowRedirect={false}/>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PokemonByType;
