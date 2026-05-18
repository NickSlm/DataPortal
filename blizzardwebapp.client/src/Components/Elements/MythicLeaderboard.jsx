import React from 'react';
import { Box, Paper, Typography, Avatar, Chip, Stack, Card, CardContent, Badge } from '@mui/material';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import KeystoneIcon from '../../Assets/Misc/inv_relics_hourglass.jpg';
import HourglassIcon from '../../Assets/Misc/ability_mage_timewarp.jpg';
import TimerIcon from '@mui/icons-material/Timer';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import bgImage from '../../Assets/Dungeon/dungeon_Windrunner Spire.jpg';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


const PlayerName = styled(Typography)(
    {
        fontWeight: 600,
        fontSize: '16px',
        color: '#fff',
        textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
    }
)

const TimeChip = styled(Chip)({
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: '13px',
    height: '26px',
    '& .MuiChip-icon': {
        color: 'rgba(255, 255, 255, 0.6)',
    }
});

const LeaderboardEntry = styled(Card)(
    {
        backgroundSize: "cover",
        backgroundPosition: "center"
    }
);
    


export function MythicLeaderboard({ leaderboardData, loading, image })
{

    const formatDuration = (ms) => {
        const totalSeconds = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    if (loading) return <div>Loading...</div>;



    return (
        <Box>

           
            {leaderboardData.data?.map((entry) => (
                <LeaderboardEntry sx={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.5), 
                        rgba(0,0,0,0.5)),url("${encodeURI(image)}")`,
                    border: '1px solid rgba(0, 255, 157, 0.3)',
                    borderRadius: '12px',
                    margin:1
                    }}>

                    <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                            {/* Rank Badge */}
                            <Box sx={{
                                minWidth: 40,
                                height: 40,
                                borderRadius: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',

                                fontWeight: 'bold',
                                fontSize: '18px',
                                color:'#00ff9d',
                                
                            }}>
                                #{entry.ranking}
                            </Box>

                            {/* Stats - Horizontal */}
                            <Box sx={{ display: 'flex', gap: 2, flex: 1, flexWrap: 'wrap' }}>
                                {/* Keystone */}
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                                    <img
                                        src={KeystoneIcon}
                                        alt=""
                                        style={{
                                            width: 20,
                                            height: 20,
                                            filter: 'drop-shadow(0 0 4px rgba(0, 255, 157, 0.6))'
                                        }}
                                    />
                                    <Typography sx={{
                                        color: '#00ff9d',
                                        fontWeight: 700,
                                        fontSize: '15px',
                                    }}>
                                        +{entry.keystoneLevel}
                                    </Typography>
                                </Box>

                                {/* Duration */}
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                                    <img
                                        src={HourglassIcon}
                                        alt=""
                                        style={{
                                            width: 20,
                                            height: 20,
                                            filter: 'drop-shadow(0 0 4px rgba(0, 207, 255, 0.6))'
                                        }}
                                    />
                                    <Typography sx={{
                                        color: '#00cfff',
                                        fontWeight: 600,
                                        fontSize: '14px',
                                    }}>
                                        {formatDuration(entry.duration)}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                        {/* Players Row */}
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                            {entry.groupMembers.map((member, idx) => (
                                <Box
                                    key={idx}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 0.5,
                                        px: 1.5,
                                        py: 0.5,
                                        background: 'rgba(0, 0, 0, 0.3)',
                                        borderRadius: '6px',
                                        border: '1px solid rgba(255, 255, 255, 0.1)',
                                        transition: 'all 0.2s',
                                        '&:hover': {
                                            background: 'rgba(0, 255, 157, 0.05)',
                                            borderColor: 'rgba(0, 255, 157, 0.3)',
                                        }
                                    }}>
                                    <Typography sx={{
                                        fontSize: '13px',
                                        color: '#fff',
                                        fontWeight: 500,
                                    }}>
                                        {member.Name}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </CardContent>
                </LeaderboardEntry>
            ))}
        </Box>
    );
}

export default React.memo(MythicLeaderboard);