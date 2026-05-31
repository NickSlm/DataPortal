import { useState, useRef, useEffect } from 'react';
import {
    Box,
    Typography,
    Paper,
    Popper,
    ClickAwayListener,
    InputBase,
} from '@mui/material';
import { usePvpSeasons } from '../Hooks/usePvpSeasons'; 

export default function SeasonSelect({ onChange }) {
    const { data: seasons, isLoading } = usePvpSeasons();

    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [selected, setSelected] = useState(null);


    const anchorRef = useRef(null);


    const filtered = (seasons?.seasons ?? []).filter(s =>
        `Season ${s.id}`.toLowerCase().includes(inputValue.toLowerCase())
    );


    const handleSelect = (season) => {
        setSelected(season);
        onChange(season.id);
        setOpen(false);
        setInputValue('');
    };

    useEffect(() => {

        if (!isLoading && seasons?.currentSeason) {
            setSelected(seasons.currentSeason);
            onChange(seasons.currentSeason.id);
        }
    }, [isLoading])

    return (
        <>
            <Box
                ref={anchorRef}
                onClick={() => setOpen(true)}
                sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 1,
                    px: 1.5,
                    py: 0.75,
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '999px',
                    cursor: 'pointer',
                    transition: 'border-color 0.2s',
                    '&:hover': { borderColor: 'rgba(0,255,136,0.35)' },
                }}
            >
                <Box sx={{ width: 7, height: 7, borderRadius: '50%', background: '#00ff88', flexShrink: 0 }} />
                <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
                    {selected ? `Season ${selected.id}` : 'Select season'}
                </Typography>
                <Typography sx={{ fontSize: 10, ml: 0.5 }}>▼</Typography>
            </Box>

            <Popper open={open} anchorEl={anchorRef.current} placement="bottom-end" sx={{ zIndex: 1300 }}>
                <ClickAwayListener onClickAway={() => { setOpen(false); setInputValue(''); }}>
                    <Paper sx={{
                        mt: 1,
                        width: 200,
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '12px',
                        overflow: 'hidden',
                    }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 1.5, py: 1.25, borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                            <InputBase
                                autoFocus
                                placeholder="Search seasons…"
                                value={inputValue}
                                onChange={e => setInputValue(e.target.value)}
                                sx={{
                                    fontSize: 13, flex: 1,
                                    '& input::placeholder': { color: 'rgba(255,255,255,0.25)' }
                                }}
                            />
                        </Box>

                        <Box sx={{ maxHeight: 220, overflowY: 'auto' }}>
                            {isLoading
                                ? <Typography sx={{ px: 1.5, py: 1, fontSize: 13, color: 'rgba(255,255,255,0.3)' }}>Loading…</Typography>
                                : filtered.map(season => (
                                    <Box
                                        key={season.id}
                                        onClick={() => handleSelect(season)}
                                        sx={{
                                            px: 1.5, py: 1,
                                            fontSize: 13,
                                            color: season.id === selected?.id ? '#00ff88' : 'rgba(255,255,255,0.6)',
                                            background: season.id === selected?.id ? 'rgba(0,255,136,0.05)' : 'transparent',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            '&:hover': { background: 'rgba(0,255,136,0.07)', color: 'rgba(255,255,255,0.9)' },
                                        }}
                                    >
                                        {`Season ${season.id}`}
                                        {season.id === selected?.id && <span style={{ opacity: 0.7, fontSize: 12 }}>✓</span>}
                                    </Box>
                                )).reverse()
                            }
                        </Box>
                    </Paper>
                </ClickAwayListener>
            </Popper>
        </>
    );
}