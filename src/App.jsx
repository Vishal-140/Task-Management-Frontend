import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import Navbar from './components/Navbar';
import { useState } from 'react';

function App() {
    const [currUser, setCurrUser] = useState({
        isLoggedIn: false,
        fullName: 'Guest',
    });

    return (
        <div>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={currUser.isLoggedIn ? <HomePage /> : <Navigate to="/Signup" />} />
                    <Route path="/login" element={currUser.isLoggedIn ? <Navigate to="/" /> : <LoginPage />} />
                    <Route path="/signup" element={currUser.isLoggedIn ? <Navigate to="/" /> : <SignUpPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;