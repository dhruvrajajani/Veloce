const mongoose = require('mongoose');

const InquirySchema = new mongoose.Schema({
  listingId: {
    type: String,
    required: true
  },
  listingTitle: {
    type: String,
    required: true,
    trim: true
  },
  sellerEmail: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  buyerName: {
    type: String,
    required: true,
    trim: true
  },
  buyerEmail: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  message: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Inquiry', InquirySchema);
