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
    Grid
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import SeasonsSelect from '../Elements/SeasonsSelect';
import SeasonLbDataGrid from '../Elements/SeasonLbDataGrid';
import { CharacterProfile } from '../Elements/CharacterProfile';
import { glassSelectStyle } from '../../Styles/componentStyles';
import { FilterPill } from '../Elements/FilterPill';


export default function PvPRoute() {

    const [bracket, setBracket] = useState('');
    const [season, setSeason] = useState('');
    const [character, setCharacter] = useState('');

    const HandleSelectSeason = (selectedSeason) => {
        setSeason(selectedSeason);
    }

    const HandleSelectCharacter = (value, event) => {
        setCharacter(value.row);
    }

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <Box sx={{ mb: 4 }}>
                <Typography sx={{
                    fontSize: 14, fontWeight: 700, letterSpacing: '3px',
                    textTransform: 'uppercase', color: 'rgba(0,255,136,0.45)',
                    fontFamily: 'monospace', mb: 0.5
                }}>
                    Arena {bracket} {season}
                </Typography>
                <Typography sx={{
                    fontSize: 26, fontWeight: 200, color: 'rgba(255,255,255,0.9)',
                    fontFamily: 'monospace'
                }}>
                    Arena{' '}
                    <Box component="span" sx={{
                        fontWeight: 700,
                        background: 'linear-gradient(135deg, #00ff88 0%, #00cfff 60%, #a855f7 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        {bracket}
                    </Box>
                    {' '}Leaderboard
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1, mb: 2, alignItems:'center' }}>
                <FilterPill
                    label="3v3"
                    active={bracket === '3v3'}
                    onClick={() => setBracket('3v3')}
                />
                <FilterPill
                    label="2v2"
                    active={bracket === '2v2'}
                    onClick={() => setBracket('2v2')}
                />
                <SeasonsSelect onChange={setSeason} />
            </Box>
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '1fr 300px' },
                gap: 2,
                alignItems: 'flex-start',
            }}>
                <Box sx={{ minWidth: 0 }}>
                    <SeasonLbDataGrid
                        season={season}
                        bracket={bracket}
                        onSelectRow={(row) => setCharacter(row)}
                    />
                </Box>

                <Box sx={{
                    position: { xs: 'relative', md: 'sticky' },
                    top: 72
                }}>
                    <CharacterProfile player={character} />
                </Box>
            </Box>
        </Container>
    );

}