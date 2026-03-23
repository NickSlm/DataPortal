import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import { darkGamingTheme } from './Theme/theme';

import Home from './Components/Home'
import Layout from './Components/Layout'
import PvPRoute from './Components/PvPRoute';
import PvERoute from './Components/PvERoute';
import { ThemeProvider, CssBaseline } from '@mui/material';

function App() {
    return (
        <ThemeProvider theme={darkGamingTheme}>
            <CssBaseline />
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="PvP" element={<PvPRoute />} />
                    <Route path="PvE" element={<PvERoute /> } />
                </Route>
            </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App
