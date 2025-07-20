const express = require('express');
const router = express.Router();
const { adminRegister, adminLogin, getAdminProfile } = require('../controllers/adminController');
const auth = require('../middleware/auth');

// Public routes
router.post('/register', adminRegister);
router.post('/login', adminLogin);

// Protected routes
router.get('/profile', auth, getAdminProfile);

module.exports = router; 