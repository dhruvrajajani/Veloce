const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Inquiry = require('../models/Inquiry');

// In-memory mock inquiries database for offline resilience
const mockInquiries = [
  {
    _id: 'mock-inq-1',
    listingId: 'mock-15',
    listingTitle: '2023 Stealth GT-R Special Edition',
    sellerEmail: 'demo@veloce.com',
    buyerName: 'John Smith',
    buyerEmail: 'smith@example.com',
    message: 'Hello, I am highly interested in purchasing this Stealth GT-R chassis. Is shipping to San Francisco included in the escrow?',
    createdAt: new Date('2026-07-01')
  },
  {
    _id: 'mock-inq-2',
    listingId: 'mock-15',
    listingTitle: '2023 Stealth GT-R Special Edition',
    sellerEmail: 'demo@veloce.com',
    buyerName: 'Sarah Jenkins',
    buyerEmail: 'sarah.j@example.com',
    message: 'Is the engine fully stock or are there any aftermarket exhaust mods installed? Let me know, thanks!',
    createdAt: new Date('2026-07-02')
  }
];

// @route   POST /api/inquiries
// @desc    Create a new inquiry
router.post('/', async (req, res) => {
  const { listingId, listingTitle, sellerEmail, buyerName, buyerEmail, message } = req.body;

  if (!listingId || !listingTitle || !sellerEmail || !buyerName || !buyerEmail || !message) {
    return res.status(400).json({ message: 'Please enter all fields' });
  }

  // MOCK Fallback (if offline)
  if (mongoose.connection.readyState !== 1) {
    console.log('MongoDB connection offline. Storing inquiry in-memory.');
    const newInq = {
      _id: 'mock-inq-' + Date.now(),
      listingId,
      listingTitle,
      sellerEmail: sellerEmail.toLowerCase().trim(),
      buyerName,
      buyerEmail: buyerEmail.toLowerCase().trim(),
      message,
      createdAt: new Date()
    };
    mockInquiries.push(newInq);
    return res.status(201).json({
      message: 'Inquiry submitted successfully (Offline Demo Mode)',
      inquiry: newInq
    });
  }

  // Database operation (if online)
  try {
    const newInquiry = new Inquiry({
      listingId,
      listingTitle,
      sellerEmail: sellerEmail.toLowerCase().trim(),
      buyerName,
      buyerEmail: buyerEmail.toLowerCase().trim(),
      message
    });

    await newInquiry.save();
    res.status(201).json({
      message: 'Inquiry submitted successfully',
      inquiry: newInquiry
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/inquiries
// @desc    Get inquiries (optionally filter by sellerEmail)
router.get('/', async (req, res) => {
  const { seller } = req.query;

  // MOCK Fallback (if offline)
  if (mongoose.connection.readyState !== 1) {
    console.log('MongoDB connection offline. Serving mock inquiries.');
    let data = [...mockInquiries];
    if (seller) {
      data = data.filter(inq => inq.sellerEmail === seller.toLowerCase().trim());
    }
    return res.json(data);
  }

  // Database operation (if online)
  try {
    let query = {};
    if (seller) {
      query.sellerEmail = seller.toLowerCase().trim();
    }
    const inquiries = await Inquiry.find(query).sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
