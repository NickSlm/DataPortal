import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import CircularProgress from '@mui/material/CircularProgress';
import Skeleton from '@mui/material/Skeleton';
import { factionBgColors } from '../../Styles/componentStyles';

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
            field: 'faction',
            headerName: 'Faction',
            flex: 1,
            renderCell: ({ value }) => (
                <Box sx={{ fontFamily: 'monospace', fontSize: 14, color: 'rgba(255,255,255,0.4)' }}>
                    {value}
                </Box>            ),
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
                    faction: e.faction.type,
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
                Loading Data...
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
                getRowClassName={(params) => {
                    const fact = params.row.faction;
                    if (fact == "HORDE") return 'row-horde';
                    if (fact == "ALLIANCE") return 'row-alliance';
                    return '';
                }}
                loading={loading}
                onRowClick={(params) => onSelectRow?.(params.row)}
                disableSelectionOnClick
                hideFooterSelectedRowCount
                pageSizeOptions={[10, 25, 50]}
                initialState={{
                    pagination: { paginationModel: { pageSize: 25 } },
                }}
                sx={{
                    cursor: 'pointer',
                    "& .MuiDataGrid-row.row-horde": {
                        background: 'linear-gradient(160deg, #2e0808 0%, #4a1010 60%, #1a0606 100%)',
                    },
                    "& .MuiDataGrid-row.row-alliance": {
                        background: 'linear-gradient(160deg, #060c1e 0%, #0d1a40 60%, #080f28 100%)',
                    },

                    "& .MuiDataGrid-row.row-horde:hover": {
                        background: 'linear-gradient(160deg, #3d0c0c 0%, #5e1616 60%, #2a0a0a 100%)',
                    },
                    "& .MuiDataGrid-row.row-alliance:hover": {
                        background: 'linear-gradient(160deg, #0a1228 0%, #142254 60%, #0c1232 100%)',
                    },

                    "& .MuiDataGrid-row.row-horde.Mui-selected": {
                        background: 'linear-gradient(160deg, #4a1010 0%, #6b1a1a 60%, #3a0c0c 100%)',
                        borderLeft: '2px solid #cc3333',
                    },
                    "& .MuiDataGrid-row.row-alliance.Mui-selected": {
                        background: 'linear-gradient(160deg, #0e1a38 0%, #1a2e6a 60%, #0c1840 100%)',
                        borderLeft: '2px solid #3366cc',
                    },

                    "& .MuiDataGrid-row.row-horde.Mui-selected:hover": {
                        background: 'linear-gradient(160deg, #521212 0%, #7a1e1e 60%, #420e0e 100%)',
                    },
                    "& .MuiDataGrid-row.row-alliance.Mui-selected:hover": {
                        background: 'linear-gradient(160deg, #101e40 0%, #1e3478 60%, #0e1c48 100%)',
                    },

                    "& .MuiDataGrid-columnHeader": {
                        background: "transparent",
                    },
                    "& .MuiDataGrid-columnHeadersInner": {
                        borderBottom: "1px solid #b8860b22",
                    },
                    "& .MuiDataGrid-columnHeaderTitle": {
                        fontSize: "11px",
                        letterSpacing: "1.4px",
                        textTransform: "uppercase",
                        color: "#F5F5F5",
                        fontWeight: 500,
                    },
                    "& .MuiDataGrid-cell:focus": { outline: "none" },
                    "& .MuiDataGrid-cell:focus-within": { outline: "none" },
                }}
            />
        </Box>
    );
}