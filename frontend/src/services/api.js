import axios from 'axios';

// Base Axios instance pointing to backend API
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
});

// Automatically attach JWT token (if present) to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth endpoints
export const authAPI = {
  register: (data) => API.post('/auth/register', data),
  login: (data) => API.post('/auth/login', data),
};

// Content endpoints
export const contentAPI = {
  getAll: () => API.get('/content/all'),
  getById: (id) => API.get(`/content/${id}`),
  add: (data) => API.post('/content/add', data), // later use for admin
};

export default API;
