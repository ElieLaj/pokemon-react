import { useState, useEffect } from 'react';
import { PokemonType } from '../../models/type';

const useFetchTypes = () => {
    const [types, setTypes] = useState<PokemonType[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchTypes = async () => {
            try {
                const response = await fetch(`https://pokebuildapi.fr/api/v1/types`);
                if (!response.ok) {
                    throw new Error(`Erreur HTTP ! statut : ${response.status}`);
                }

                const data = await response.json();

                const typeInstances = data.map(
                    (type: any) => new PokemonType(type.id, type.name, type.image, type.englishName)
                );

                setTypes(typeInstances);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchTypes();
    }, []);

    return { types, loading, error };
};

export default useFetchTypes;
