import React from 'react';
import useFetchPokemon from '../hooks/pokemon/fetchPokemon';
import ShowPokemon from '../components/pokemon/ShowPokemon/ShowPokemon';
import { useParams } from 'react-router-dom';

const PokemonDetails = () => {
    const { id } = useParams();
    if (id) {
        const { pokemon, loading, error } = useFetchPokemon(id);
        if (loading) return <p>Chargement...</p>;
        if (error) return <p>Erreur : {error.message}</p>;

        return (
            <>
            {pokemon ? 
                (
                    <div>
                        <ShowPokemon pokemon={pokemon} allowRedirect={true} />
                    </div>
                )
                :
                (
                    <p>Pokémon introuvable</p>
                )
            }
            </>
        );
    }
    else 
        return <h1>Pokémon introuvable</h1>
};

export default PokemonDetails;
