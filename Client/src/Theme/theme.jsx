import { createTheme } from '@mui/material/styles';

export const warcraftChronicleTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#d4a520',      // gold � buttons, active nav, highlights
            dark: '#b8860b',      // darker gold � hover states
            light: '#e8c547',     // lighter gold � focus rings
            contrastText: '#0f0d06',
        },
        secondary: {
            main: '#c87941',      // amber-orange � secondary accents
            dark: '#9b5e2e',
            contrastText: '#0f0d06',
        },
        background: {
            default: '#0f0d06',   // near-black parchment
            paper: '#1a1408',     // card surface
        },
        text: {
            primary: '#e8dcc8',   // warm off-white � readable, not stark
            secondary: '#8a7550', // muted gold-brown
            disabled: '#4a3d28',
        },
        divider: '#b8860b22',
        error: {
            main: '#c0392b',
        },
        warning: {
            main: '#d4a520',
        },
        success: {
            main: '#5d8a3c',
        },
    },
    typography: {
        fontFamily: '"Cinzel", "Palatino Linotype", "Book Antiqua", Georgia, serif',
        h1: { fontWeight: 700, letterSpacing: '0.02em', color: '#d4a520' },
        h2: { fontWeight: 700, letterSpacing: '0.02em', color: '#d4a520' },
        h3: { fontWeight: 600, letterSpacing: '0.01em', color: '#e8dcc8' },
        h4: { fontWeight: 600, color: '#e8dcc8' },
        h5: { fontWeight: 500, color: '#c8b87a' },
        h6: { fontWeight: 500, color: '#c8b87a' },
        body1: { color: '#c8b87a' },
        body2: { color: '#8a7550' },
        caption: { color: '#5a4830', letterSpacing: '0.08em' },
        overline: { color: '#8a7550', letterSpacing: '0.12em' },
    },
    shape: {
        borderRadius: 6, // sharper corners � medieval feel
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#0f0d06',
                    borderBottom: '1px solid #b8860b33',
                    boxShadow: 'none',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    fontWeight: 500,
                    borderRadius: 4,
                    letterSpacing: '0.04em',
                },
                outlined: {
                    borderColor: '#d4a52066',
                    color: '#d4a520',
                    '&:hover': {
                        borderColor: '#d4a520',
                        backgroundColor: '#d4a52011',
                    },
                },
                contained: {
                    backgroundColor: '#d4a520',
                    color: '#0f0d06',
                    '&:hover': {
                        backgroundColor: '#b8860b',
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: '#1a1408',
                    backgroundImage: 'none',
                    border: '1px solid #b8860b22',
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    borderBottom: '1px solid #b8860b22',
                    color: '#c8b87a',
                },
                head: {
                    color: '#8a7550',
                    fontSize: '0.7rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    backgroundColor: '#3d2b0a',
                    color: '#c8b87a',
                    border: '0.5px solid #b8860b33',
                    borderRadius: 4,
                },
            },
        },
        MuiDivider: {
            styleOverrides: {
                root: {
                    borderColor: '#b8860b22',
                },
            },
        },
    },
});