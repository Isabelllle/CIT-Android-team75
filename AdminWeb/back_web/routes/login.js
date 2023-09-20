const express = require('express');
const router = express.Router();
const path = require('path');
const adminController = require('../controllers/adminController');


router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../front_web/static/Views/log_in.html'));
});

// deal with admin login
router.post('/submit', adminController.loginAdmin);


module.exports = router;
