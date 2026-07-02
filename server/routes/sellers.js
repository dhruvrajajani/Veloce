const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Seller = require('../models/Seller');

// In-memory mock sellers for offline resilience
const mockSellers = [
  {
    email: 'demo@veloce.com',
    businessName: 'Prestige Motors Group',
    address: 'Beverly Hills, CA',
    rating: 4.9,
    isVerified: true
  },
  {
    email: 'google.user@gmail.com',
    businessName: 'Google Auto Imports',
    address: 'San Jose, CA',
    rating: 5.0,
    isVerified: true
  }
];

// @route   GET /api/sellers/:email
// @desc    Get seller profile by email
router.get('/:email', async (req, res) => {
  const email = req.params.email.toLowerCase().trim();

  // MOCK Fallback (if offline)
  if (mongoose.connection.readyState !== 1) {
    console.log(`MongoDB connection offline. Fetching mock seller: ${email}`);
    let seller = mockSellers.find(s => s.email === email);
    if (!seller) {
      // Dynamic default seller profile if email is new/custom
      seller = {
        email,
        businessName: 'Independent Enthusiast Dealer',
        address: 'Stuttgart, Germany',
        rating: 5.0,
        isVerified: true
      };
    }
    return res.json(seller);
  }

  // Database operation (if online)
  try {
    let seller = await Seller.findOne({ email });
    if (!seller) {
      // Create a default seller profile on-the-fly to prevent empty states
      seller = new Seller({
        email,
        businessName: 'Independent Enthusiast Dealer',
        address: 'Stuttgart, Germany',
        rating: 5.0,
        isVerified: true
      });
      await seller.save();
    }
    res.json(seller);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/sellers
// @desc    Create or update seller profile
router.post('/', async (req, res) => {
  const { email, businessName, address } = req.body;

  if (!email || !businessName || !address) {
    return res.status(400).json({ message: 'Please enter all fields' });
  }

  const normalizedEmail = email.toLowerCase().trim();

  // MOCK Fallback (if offline)
  if (mongoose.connection.readyState !== 1) {
    console.log('MongoDB connection offline. Creating/updating seller in-memory.');
    const index = mockSellers.findIndex(s => s.email === normalizedEmail);
    const sellerData = {
      email: normalizedEmail,
      businessName,
      address,
      rating: index !== -1 ? mockSellers[index].rating : 5.0,
      isVerified: true
    };

    if (index !== -1) {
      mockSellers[index] = sellerData;
    } else {
      mockSellers.push(sellerData);
    }
    return res.status(200).json(sellerData);
  }

  // Database operation (if online)
  try {
    let seller = await Seller.findOne({ email: normalizedEmail });
    if (seller) {
      seller.businessName = businessName;
      seller.address = address;
      await seller.save();
    } else {
      seller = new Seller({
        email: normalizedEmail,
        businessName,
        address
      });
      await seller.save();
    }
    res.json(seller);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
