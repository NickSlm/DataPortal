import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import CircularProgress from '@mui/material/CircularProgress';
import Skeleton from '@mui/material/Skeleton';


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


export default function SeasonLbDataGrid({season, bracket}) {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const columns = [
        { field: 'name', headerName: 'Name' },
        { field: 'realm', headerName:'Realm' },
        { field: 'rank', headerName: 'Rank'},
        { field: 'rating', headerName: 'Rating' },
        { field: 'total', headerName: 'Total Games' },
        { field: 'wins', headerName: 'Won' },
        { field: 'losses', headerName: 'Lost' }
    ]

    useEffect(() => {
        if (!season || !bracket) return;


        const controller = new AbortController();

        const fetchData = async () => {
            setLoading(true);   
            setError(null);  

            try {
                const s = Number(season);

                const response = await fetch(`http://127.0.0.1:5201/pvp/seasons/leaderboard/${s}/${bracket}`, { signal: controller.signal });

                if (!response.ok) {
                    throw new Error(`Season ${season} Leaderboard not available`)
                }

                const result = await response.json();


                const rows = result.entries.map(e => ({
                    id: e.character.id,
                    name: e.character.name,
                    rank: e.rank,
                    rating: e.rating,
                    realm: e.character.realm.slug,
                    total: e.season_match_statistics.played,
                    wins: e.season_match_statistics.won,
                    losses: e.season_match_statistics.lost,
                }));

                setData(rows);

            } catch (err) {
                if (err.name !== 'AbortError') {
                    setError(err);
                }
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        };

        fetchData();
        return () => {
            controller.abort();
        };

    }, [season, bracket]);

    if (!season || !bracket) return <div>Please select season and bracket</div>;  
    if (data.length === 0) return <div>No data found</div>; 
    if (error) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Paper
                    elevation={0}
                    sx={{
                        p: 4,
                        background: 'linear-gradient(135deg, #1a1f3a 0%, #0f1229 100%)',
                        border: '1px solid rgba(255, 68, 68, 0.3)',
                        borderRadius: 2,
                        textAlign: 'center',
                    }}
                >
                    <Box sx={{ color: '#ff4444', fontSize: '1.1rem' }}>
                        Error: {error.message}
                    </Box>
                </Paper>
            </Box>
        );
    }
    return (

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Paper
                elevation={0}
                sx={{
                    height: 600,
                    background: 'linear-gradient(135deg, #1a1f3a 0%, #0f1229 100%)',
                    border: '1px solid rgba(0, 255, 136, 0.2)',
                    borderRadius: 1,
                    '& .MuiDataGrid-root': {
                        border: 'none',
                        color: 'white',
                    },
                    '& .MuiDataGrid-cell': {
                        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                    },
                    '& .MuiDataGrid-columnHeaders': {
                        backgroundColor: 'rgba(0, 255, 136, 0.1)',
                        borderBottom: '2px solid #00ff88',
                        color: '#00ff88',
                        fontWeight: 700,
                    },
                    '& .MuiDataGrid-footerContainer': {
                        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                        backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    },
                    '& .MuiDataGrid-row:hover': {
                        backgroundColor: 'rgba(0, 255, 136, 0.05)',
                    },
                    '& .MuiCheckbox-root': {
                        color: '#00ff88',
                    },
                    '& .MuiDataGrid-selectedRowCount': {
                        color: 'white',
                    },
                }}
            >
               <DataGrid
                    rows={data ?? []}
                    columns={columns}
                    pageSize={10}
                    loading={loading}
                    rowsPerPageOptions={[10, 25, 50]}
                    disableSelectionOnClick
                />

            </Paper>

        </Box>
      


    );



}