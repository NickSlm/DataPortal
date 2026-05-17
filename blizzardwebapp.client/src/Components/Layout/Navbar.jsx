import { AppBar, Toolbar, Typography, Button, Stack, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
export default function Navbar() {

    const location = useLocation();

    const isActive = (path) => location.pathname == path;

    return (

        <AppBar position="sticky"
            sx={{
                top: 0,
                zIndex: 1100,
                background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%)',
                borderBottom: '2px solid',
                borderImage: 'linear-gradient(90deg, #00ff88, #ff6b9d) 1',
            }}>
            <Toolbar sx={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', px: 4, minHeight: 56 }}>
                <Typography sx={{ fontSize: 12, fontWeight: 800, letterSpacing: '3px', textTransform: 'uppercase', background: 'linear-gradient(135deg,#00ff88,#00cfff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    MR.APP
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5 }}>
                    {[{ label: 'Home', path: '/' }, { label: 'PVE', path: '/PvE' }, { label: 'PVP', path: '/PvP' }].map(item => (
                        <Button key={item.path} component={Link} to={item.path} sx={{
                            fontSize: 11.5, fontWeight: 500, color: isActive(item.path) ? '#00ff88' : 'rgba(255,255,255,0.38)',
                            borderRadius: 1.5, textTransform: 'none', px: 1.75, py: 0.75,
                            '&:hover': { background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.8)' },
                        }}>{item.label}</Button>
                    ))}
                </Box>
                <Button sx={{
                    fontSize: 11, fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase',
                    px: 2, py: 0.75, borderRadius: 1.5, border: '1px solid rgba(0,255,136,0.28)',
                    background: 'rgba(0,255,136,0.06)', color: '#00ff88',
                    '&:hover': { background: 'rgba(0,255,136,0.13)', borderColor: 'rgba(0,255,136,0.6)' },
                }}>Login</Button>
            </Toolbar>
        </AppBar>




    );



}