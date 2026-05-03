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

import {
    GridToolbarContainer,
    GridToolbarQuickFilter,
} from '@mui/x-data-grid';

function CustomToolbar(props) {
    return (
        <GridToolbarContainer>
            <GridToolbarQuickFilter />
        </GridToolbarContainer>
    );
}
export default function SeasonLbDataGrid({season, bracket}) {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const columns = [
        {
            field: 'rank',
            headerName: 'Rank',
            width: 80,
            align: 'center',
            headerAlign: 'center',
            renderCell: (params) => (
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    fontWeight: params.row.rank <= 3 ? 700 : 500,
                }}>
                    {params.row.rank === 1 && (
                        <Box sx={{
                            fontSize: '1.2rem',
                            filter: 'drop-shadow(0 0 8px rgba(255, 215, 0, 0.8))'
                        }}>
                            🥇
                        </Box>
                    )}
                    {params.row.rank === 2 && (
                        <Box sx={{
                            fontSize: '1.2rem',
                            filter: 'drop-shadow(0 0 8px rgba(192, 192, 192, 0.8))'
                        }}>
                            🥈
                        </Box>
                    )}
                    {params.row.rank === 3 && (
                        <Box sx={{
                            fontSize: '1.2rem',
                            filter: 'drop-shadow(0 0 8px rgba(205, 127, 50, 0.8))'
                        }}>
                            🥉
                        </Box>
                    )}
                    <Typography
                        sx={{
                            color: params.row.rank <= 3
                                ? params.row.rank === 1 ? '#FFD700'
                                    : params.row.rank === 2 ? '#C0C0C0'
                                        : '#CD7F32'
                                : 'inherit',
                            fontWeight: params.row.rank <= 3 ? 700 : 500,
                        }}
                    >
                        #{params.row.rank}
                    </Typography>
                </Box>
            ),
        },
        {
            field: 'name',
            headerName: 'Player',
            width: 150,
            align: 'left',
            headerAlign: 'center',
            renderCell: (params) => (
                <Typography sx={{  fontWeight: 600 }}>
                    {params.value}
                </Typography>
            ),
        },
        {
            field: 'rating',
            headerName: 'Rating',
            width: 120,
            align: 'center',
            headerAlign: 'center',
            renderCell: (params) => (
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 0.5,
                }}>
                    <Typography sx={{
                        fontWeight: 700,
                        fontSize: '1.1rem',
                        color: '#00ff88',
                    }}>
                        {params.value}
                    </Typography>
                    <Box sx={{
                        width: 60,
                        height: 3,
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: 2,
                        overflow: 'hidden',
                    }}>
                        <Box sx={{
                            width: `${(params.value / 3000) * 100}%`,
                            height: '100%',
                            background: 'linear-gradient(90deg, #00ff88, #00cfff)',
                        }} />
                    </Box>
                </Box>
            ),
        },
        {
            field: 'total',
            headerName: 'Total',
            width: 120,
            align: 'center',
            headerAlign: 'center',
            renderCell: (params) => (
                <Typography sx={{ color: '#D3D3D3', fontWeight: 600 }}>
                    {params.value}
                </Typography>
            ),
        },
        {
            field: 'wins',
            headerName: 'Win',
            width: 70,
            align: 'center',
            headerAlign: 'center',
            renderCell: (params) => (
                <Typography sx={{ color: '#00ff88', fontWeight: 600 }}>
                    {params.value}
                </Typography>
            ),
        },
        {
            field: 'losses',
            headerName: 'Loss',
            width: 70,
            align: 'center',
            headerAlign: 'center',
            renderCell: (params) => (
                <Typography sx={{ color: '#ff4444', fontWeight: 600 }}>
                    {params.value}
                </Typography>
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

            <Paper
                elevation={0}
                sx={{
                    height: 'fit-content',
                    background: 'linear-gradient(145deg, #0f1229 0%, #1a1f3a 100%)',
                    border: '1px solid rgba(0, 255, 136, 0.15)',
                    borderRadius: 1,
                    overflow: 'hidden',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
                    '& .MuiDataGrid-root': {
                        border: 'none',
                        color: 'white',
                    },
                    '& .MuiDataGrid-cell': {
                        borderBottom: '1px solid rgba(255, 255, 255, 0.03)',
                        py: 1.5,
                    },
                    '& .MuiDataGrid-columnHeaders': {
                        backgroundColor: 'rgba(0, 255, 136, 0.08)',
                        borderBottom: '2px solid rgba(0, 255, 136, 0.3)',
                        color: '#00ff88',
                        fontWeight: 700,
                        fontSize: '0.875rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                    },
                    '& .MuiDataGrid-columnHeaderTitle': {
                        fontWeight: 700,
                    },
                    '& .MuiDataGrid-footerContainer': {
                        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                        backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    },
                    '& .MuiDataGrid-row': {
                        cursor: 'pointer',
                        '&:nth-of-type(odd)': {
                            backgroundColor: 'rgba(255, 255, 255, 0.01)',
                        },
                    },
                    '& .MuiDataGrid-row:hover': {
                        backgroundColor: 'rgba(0, 255, 136, 0.08)',
                        transform: 'translateX(4px)',
                        transition: 'all 0.2s ease',
                    },
                    // Top 3 rankings special styling
                    '& .MuiDataGrid-row:nth-of-type(1)': {
                        position: 'relative',
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            bottom: 0,
                            width: 3,
                            background: 'linear-gradient(180deg, #FFD700, #FFA500)',
                        },
                    },
                    '& .MuiDataGrid-row:nth-of-type(2)::before': {
                        content: '""',
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: 3,
                        background: 'linear-gradient(180deg, #C0C0C0, #808080)',
                    },
                    '& .MuiDataGrid-row:nth-of-type(3)::before': {
                        content: '""',
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: 3,
                        background: 'linear-gradient(180deg, #CD7F32, #8B4513)',
                    },
                    '& .MuiCheckbox-root': {
                        color: 'rgba(0, 255, 136, 0.5)',
                        '&.Mui-checked': {
                            color: '#00ff88',
                        },
                    },
                    '& .MuiDataGrid-selectedRowCount': {
                        color: 'rgba(255, 255, 255, 0.7)',
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
                    slots={{
                        toolbar: CustomToolbar,
                    }}
                    slotProps={{
                        toolbar: {
                            showQuickFilter: true,
                        },
                    }}
                    showToolbar
                    sx={{
                        // Core styling
                        border: 'none',
                        color: 'white',

                        background:'transparent',
                        // Cell styling
                        '& .MuiDataGrid-cell': {
                            borderBottom: '1px solid rgba(255, 255, 255, 0.03)',
                            py: 2,
                            fontSize: '0.9rem',
                            '&:focus': {
                                outline: 'none',
                            },
                            '&:focus-within': {
                                outline: 'none',
                            },
                        },

                        // Column headers
                        '& .MuiDataGrid-columnHeaders': {
                            backgroundColor: 'rgba(0, 255, 136, 0.08)',
                            borderBottom: '2px solid rgba(0, 255, 136, 0.3)',
                            borderRadius: 0,
                            minHeight: '56px !important',
                            maxHeight: '56px !important',
                            lineHeight: '56px !important',
                        },

                        '& .MuiDataGrid-columnHeader': {
                            '&:focus': {
                                outline: 'none',
                            },
                            '&:focus-within': {
                                outline: 'none',
                            },
                        },

                        '& .MuiDataGrid-columnHeaderTitle': {
                            color: '#00ff88',
                            fontWeight: 700,
                            fontSize: '0.813rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.08em',
                        },

                        // Column separator
                        '& .MuiDataGrid-columnSeparator': {
                            color: 'rgba(0, 255, 136, 0.2)',
                            '&:hover': {
                                color: '#00ff88',
                            },
                        },

                        // Sort icon
                        '& .MuiDataGrid-sortIcon': {
                            color: '#00ff88',
                            opacity: 0.7,
                        },

                        '& .MuiDataGrid-columnHeader--sorted .MuiDataGrid-sortIcon': {
                            opacity: 1,
                        },

                        // Menu icon
                        '& .MuiDataGrid-menuIcon': {
                            '& .MuiIconButton-root': {
                                color: '#00ff88',
                            },
                        },

                        // Rows
                        '& .MuiDataGrid-row': {
                            cursor: 'pointer',
                            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                            '&:nth-of-type(odd)': {
                                backgroundColor: 'rgba(255, 255, 255, 0.015)',
                            },
                            '&.Mui-selected': {
                                backgroundColor: 'rgba(0, 255, 136, 0.12) !important',
                                '&:hover': {
                                    backgroundColor: 'rgba(0, 255, 136, 0.16) !important',
                                },
                            },
                        },

                        '& .MuiDataGrid-row:hover': {
                            backgroundColor: 'rgba(0, 255, 136, 0.08)',
                            transform: 'translateX(2px)',
                        },

                        // Top 3 rankings with gradient borders
                        '& .MuiDataGrid-row[data-rowindex="0"]': {
                            position: 'relative',
                            backgroundColor: 'rgba(255, 215, 0, 0.05)',
                            '&::before': {
                                content: '""',
                                position: 'absolute',
                                left: 0,
                                top: 0,
                                bottom: 0,
                                width: 4,
                                background: 'linear-gradient(180deg, #FFD700 0%, #FFA500 100%)',
                                boxShadow: '0 0 10px rgba(255, 215, 0, 0.5)',
                            },
                        },

                        '& .MuiDataGrid-row[data-rowindex="1"]': {
                            position: 'relative',
                            backgroundColor: 'rgba(192, 192, 192, 0.03)',
                            '&::before': {
                                content: '""',
                                position: 'absolute',
                                left: 0,
                                top: 0,
                                bottom: 0,
                                width: 4,
                                background: 'linear-gradient(180deg, #C0C0C0 0%, #A8A8A8 100%)',
                                boxShadow: '0 0 10px rgba(192, 192, 192, 0.3)',
                            },
                        },

                        '& .MuiDataGrid-row[data-rowindex="2"]': {
                            position: 'relative',
                            backgroundColor: 'rgba(205, 127, 50, 0.03)',
                            '&::before': {
                                content: '""',
                                position: 'absolute',
                                left: 0,
                                top: 0,
                                bottom: 0,
                                width: 4,
                                background: 'linear-gradient(180deg, #CD7F32 0%, #B8733C 100%)',
                                boxShadow: '0 0 10px rgba(205, 127, 50, 0.3)',
                            },
                        },

                        // Virtualization
                        '& .MuiDataGrid-virtualScroller': {
                            '&::-webkit-scrollbar': {
                                width: 8,
                                height: 8,
                            },
                            '&::-webkit-scrollbar-track': {
                                background: 'rgba(0, 0, 0, 0.2)',
                                borderRadius: 4,
                            },
                            '&::-webkit-scrollbar-thumb': {
                                background: 'rgba(0, 255, 136, 0.3)',
                                borderRadius: 4,
                                '&:hover': {
                                    background: 'rgba(0, 255, 136, 0.5)',
                                },
                            },
                        },

                        // Footer
                        '& .MuiDataGrid-footerContainer': {
                            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                            backgroundColor: 'rgba(0, 0, 0, 0.3)',
                            minHeight: '52px',
                        },

                        '& .MuiTablePagination-root': {
                            color: 'rgba(255, 255, 255, 0.7)',
                        },

                        '& .MuiTablePagination-select': {
                            color: 'white',
                            '&:focus': {
                                backgroundColor: 'rgba(0, 255, 136, 0.1)',
                            },
                        },

                        '& .MuiTablePagination-selectIcon': {
                            color: '#00ff88',
                        },

                        '& .MuiTablePagination-actions': {
                            '& .MuiIconButton-root': {
                                color: '#00ff88',
                                '&.Mui-disabled': {
                                    color: 'rgba(0, 255, 136, 0.3)',
                                },
                            },
                        },

                        '& .MuiDataGrid-selectedRowCount': {
                            color: 'rgba(255, 255, 255, 0.7)',
                        },

                        // Checkbox
                        '& .MuiCheckbox-root': {
                            color: 'rgba(0, 255, 136, 0.5)',
                            '&.Mui-checked': {
                                color: '#00ff88',
                            },
                            '&:hover': {
                                backgroundColor: 'rgba(0, 255, 136, 0.1)',
                            },
                        },

                        // Loading overlay
                        '& .MuiDataGrid-overlay': {
                            backgroundColor: 'rgba(15, 18, 41, 0.9)',
                            backdropFilter: 'blur(4px)',
                        },

                        '& .MuiCircularProgress-root': {
                            color: '#00ff88',
                        },

                        // No rows overlay
                        '& .MuiDataGrid-overlayWrapper': {
                            minHeight: 400,
                        },

                        // Cell edit mode
                        '& .MuiDataGrid-cell--editing': {
                            backgroundColor: 'rgba(0, 255, 136, 0.1)',
                            boxShadow: 'inset 0 0 0 2px #00ff88',
                        },

                        // Filter panel (if enabled)
                        '& .MuiDataGrid-filterForm': {
                            backgroundColor: 'rgba(26, 31, 58, 0.95)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(0, 255, 136, 0.2)',
                        },

                        // Column menu
                        '& .MuiDataGrid-menu': {
                            '& .MuiPaper-root': {
                                backgroundColor: 'rgba(26, 31, 58, 0.95)',
                                backdropFilter: 'blur(20px)',
                                border: '1px solid rgba(0, 255, 136, 0.2)',
                                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
                            },
                            '& .MuiMenuItem-root': {
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: 'rgba(0, 255, 136, 0.1)',
                                },
                            },
                        },

                        // Panel
                        '& .MuiDataGrid-panel': {
                            '& .MuiPaper-root': {
                                backgroundColor: 'rgba(26, 31, 58, 0.95)',
                                backdropFilter: 'blur(20px)',
                                border: '1px solid rgba(0, 255, 136, 0.2)',
                            },
                        },
                        '& .MuiDataGrid-toolbarContainer': {
                            backgroundColor: 'transparent',
                        }
                    }}
                />
            </Paper>
    );
}