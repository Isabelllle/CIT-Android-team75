const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/api/user', adminController.verifyToken, adminController.getUserName);
router.put('/api/users', adminController.updateUserInfo);
router.put('/api/userspassword', adminController.updateUserPass);
router.get('/api/getTableData', adminController.getTableData);
router.delete('/api/deleteItem/:id', adminController.deleteItem);

module.exports = router;
