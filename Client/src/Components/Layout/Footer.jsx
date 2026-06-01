import { Box, Typography, Container, Stack, Link } from '@mui/material';


export default function Footer() {


    return (
        <Box
            component="footer"
            sx={{
                py: 4,
                px: 2,
                mt: 'auto',
                borderTop: '1px solid rgba(0, 255, 136, 0.2)',
            }}
        >
            <Container maxWidth="lg">
                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={2}
                >
                    <Typography variant="body2" color="text.secondary">
                        � 2024 Mr.App. All rights reserved.
                    </Typography>

                    <Stack direction="row" spacing={3}>
                        <Link href="#" color="text.secondary" sx={{ '&:hover': { color: '#00ff88' } }}>
                            About
                        </Link>
                        <Link href="#" color="text.secondary" sx={{ '&:hover': { color: '#00ff88' } }}>
                            Terms
                        </Link>
                        <Link href="#" color="text.secondary" sx={{ '&:hover': { color: '#00ff88' } }}>
                            Privacy
                        </Link>
                    </Stack>
                </Stack>
            </Container>
        </Box>
    );
}