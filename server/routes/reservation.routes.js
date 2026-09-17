const express = require('express');
const router = express.Router();

const { protect } = require('../middleware/authMiddleware');
const {
  createReservation,
  getMyReservations,
  getBusinessReservations,
  getReservationById,
  updateReservationStatus,
  cancelReservation,
} = require('../controllers/reservationController');

// All reservation endpoints require authenticated user
router.use(protect);

router.post('/', createReservation);
router.get('/my', getMyReservations);
router.get('/business', getBusinessReservations);
router.get('/:id', getReservationById);
router.put('/:id/status', updateReservationStatus);
router.put('/:id/cancel', cancelReservation);

module.exports = router;
