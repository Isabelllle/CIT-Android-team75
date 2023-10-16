/**
 * <Description> This is all static routes
 * @author {YIJUN GUO}
 * @version 1.0
 * @date {2023}/{Sep}/{17}
 * 
 */

// Import the necessary modules for setting up routes and controllers
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const staticController = require('../controllers/staticPageController');

/** 
 * All routes realted to the static pages 
 * 
*/

// all login routes
router.get('/login', staticController.loginPage);
router.post('/login/submit', adminController.loginAdmin);

// all sign up routes
router.get('/signin', staticController.signinPage);
router.post('/signin/submit', adminController.signupAdmin);
router.get('/signin/getGroups', adminController.getGroups);
router.get('/sign_up_instruction', staticController.signupWait);
router.get('/verify-email', adminController.verifyEmailToken);


router.get('/email_verify',staticController.emailVerify);


// all forget password related routes
router.get('/enteremail', staticController.forgetEnterEmail);
// router.get('/enteremail/enter',adminController.functionName);

// 渲染
router.get('/emailverify', staticController.forgetEmailVerify);
router.get('/newPassword', staticController.newPassword);
// router.post('/newPassword/submit', adminController.insertNewPassword);

module.exports = router;
