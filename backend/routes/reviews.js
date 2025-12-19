const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// Get approved reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find({ approved: true }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Submit new review
router.post('/', async (req, res) => {
  try {
    const review = new Review(req.body);
    const savedReview = await review.save();
    res.status(201).json({ message: 'Review submitted for approval', review: savedReview });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;