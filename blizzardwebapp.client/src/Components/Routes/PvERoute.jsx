import {
    Box,
    Container,
    Typography,
    Button
} from '@mui/material';

import { useState } from 'react';
import { useKeystoneImages } from '../Hooks/useKeystoneImages';
import { useRealms } from '../Hooks/useRealms';
import RealmsSelect from '../Elements/RealmsSelect';
import AffixCollection from '../Elements/AffixCollection';
import MythicLeaderboard  from '../Elements/MythicLeaderboard';
import { useMythicLeaderboard } from '../Hooks/useMythicLeaderboard';

export default function PvERoute() {

    const [activeTab, setActiveTab] = useState('Players');
    const [selectedRealm, setSelectedRealm] = useState(null);
    const [selectedKeystone, setSelectedKeystone] = useState(null);
    const [selectedKeystoneName, setSelectedKeystoneName] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const { data: keystoneImages, isLoading } = useKeystoneImages();
    const { realms, loading, error } = useRealms();
    const { leaderboard, leaderboardLoading, leaderboardError } = useMythicLeaderboard(selectedRealm?.id, selectedKeystone, 1);



    const HandleSelection = (keystone) => {
        setSelectedKeystone(keystone.id),
        setSelectedKeystoneName(keystone.name),
        setSelectedImage(keystone.imagePath)
    }

    if (!keystoneImages) return <div>No data</div>; 

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>

        <Box>
                <Box sx={{ px: 5, pt: 5, pb: 5}}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.75 }}>
                        <Box>
                            <Typography sx={{ fontSize: 14, fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(0,255,136,0.45)', mb: 0.75 }}>
                                Leaderboards
                            </Typography>
                            <Typography sx={{ fontSize: 26, fontWeight: 200, letterSpacing: '-0.5px', color: 'rgba(255,255,255,0.9)' }}>
                                Who's{' '}
                                <Box component="span" sx={{ fontWeight: 700, background: 'linear-gradient(135deg,#00ff88 0%,#00cfff 60%,#a855f7 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                    pumping keys
                                </Box>
                                {' '}this week?
                            </Typography>
                        </Box>
                        <RealmsSelect realms={realms}
                            value={selectedRealm}
                            onChange={setSelectedRealm}
                            loading={loading} />
                    </Box>


               
                </Box>

                <Box sx={{ px: 5, pt: 2.5, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box sx={{ display: 'flex', background: 'rgba(255,255,255,0.04)', borderRadius: 1.5, p: 0.4, gap: 0.25 }}>
                    {['Solo', 'Party'].map(t => (
                        <Button key={t} onClick={() => setActiveTab(t)} sx={{
                            fontSize: 11, fontWeight: 600, textTransform: 'none', px: 2.25, py: 0.6, borderRadius: 1.25,
                            color: activeTab === t ? '#00ff88' : 'rgba(255,255,255,0.3)',
                            background: activeTab === t ? 'rgba(0,255,136,0.1)' : 'transparent',
                            '&:hover': { background: activeTab === t ? 'rgba(0,255,136,0.1)' : 'rgba(255,255,255,0.04)' },
                        }}>{t}</Button>
                    ))}
                </Box>
              
               
                <Box sx={{ flex: 1 }} />

                <Box sx={{ display: 'flex', gap: 0.75 }}>
                    Affixes go here
                </Box>
            </Box>
            <Box sx={{ px: 5, pt: 2.5, pb:2, display: 'flex', gap: 1, overflowX: 'auto', scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' } }}>
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
                                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                                //background: 'linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent)',
                                p: 1.5,
                            }}>
                                <Typography sx={{
                                    color: '#fff',
                                    fontWeight: 600,
                                    fontSize: '12px',
                                    letterSpacing: '0.02em',
                                    textShadow: '0 1px 4px rgba(0,0,0,0.6)',
                                    lineHeight: 1.2,
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis'
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
                <Box sx={{ px: 5, pt: 2.5, pb: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.75 }}>
                        <Typography sx={{ fontSize: 10, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.18)' }}>
                            {selectedKeystoneName} - { selectedRealm?.name}
                        </Typography>
                        <Typography sx={{ fontSize: 10, color: 'rgba(255,255,255,0.18)' }}>ADD LAST UPDATE TO DB</Typography>
                    </Box>

                    <MythicLeaderboard leaderboardData={leaderboard} loading={leaderboardLoading} image={selectedImage}/>
                 </Box>
            </Box>
        </Container>
    )

}