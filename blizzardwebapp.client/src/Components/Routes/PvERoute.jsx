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


export default function PvERoute() {


    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <Box sx={{ maxWidth: 'fit-content', mx: 'auto' }}>
                <Typography
                    variant="h4"
                    sx={{
                        mb: 3,
                        fontWeight: 700,
                        background: 'linear-gradient(90deg, #00ff88, #00cfff)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}
                >
                    PvE Leaderboards
                </Typography>
                <Paper
                    elevation={0}
                    sx={{
                        p: 3,
                        mb: 3,
                        background: 'linear-gradient(135deg, #1a1f3a 0%, #0f1229 100%)',
                        border: '1px solid rgba(0, 255, 136, 0.2)',
                        borderRadius: 2,
                    }}>
                    <Box
                        sx={{
                            display: 'flex',
                            gap: 2,
                            alignItems: 'center',
                            flexWrap: 'wrap',
                        }}>
                        {/* Bracket Select */}
                        
                    </Box>
                </Paper>


                {/* DataGrid */}
            </Box>



        </Container>
    )

}