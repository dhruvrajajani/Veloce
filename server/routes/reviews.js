const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Review = require('../models/Review');
const Seller = require('../models/Seller');

// In-memory mock reviews database for offline resilience
const mockReviews = [
  {
    _id: 'mock-rev-1',
    sellerEmail: 'demo@veloce.com',
    reviewerName: 'Marcus Aurelius',
    reviewerEmail: 'marcus@philosophy.com',
    rating: 5,
    comment: 'Incredible experience! The Porsche Targa was delivered in showroom condition. Prestige Motors Group handled the paperwork and enclosed transport seamlessly.',
    createdAt: new Date('2026-06-15')
  },
  {
    _id: 'mock-rev-2',
    sellerEmail: 'demo@veloce.com',
    reviewerName: 'Aria Sterling',
    reviewerEmail: 'aria@sterling.com',
    rating: 4,
    comment: 'Great communication and escrow coordination. Transport was delayed by a day due to weather, but they kept me informed throughout the entire process.',
    createdAt: new Date('2026-06-28')
  },
  {
    _id: 'mock-rev-3',
    sellerEmail: 'google.user@gmail.com',
    reviewerName: 'Devon Knight',
    reviewerEmail: 'devon@knight.com',
    rating: 5,
    comment: 'Purchased the Heritage Classic Custom motorcycle. Outstanding condition, exactly as described in the narrative description. Fast response time!',
    createdAt: new Date('2026-06-29')
  }
];

// Helper to update seller average rating (Mock mode)
const updateMockSellerRating = (sellerEmail) => {
  // Access mockSellers in sellers route context. Since they are separated modules,
  // we can just import the route or since it is offline, we can let it query dynamically.
  // Actually, to make it clean, we will calculate average on-the-fly when fetching the seller profile!
  // This is a much cleaner developer choice.
};

// @route   GET /api/reviews
// @desc    Get all reviews for a seller
router.get('/', async (req, res) => {
  const { seller } = req.query;

  if (!seller) {
    return res.status(400).json({ message: 'Please specify a seller email' });
  }

  const normalizedEmail = seller.toLowerCase().trim();

  // MOCK Fallback (if offline)
  if (mongoose.connection.readyState !== 1) {
    console.log(`MongoDB connection offline. Fetching mock reviews for seller: ${normalizedEmail}`);
    const data = mockReviews.filter(r => r.sellerEmail === normalizedEmail);
    return res.json(data);
  }

  // Database operation (if online)
  try {
    const reviews = await Review.find({ sellerEmail: normalizedEmail }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/reviews
// @desc    Post a new review for a seller
router.post('/', async (req, res) => {
  const { sellerEmail, reviewerName, reviewerEmail, rating, comment } = req.body;

  if (!sellerEmail || !reviewerName || !reviewerEmail || !rating || !comment) {
    return res.status(400).json({ message: 'Please enter all fields' });
  }

  const normalizedSellerEmail = sellerEmail.toLowerCase().trim();

  // MOCK Fallback (if offline)
  if (mongoose.connection.readyState !== 1) {
    console.log('MongoDB connection offline. Storing review in-memory.');
    const newRev = {
      _id: 'mock-rev-' + Date.now(),
      sellerEmail: normalizedSellerEmail,
      reviewerName,
      reviewerEmail: reviewerEmail.toLowerCase().trim(),
      rating: Number(rating),
      comment,
      createdAt: new Date()
    };
    mockReviews.push(newRev);
    return res.status(201).json({
      message: 'Review submitted successfully (Offline Demo Mode)',
      review: newRev
    });
  }

  // Database operation (if online)
  try {
    const newReview = new Review({
      sellerEmail: normalizedSellerEmail,
      reviewerName,
      reviewerEmail: reviewerEmail.toLowerCase().trim(),
      rating: Number(rating),
      comment
    });

    await newReview.save();

    // Recalculate seller rating
    const reviews = await Review.find({ sellerEmail: normalizedSellerEmail });
    if (reviews.length > 0) {
      const sum = reviews.reduce((acc, curr) => acc + curr.rating, 0);
      const avg = Number((sum / reviews.length).toFixed(1));
      
      await Seller.findOneAndUpdate(
        { email: normalizedSellerEmail },
        { rating: avg },
        { upsert: true }
      );
    }

    res.status(201).json({
      message: 'Review submitted successfully',
      review: newReview
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
