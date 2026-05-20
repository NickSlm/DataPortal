import React from 'react';
import { Box, Typography, Card, CardMedia } from '@mui/material';
import { useAffixImages } from '../Hooks/useAffixImages';




export default function AffixCollection() {

    const { data: affixData, isLoading } = useAffixImages();

    if (isLoading) {
        return (<Box>asd</Box>);
    }

    return (
        <Box sx={{ m: 1 }}>
            {affixData.map(affix => (
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    p: 1.25,
                    m:1,
                    borderRadius: 2,
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    transition: 'border-color 0.2s',
                    '&:hover': {
                        borderColor: 'rgba(0,255,136,0.2)',
                    },
                }}>
                    <Box
                        component="img"
                        src={affix.imagePath}
                        alt={affix.name}
                        sx={{
                            width: 36,
                            height: 36,
                            borderRadius: 1.5,
                            border: '1px solid rgba(255,255,255,0.1)',
                            flexShrink: 0,
                        }}
                    />
                    <Box sx={{ minWidth: 0 }}>
                        <Typography sx={{
                            fontSize: 12,
                            fontWeight: 600,
                            color: 'rgba(255,255,255,0.85)',
                            lineHeight: 1.3,
                        }}>
                            {affix.name}
                        </Typography>
                        <Typography sx={{
                            fontSize: 10,
                            color: 'rgba(255,255,255,0.35)',
                            lineHeight: 1.4,
                            mt: 0.25,
                        }}>
                            {affix.description}
                        </Typography>
                    </Box>
                </Box>
            
            ))}
        </Box>
    );



}