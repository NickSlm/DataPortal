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
    Tab,
} from '@mui/material';
import { useState } from 'react';


export default function PvERoute() {

    const [activeTab, setActiveTab] = useState('');

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <Box sx={{ maxWidth: 'fit-content', mx: 'auto', mb: 6 }}>
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 300,
                        fontSize: { xs: '2rem', md: '2.5rem' },
                        background: 'linear-gradient(135deg, #00ff88 0%, #00cfff 50%, #a855f7 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        letterSpacing: '-0.02em',
                        position: 'relative',
                        '&::after': {
                            content: '""',
                            position: 'absolute',
                            bottom: -8,
                            left: 0,
                            width: 60,
                            height: 4,
                            background: 'linear-gradient(90deg, #00ff88, transparent)',
                            borderRadius: 2,
                        }
                    }}
                >
                    WoW PvE Leaderboards
                </Typography>
            </Box>

            <Box sx={{ maxWidth:'fit-content' , mx:'auto', mb:6}}>
                <Box sx={{
                    position: 'relative',
                    display: 'inline-flex',
                    p: 0.5,
                    gap: 1,
                    background: 'rgba(15, 18, 41, 0.6)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(0, 255, 136, 0.15)',
                    borderRadius: 2,
                }}>
                    {/* Sliding background indicator */}
                    <Box sx={{
                        position: 'absolute',
                        top: 4,
                        left: activeTab === 'tab1' ? 4 : 'calc(50% + 2px)',
                        width: 'calc(50% - 6px)',
                        height: 'calc(100% - 8px)',
                        background: 'linear-gradient(135deg, rgba(0, 255, 136, 0.2), rgba(0, 207, 255, 0.15))',
                        borderRadius: 1.5,
                        transition: 'left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        border: '1px solid rgba(0, 255, 136, 0.3)',
                        pointerEvents: 'none',
                    }} />

                    <Button
                        onClick={() => setActiveTab('tab1')}
                        sx={{
                            px: 4,
                            py: 1.5,
                            borderRadius: 1.5,
                            fontWeight: 600,
                            fontSize: '0.95rem',
                            textTransform: 'none',
                            position: 'relative',
                            zIndex: 1,
                            color: activeTab === 'tab1' ? '#00ff88' : 'rgba(255, 255, 255, 0.6)',
                            transition: 'color 0.3s ease',
                            minWidth: 140,
                            '&:hover': {
                                color: '#fff',
                                background: 'rgba(0, 255, 136, 0.05)',
                            },
                        }}
                    >
                        Mythics
                    </Button>
                    <Button
                        onClick={() => setActiveTab('tab2')}
                        sx={{
                            px: 4,
                            py: 1.5,
                            borderRadius: 1.5,
                            fontWeight: 600,
                            fontSize: '0.95rem',
                            textTransform: 'none',
                            position: 'relative',
                            zIndex: 1,
                            color: activeTab === 'tab2' ? '#00ff88' : 'rgba(255, 255, 255, 0.6)',
                            transition: 'color 0.3s ease',
                            minWidth: 140,
                            '&:hover': {
                                color: '#fff',
                                background: 'rgba(0, 255, 136, 0.05)',
                            },
                        }}
                    >
                        Raids
                    </Button>
                </Box>

            </Box>
        </Container>
    )

}