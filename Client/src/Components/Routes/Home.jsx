import { Container, Typography, Box, Grid, Card, CardContent, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    const modes = [
        {
            title: 'Arena Leaderboard',
            description: '2v2 and 3v3',
            path: '/PvP',
            gradient: 'linear-gradient(135deg, #ff6b9d 0%, #ff8fab 100%)',
        },
        {
            title: 'Mythic + Leaderboard',
            description: 'Mythic Plus Leaderboard',
            path: '/PvE',
            gradient: 'linear-gradient(135deg, #00ff88 0%, #00cc70 100%)',
        },
        {
            title: 'Raid Leaderboard',
            description: 'Current Raid Progress',
            path: '/PvE',
            gradient: 'linear-gradient(135deg, #00ff88 0%, #00cc70 100%)',
        },
    ];

    return (
        <Container maxWidth="lg" sx={{ py: 8 }}>
            <Box sx={{ textAlign: 'center', mb: 8 }}>
                <Typography
                    variant="h2"
                    gutterBottom
                >
                    Game Modes
                </Typography>
                <Typography variant="h6" color="text.secondary">
                    Select a game mode to check the progress
                </Typography>
            </Box>

            <Grid container spacing={2} wrap="nowrap">
                {modes.map((mode) => (
                    <Grid item xs={4} key={mode.path}>
                        <Card
                          
                        >
                            <CardActionArea onClick={() => navigate(mode.path)}>
                                <Box/>
                                <CardContent sx={{ p: 4 }}>
                                    <Typography variant="h4" gutterBottom fontWeight={700}>
                                        {mode.title}
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        {mode.description}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}




export default Home;