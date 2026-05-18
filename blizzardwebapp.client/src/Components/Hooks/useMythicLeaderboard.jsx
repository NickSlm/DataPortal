import { useState, useEffect } from 'react';




export const useMythicLeaderboard = (realmId, keystoneId, page) => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        if (!realmId || !keystoneId) {
            setData([]);
            return;
        }

        const controller = new AbortController();
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`http://127.0.0.1:5201/data/mythic-keystones/realm/${realmId}/keystone/${keystoneId}/groups/page=${page}&size=50`, { signal: controller.signal });


                if (!response.ok) {
                    throw new Error('Failed to fetch data');
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
        };
    }, [realmId, keystoneId, page]);
    return { leaderboard: data, loading, error }
}