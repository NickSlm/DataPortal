import { Container, Typography, Box, Grid, Card, CardContent, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    const modes = [
        {
            title: 'Arena Leaderboard',
            description: 'Arena leaderboards for 2v2 and 3v3',
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
                    sx={{
                        background: 'linear-gradient(135deg, #00ff88 0%, #ff6b9d 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}
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
                            sx={{
                                background: 'linear-gradient(135deg, #1a1f3a 0%, #0f1229 100%)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-8px)',
                                    boxShadow: `0 12px 40px ${mode.gradient.includes('ff6b9d') ? 'rgba(255, 107, 157, 0.3)' : 'rgba(0, 255, 136, 0.3)'}`,
                                    borderColor: mode.gradient.includes('ff6b9d') ? '#ff6b9d' : '#00ff88',
                                },
                            }}
                        >
                            <CardActionArea onClick={() => navigate(mode.path)}>
                                <Box
                                    sx={{
                                        height: 8,
                                        background: mode.gradient,
                                    }}
                                />
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