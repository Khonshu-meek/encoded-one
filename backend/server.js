const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const allowedOrigins = [
  'http://localhost:3000',
  'https://encoded-one-api.onrender.com', // optional, for server-to-server
  'https://encoded-one.vercel.app',       // later, when you deploy frontend
];

app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (mobile apps, curl, Postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  })
);

const dotenv = require('dotenv');

dotenv.config();

const app = express();
const authRoutes = require('./routes/auth');
const contentRoutes = require('./routes/content');

app.use('/api/auth', authRoutes);
app.use('/api/content', contentRoutes);


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB Error:', err));

// Test Route
app.get('/api/test', (req, res) => {
  res.json({ message: 'ENCODED_ONE API Working!' });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🎬 ENCODED_ONE Server running on http://localhost:${PORT}`);
});
