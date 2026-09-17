const BusinessProfile = require('../models/BusinessProfile');
const RecipientProfile = require('../models/RecipientProfile');
const User = require('../models/User');
const { createNotificationHelper } = require('../utils/notificationUtils');

/**
 * @desc    Get all business profiles (Admin moderation)
 * @route   GET /api/admin/businesses
 * @access  Private (Admin only)
 */
const getAllBusinesses = async (req, res, next) => {
  try {
    const { search, status } = req.query;

    const filter = {};

    if (status === 'verified') {
      filter.isVerified = true;
    } else if (status === 'unverified') {
      filter.isVerified = false;
    }

    if (search && search.trim() !== '') {
      const regex = new RegExp(search.trim(), 'i');
      filter.$or = [
        { businessName: regex },
        { phone: regex },
        { city: regex },
        { state: regex },
      ];
    }

    const businesses = await BusinessProfile.find(filter)
      .populate('userId', 'name email role phone organizationName createdAt')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: businesses.length,
      businesses,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all recipient profiles (Admin moderation)
 * @route   GET /api/admin/recipients
 * @access  Private (Admin only)
 */
const getAllRecipients = async (req, res, next) => {
  try {
    const { search, status } = req.query;

    const filter = {};

    if (status === 'verified') {
      filter.isVerified = true;
    } else if (status === 'unverified') {
      filter.isVerified = false;
    }

    if (search && search.trim() !== '') {
      const regex = new RegExp(search.trim(), 'i');
      filter.$or = [
        { organizationName: regex },
        { phone: regex },
        { city: regex },
        { state: regex },
      ];
    }

    const recipients = await RecipientProfile.find(filter)
      .populate('userId', 'name email role phone organizationName recipientType createdAt')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: recipients.length,
      recipients,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Verify or unverify a business profile
 * @route   PUT /api/admin/businesses/:id/verify
 * @access  Private (Admin only)
 */
const verifyBusiness = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { isVerified } = req.body;

    let profile = await BusinessProfile.findById(id);

    // Fallback: search by userId if not found by profile ID directly
    if (!profile && id.match(/^[0-9a-fA-F]{24}$/)) {
      profile = await BusinessProfile.findOne({ userId: id });
    }

    if (!profile) {
      res.status(404);
      throw new Error(`Business profile '${id}' not found`);
    }

    profile.isVerified = isVerified !== undefined ? Boolean(isVerified) : !profile.isVerified;
    await profile.save();

    const updatedProfile = await BusinessProfile.findById(profile._id).populate(
      'userId',
      'name email role phone organizationName'
    );

    // Notify business user of verification update
    await createNotificationHelper({
      userId: profile.userId,
      type: 'VERIFICATION_UPDATED',
      title: 'Account Verification Updated',
      message: `Your commercial donor account "${profile.businessName}" verification status is now ${
        profile.isVerified ? 'VERIFIED' : 'UNVERIFIED'
      }.`,
      relatedId: profile._id,
    });

    res.status(200).json({
      success: true,
      message: `Business partner '${profile.businessName}' ${
        profile.isVerified ? 'verified' : 'unverified'
      } successfully`,
      business: updatedProfile,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Verify or unverify a recipient profile
 * @route   PUT /api/admin/recipients/:id/verify
 * @access  Private (Admin only)
 */
const verifyRecipient = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { isVerified } = req.body;

    let profile = await RecipientProfile.findById(id);

    // Fallback: search by userId if not found by profile ID directly
    if (!profile && id.match(/^[0-9a-fA-F]{24}$/)) {
      profile = await RecipientProfile.findOne({ userId: id });
    }

    if (!profile) {
      res.status(404);
      throw new Error(`Recipient profile '${id}' not found`);
    }

    profile.isVerified = isVerified !== undefined ? Boolean(isVerified) : !profile.isVerified;
    await profile.save();

    const updatedProfile = await RecipientProfile.findById(profile._id).populate(
      'userId',
      'name email role phone organizationName recipientType'
    );

    // Notify recipient user of verification update
    await createNotificationHelper({
      userId: profile.userId,
      type: 'VERIFICATION_UPDATED',
      title: 'Account Verification Updated',
      message: `Your NGO recipient account "${profile.organizationName}" verification status is now ${
        profile.isVerified ? 'VERIFIED' : 'UNVERIFIED'
      }.`,
      relatedId: profile._id,
    });

    res.status(200).json({
      success: true,
      message: `Recipient partner '${profile.organizationName}' ${
        profile.isVerified ? 'verified' : 'unverified'
      } successfully`,
      recipient: updatedProfile,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllBusinesses,
  getAllRecipients,
  verifyBusiness,
  verifyRecipient,
};
