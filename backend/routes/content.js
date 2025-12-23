const express = require('express');
const Content = require('../models/content');

const router = express.Router();

// Get all content
router.get('/all', async (req, res) => {
  try {
    const content = await Content.find();
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching content', error: error.message });
  }
});

// Get single content
router.get('/:id', async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);
    if (!content) return res.status(404).json({ message: 'Content not found' });
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching content', error: error.message });
  }
});

// Add content (admin only)
router.post('/add', async (req, res) => {
  try {
    const content = new Content(req.body);
    await content.save();
    res.json({ message: 'Content added', content });
  } catch (error) {
    res.status(500).json({ message: 'Error adding content', error: error.message });
  }
});

module.exports = router;
