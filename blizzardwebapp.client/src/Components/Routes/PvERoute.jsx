import {
    Box,
    Grid,
    Container,
    Typography,
    Button
} from '@mui/material';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useKeystoneImages } from '../Hooks/useKeystoneImages';
import { useRealms } from '../Hooks/useRealms';
import RealmsSelect from '../Elements/RealmsSelect';
import AffixCollection from '../Elements/AffixCollection';
import MythicLeaderboard  from '../Elements/MythicLeaderboard';
import { useMythicLeaderboard } from '../Hooks/useMythicLeaderboard';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';

export default function PvERoute() {

    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedRealm, setSelectedRealm] = useState(null);
    const { data: keystoneImages, isLoading } = useKeystoneImages();
    const { realms, loading, error } = useRealms();


    const selectedPage = Number(searchParams.get('page') ?? 1);
    const selectedKeystoneId = Number(searchParams.get('keystone'));
    const selectedKeystoneName = keystoneImages?.find(k => k.id === selectedKeystoneId)?.name ?? null;
    const selectedImage = keystoneImages?.find(k => k.id === selectedKeystoneId)?.imagePath ?? null;

    const { leaderboard, loading: leaderboardLoading, error: leaderboardError } = useMythicLeaderboard(selectedRealm?.id, selectedKeystoneId, selectedPage);


    const HandleSelection = (keystone) => {

        setSearchParams(prev => {
            prev.set('keystone', keystone.id);
            prev.set('page', '1');
            return prev;
        });
    }
    const HandlePagination = (event, value) => {
        setSearchParams(prev => {
            prev.set('page', value);
            return prev;
        })
    }


    if (!keystoneImages) return <div>No data</div>; 

    return (
        <Container maxWidth="xl" sx={{ py: 4}}>
            <Grid container spacing={2}>
                <Grid size={{ xs: 12 }} sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    mb:6
                }}>      
                    <Box sx={{ display: 'flex', flexDirection: 'column', mx:1 }}>
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

                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>  
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        mx: 1,
                        mb: 2,
                    }}>
                        <Typography sx={{
                            fontSize: 10,
                            fontWeight: 700,
                            letterSpacing: '1.5px',
                            textTransform: 'uppercase',
                            color: 'rgba(0, 255, 136, 0.5)',
                        }}>
                            {selectedKeystoneName ?? 'Pick a dungeon'}
                        </Typography>

                        <RealmsSelect
                            realms={realms}
                            value={selectedRealm}
                            onChange={setSelectedRealm}
                            loading={loading}
                        />
                    </Box>
                    <Box sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: 1,
                        margin:1
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
                                boxShadow: selectedKeystoneId === keystone.id
                                    ? '0 0 0 3px #00ff88'
                                    : 'none',
                                '&:hover': {
                                    boxShadow: selectedKeystoneId === keystone.id
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
                                    filter: selectedKeystoneId === keystone.id
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

                            {selectedKeystoneId === keystone.id && (
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
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 6 }}>  
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: 1 }}>
                        <Pagination
                            count={leaderboard.totalPages}
                            showFirstButton
                            showLastButton
                            page={selectedPage}
                            onChange={HandlePagination}
                        />
                        <Typography sx={{ fontSize: 10, color: 'rgba(255,255,255,0.18)' }}>
                            Last update {
                                leaderboard?.lastFetchTime
                                    ? new Date(leaderboard.lastFetchTime)
                                        .toISOString()
                                        .slice(0, 19)
                                        .replace('T', ' ')
                                    : 'N/A'
                            }
                        </Typography>
                    </Box>
                    <MythicLeaderboard leaderboardData={leaderboard} loading={leaderboardLoading} image={selectedImage} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <AffixCollection/>
                </Grid>
            </Grid>
        </Container>
    )

}