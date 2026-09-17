const express = require('express');
const router = express.Router();
const { getFoodListings, getFoodById, createFoodListing } = require('../controllers/food.controller');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(getFoodListings)
  .post(protect, createFoodListing);

router.route('/:id')
  .get(getFoodById);

module.exports = router;
