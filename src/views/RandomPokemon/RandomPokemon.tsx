import React from 'react';
import useFetchRandomPokemon from '../../hooks/pokemon/fetchRandomPokemon';
import ShowPokemon from '../../components/pokemon/ShowPokemon/ShowPokemon';
import { useParams } from 'react-router-dom';

import './RandomPokemon.scss';

const PokemonDetails = () => {
    const { pokemons, loading, error } = useFetchRandomPokemon();

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>Erreur : {error.message}</p>;

        return (
            <>
            {pokemons ? 
                (
                    <div className='random-container'>
                        <button onClick={() => window.location.reload()}>Changer de Pokémon</button>
                        <ShowPokemon pokemon={pokemons[0]} allowRedirect={true} />
                    </div>
                )
                :
                (
                    <p>Pokémon introuvable</p>
                )
            }
            </>
        );
 

};

export default PokemonDetails;
