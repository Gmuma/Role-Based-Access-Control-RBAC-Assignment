const express = require('express');
const { login, register } = require('../controllers/authController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

// Public Routes
router.post('/register', register);
router.post('/login', login);

// Protected Routes
router.get('/admin', protect, authorize('admin'), (req, res) => {
    res.send('Welcome Admin! This is a protected route.');
});

router.get('/user', protect, authorize('user', 'admin'), (req, res) => {
    res.send('Welcome User! You have access to this route.');
});

module.exports = router;
