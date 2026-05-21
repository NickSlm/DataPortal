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

    const columns = [
        {
            field: 'rank',
            headerName: 'rank',
            width: 96,
            renderCell: ({ value }) => (
                <Box sx={{ fontFamily: 'monospace', fontSize: 14, color: 'white' }}>
                    {String(value).padStart(2, '#')}
                </Box>
            ),
        },
        {
            field: 'name',
            headerName: 'name',
            flex: 1,
            renderCell: ({ value }) => (
                <Box sx={{ fontFamily: 'monospace', fontSize: 14, color: '#d1d5db' }}>{value}</Box>
            ),
        },
        {
            field: 'realm',
            headerName: 'realm',
            flex: 1,
            renderCell: ({ value }) => (
                <Box sx={{ fontFamily: 'monospace', fontSize: 14, color: 'white' }}>
                    {value?.split('-')[0]}
                </Box>
            ),
        },
        {
            field: 'rating',
            headerName: 'rating',
            width: 90,
            renderCell: ({ value }) => (
                <Box sx={{ fontFamily: 'monospace', fontSize: 14, color: '#60a5fa' }}>{value}</Box>
            ),
        },
        {
            field: 'record',
            headerName: 'w/l',
            width: 90,
            renderCell: ({ row }) => (
                <Box sx={{ fontFamily: 'monospace', fontSize: 14, color: 'white' }}>
                    {row.wins}/{row.losses}
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
            background: '#1e293b',
            border: '1px solid #334155',
            borderRadius: 1,
            overflow: 'hidden',
        }}>
            <DataGrid
                rows={data ?? []}         
                columns={columns}
                loading={false}      
                onRowClick={(params) => onSelectRow?.(params.row)}
                disableSelectionOnClick
                hideFooterSelectedRowCount
                pageSizeOptions={[10, 25, 50]}
                initialState={{
                    pagination: { paginationModel: { pageSize: 10 } },
                }}
                sx={{
                    border: 'none',
                    fontFamily: 'monospace',
                    color: '#6b7280',
                    background: 'transparent',

                    // Column headers
                    '& .MuiDataGrid-columnHeaders': {
                        background: 'transparent',
                        borderBottom: '1px solid #1f2937',
                    },
                    '& .MuiDataGrid-columnHeaderTitle': {
                        fontFamily: 'monospace',
                        fontSize: 14,
                        color: 'gold',
                        fontWeight: 400,
                        textTransform: 'lowercase',
                    },
                    '& .MuiDataGrid-columnHeader': {
                        '&:focus, &:focus-within': { outline: 'none' },
                    },
                    '& .MuiDataGrid-columnSeparator': { display: 'none' },

                    // Sort icon
                    '& .MuiDataGrid-sortIcon': { color: '#4b5563', opacity: 0.6 },
                    '& .MuiDataGrid-columnHeader--sorted .MuiDataGrid-sortIcon': { opacity: 1 },

                    // Cells
                    '& .MuiDataGrid-cell': {
                        borderBottom: '1px solid rgba(255,255,255,0.03)',
                        '&:focus, &:focus-within': { outline: 'none' },
                    },

                    // Rows
                    '& .MuiDataGrid-row': {
                        cursor: 'pointer',
                        transition: 'background 0.1s',
                        '&:hover': {
                            background: 'rgba(0,255,136,0.04)',
                            '& .MuiDataGrid-cell': { color: '#00ff88' },
                        },
                        '&.Mui-selected': {
                            background: 'rgba(0,255,136,0.05)',
                            borderLeft: '2px solid #00ff88',
                            '& .MuiDataGrid-cell': { color: '#00ff88' },
                            '&:hover': { background: 'rgba(0,255,136,0.07)' },
                        },
                    },

                    // Footer / pagination
                    '& .MuiDataGrid-footerContainer': {
                        borderTop: '1px solid #1f2937',
                        background: 'transparent',
                        minHeight: 48,
                    },
                    '& .MuiTablePagination-root': {
                        color: 'white',
                        fontFamily: 'monospace',
                        fontSize: 11,
                    },
                    '& .MuiTablePagination-selectIcon': { color: 'white' },
                    '& .MuiTablePagination-actions .MuiIconButton-root': {
                        color: 'white',
                        '&:hover': { color: 'white', background: 'rgba(0,255,136,0.05)' },
                        '&.Mui-disabled': { color: 'white' },
                    },

                    // Loading overlay
                    '& .MuiDataGrid-overlay': { background: 'rgba(10,12,15,0.85)' },
                    '& .MuiCircularProgress-root': { color: '#00ff88' },
                    '& .MuiDataGrid-overlayWrapper': { minHeight: 200 },
                }}
            />
        </Box>
    );
}