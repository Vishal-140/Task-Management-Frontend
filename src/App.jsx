import { BrowserRouter, Routes, Route } from 'react-router'
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import Navbar from './components/Navbar';

function App() {
    return (
        <div>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;