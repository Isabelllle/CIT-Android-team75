/**
 * This is the file Contains all functions
 * of Admin
 */

const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');


// deal with admin login
router.post('/login', adminController.loginAdmin);
router.post('/signup', adminController.signupAdmin);

module.exports = router;
