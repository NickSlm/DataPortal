

export const glassSelectStyle = {
    FormControl: {
        mx: 2,
        minWidth: 220,
        '& .MuiOutlinedInput-root': {
            background: 'rgba(15, 18, 41, 0.6)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(0, 255, 136, 0.2)',
            borderRadius: 2,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '& fieldset': {
                border: 'none',
            },
            '&:hover': {
                background: 'rgba(15, 18, 41, 0.8)',
                border: '1px solid rgba(0, 255, 136, 0.4)',
                boxShadow: '0 4px 20px rgba(0, 255, 136, 0.15)',
            },
            '&.Mui-focused': {
                background: 'rgba(15, 18, 41, 0.9)',
                border: '1px solid #00ff88',
                boxShadow: '0 4px 24px rgba(0, 255, 136, 0.25)',
            },
        },
        '& .MuiInputLabel-root': {
            color: 'rgba(255, 255, 255, 0.6)',
            fontWeight: 500,
            '&.Mui-focused': {
                color: '#00ff88',
            },
        },
        '& .MuiSelect-select': {
            color: '#fff',
            fontWeight: 500,
            py: 1.5,
        },
        '& .MuiSelect-icon': {
            color: '#00ff88',
            transition: 'transform 0.3s ease',
        },
        '& .MuiOutlinedInput-root.Mui-focused .MuiSelect-icon': {
            transform: 'rotate(180deg)',
        },
    },

     menuProps: {
        PaperProps: {
            sx: {
                mt: 1,
                background: 'rgba(15, 18, 41, 0.95)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(0, 255, 136, 0.3)',
                borderRadius: 2,
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
                maxHeight: 300,
                '& .MuiMenuItem-root': {
                    color: 'rgba(255, 255, 255, 0.8)',
                    py: 1.5,
                    px: 2,
                    borderRadius: 1,
                    mx: 1,
                    my: 0.5,
                    transition: 'all 0.2s ease',
                    '&:hover': {
                        background: 'rgba(0, 255, 136, 0.1)',
                        color: '#fff',
                        transform: 'translateX(4px)',
                    },
                    '&.Mui-selected': {
                        background: 'linear-gradient(135deg, rgba(0, 255, 136, 0.2), rgba(0, 207, 255, 0.15))',
                        color: '#00ff88',
                        fontWeight: 600,
                        border: '1px solid rgba(0, 255, 136, 0.3)',
                        '&:hover': {
                            background: 'linear-gradient(135deg, rgba(0, 255, 136, 0.25), rgba(0, 207, 255, 0.2))',
                        },
                    },
                },
                '&::-webkit-scrollbar': {
                    width: 8,
                },
                '&::-webkit-scrollbar-track': {
                    background: 'rgba(0, 0, 0, 0.2)',
                    borderRadius: 4,
                    margin: 8,
                },
                '&::-webkit-scrollbar-thumb': {
                    background: 'rgba(0, 255, 136, 0.3)',
                    borderRadius: 4,
                    '&:hover': {
                        background: 'rgba(0, 255, 136, 0.5)',
                    },
                },
            }
        }
    }

};


