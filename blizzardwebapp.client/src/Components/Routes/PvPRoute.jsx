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
import SeasonsSelect from '../Elements/SeasonsSelect';
import SeasonLbDataGrid from '../Elements/SeasonLbDataGrid';
import { glassSelectStyle } from '../../Styles/componentStyles';



export default function PvPRoute() {

    const [bracket, setBracket] = useState('');
    const [season, setSeason] = useState('');

    const handleSelectSeason = (selectedSeason) => {
        setSeason(selectedSeason)
    }


    return (
        <Container maxWidth="xl" sx={{ py:4 }}>
            <Box sx={{ maxWidth: 'fit-content', mx: 'auto',mb:6 }}>
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 300,
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
                    WoW Arena Leaderboard
                    </Typography>

            </Box>
            <Box sx={{ maxWidth: 'fit-content', mx: 'auto', mb:3 }}>
                            {/* Bracket Select */}
                <FormControl
                    sx={glassSelectStyle.FormControl}
                        >
                        <InputLabel sx={{ color: 'text.secondary' }}>Bracket</InputLabel>
                        <Select
                            value={bracket}
                            label="Category"
                            onChange={(e) => setBracket(e.target.value)}
                            MenuProps={glassSelectStyle.menuProps}
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
            <Box sx={{ maxWidth: 'fit-content', mx: 'auto' }}>
                <SeasonLbDataGrid season={season} bracket={bracket} />
            </Box>
        </Container>

    );

}