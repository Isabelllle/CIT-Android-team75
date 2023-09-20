const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/api/user', adminController.getUserName);

module.exports = router;
