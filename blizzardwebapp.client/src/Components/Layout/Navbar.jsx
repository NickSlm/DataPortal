import { AppBar, Toolbar, Typography, Button, Stack, Box, IconButton } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

export default function Navbar() {

    const location = useLocation();

    const isActive = (path) => location.pathname == path;

    return (

        <AppBar position="sticky"
           >
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', px: { xs: 2, sm: 4 }, minHeight: 56 }}>

                <Typography 
                >
                    MR.APP
                </Typography>

                <Box sx={{ display: { xs: 'none', sm: 'flex' }, justifyContent: 'center', gap: 0.5 }}>
                    {[{ label: 'Home', path: '/' }, { label: 'Keystones', path: '/PvE' }, { label: 'Arena', path: '/PvP' }].map(item => (
                        <Button key={item.path} component={Link} to={item.path} sx={{
                            fontSize: 14, fontWeight: 500, color: isActive(item.path) ? '#00ff88' : 'rgba(255,255,255,0.38)',
                            borderRadius: 1.5, textTransform: 'none', px: 1.75, py: 0.75,
                            '&:hover': { background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.8)' },
                        }}>{item.label}</Button>
                    ))}
                </Box>

                <Button variant="outlined">Login</Button>

                <IconButton sx={{ display: { xs: 'flex', sm: 'none' }, color: '#00ff88' }}>
                    <MenuIcon />
                </IconButton>
            </Toolbar>
        </AppBar>




    );



}