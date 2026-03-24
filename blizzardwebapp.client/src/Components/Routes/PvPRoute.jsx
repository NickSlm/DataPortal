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
import SeasonLbDataGrid from '../Hooks/SeasonLbDataGrid';



export default function PvPRoute() {

    const [bracket, setBracket] = useState('');
    const [season, setSeason] = useState('');

    const handleSearch = () => {
        console.log('Searching...', bracket, season);
    };

    const handleSelectSeason = (selectedSeason) => {
        setSeason(selectedSeason)
    }


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
            <SeasonLbDataGrid season={season} bracket={bracket} />
        </Container>

    );

}