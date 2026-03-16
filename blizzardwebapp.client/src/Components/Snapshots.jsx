import { useState, useEffect } from 'react';



function Snapshots() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5201/api/leaderboard');
                if (!response.ok) {
                    throw new Error('Failed to fetch data')
                }
                const result = await response.json();
                setData(result);

            } catch (err) {
                setError(err);
            } finally {
                setLoading(false)
            }

        };
        fetchData();

    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;


    return (
        <div>
            <h1>My Data</h1>
            {data.map((item, index) => (
                <div key={index}>
                    <h3>{item.DatePulled}</h3>
                    <p>{item.Id}</p>
                </div>
            )) }
        </div>
    )
}

export default Snapshots;