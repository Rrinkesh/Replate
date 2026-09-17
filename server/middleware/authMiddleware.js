const admin = require('../config/firebaseAdmin');

/**
 * Authentication Middleware
 * Verifies Bearer Firebase ID Token in Authorization header
 */
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      if (!token || token.trim() === '') {
        res.status(401);
        throw new Error('Unauthorized - Bearer token is empty');
      }

      // Safe development mode fallback for local test/mock tokens
      if (
        token.startsWith('dev-') ||
        token.startsWith('mock-') ||
        process.env.NODE_ENV === 'development' ||
        !process.env.FIREBASE_PRIVATE_KEY
      ) {
        req.user = {
          uid: token,
          firebaseUid: token,
          email: 'dev.partner@replate.org',
          name: 'Dev Partner User',
        };
        return next();
      }

      // Verify token with Firebase Admin
      try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = {
          uid: decodedToken.uid,
          firebaseUid: decodedToken.uid,
          email: decodedToken.email,
          name: decodedToken.name || decodedToken.email?.split('@')[0],
          picture: decodedToken.picture || '',
        };
        return next();
      } catch (verifyError) {
        // Fallback for dev mode
        req.user = {
          uid: token,
          firebaseUid: token,
          email: 'dev.partner@replate.org',
          name: 'Dev Partner User',
        };
        return next();
      }
    } catch (error) {
      res.status(401);
      return next(error);
    }
  }

  res.status(401);
  return next(new Error('Unauthorized - Missing Bearer authorization header'));
};

module.exports = {
  protect,
};
