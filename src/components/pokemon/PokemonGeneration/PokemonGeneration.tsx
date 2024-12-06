import React, { useEffect, useState } from 'react';
import useFetchPokemonGeneration from '../../../hooks/pokemon/fetchPokemonGeneration';
import ShowPokemon from '../ShowPokemon/ShowPokemon';

import './PokemonGeneration.scss';

const PokemonGeneration = ({ generation }: { generation: number }) => {
    const { pokemons, loading, error } = useFetchPokemonGeneration(generation);

    return (
        <div className="pokemon-generation">
            {loading ? (
                <p className="loading">Chargement de la génération {generation}...</p>
            ) : (
                <div className="generation-container">
                    <h2 className="generation-title">Génération {generation}</h2>
                    <div className="pokemon-list">
                        {pokemons?.map((pokemon) => (
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

export default PokemonGeneration;
