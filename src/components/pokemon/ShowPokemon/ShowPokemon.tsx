import React from 'react';
import { Pokemon } from '../../../models/pokemon';
import { Link } from 'react-router-dom';
import { getColorByType } from "../../../utils/pokemon.utils";
import './ShowPokemon.scss';
import ShowType from '../../type/ShowType/ShowType';

const ShowPokemon = ({ pokemon, allowRedirect = false }: { pokemon: Pokemon; allowRedirect?: boolean }) => {
    return (
        <div className='pokemon'>
            <p className="name">{pokemon.name}</p>
            <Link to={allowRedirect ? "/pokemon/"+pokemon.id : '#'}><img src={pokemon.image} alt={pokemon.name} /></Link>
            <div className="type-container">
                {pokemon.apiTypes.map((apiType, index) => (
                    <ShowType key={index} type={apiType} allowRedirect={allowRedirect} />
                ))}
            </div>

            <div className="stats">
                <p>
                    <span className='stats-name'>HP:</span> <span>{pokemon.baseStats.HP}</span>
                </p>
                <p>
                    <span className='stats-name'>Attaque:</span> <span>{pokemon.baseStats.attack}</span>
                </p>
                <p>
                    <span className='stats-name'>Défense:</span> <span>{pokemon.baseStats.defense}</span>
                </p>
                <p>
                    <span className='stats-name'>Attaque Spe:</span> <span>{pokemon.baseStats.special_attack}</span>
                </p>
                <p>
                    <span className='stats-name'>Défense Spe:</span> <span>{pokemon.baseStats.special_defense}</span>
                </p>
                <p>
                    <span className='stats-name'>Vitesse:</span> <span>{pokemon.baseStats.speed}</span>
                </p>
            </div>
        </div>
    );
};

export default ShowPokemon;
