import { Box, Typography} from '@mui/material';
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
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'end',
                            gap: 1.5,
                            m: 1,
                        }}>
                            <Box
                                component="img"
                                src={data.avatar }
                                sx={{
                                    width: 48,
                                    height: 48,
                                    borderRadius: 2,
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    flexShrink: 0,
                                }}
                            />
                            <Box sx={{ minWidth: 0}}>
                                <Typography sx={{
                                    fontSize: 12,
                                    fontWeight: 600,
                                    color: 'rgba(255,255,255,0.85)',
                                    lineHeight: 1.3,
                                }}>
                                    Realm - {player.realm}
                                </Typography>
                                <Typography sx={{
                                    fontSize: 16,
                                    color: 'green',
                                    lineHeight: 1.4,
                                    mt: 0.25,
                                }}>
                                    {player.name}
                                </Typography>
                            </Box>
                        </Box>
                        {data.pvpStatistics.pvp_map_statistics.map(entry => (
                        
                            <Field label={entry.world_map.name["en_US"]} value={entry.match_statistics.played} />
                        ))}
                </>
            )}
        </Box>



    );
}