import {
    Container,
    Box,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Button,
    Paper,
} from '@mui/material';
import { useState, useEffect } from 'react';




export default function SeasonsSelect({selectSeason}) {


    const [data, setData] = useState([]);
    const [season, setSeason] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleSelect = (e) => {
        const selectedSeason = e.target.value;
        setSeason(selectedSeason);
        selectSeason(selectedSeason);
    } 



    useEffect(() => {

        const fetchData = async () => {

            try {

                const response = await fetch('http://127.0.0.1:5201/pvp/seasons/current');

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

        };
        fetchData();

    }, []);

    if (error) return <div>Error: {error.message}</div>;


    return (
        <FormControl
            sx={{
                mx:3,
                width: 200,
                '& .MuiOutlinedInput-root': {
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    borderRadius: 1.5,
                    transition: 'all 0.2s ease',
                    '& fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.1)',
                        transition: 'all 0.2s ease',
                    },
                    '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        '& fieldset': {
                            borderColor: '#00ff88',
                        },
                    },
                    '&.Mui-focused': {
                        backgroundColor: 'rgba(0, 255, 136, 0.05)',
                        '& fieldset': {
                            borderColor: '#00ff88',
                            borderWidth: 2,
                        },
                    },
                },
                '& .MuiInputLabel-root': {
                    color: 'rgba(255, 255, 255, 0.5)',
                    '&.Mui-focused': {
                        color: '#00ff88',
                    },
                },
                '& .MuiSelect-icon': {
                    color: '#00ff88',
                },
            }}
        >
            <InputLabel sx={{ color: 'text.secondary' }}>Season</InputLabel>
            <Select
                value={season ?? ''}
                label="Season"
                onChange={handleSelect}
                disabled={loading}
                MenuProps={{ PaperProps: { sx: { maxHeight: 266 } } }}
            >
                {loading ? (
                    <MenuItem disabled>Loading seasons</MenuItem>
                ) :
                    data?.seasons
                        ?.slice()
                        ?.reverse()
                        ?.map((item) => (
                            <MenuItem key={item.id} value={item.id}>
                                {item.id === data.currentSeason.id ? 'Current Season' : `Season ${item.id}`}
                            </MenuItem>
                        )) || []
                }
            </Select>
        </FormControl>
    );

}