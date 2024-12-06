import React, { useState } from 'react';
import Battle from '../Battle/Battle';
import SelectScreen from '../SelectScreen/SelectScreen';
import { Pokemon } from '../../../models/pokemon';
import './Game.scss';

const Game: React.FC = () => {
    const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

    return (
        <div className="game">
            {!selectedPokemon ? (
                <SelectScreen onSelect={(pokemon: Pokemon) => setSelectedPokemon(pokemon)} />
            ) : (
                <Battle playerPokemon={selectedPokemon} onLoose={() => setSelectedPokemon(null)}/>
            )}
        </div>
    );
};

export default Game;