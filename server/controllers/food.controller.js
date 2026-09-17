const Food = require('../models/Food');

/**
 * @desc    Get all food surplus listings (Phase 2 Foundation)
 * @route   GET /api/food
 * @access  Public
 */
const getFoodListings = async (req, res, next) => {
  try {
    const listings = await Food.find({ status: { $ne: 'EXPIRED' } })
      .populate('businessId', 'name organizationName location')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: listings.length,
      data: listings,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single food listing by ID
 * @route   GET /api/food/:id
 * @access  Public
 */
const getFoodById = async (req, res, next) => {
  try {
    const food = await Food.findById(req.params.id).populate('businessId', 'name organizationName phone location');
    if (!food) {
      res.status(404);
      throw new Error(`Food listing '${req.params.id}' not found`);
    }

    res.status(200).json({
      success: true,
      data: food,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create new food surplus listing
 * @route   POST /api/food
 * @access  Private (Business)
 */
const createFoodListing = async (req, res, next) => {
  try {
    const { title, category, quantity, price, originalPrice, pickupDeadline, dietary, packaging, description } = req.body;

    const food = await Food.create({
      businessId: req.user._id || req.user.id,
      title,
      category,
      quantity,
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : undefined,
      pickupDeadline,
      dietary,
      packaging,
      description,
    });

    res.status(201).json({
      success: true,
      message: 'Food listing created successfully',
      data: food,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getFoodListings,
  getFoodById,
  createFoodListing,
};
