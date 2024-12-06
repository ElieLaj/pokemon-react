import { useState, useEffect } from 'react';
import { PokemonType } from '../../models/type';

const useFetchRandomTypes = () => {
    const [types, setTypes] = useState<PokemonType[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchRandomTypes = async () => {
            try {
                const response = await fetch(`https://pokebuildapi.fr/api/v1/types`);
                if (!response.ok) {
                    throw new Error(`Erreur HTTP ! statut : ${response.status}`);
                }

                const data = await response.json();

                const randomTypes = data.sort(() => Math.random() - 0.5).slice(0, 3);

                const typeInstances = randomTypes.map(
                    (type: any) => new PokemonType(type.id, type.name, type.image, type.englishName)
                );

                setTypes(typeInstances);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchRandomTypes();
    }, []);

    return { types, loading, error };
};

export default useFetchRandomTypes;
