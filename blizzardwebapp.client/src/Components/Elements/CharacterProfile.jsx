import { useState, useEffect } from 'react';
import { Box, Typography, Skeleton, Divider, IconButton, Button, Chip, CircularProgress } from '@mui/material';
import { useCharacterProfile } from '../Hooks/useCharacterProfile';
import DownloadIcon from "@mui/icons-material/Download";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";
import { classColors, factionColors, factionBgColors, factionBorderColors } from '../../Styles/componentStyles';
import LoadoutExport from './LoadoutExport';

const mono = { fontFamily: 'monospace' };

const SkeletonBlock = ({ width, height, borderRadius = 4, delay = 0, sx = {} }) => (
    <Box
        sx={{
            width,
            height,
            borderRadius: `${borderRadius}px`,
            background: "rgba(255,255,255,0.08)",
            animation: "pulse 1.6s ease-in-out infinite",
            animationDelay: `${delay}s`,
            "@keyframes pulse": {
                "0%, 100%": { opacity: 0.4 },
                "50%": { opacity: 0.9 },
            },
            ...sx,
        }}
    />
);
const ProfileSkeleton = () => {
    return (
        <Box
            sx={{
                minHeight: 300,
                fontFamily: "monospace",
                background: "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.07) 100%)",
                borderRadius: "12px",
                overflow: "hidden",
            }}
        >
            <Box sx={{ height: "6px", background: "rgba(0,207,255,0.15)" }} />

            <Box sx={{ display: "flex", alignItems: "flex-end", p: 1.5, gap: 1.25 }}>
                <SkeletonBlock width={52} height={52} borderRadius={6} delay={0} />
                <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
                    <SkeletonBlock width="70%" height={14} delay={0.15} />
                    <SkeletonBlock width="45%" height={10} delay={0.15} />
                </Box>
                <SkeletonBlock width={40} height={40} borderRadius={6} delay={0.3} />
            </Box>

            <Box sx={{ display: "flex", gap: 0.75, px: 1.5, pb: 1.5 }}>
                <SkeletonBlock width={58} height={22} borderRadius={20} delay={0.15} />
                <SkeletonBlock width={50} height={22} borderRadius={20} delay={0.3} />
                <SkeletonBlock width={70} height={22} borderRadius={20} delay={0.45} />
            </Box>

            <Divider sx={{ borderColor: "rgba(255,255,255,0.05)", mx: 1.5, mb: 1.5 }} />

            <Box sx={{ px: 1.5, display: "flex", flexDirection: "column", gap: 1.25 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <SkeletonBlock width="40%" height={11} delay={0.3} />
                    <SkeletonBlock width="20%" height={11} delay={0.45} />
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <SkeletonBlock width="50%" height={11} delay={0.45} />
                    <SkeletonBlock width="20%" height={11} delay={0.6} />
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <SkeletonBlock width="45%" height={11} delay={0.6} />
                    <SkeletonBlock width="22%" height={11} delay={0} />
                </Box>
            </Box>

            <Divider sx={{ borderColor: "rgba(255,255,255,0.05)", mx: 1.5, my: 1.5 }} />

            <Box sx={{ px: 1.5, pb: 2 }}>
                <SkeletonBlock width="100%" height={34} borderRadius={6} delay={0.15} />
            </Box>
        </Box>
    );
}
const ProfileStats = ({ data }) => {
    const classStyle = classColors[data.profile.character_class.name["en_US"]] ?? '#FFFFFF';
    const factionStyle = factionColors[data.profile.faction.name["en_US"]] ?? '#FFFFFF';

    return (
        <Box sx={{
            display: 'flex', alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            justifyContent: 'start', position: 'relative',
        height:36}}>
            <Typography sx={{ fontSize: 16, m: 1, ...factionStyle }}>{data.profile.faction.name["en_US"]}</Typography>
            <Typography sx={{ fontSize: 16, m: 1, ...classStyle }}>{data.profile.character_class.name["en_US"]}</Typography>
            <Typography sx={{ color: '#4b5563', fontSize: 16, m: 1 }}>{data.profile.active_spec.name["en_US"]}</Typography>
        </Box>
    );
}
function Field({ label, value, color = '#e0e0e0' }) {
    return (
        <Box sx={{ display: 'flex', gap: 1, m: 1, justifyContent:'space-between' }}>
            <Typography sx={{ ...mono, fontSize: 14, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {label}
            </Typography>
            <Typography sx={{ ...mono, fontSize: 14, fontWeight: 600, color }}>
                {value}
            </Typography>

        </Box>
    );
}





export function CharacterProfile({ player }) {

    const { data, isLoading, isFetching } = useCharacterProfile(player.name, player.realm);
    const [loadout, setLoadout] = useState(null);
    const [open, setOpen] = useState(false);
    const [copied, setCopied] = useState(false);



    if (isFetching) return (<Box sx={{
        position: "absolute",
        inset: 0,
        background: "rgba(0,0,0,0.45)",
        borderRadius: "12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10,
    }}>
        <CircularProgress size={28} sx={{ color: "#00cfff" }} />
    </Box>);

    const factionBgStyle = factionBgColors[data.profile.faction.name["en_US"]] ?? '#FFFFFF';
    const factionBorderStyle = factionBorderColors[data.profile.faction.name["en_US"]] ?? '#FFFFFF';

    const handleViewLoadout = async () => {
        const spec = data.profile.active_spec.name["en_US"];
        const res = await fetch(`http://127.0.0.1:5201/pvp/loadout/character/${player.name}/realm/${player.realm}/spec/${spec}`);
        const { loadoutCode } = await res.json();
        setLoadout(loadoutCode)
        setOpen((status) => !status);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(loadout);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }


    return (

        <Box sx={{
            minHeight: 300,
            fontFamily: 'monospace',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.07) 100%)'
        }}>
            <Box sx={{
                alignItems: 'center',
                justifyContent:'center',
                ...factionBgStyle
            }}>
                <Box sx={{ display: 'flex', alignItems:'end' }}>
                <Box
                    component="img"
                    src={data.avatar}
                    sx={{
                        width: 60,
                        height: 60,
                        m:1,
                        flexShrink: 0,
                        ...factionBorderStyle
                    }}
                />
                <Box sx={{ m: 1, flex: 1}}>
                    <Typography sx={{
                        fontSize: '16px',
                        fontWeight: 700,
                        color: '#ffffff',
                        letterSpacing: '0.04em',
                        textShadow: '0 0 12px rgba(255,255,255,0.15)'}}>{player.name}</Typography>
                    <Typography sx={{
                        fontSize: '12px',
                        fontWeight: 400,
                        color: 'rgba(255,255,255,0.45)',
                        letterSpacing: '0.02em'}}>{player.realm}</Typography>
                </Box>
                <Box
                    component="img"
                    src={`src/Assets/Classes/${data?.profile.character_class.name["en_US"]}.png`}
                    sx={{
                        width: 48,
                        height: 48,
                        m: 1,
                        flexShrink: 0,
                    }}
                />
                </Box>
            <ProfileStats data={data} />
            </Box>
            <Field label="Level" value={data.profile.level} />
            <Field label="Item Level" value={data.profile.average_item_level} />
            <Box sx={{ display: 'flex', gap: 1, m: 1, justifyContent:'space-between' }}>   
                <Typography sx={{ ...mono, fontSize: 14, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Achievements
                </Typography>
                <Typography sx={{ ...mono, fontSize: 14, fontWeight: 600, color:'#ffd662' }}>
                    {data.profile.achievement_points}
                </Typography>
            </Box>
            <Divider variant="middle" />

            {/*Export loadout*/}
            <Box sx={{ m: 1, display: 'flex', flexDirection: 'column' }}>
                <Button
                    onClick={handleViewLoadout}
                    startIcon={<DownloadIcon sx={{ fontSize: 15 }} />}
                    sx={{
                        px: 1.75,
                        py: 1,
                        background: "transparent",
                        border: "1px solid rgba(0,255,136,0.35)",
                        borderRadius: "6px",
                        color: "#00ff88",
                        fontSize: "12px",
                        fontWeight: 600,
                        letterSpacing: "0.8px",
                        textTransform: "uppercase",
                        "&:hover": {
                            background: "rgba(0,255,136,0.07)",
                            borderColor: "rgba(0,255,136,0.6)",
                        },
                    }}
                >
                    Export Loadout
                </Button>

                {open && (
                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        mt: 1,
                        mb: 1,
                        px: 1.5,
                        pr: 0.5,
                        gap: 1,
                        background: "rgba(0,0,0,0.35)",
                    }} >
                        <Typography
                            sx={{
                                flex: 1,
                                py: 1.25,
                                fontFamily: "Consolas, monospace",
                                fontSize: "10.5px",
                                color: "rgba(0,255,136,0.8)",
                                wordBreak: "break-all",
                                lineHeight: 1.6,
                            }}
                        >
                            {loadout}
                        </Typography>
                        <IconButton
                            onClick={handleCopy}
                            size="small"
                            aria-label="Copy loadout string"
                            sx={{
                                color: copied ? "#00ff88" : "rgba(0,207,255,0.5)",
                                borderRadius: "4px",
                                "&:hover": {
                                    background: "rgba(0,207,255,0.1)",
                                    color: "#00cfff",
                                },
                            }}
                        >
                            {copied ? (
                                <CheckIcon sx={{ fontSize: 15 }} />
                            ) : (
                                <ContentCopyIcon sx={{ fontSize: 15 }} />
                            )}
                        </IconButton>
                    </Box>
                )}

            </Box>
            
        </Box>
    );
}