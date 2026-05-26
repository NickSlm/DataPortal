import { Box, Typography, Skeleton} from '@mui/material';
import { useCharacterProfile } from '../Hooks/useCharacterProfile';

const mono = { fontFamily: 'monospace' };

function Field({ label, value, color = '#d1d5db' }) {
    return (
        <Box sx={{ display: 'flex', gap: 1, mb: 0.75 }}>
            <Typography sx={{ ...mono, fontSize: 14, color: '#4b5563', minWidth: 64 }}>
                {label}
            </Typography>
            <Typography sx={{ ...mono, fontSize: 14, color }}>
                {value}
            </Typography>
        </Box>
    );
}
export function CharacterProfile({ player }) {

    const { data, loading, error } = useCharacterProfile(player.name, player.realm);

    if (loading || !data?.profile) return <Skeleton/>

    return (
        <Box sx={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid #1f2937',
            borderRadius: 1,
            p: 2,
            minHeight: 300,
            fontFamily: 'monospace',
        }}>
            {!player ? (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 200 }}>
                    <Typography sx={{ ...mono, fontSize: 11, color: '#374151' }}>
                        Select Character
                    </Typography>
                </Box>
            ) : (
                  <>
                        <Box>
                            <Box sx={{ background:'lightblue' }}>
                                <Box
                                    component="img"
                                    src={`src/Assets/Classes/${data?.profile.character_class.name["en_US"]}.png`}
                                    sx={{
                                        width: 48,
                                        height: 48,
                                        flexShrink: 0,
                                    }}
                                />
                                <Box
                                    component="img"
                                    src={data.avatar}
                                    sx={{
                                        width: 48,
                                        height: 48,
                                        borderRadius: 2,
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        flexShrink: 0,
                                    }}
                                />
                                <Typography sx={{
                                    fontSize: 16,
                                    color: 'green',
                                    lineHeight: 1.4,
                                    mt: 0.25,
                                }}>
                                    {data.name} - {data.realm }
                                </Typography>
                            </Box>

                            <Box sx={{ minWidth: 0, background:'gray' }}>

                                <Typography>{`LVL: ${data.profile.level}`}</Typography>
                                <Typography>{`Achievements: ${data.profile.achievement_points}`}</Typography>
                                <Typography>{`Spec: ${data.profile.active_spec.name["en_US"]}`}</Typography>
                                <Typography>{`Faction: ${data.profile.faction.name["en_US"]}`}</Typography>
                                <Typography>{`ILVL: ${data.profile.average_item_level}`}</Typography>

                            </Box>
                        </Box>

                  </>
            )}
        </Box>
    );
}