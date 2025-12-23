const mongoose = require('mongoose');
const Content = require('./models/content');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI);

const sampleContent = [
  {
    title: 'The Future of AI',
    description: 'A documentary exploring the possibilities and risks of artificial intelligence.',
    genre: ['Documentary', 'Technology'],
    releaseDate: new Date('2024-01-15'),
    rating: 8.5,
    thumbnail: 'https://via.placeholder.com/300x400?text=AI+Documentary',
    videoUrl: 'https://vimeo.com/123456', // Replace with real video URLs
    duration: 120,
    type: 'movie',
  },
  {
    title: 'Tech Stories',
    description: 'A series about inspiring tech entrepreneurs.',
    genre: ['Series', 'Biography'],
    releaseDate: new Date('2024-02-01'),
    rating: 8,
    thumbnail: 'https://via.placeholder.com/300x400?text=Tech+Stories',
    videoUrl: 'https://vimeo.com/789012',
    duration: 45,
    type: 'series',
    episodes: [
      { episodeNumber: 1, title: 'Elon Musk', videoUrl: 'https://vimeo.com/111111', duration: 45 },
      { episodeNumber: 2, title: 'Steve Jobs', videoUrl: 'https://vimeo.com/222222', duration: 45 },
    ],
  },
];

const uploadContent = async () => {
  try {
    await Content.insertMany(sampleContent);
    console.log('✅ Sample content added!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

uploadContent();
