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
import { DataGrid } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import SeasonsSelect from '../Hooks/SeasonsSelect';




export default function PvPRoute() {

    const [bracket, setBracket] = useState('');
    const [season, setSeason] = useState('');

    const handleSearch = () => {
        console.log('Searching...', bracket, season);
    };

    const handleSelectSeason = (selectedSeason) => {
        setSeason(selectedSeason)
    }

    //TODO: remove dummy
    const columns = [
        { field: 'character', headerName: 'Character', width: 150 },
        { field: 'rank', headerName: 'Rank', width: 120 },
        { field: 'realm', headerName: 'Realm', width: 120 },
        { field: 'rating', headerName: 'Rating', width: 150 },
        { field: 'total', headerName: 'Played', width: 120 },
        { field: 'wins', headerName: 'Won', width: 120 },
        { field: 'losses', headerName: 'Lost', width: 120 },
    ];
    //TODO: remove dummy
    const rows = [
        { id: 1, player: 'Player1', rank: 'Gold', wins: 45, losses: 12 },
        { id: 2, player: 'Player2', rank: 'Silver', wins: 32, losses: 18 },
        { id: 3, player: 'Player3', rank: 'Platinum', wins: 67, losses: 8 },
    ];



    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <Paper
                elevation={0}
                sx={{
                    p: 3,
                    mb: 3,
                    background: 'linear-gradient(135deg, #1a1f3a 0%, #0f1229 100%)',
                    border: '1px solid rgba(0, 255, 136, 0.2)',
                    borderRadius: 2,
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        gap: 2,
                        alignItems: 'center',
                        flexWrap: 'wrap',
                    }}
                >
                    {/* Bracket Select */}
                    <FormControl
                        sx={{
                            minWidth: 200,
                            flex: 1,
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'rgba(255, 255, 255, 0.23)',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#00ff88',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#00ff88',
                                },
                            },
                        }}
                    >
                        <InputLabel sx={{ color: 'text.secondary' }}>Bracket</InputLabel>
                        <Select
                            value={bracket}
                            label="Category"
                            onChange={(e) => setBracket(e.target.value)}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value="2v2">2v2</MenuItem>
                            <MenuItem value="3v3">3v3</MenuItem>
                        </Select>
                    </FormControl>
                    {/* Season Select */}
                    <SeasonsSelect selectSeason={handleSelectSeason} />
                    <Button
                        variant="contained"
                        startIcon={<SearchIcon />}
                        onClick={handleSearch}
                        sx={{
                            background: 'linear-gradient(135deg, #00ff88 0%, #00cc70 100%)',
                            color: '#0a0e27',
                            fontWeight: 700,
                            px: 4,
                            py: 1.5,
                            minWidth: 150,
                            boxShadow: '0 0 20px rgba(0, 255, 136, 0.3)',
                            '&:hover': {
                                boxShadow: '0 0 30px rgba(0, 255, 136, 0.5)',
                                transform: 'translateY(-2px)',
                            },
                            transition: 'all 0.3s ease',
                        }}
                    >
                        Search
                    </Button>
                </Box>
            </Paper>

            {/* DataGrid */}
            <Paper
                elevation={0}
                sx={{
                    height: 600,
                    background: 'linear-gradient(135deg, #1a1f3a 0%, #0f1229 100%)',
                    border: '1px solid rgba(0, 255, 136, 0.2)',
                    borderRadius: 2,
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
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10, 25, 50]}
                    checkboxSelection
                    disableSelectionOnClick
                />
            </Paper>
        </Container>

    );

}