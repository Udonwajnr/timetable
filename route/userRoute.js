const express = require('express');
const { register, login, profile } = require('../controllers/userController'); // Import your controller functions

const router = express.Router();

// @route POST /api/users/register
// @desc Register a new user
// @access Public
router.post('/register', register);

// @route POST /api/users/login
// @desc Login user and get a token
// @access Public
router.post('/login', login);

// @route GET /api/users/profile
// @desc Get user profile
// @access Private (requires authentication)
router.get('/profile', profile);

module.exports = router;
