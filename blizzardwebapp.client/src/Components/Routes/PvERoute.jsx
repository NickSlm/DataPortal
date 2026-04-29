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
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { glassSelectStyle } from '../../Styles/componentStyles';
import { useState } from 'react';
import RealmsSelect from '../Hooks/RealmsSelect';

export default function PvERoute() {

    const [activeTab, setActiveTab] = useState('Mythics');
    const [selectedImage, setSelectedImage] = useState(null);

    const images = import.meta.glob('../../Assets/Dungeon/dungeon_*.jpg', {
        eager: true
    });
    const imageArray = Object.values(images).map(img => img.default);



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
                    WoW {activeTab} Leaderboards
                </Typography>
            </Box>

            <Box sx={{ maxWidth: 'fit-content', mx: 'auto', mb: 6 }}>
                <RealmsSelect />
               
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
                    <Box sx={{
                        position: 'absolute',
                        top: 4,
                        left: activeTab === 'Mythics' ? 4 : 'calc(50% + 2px)',
                        width: 'calc(50% - 6px)',
                        height: 'calc(100% - 8px)',
                        background: 'linear-gradient(135deg, rgba(0, 255, 136, 0.2), rgba(0, 207, 255, 0.15))',
                        borderRadius: 1.5,
                        transition: 'left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        border: '1px solid rgba(0, 255, 136, 0.3)',
                        pointerEvents: 'none',
                    }} />

                    <Button
                        onClick={() => setActiveTab('Mythics')}
                        sx={{
                            px: 4,
                            py: 1.5,
                            borderRadius: 1.5,
                            fontWeight: 600,
                            fontSize: '0.95rem',
                            textTransform: 'none',
                            position: 'relative',
                            zIndex: 1,
                            color: activeTab === 'Mythics' ? '#00ff88' : 'rgba(255, 255, 255, 0.6)',
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
                        onClick={() => setActiveTab('Raids')}
                        sx={{
                            px: 4,
                            py: 1.5,
                            borderRadius: 1.5,
                            fontWeight: 600,
                            fontSize: '0.95rem',
                            textTransform: 'none',
                            position: 'relative',
                            zIndex: 1,
                            color: activeTab === 'Raids' ? '#00ff88' : 'rgba(255, 255, 255, 0.6)',
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
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: {
                    xs: 'repeat(2, 1fr)',
                    sm: 'repeat(3, 1fr)',
                    md: 'repeat(4, 1fr)',
                },
                gap: 2.5,
                p: 2,
            }}>
                {imageArray.map((img, id) => (
                    <Box
                        key={id}
                        onClick={() => setSelectedImage(id)}
                        sx={{
                            position: 'relative',
                            cursor: 'pointer',
                            borderRadius: 2,
                            overflow: 'hidden',
                            aspectRatio: '1',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            boxShadow: selectedImage === id
                                ? '0 0 0 4px #00ff88, 0 8px 32px rgba(0, 255, 136, 0.4)'
                                : '0 4px 16px rgba(0, 0, 0, 0.3)',
                            '&:hover': {
                                transform: 'scale(1.08)',
                                boxShadow: selectedImage === id
                                    ? '0 0 0 4px #00ff88, 0 12px 48px rgba(0, 255, 136, 0.5)'
                                    : '0 8px 32px rgba(0, 255, 136, 0.25)',
                            },
                        }}
                    >
                        {/* Image */}
                        <Box
                            component="img"
                            src={img}
                            alt={id}
                            sx={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                transition: 'transform 0.3s ease, filter 0.3s ease',
                                transform: selectedImage === id ? 'scale(1.05)' : 'scale(1)',
                                filter: selectedImage === id ? 'brightness(1.1)' : 'brightness(0.85)',
                            }}
                        />

                        {/* Overlay */}
                        <Box sx={{
                            position: 'absolute',
                            inset: 0,
                            background: selectedImage === id
                                ? 'linear-gradient(135deg, rgba(0, 255, 136, 0.3), rgba(0, 207, 255, 0.2))'
                                : 'linear-gradient(180deg, transparent 50%, rgba(0, 0, 0, 0.7))',
                            transition: 'all 0.3s ease',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-end',
                            p: 2,
                        }}>
                            {/* Name */}
                            <Typography sx={{
                                color: '#fff',
                                fontWeight: 600,
                                fontSize: '0.95rem',
                                textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)',
                            }}>
                                Academy
                            </Typography>

                            {/* Selected Badge */}
                            {selectedImage === id && (
                                <Box sx={{
                                    position: 'absolute',
                                    top: 12,
                                    right: 12,
                                    width: 32,
                                    height: 32,
                                    background: '#00ff88',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    animation: 'popIn 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                                    '@keyframes popIn': {
                                        '0%': { transform: 'scale(0)', opacity: 0 },
                                        '100%': { transform: 'scale(1)', opacity: 1 },
                                    },
                                }}>
                                    <Typography sx={{
                                        color: '#0f1229',
                                        fontWeight: 700,
                                        fontSize: '1.2rem',
                                    }}>
                                        ✓
                                    </Typography>
                                </Box>
                            )}
                        </Box>
                    </Box>
                ))}
            </Box>
            
        </Container>
    )

}