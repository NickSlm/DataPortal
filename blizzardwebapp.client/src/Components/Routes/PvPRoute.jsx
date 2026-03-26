import {
    Container,
    Box,
    Select,
    MenuItem,
    Typography,
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

    const handleSelectSeason = (selectedSeason) => {
        setSeason(selectedSeason)
    }


    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <Typography
                variant="h4"
                sx={{
                    mb: 4,
                    fontWeight: 800,
                    fontSize: { xs: '2rem', md: '2.5rem' },
                    background: 'linear-gradient(135deg, #00ff88 0%, #00cfff 50%, #a855f7 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    letterSpacing: '-0.02em',
                    position: 'relative',
                    '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: -8,
                        left: 0,
                        width: 60,
                        height: 4,
                        background: 'linear-gradient(90deg, #00ff88, transparent)',
                        borderRadius: 2,
                    }
                }}
            >
                PvP Leaderboard
            </Typography>
            <Box sx={{ maxWidth: 'fit-content', mx: 'auto' }}>
                 <Paper
                    elevation={0}
                    sx={{
                        p: 3,
                        mb: 4,
                        background: 'rgba(15, 18, 41, 0.6)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(0, 255, 136, 0.2)',
                        borderRadius: 2,
                        boxShadow: '0 8px 32px rgba(0, 255, 136, 0.1)',
                        position: 'relative',
                        overflow: 'hidden',
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            height: '1px',
                            background: 'linear-gradient(90deg, transparent, #00ff88, transparent)',
                            opacity: 0.5,
                        }
                    }}>

                    <Box
                        sx={{
                            display: 'flex',
                            gap: 2,
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            }}>

                        {/* Bracket Select */}
                        <FormControl
                            sx={{
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
                    </Box>
                </Paper>


                {/* DataGrid */}
            </Box>
                <SeasonLbDataGrid season={season} bracket={bracket} />



        </Container>

    );

}