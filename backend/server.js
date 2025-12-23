const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
// other requires...

const app = express();  // <-- app must be created before app.use(...)

// CORS setup (after app is created)
const allowedOrigins = [
  'http://localhost:3000',
  'https://encoded-one-api.onrender.com',
  'https://encoded-one.vercel.app',
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  })
);

// Body parser etc.
app.use(express.json());

// Your routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/content', require('./routes/content'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
