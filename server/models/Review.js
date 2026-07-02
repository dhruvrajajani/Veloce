const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  sellerEmail: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  reviewerName: {
    type: String,
    required: true,
    trim: true
  },
  reviewerEmail: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Review', ReviewSchema);
