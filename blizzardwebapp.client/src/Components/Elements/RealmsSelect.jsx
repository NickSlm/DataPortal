import { useState, useEffect, useRef } from 'react';
import { glassSelectStyle } from '../../Styles/componentStyles';
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
    Tabs,
    Popper,
    ClickAwayListener,
    InputBase,
    Tab,
} from '@mui/material';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';




export default function RealmsSelect({ realms, value, onChange, loading }) {

    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const anchorRef = useRef(null);

    const filtered = realms.filter(r =>
        r.name.toLowerCase().includes(inputValue.toLowerCase())
    );


    return (
        <>
            {/* Pill trigger */}
            <Box
                ref={anchorRef}
                onClick={() => setOpen(true)}
                sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 1,
                    px: 1.5,
                    py: 0.75,
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '999px',
                    cursor: 'pointer',
                    transition: 'border-color 0.2s',
                    '&:hover': { borderColor: 'rgba(0,255,136,0.35)' },
                }}
            >
                <Box sx={{ width: 7, height: 7, borderRadius: '50%', background: '#00ff88', flexShrink: 0 }} />
                <Typography sx={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', fontWeight: 500 }}>
                    {value?.name ?? 'Select realm'}
                </Typography>
                <Typography sx={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', ml: 0.5 }}>▼</Typography>
            </Box>

            {/* Floating dropdown via Popper */}
            <Popper open={open} anchorEl={anchorRef.current} placement="bottom-end" sx={{ zIndex: 1300 }}>
                <ClickAwayListener onClickAway={() => { setOpen(false); setInputValue(''); }}>
                    <Paper sx={{
                        mt: 1,
                        width: 240,
                        background: '#1a1f3a',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '12px',
                        overflow: 'hidden',
                    }}>
                        {/* Search input */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 1.5, py: 1.25, borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                            <InputBase
                                autoFocus
                                placeholder="Search realms…"
                                value={inputValue}
                                onChange={e => setInputValue(e.target.value)}
                                sx={{
                                    fontSize: 13, color: 'rgba(255,255,255,0.8)', flex: 1,
                                    '& input::placeholder': { color: 'rgba(255,255,255,0.25)' }
                                }}
                            />
                        </Box>

                        {/* Results */}
                        <Box sx={{ maxHeight: 220, overflowY: 'auto' }}>
                            {loading
                                ? <Typography sx={{ px: 1.5, py: 1, fontSize: 13, color: 'rgba(255,255,255,0.3)' }}>Loading…</Typography>
                                : filtered.map(realm => (
                                    <Box
                                        key={realm.rId}
                                        onClick={() => { onChange(realm); setOpen(false); setInputValue(''); }}
                                        sx={{
                                            px: 1.5, py: 1,
                                            fontSize: 13,
                                            color: realm.rId === value?.rId ? '#00ff88' : 'rgba(255,255,255,0.6)',
                                            background: realm.rId === value?.rId ? 'rgba(0,255,136,0.05)' : 'transparent',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            '&:hover': { background: 'rgba(0,255,136,0.07)', color: 'rgba(255,255,255,0.9)' },
                                        }}
                                    >
                                        {realm.name}
                                        {realm.rId === value?.rId && <span style={{ opacity: 0.7, fontSize: 12 }}>✓</span>}
                                    </Box>
                                ))
                            }
                        </Box>
                    </Paper>
                </ClickAwayListener>
            </Popper>
        </>
    );
}