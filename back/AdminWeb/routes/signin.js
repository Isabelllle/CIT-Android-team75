const express = require('express');
const router = express.Router();
const path = require('path');
const adminController = require('../controllers/adminController');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../../front/Admin Website/Public/Views/sign_in.html'));
});

router.post('/', adminController.signupAdmin);


module.exports = router;
