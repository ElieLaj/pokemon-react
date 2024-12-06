import React from 'react';
import useFetchPokemonTeam from '../../../hooks/pokemon/fetchPokemonTeam';
import ShowPokemon from '../ShowPokemon/ShowPokemon';
import './PokemonTeam.scss'
import { Link } from 'react-router-dom';
const PokemonTeam = () => {
    const { pokemons, loading, error } = useFetchPokemonTeam();

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>Erreur : {error.message}</p>;

    return (
        <>{pokemons ? (
            <div className="team">
                <Link to="pokemon/generations"><h2 className='team-title'>Exemple d'équipe Pokémon</h2></Link>
                <div className='pokemon-team'>
                    {pokemons?.map((pokemon) => (
                            <ShowPokemon pokemon={pokemon} allowRedirect={true} key={pokemon.id}/>
                    ))}
                </div>
            </div>
        ) : 
            (
                <p>Recherche de l'équipe la plus adapté</p>
            )
        }
            
        </>
    );
};

export default PokemonTeam;
