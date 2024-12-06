import React, { useEffect, useState } from 'react';
import { Pokemon } from '../../../models/pokemon';
import useFetchTypes from '../../../hooks/type/fetchTypes';
import './SelectScreen.scss';
import ShowType from '../../type/ShowType/ShowType';

import { fetchRandomPokemonsType } from '../../../repository/PokemonRepository';
import { PokemonType } from '../../../models/type';

interface SelectScreenProps {
    onSelect: (pokemon: Pokemon) => void;
}

const SelectScreen: React.FC<SelectScreenProps> = ({ onSelect }) => {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const { types, loading: loadingTypes, error: errorTypes } = useFetchTypes();
    const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
    const [selectedType, setSelectedType] = useState<PokemonType | null>(null);

    useEffect(() => {
        if (!selectedType) return;

        const fetchRandomPokemon = async () => {
            try {
                setLoading(true);
                const pokemons = await fetchRandomPokemonsType(10, selectedType?.name);
                setPokemons(pokemons);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchRandomPokemon();
    }, [selectedType]);

    const handleSelect = (pokemon: Pokemon) => {
        setSelectedPokemon(pokemon);
        onSelect(pokemon);
    };

    if (loadingTypes) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className='types'>
                <h2 className="types-title">Liste de tous les types Pokémon</h2>
                <div className="types-list">
                    {types?.map((type: PokemonType) => (
                        <ShowType key={type.id} type={type} onClick={() => setSelectedType(type)}/>
                    ))}
                </div>
            </div>

            <div className="select-screen">
                <h1>Select Your Pokemon</h1>
                {loading ?  selectedType ? <p>Loading...</p> : <p>Select a pokemon type</p> : (
                    <div className="pokemon-list">
                        {pokemons?.map((pokemon) => (
                            <div
                                key={pokemon.id}
                                onClick={() => handleSelect(pokemon)}
                                className={`pokemon-card ${selectedPokemon?.id === pokemon.id ? 'selected' : ''}`}
                            >
                                <img src={pokemon.image} alt={pokemon.name} />
                                <p>{pokemon.name}</p>
                            </div>
                        ))}
                    </div>
                )}
                
                {selectedPokemon && (
                    <div className="selected-pokemon">
                        <h2>Selected Pokemon</h2>
                        <img src={selectedPokemon.image} alt={selectedPokemon.name} />
                        <p>{selectedPokemon.name}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SelectScreen;
