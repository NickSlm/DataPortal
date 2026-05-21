import { Box, Typography } from '@mui/material';

export function FilterPill({ label, active, onClick }) {
    return (
        <Box
            onClick={onClick}
            sx={{
                px: 1.5,
                py: 0.5,
                borderRadius: 1,
                border: '1px solid',
                borderColor: active ? 'rgba(0,255,136,0.4)' : '#1f2937',
                background: active ? 'rgba(0,255,136,0.05)' : '#111827',
                color: active ? '#00ff88' : '#4b5563',
                fontFamily: 'monospace',
                fontSize: 11,
                cursor: 'pointer',
                userSelect: 'none',
                transition: 'all 0.15s',
                '&:hover': {
                    borderColor: active ? 'rgba(0,255,136,0.6)' : 'rgba(255,255,255,0.1)',
                    color: active ? '#00ff88' : '#6b7280',
                },
            }}
        >
            {label}
        </Box>
    );
}