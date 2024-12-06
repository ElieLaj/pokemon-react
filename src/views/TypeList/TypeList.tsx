import React from 'react';
import ShowType from '../../components/type/ShowType/ShowType';
import useFetchTypes from '../../hooks/type/fetchTypes';

import './TypeList.scss'

const TypeList = () => {
    const { types, loading, error } = useFetchTypes();

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>Erreur : {error.message}</p>;

    return (
        <div className='types'>
            <h2 className="types-title">Liste de tous les types Pokémon</h2>
            <div className="types-list">
                {types?.map((type) => (
                    <ShowType key={type.id} type={type} allowRedirect={true}/>
                ))}
            </div>
        </div>
        
    );
};

export default TypeList;