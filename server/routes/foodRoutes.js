const express = require('express');
const router = express.Router();
const {
  createFood,
  getFoodListings,
  getMyFoodListings,
  getFoodById,
  updateFood,
  deleteFood,
} = require('../controllers/foodController');
const { protect } = require('../middleware/authMiddleware');

// Food Listings CRUD Routes
router.route('/')
  .get(getFoodListings)
  .post(protect, createFood);

router.route('/me/listings')
  .get(protect, getMyFoodListings);

router.route('/:id')
  .get(getFoodById)
  .put(protect, updateFood)
  .delete(protect, deleteFood);

module.exports = router;
