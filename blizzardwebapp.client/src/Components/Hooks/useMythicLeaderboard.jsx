import { useState, useEffect } from 'react';




export const useMythicLeaderboard = (realmId, keystoneId) => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        if (!realmId || !keystoneId) {
            setData([]);
            return;
        }

        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`http://127.0.0.1:5201/mythic-keystone/leaderboard/connected-realm/${realmId}/mythic-leaderboard/${keystoneId}`);

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const result = await response.json();
                setData(result.leading_groups);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [realmId, keystoneId]);
    return { leaderboard: data, loading, error }
}