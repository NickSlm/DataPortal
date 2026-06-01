export const glassSelectStyle = {
    FormControl: {
        width: 180,
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
export const classColors = {
    "Death Knight": { color: '#C41E3A' },
    "Demon Hunter": { color: '#A330C9' },
    "Druid": { color: '#FF7C0A' },
    "Evoker": { color: '#33937F' },
    "Hunter": { color: '#AAD372' },
    "Mage": { color: '#3FC7EB' },
    "Monk": { color: '#00FF98' },
    "Paladin": { color: '#F48CBA' },
    "Priest": { color: '#FFFFFF' },
    "Rogue": { color: '#FFF468' },
    "Shaman": { color: '#0070DD' },
    "Warlock": { color: '#8788EE' },
    "Warrior": { color: '#C69B6D' }
};
export const factionColors = {
    "Horde": { color:'#ff6b6b '},
    "Alliance": { color:'#7eb8f7 ' }
};
export const factionBgColors = {
    "Horde": { background: 'linear-gradient(160deg, #3d0a0a 0%, #6b1414 50%, #4a0e0e 100%)' },
    "Alliance": { background: 'linear-gradient(160deg, #080e2a 0%, #102060 50%, #0a1535 100%)' },
};
export const factionBorderColors = {
    "Horde": {
        border: '2px solid transparent', borderRadius: 1, background: `
    linear-gradient(#0f1117, #0f1117) padding-box,
    linear-gradient(160deg, #6b0000, #cc1111, #8b0000, #dd2222, #550000) border-box
  `, },
    "Alliance": {
        border: '2px solid transparent', borderRadius: 1, background: `
    linear-gradient(#0f1117, #0f1117) padding-box,
    linear-gradient(160deg, #c8a84b, #f5e088, #a8782a, #f0d060, #8b5e1a) border-box
  `, },
};