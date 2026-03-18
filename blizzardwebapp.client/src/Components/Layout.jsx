import { Outlet, Link} from 'react-router-dom';
import {
    Box,
    AppBar,
    Toolbar,
    Typography,
    Button,
    Container,
    Stack
} from '@mui/material';



export default function layout() {


    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            {/* Header/Navigation */}
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        My App
                    </Typography>

                    <Stack direction="row" spacing={2}>
                        <Button color="inherit" component={Link} to="/">
                            Home
                        </Button>
                        <Button color="inherit" component={Link} to="/leaderboard">
                            Leaderboard
                        </Button>
                        <Button color="inherit" component={Link} to="/about">
                            About
                        </Button>
                    </Stack>
                </Toolbar>
            </AppBar>

            {/* Main Content - Outlet renders the current route */}
            <Container maxWidth="lg" sx={{ flex: 1, py: 4 }}>
                <Outlet />
            </Container>

            {/* Footer */}
            <Box component="footer" sx={{ py: 2, textAlign: 'center', bgcolor: 'grey.200' }}>
                <Typography variant="body2">© 2026 My App</Typography>
            </Box>
        </Box>
    );



}