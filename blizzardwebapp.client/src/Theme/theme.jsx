import { createTheme } from '@mui/material/styles';


export const darkGamingTheme = createTheme({

    palette: {
        mode: 'dark',
        primary: {
            main: '#00ff88',
            dark: '#00cc70',
        },
        secondary: {
            main: '#ff6b9d',
        },
        background: {
            default: '#0a0e27',
            paper: '#1a1f3a',
        },
        text: {
            primary: '#ffffff',
            secondary: '#b0b8c1',
        },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", sans-serif',
        h2: {
            fontWeight: 800,
            letterSpacing: '-0.02em',
        },
        h6: {
            fontWeight: 700,
        },
    },
    shape: {
        borderRadius: 12,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    fontWeight: 600,
                    borderRadius: 8,
                },
            },
        },
    },
})