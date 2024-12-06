import React from 'react';
import ShowType from '../ShowType/ShowType';
import useFetchRandomTypes from '../../../hooks/type/fetchRandomTypes';

import './RandomTypes.scss'
import { Link } from 'react-router-dom';

const TypeList = () => {
    const { types, loading, error } = useFetchRandomTypes();

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>Erreur : {error.message}</p>;

    return (
        <div className='types'>
            <Link to="/types"><h2 className="types-title">Exemples de types Pokémon</h2></Link>
            <div className="types-list">
                {types?.map((type) => (
                    <ShowType key={type.id} type={type} allowRedirect={true}/>
                ))}
            </div>
        </div>
        
    );
};

export default TypeList;