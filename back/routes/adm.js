/**
 * This is the file Contains all functions
 * of Admin
 */

const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');


// deal with admin login
router.post('/login', adminController.loginAdmin);

module.exports = router;
