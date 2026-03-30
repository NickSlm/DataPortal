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
            <Toolbar sx={{ minHeight: 70 }}>
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 900,
                        background: 'linear-gradient(135deg, #00ff88 0%, #00cc70 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        letterSpacing: 1,
                    }}
                >
                    MR.APP
                </Typography>

                <Stack
                    direction="row"
                    spacing={1}
                    sx={{ flexGrow: 1, justifyContent: 'center' }}
                >
                    {[
                        { label: 'Home', path: '/' },
                        { label: 'PVP', path: '/PvP' },
                        { label: 'PVE', path: '/PvE' },
                    ].map((item) => (
                        <Button
                            key={item.path}
                            color="inherit"
                            component={Link}
                            to={item.path}
                            sx={{
                                px: 3,
                                py: 1,
                                position: 'relative',
                                color: isActive(item.path) ? '#00ff88' : 'white',
                                '&::after': {
                                    content: '""',
                                    position: 'absolute',
                                    bottom: 0,
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    width: isActive(item.path) ? '70%' : 0,
                                    height: 2,
                                    background: '#00ff88',
                                    transition: 'width 0.3s ease',
                                },
                                '&:hover::after': {
                                    width: '70%',
                                },
                                '&:hover': {
                                    color: '#00ff88',
                                    background: 'rgba(0, 255, 136, 0.1)',
                                },
                            }}
                        >
                            {item.label}
                        </Button>
                    ))}
                </Stack>

                <Button
                    variant="contained"
                    sx={{
                        background: 'linear-gradient(135deg, #00ff88 0%, #00cc70 100%)',
                        color: '#0a0e27',
                        fontWeight: 700,
                        px: 3,
                        boxShadow: '0 0 20px rgba(0, 255, 136, 0.3)',
                        '&:hover': {
                            boxShadow: '0 0 30px rgba(0, 255, 136, 0.5)',
                            transform: 'translateY(-2px)',
                        },
                        transition: 'all 0.3s ease',
                    }}
                >
                    Login
                </Button>
            </Toolbar>
        </AppBar>



    );



}