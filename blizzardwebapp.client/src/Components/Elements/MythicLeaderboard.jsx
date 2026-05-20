import React from 'react';
import { Box, Paper, Typography, Avatar, Chip, Stack, Card, CardContent, Badge, Skeleton } from '@mui/material';
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


function LeaderboardEntry({ entry, isTop }) {
    return (
        <Box
            sx={{
                borderRadius: 1,
                m:1,
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'border-color 0.25s, transform 0.2s',
                backgroundImage: isTop
                    ? `repeating-linear-gradient(0deg, rgba(0,255,157,0.018) 0px, rgba(0,255,157,0.018) 1px, transparent 1px, transparent 8px)`
                    : `repeating-linear-gradient(0deg, rgba(255,255,255,0.012) 0px, rgba(255,255,255,0.012) 1px, transparent 1px, transparent 8px)`,
                backgroundColor: isTop ? '#141d33' : '#11182b',
                '&:hover': {
                    backgroundColor: isTop ? '#18233d' : '#151d31',
                    borderColor: 'rgba(0,255,157,0.2)',
                    transform: 'translateY(-1px)',
                }
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, px: 1.75, pt: 1.375, pb: 1.125 }}>
                <RankBadge ranking={entry.ranking} />

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.75, flex: 1 }}>
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

                    <Box sx={{ width: '1px', height: 24, background: 'rgba(255,255,255,0.07)' }} />

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

            <Box
                sx={{
                    display: 'flex',
                    gap: 0.625,
                    flexWrap: 'wrap',
                    px: 1.75,
                    pt: 0.875,
                    pb: 1.375,
                    borderTop: '1px solid rgba(255,255,255,0.05)',
                }}
            >
                {entry.groupMembers.map((member, idx) => (
                    <Typography
                        key={idx}
                        className="member-chip"
                        sx={{
                            fontSize: 11,
                            color: 'rgba(255,255,255,0.55)',
                            background: 'rgba(255,255,255,0.04)',
                            border: '1px solid rgba(255,255,255,0.07)',
                            borderRadius: 1.25,
                            px: 1,
                            py: 0.25,
                            transition: 'color 0.18s, border-color 0.18s',
                            cursor: 'pointer',
                            '&:hover': {
                                color: '#00ff9d',
                                borderColor: 'rgba(0,255,157,0.3)',
                                background: 'rgba(0,255,157,0.05)',
                            },
                        }}
                    >
                        {member.Name}
                    </Typography>
                ))}
            </Box>
        </Box>
    );
}
function RankBadge({ ranking }) {
    const styles = {
        1: { color: '#f6c344' },
        2: { color: '#ff9f43' },
        3: { color: '#ffe66d' },
    };

    const style = styles[ranking] ?? { color: '#63b3ff' };

    return (
        <Box
            sx={{
                width: 32,
                height: 32,
                borderRadius: 1.5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 16,
                fontWeight: 700,
                flexShrink: 0,
                ...style,
            }}
        >
            #{ranking}
        </Box>
    );
}
const LeaderboardSkeleton = ({ count = 5 }) => {
    return (
        <Box>
            {Array.from({ length: count }).map((_, i) => (
                <Box
                    key={i}
                    sx={{
                        border: '1px solid rgba(0, 255, 157, 0.1)',
                        borderRadius: '12px',
                        margin: 1,
                        background: 'rgba(255,255,255,0.03)',
                    }}
                >
                    <CardContent>
                        {/* Top row: rank badge + keystone + duration */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                            {/* Rank badge */}
                            <Skeleton
                                variant="rounded"
                                width={40}
                                height={40}
                                sx={{ borderRadius: '8px', bgcolor: 'rgba(0,255,157,0.08)' }}
                            />

                            {/* Stats row */}
                            <Box sx={{ display: 'flex', gap: 2, flex: 1, flexWrap: 'wrap' }}>
                                {/* Keystone */}
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                                    <Skeleton variant="circular" width={20} height={20} sx={{ bgcolor: 'rgba(0,255,157,0.08)' }} />
                                    <Skeleton variant="text" width={32} height={22} sx={{ bgcolor: 'rgba(0,255,157,0.08)' }} />
                                </Box>

                                {/* Duration */}
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                                    <Skeleton variant="circular" width={20} height={20} sx={{ bgcolor: 'rgba(0,207,255,0.08)' }} />
                                    <Skeleton variant="text" width={56} height={20} sx={{ bgcolor: 'rgba(0,207,255,0.08)' }} />
                                </Box>
                            </Box>
                        </Box>

                        {/* Players row */}
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                            {Array.from({ length: 5 }).map((_, j) => (
                                <Skeleton
                                    key={j}
                                    variant="rounded"
                                    width={80 + Math.random() * 40} // vary widths so it looks natural
                                    height={30}
                                    sx={{
                                        borderRadius: '6px',
                                        bgcolor: 'rgba(255,255,255,0.05)',
                                    }}
                                />
                            ))}
                        </Box>
                    </CardContent>
                </Box>
            ))}
        </Box>
    );
};
const formatDuration = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

export function MythicLeaderboard({ leaderboardData, loading, image })
{
    if (loading) return <LeaderboardSkeleton/>;

    return (
        <Box>
            {leaderboardData.data?.map((entry) => (
                <LeaderboardEntry entry={entry} isTop={entry.ranking === 1 } />
            ))}
        </Box>
    );
}

export default React.memo(MythicLeaderboard);