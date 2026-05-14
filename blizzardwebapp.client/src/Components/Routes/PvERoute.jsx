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
    Grid
} from '@mui/material';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useState } from 'react';
import { useKeystoneImages } from '../Hooks/useKeystoneImages';
import { useRealms } from '../Hooks/useRealms';
import RealmsSelect from '../Elements/RealmsSelect';
import MythicLeaderboard  from '../Elements/MythicLeaderboard';
import { useMythicLeaderboard } from '../Hooks/useMythicLeaderboard';

export default function PvERoute() {

    const [activeTab, setActiveTab] = useState('Mythics');
    const [selectedRealm, setSelectedRealm] = useState(null);
    const [selectedKeystone, setSelectedKeystone] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const { data: keystoneImages, isLoading } = useKeystoneImages();
    const { realms, loading, error } = useRealms();
    //const { leaderboard, leaderboardLoading, leaderboardError } = useMythicLeaderboard(selectedRealm?.id, selectedKeystone);

    const HandleSelection = (keystone) => {
        setSelectedKeystone(keystone.id),
        setSelectedImage(keystone.imagePath)
    }

    if (!keystoneImages) return <div>No data</div>; 

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <Box sx={{ mx: 'auto', mb: 6, display: 'flex', alignItems:'center' }}>
                <Box sx={{flex:1} }>
                </Box>
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
                    }}>
                    WoW {activeTab} Leaderboards
                </Typography>
                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>

                    <RealmsSelect realms={realms}
                        value={selectedRealm}
                        onChange={setSelectedRealm}
                        loading={loading} />
                </Box>
            </Box>
            <Box sx={{ maxWidth:'fit-content' , mx:'auto',background:"red", mb:6}}>
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
                background:'green',
                gridTemplateColumns: {
                    xs: '1fr',                   
                    md: '1fr 2fr',               
                    lg: '360px 1fr 280px',       
                },
                gridTemplateAreas: {
                    xs: `"left"
             "center"
             "right"`,
                    md: `"left center"
             "left right"`,
                    lg: '"left center right"',
                },
                gap: 3,
                p: 3,
                minHeight: '100vh',
            }}>
                <Box sx={{ gridArea: 'left' }}>
                    <Box sx={{
                        background: 'rgba(15, 18, 41, 0.6)',
                        backdropFilter: 'blur(10px)',
                        p: 2,
                    }}>
                        <Box sx={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(2, 1fr)',
                            gap: 1,
                        }}>
                            {keystoneImages.map(keystone => (
                                <Box
                                    key={keystone.id}
                                    onClick={() => HandleSelection(keystone)}
                                    sx={{
                                        position: 'relative',
                                        cursor: 'pointer',
                                        borderRadius: 2,
                                        overflow: 'hidden',
                                        aspectRatio: '1',
                                        transition: 'all 0.3s ease',
                                        boxShadow: selectedKeystone === keystone.id
                                            ? '0 0 0 3px #00ff88'
                                            : 'none',
                                        '&:hover': {
                                            boxShadow: selectedKeystone === keystone.id
                                                ? '0 0 0 3px #00ff88, 0 4px 12px rgba(0, 255, 136, 0.4)'
                                                : '0 4px 12px rgba(0, 255, 136, 0.2)',
                                        },
                                    }}>

                                    <Box
                                        component="img"
                                        src={keystone.imagePath}
                                        alt={keystone.name}
                                        sx={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            filter: selectedKeystone === keystone.id
                                                ? 'brightness(1)'
                                                : 'brightness(0.8)',
                                            transition: 'filter 0.3s ease',
                                        }}
                                    />

                                    <Box sx={{
                                        position: 'absolute',
                                        bottom: 0,
                                        left: 0,
                                        right: 0,
                                        background: 'linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent)',
                                        p: 1.5,
                                    }}>
                                        <Typography sx={{
                                            color: '#fff',
                                            fontWeight: 600,
                                            fontSize: '0.9rem',
                                        }}>
                                            {keystone.name}
                                        </Typography>
                                    </Box>

                                    {selectedKeystone === keystone.id && (
                                        <Box sx={{
                                            position: 'absolute',
                                            top: 8,
                                            right: 8,
                                            width: 28,
                                            height: 28,
                                            background: '#00ff88',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>
                                            <Typography sx={{
                                                color: '#0f1229',
                                                fontWeight: 700,
                                                fontSize: '1.1rem',
                                            }}>
                                                ✓
                                            </Typography>
                                        </Box>
                                    )}
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ gridArea: 'center' }}>
                    {/*<MythicLeaderboard leaderboardData={leaderboard} loading={leaderboardLoading} image={selectedImage} />*/}
                </Box>
                <Box sx={{ gridArea: 'right' }}><Typography>Affixes</Typography></Box>
            </Box>
        </Container>
    )

}