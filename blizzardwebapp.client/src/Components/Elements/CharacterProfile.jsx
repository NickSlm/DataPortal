import { Box, Typography, Skeleton, Divider} from '@mui/material';
import { useCharacterProfile } from '../Hooks/useCharacterProfile';
import { classColors, factionColors, factionBgColors, factionBorderColors } from '../../Styles/componentStyles';

const mono = { fontFamily: 'monospace' };



const ProfileSkeleton = () => {
    return (
        <Box sx={{
            border: '2px solid rgba(255,255,255,0.7)',
            borderRadius: 1,
            p: 1,
            minHeight: 300,

            fontFamily: 'monospace',
        }}>
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 200 }}>
        <Typography sx={{ ...mono, fontSize: 11, color: '#374151' }}>
            Select Character
        </Typography>
            </Box>
        </Box>
    );
}
const ProfileStats = ({ data }) => {
    const classStyle = classColors[data.profile.character_class.name["en_US"]] ?? '#FFFFFF';
    const factionStyle = factionColors[data.profile.faction.name["en_US"]] ?? '#FFFFFF';

    return (
        <Box sx={{ m: '2px', display: 'flex', alignItems: 'center', justifyContent:'center' }}>
            <Typography sx={{ fontSize: 16, m: 1, ...factionStyle }}>{data.profile.faction.name["en_US"]}</Typography>
            <Typography sx={{ fontSize: 16, m: 1, ...classStyle }}>{data.profile.character_class.name["en_US"]}</Typography>
            <Typography sx={{ color: '#4b5563', fontSize: 16, m: 1 }}>{data.profile.active_spec.name["en_US"]}</Typography>
        </Box>
    );
}

function Field({ label, value, color = '#e0e0e0' }) {
    return (
        <Box sx={{ display: 'flex', gap: 1, m:1 }}>
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

    const { data, loading, error } = useCharacterProfile(player.name, player.realm);

    if (loading || !data?.profile) return <ProfileSkeleton />


    const factionBgStyle = factionBgColors[data.profile.faction.name["en_US"]] ?? '#FFFFFF';
    const factionBorderStyle = factionBorderColors[data.profile.faction.name["en_US"]] ?? '#FFFFFF';

    return (
        <Box sx={{
            minHeight: 300,
            fontFamily: 'monospace',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.07) 100%)'

        }}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent:'center',
                ...factionBgStyle
            }}>
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
            <Field label="Level" value={data.profile.level} />
            <Field label="Item Level" value={data.profile.average_item_level} />
            <Divider variant="middle" />
            <Box sx={{ display: 'flex', gap: 1, m: 1, justifyContent:'center' }}>
                <Typography sx={{ ...mono, fontSize: 14, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Achievements
                </Typography>
                <Typography sx={{ ...mono, fontSize: 14, fontWeight: 600, color:'#ffd662' }}>
                    {data.profile.achievement_points}
                </Typography>
            </Box>
        </Box>
    );
}