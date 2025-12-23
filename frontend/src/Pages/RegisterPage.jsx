import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../services/api';

export default function RegisterPage({ setUser }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await authAPI.register({ name, email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setUser(res.data.user);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-encoded-dark text-white min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold text-red-600 mb-8 text-center">ENCODED_ONE</h1>
        
        <form onSubmit={handleRegister} className="bg-encoded-gray p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-6">Create Account</h2>

          {error && <div className="bg-red-600 text-white p-3 rounded mb-4">{error}</div>}

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-encoded-dark text-white px-4 py-2 rounded border border-gray-600"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-encoded-dark text-white px-4 py-2 rounded border border-gray-600"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-encoded-dark text-white px-4 py-2 rounded border border-gray-600"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold py-2 rounded"
          >
            {loading ? 'Creating Account...' : 'Register'}
          </button>

          <p className="text-center mt-4 text-gray-400">
            Already have an account? <Link to="/login" className="text-red-600 hover:underline">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
