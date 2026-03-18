import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Home from './Components/Home'
import Layout from './Components/Layout'
import Leaderboard from './Components/Leaderboard';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="Leaderboard" element={<Leaderboard />}/>
                </Route>
            </Routes>
        </BrowserRouter>

    );
}

export default App
