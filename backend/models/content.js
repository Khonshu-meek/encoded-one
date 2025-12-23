const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  genre: [String],
  releaseDate: Date,
  rating: { type: Number, min: 0, max: 10 },
  thumbnail: String,
  videoUrl: String,
  duration: Number, // in minutes
  type: { type: String, enum: ['movie', 'series'], required: true },
  episodes: [
    {
      episodeNumber: Number,
      title: String,
      videoUrl: String,
      duration: Number,
    }
  ],
  views: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Content', contentSchema);
