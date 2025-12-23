import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Search, Menu } from 'lucide-react';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import WatchPage from './pages/WatchPage';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen bg-encoded-dark text-white">Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user ? <HomePage user={user} onLogout={handleLogout} /> : <Navigate to="/login" />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <LoginPage setUser={setUser} />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <RegisterPage setUser={setUser} />} />
        <Route path="/watch/:id" element={user ? <WatchPage /> : <Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
