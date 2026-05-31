import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import { warcraftChronicleTheme } from './Theme/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';



import Home from './Components/Routes/Home';
import Layout from './Components/Layout/Layout';
import PvPRoute from './Components/Routes/PvPRoute';
import PvERoute from './Components/Routes/PvERoute';

import { ThemeProvider, CssBaseline } from '@mui/material';

const queryClient = new QueryClient();


function App() {
    return (
        <ThemeProvider theme={warcraftChronicleTheme}>
            <CssBaseline />
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Layout />}>
                            <Route index element={<Home />} />
                            <Route path="PvP" element={<PvPRoute />} />
                            <Route path="PvE" element={<PvERoute /> } />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </QueryClientProvider>
        </ThemeProvider>
    );
}

export default App
