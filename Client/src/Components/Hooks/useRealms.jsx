import { useState, useEffect } from 'react';



export const useRealms = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchData = async () => {

            try {
                const response = await fetch('http://127.0.0.1:5201/data/connected_realms/get');

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const result = await response.json();

                const realms = result.flatMap(e =>
                    e.realms.map(r => ({
                        id: e.id,       
                        rId: r.id,       
                        name: r.name,
                        category: r.category
                    }))
                );

                setData(realms);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);
    return {realms: data, loading, error}
};

