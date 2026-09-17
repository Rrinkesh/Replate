const User = require('../models/User');

/**
 * @desc    Get current authenticated user MongoDB profile
 * @route   GET /api/users/me
 * @access  Private (Protected by authMiddleware)
 */
const getCurrentUser = async (req, res, next) => {
  try {
    const firebaseUid = req.user?.uid || req.user?.firebaseUid;

    if (!firebaseUid) {
      res.status(401);
      throw new Error('Unauthorized - User identity missing from request');
    }

    let user = await User.findOne({ firebaseUid });

    if (!user) {
      // Auto-create basic profile if first time accessing /me
      user = await User.create({
        firebaseUid,
        email: req.user.email || 'user@replate.org',
        name: req.user.name || 'RePlate User',
        role: 'BUSINESS',
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Sync / Create / Update User Profile after Firebase Auth Signup or Login
 * @route   POST /api/users/sync
 * @access  Private (Protected by authMiddleware)
 */
const syncUser = async (req, res, next) => {
  try {
    const firebaseUid = req.user?.uid || req.user?.firebaseUid || req.body.firebaseUid;
    const email = req.user?.email || req.body.email;

    if (!firebaseUid) {
      res.status(400);
      throw new Error('Firebase UID is required for user profile synchronization');
    }

    const { name, role, phone, organizationName, location, profileImage } = req.body;

    let user = await User.findOne({ firebaseUid });

    // Format role enum safely
    const formattedRole = role
      ? role.toUpperCase()
      : user
      ? user.role
      : 'BUSINESS';

    if (user) {
      // Update existing user profile
      user.name = name || user.name;
      user.email = email || user.email;
      user.role = ['BUSINESS', 'RECIPIENT', 'ADMIN'].includes(formattedRole) ? formattedRole : user.role;
      user.phone = phone || user.phone;
      user.organizationName = organizationName || user.organizationName;
      if (profileImage) user.profileImage = profileImage;
      if (location) user.location = { ...user.location, ...location };

      await user.save();

      return res.status(200).json({
        success: true,
        message: 'MongoDB user profile synced successfully',
        data: user,
      });
    }

    // Create new MongoDB user profile
    user = await User.create({
      firebaseUid,
      email: email || 'user@replate.org',
      name: name || req.user?.name || 'RePlate Partner',
      role: ['BUSINESS', 'RECIPIENT', 'ADMIN'].includes(formattedRole) ? formattedRole : 'BUSINESS',
      phone: phone || '',
      organizationName: organizationName || '',
      profileImage: profileImage || req.user?.picture || '',
      location: location || { address: '', city: 'Noida', state: 'Uttar Pradesh' },
    });

    res.status(201).json({
      success: true,
      message: 'MongoDB user profile created successfully',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all users (Admin / Dev Architecture)
 * @route   GET /api/users
 * @access  Public / Architecture
 */
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-__v');
    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get user profile by Firebase UID
 * @route   GET /api/users/:uid
 * @access  Public / Architecture
 */
const getUserByUid = async (req, res, next) => {
  try {
    const { uid } = req.params;
    const user = await User.findOne({ firebaseUid: uid });

    if (!user) {
      res.status(404);
      throw new Error(`User profile with Firebase UID '${uid}' not found`);
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCurrentUser,
  syncUser,
  getUsers,
  getUserByUid,
};
