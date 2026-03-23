import { Outlet, Link} from 'react-router-dom';
import { Box } from '@mui/material';
import Navbar from './Navbar';
import Footer from './Footer';



export default function layout() {


    return (

        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            {/* Navigation - always on top */}
            <Navbar />

            {/* Main content - this changes based on route */}
            <Box component="main" sx={{ flexGrow: 1 }}>
                <Outlet />
            </Box>

            {/* Footer - always at bottom */}
            <Footer />
        </Box>
    );



}