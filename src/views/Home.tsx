import React from 'react';
import PokemonTeam  from '../components/pokemon/pokemonTeam/PokemonTeam';
import RandomTypes from '../components/type/RandomTypes/RandomTypes';

const Home: React.FC = () => {
    
    return (
        <div>
            <PokemonTeam />
            <RandomTypes />
        </div>
    );
};

export default Home;