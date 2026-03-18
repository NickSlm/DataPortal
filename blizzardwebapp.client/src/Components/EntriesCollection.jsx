import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';








export default function EntriesCollection({ date }) {

    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchData = async () => {

            try {
                const formattedDate = new Date(date).toISOString().split('T')[0];

                console.log('Original date:', date);
                console.log('Formatted date:', formattedDate);

                const response = await fetch(
                    `http://127.0.0.1:5201/Snapshot/Date/${formattedDate}`
                );
                if (!response.ok) {
                    throw new Error('Failed to fetch data')
                }

                const result = await response.json();

                setData(result);
                setLoading(false);

            } catch (err) {
                setError(err);
                setLoading(false);
            }


        }

        if (date) {
            fetchData();
        }


    }, [date]);


    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;




    return (
        <div>
            {data.map(entry => (
                <div key={entry.id}>{entry.characterName}</div>
            ))}
        </div>
    );


}