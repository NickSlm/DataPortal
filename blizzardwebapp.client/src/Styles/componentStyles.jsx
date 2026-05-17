export const glassSelectStyle = {
    FormControl: {
        width: 180,

        ml:2
    },

    autocomplete: {
        '& .MuiInputBase-root': {
            background: 'rgba(255,255,255,0.04)',
            borderRadius: '8px',
            color: 'rgba(255,255,255,0.7)',
            fontSize: '13px',
            paddingY: '2px',
        },
        '& .MuiOutlinedInput-notchedOutline': {
            border: 'none',
        },
        '& .MuiInputBase-root:hover .MuiOutlinedInput-notchedOutline': {
            border: 'none',
        },
        '& .MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            border: '1px solid rgba(0, 255, 136, 0.25)',
        },
        '& .MuiInputLabel-root': {
            color: 'rgba(255,255,255,0.25)',
            fontSize: '13px',
        },
        '& .MuiInputLabel-root.Mui-focused': {
            color: '#00ff88',
        },
        '& .MuiSvgIcon-root': {
            color: 'rgba(255,255,255,0.3)',
        },
        '& .MuiAutocomplete-clearIndicator': {
            color: 'rgba(255,255,255,0.3)',
        },
    },

    slotProps: {
        paper: {
            sx: {
                background: 'rgba(15, 18, 41, 0.95)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '8px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                color: 'rgba(255,255,255,0.7)',
                fontSize: '13px',

                '& .MuiAutocomplete-option': {
                    fontSize: '13px',
                    color: 'rgba(255,255,255,0.7)',
                    '&:hover': {
                        background: 'rgba(0,255,136,0.07)',
                    },
                    '&[aria-selected="true"]': {
                        background: 'rgba(0,255,136,0.1)',
                        color: '#00ff88',
                    },
                },
            },
        },
    },
};