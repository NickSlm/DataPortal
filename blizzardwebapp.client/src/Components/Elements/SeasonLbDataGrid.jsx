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
    Typography
} from '@mui/material';


export default function SeasonLbDataGrid({season, bracket, onSelectRow}) {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const styles = {
        1: '#f6c344',
        2: '#ff9f43',
        3: '#ffe66d'
    };

    const columns = [
        {
            field: 'rank',
            headerName: 'Rank',
            width: 96,
            renderCell: ({ value }) => (
                <Box sx={{ fontFamily: 'monospace', fontSize: 14, color: styles[value] ?? '#63b3ff'}}>
                    {String(value).padStart(2, '#')}
                </Box>
            ),
        },
        {
            field: 'name',
            headerName: 'Name',
            flex: 1,
            renderCell: ({ value }) => (
                <Box sx={{ fontFamily: 'monospace', fontSize: 14, color: '#ffffff ' }}>{value}</Box>
            ),
        },
        {
            field: 'realm',
            headerName: 'Realm',
            flex: 1,
            renderCell: ({ value }) => (
                <Box sx={{ fontFamily: 'monospace', fontSize: 14, color: 'rgba(255,255,255,0.4)' }}>
                    {value}
                </Box>
            ),
        },
        {
            field: 'rating',
            headerName: 'Rating',
            width: 90,
            renderCell: ({ value }) => (
                <Box sx={{ fontFamily: 'monospace', fontSize: 14, color: '#f8c200' }}>{value}</Box>
            ),
        },
        {
            field: 'record',
            headerName: 'W/L',
            width: 90,
            renderCell: ({ row }) => (
                <Box sx={{ fontFamily: 'monospace', fontSize: 14 }}>
                    <span style={{ color: '#00ff88' }}>{row.wins}</span>
                    <span style={{ color: 'rgba(255,255,255,0.3)' }}>/</span>
                    <span style={{ color: '#ff4d4d' }}>{row.losses}</span>
                </Box>
            ),
        },
    ];

    useEffect(() => {
        if (!season || !bracket) return;

        const controller = new AbortController();

        const fetchData = async () => {
            setLoading(true);   
            setError(null);  

            try {
                const s = Number(season);

                const response = await fetch(`http://127.0.0.1:5201/pvp/seasons/leaderboard/season/${s}/bracket/${bracket}`, { signal: controller.signal });

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

    if (!season || !bracket) return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '1.1rem' }}>
                Please select season and bracket
            </Box>
        </Box>

    );  
    if (data.length === 0) return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ color: '#ffa500', fontSize: '1.1rem' }}>
                Looking for data...
            </Box>
        </Box>

    ); 
    if (error) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box sx={{ color: '#ff4444', fontSize: '1.1rem' }}>
                    Error: {error.message}
                </Box>
            </Box>
        );
    }
    return (

        <Box sx={{
            overflow: 'hidden',
        }}>
            <DataGrid
                rows={data ?? []}
                columns={columns}
                loading={loading}
                onRowClick={(params) => onSelectRow?.(params.row)}
                disableSelectionOnClick
                hideFooterSelectedRowCount
                pageSizeOptions={[10, 25, 50]}
                initialState={{
                    pagination: { paginationModel: { pageSize: 25 } },
                }}
                sx={{
                    background: 'linear-gradient(90deg, rgba(26,31,58,0.8) 0%, rgba(10,14,39,0.6) 100%)',
                    "& .MuiDataGrid-columnHeader": {
                        background: "transparent",
                    },
                    "& .MuiDataGrid-columnHeadersInner": {
                        borderBottom: "1px solid rgba(0,255,136,0.15)",
                    },
                    "& .MuiDataGrid-columnHeaderTitle": {
                        fontSize: "11px",
                        letterSpacing: "1.4px",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.25)",
                        fontWeight: 500,
                    },
                    "& .MuiDataGrid-row.Mui-selected": {
                        background: 'linear-gradient(90deg, rgba(0,255,136,0.08) 0%, rgba(0,255,136,0.02) 100%)',
                        border: '1px solid rgba(0,255,136,0.25)',
                    },
                    "& .MuiDataGrid-row.Mui-selected:hover": {
                        background: "linear-gradient(90deg, rgba(0,255,136,0.08) 0%, rgba(0,255,136,0.02) 100%)",
                    },
                    "& .MuiDataGrid-cell:focus": {
                        outline: "none",
                    },
                    "& .MuiDataGrid-cell:focus-within": {
                        outline: "none",
                    },

                }}
            />
        </Box>
    );
}