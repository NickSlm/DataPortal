import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SnapshotDataGrid() {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() =>
    {
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
                setLoading(false);
            }

        }
        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;


    return (

        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="select-label">Leaderboard</InputLabel>
                <Select
                    labelId="select-label"
                    id="simple-select"
                    label="Leaderboard">
                    {
                        data.map((item) => (<MenuItem key={item.datePulled} value={item.datePulled}>
                            {item.datePulled.split('T')[0]}
                        </MenuItem>))
                    }
                </Select>
            </FormControl>
        </Box>
    );
}