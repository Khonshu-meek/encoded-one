import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import RegisterPage from './Pages/RegisterPage';
import WatchPage from './Pages/WatchPage';

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
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Home: only when logged in */}
        <Route
          path="/"
          element={
            user ? (
              <HomePage user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/register" />
            )
          }
        />

        {/* Register page: only when logged out */}
        <Route
          path="/register"
          element={
            user ? (
              <Navigate to="/" />
            ) : (
              <RegisterPage setUser={setUser} />
            )
          }
        />

        {/* Watch page: only when logged in */}
        <Route
          path="/watch/:id"
          element={user ? <WatchPage /> : <Navigate to="/register" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
