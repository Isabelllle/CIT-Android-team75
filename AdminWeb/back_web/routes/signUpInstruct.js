const express = require('express');
const router = express.Router();
const path = require('path');


router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../front/Admin Website/Public/Views/AccountManage/sign_up_instruction.html'));
});

module.exports = router;
