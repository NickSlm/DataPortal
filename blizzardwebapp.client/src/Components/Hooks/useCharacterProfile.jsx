import { useState, useEffect } from 'react';




export const useCharacterProfile = (name, realm ) => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        const controller = new AbortController();
        const fetchData = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:5201/pvp/profile/character/${name}/realm/${realm}/get`, { signal: controller.signal });

                if (!response.ok) {
                    throw new Error('Failed to fetch Data');
                }
                const result = await response.json();
                setData(result);
            } catch (err) {
                if (err.name !== 'AbortError') {
                    setError(err);
                }
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        }
        fetchData();
        return () => {
            controller.abort();
        }

    }, [name, realm]);
    return { data, loading, error }
};