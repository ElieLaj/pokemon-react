import React, { useEffect, useState } from 'react';
import useFetchPokemonGeneration from '../../hooks/pokemon/fetchPokemonGeneration';
import ShowPokemon from './ShowPokemon/ShowPokemon';
import { Pokemon } from '../../models/pokemon';
import PokemonGeneration from './PokemonGeneration/PokemonGeneration';

const Generation = () => {
    const generation = [1, 2, 3, 4, 5, 6, 7, 8]
return (
    <div>
       {
        generation.map((generation) => (
            <PokemonGeneration generation={generation} key={generation}/>
        )
        )
       }
    </div>
);
};

export default Generation;
