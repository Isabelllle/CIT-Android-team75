const express = require('express');
const router = express.Router();
const path = require('path');


router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../front/Admin Website/Public/Views/AccountManage/forgot_password_email_verify.html'));
});

module.exports = router;
