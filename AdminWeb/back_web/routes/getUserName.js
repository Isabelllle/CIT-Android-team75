const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const verifyToken = require('../controllers/adminController');

router.get('/api/user', adminController.verifyToken, adminController.getUserName);
router.put('/api/users', adminController.updateUserInfo);

module.exports = router;
