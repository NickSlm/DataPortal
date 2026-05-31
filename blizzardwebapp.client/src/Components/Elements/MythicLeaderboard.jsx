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
                m: 1,
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'border-color 0.25s, transform 0.2s',
                border: '1px solid',
                borderColor: isTop ? '#b8860b44' : '#b8860b22',
                background: isTop
                    ? 'linear-gradient(135deg, #241c08 0%, #1a1205 50%, #0f0d06 100%)'
                    : 'linear-gradient(135deg, #1a1408 0%, #131008 60%, #0f0d06 100%)',
                '&:hover': {
                    borderColor: isTop ? '#d4a52066' : '#b8860b44',
                    background: isTop
                        ? 'linear-gradient(135deg, #2c2209 0%, #1e1608 50%, #141008 100%)'
                        : 'linear-gradient(135deg, #1e1a0a 0%, #171208 60%, #111008 100%)',
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
const LeaderboardSkeleton = ({ count = 5, isTop = false }) => {
    return (
        <Box>
            {Array.from({ length: count }).map((_, i) => (
                <Box
                    sx={{
                        borderRadius: 1,
                        m: 1,
                        overflow: 'hidden',
                        borderColor: isTop ? '#b8860b44' : '#b8860b22',
                        backgroundColor: isTop ? '#1e1608' : '#16120a',
                        '&:hover': {
                            backgroundColor: isTop ? '#241c0a' : '#1a1508',
                            borderColor: isTop ? '#d4a52066' : '#b8860b44',
                            transform: 'translateY(-1px)',
                        },
                        border: '1px solid rgba(255,255,255,0.06)',
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, px: 1.75, pt: 1.375, pb: 1.125 }}>
                        <Skeleton variant="circular" width={28} height={28} sx={{ bgcolor: 'rgba(255,255,255,0.07)', flexShrink: 0 }} />

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.75, flex: 1 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                                <Skeleton variant="rounded" width={20} height={20} sx={{ bgcolor: 'rgba(255,255,255,0.07)' }} />
                                <Skeleton variant="rounded" width={36} height={14} sx={{ bgcolor: 'rgba(255,255,255,0.07)' }} />
                            </Box>

                            <Box sx={{ width: '1px', height: 24, background: 'rgba(255,255,255,0.07)' }} />

                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                                <Skeleton variant="rounded" width={20} height={20} sx={{ bgcolor: 'rgba(255,255,255,0.07)' }} />
                                <Skeleton variant="rounded" width={52} height={13} sx={{ bgcolor: 'rgba(255,255,255,0.07)' }} />
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
                        {[64, 72, 56, 80, 60].map((w, i) => (
                            <Skeleton
                                key={i}
                                variant="rounded"
                                width={w}
                                height={22}
                                sx={{ bgcolor: 'rgba(255,255,255,0.06)', borderRadius: 1.25 }}
                            />
                        ))}
                    </Box>
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
    if (!leaderboardData.data) return <LeaderboardSkeleton />;

    return (
        <Box>
            {leaderboardData.data?.map((entry) => (
                <LeaderboardEntry entry={entry} isTop={entry.ranking === 1 } />
            ))}
        </Box>
    );
}

export default React.memo(MythicLeaderboard);