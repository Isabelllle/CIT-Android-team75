/**
 * <Description> This is all react routes
 * @author {YIJUN GUO}
 * @version 2.0
 * @date {2023}/{Sep}/{24}
 * 
 */

// Import the necessary modules for setting up routes and controllers
const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const reminderListsController = require('../controllers/reminderListsController');
const surveyManageController = require('../controllers/surveyManageController');

/** 
 * All routes realted to the functions of dashbaord when admin has logged in
 * 
*/
router.get('/api/user', adminController.verifyToken, adminController.getUserName);
router.get('/api/getIsManger', adminController.verifyToken, adminController.getIsManger);
router.get('/api/getSurveyQuesTable', adminController.getSurveyQuesTable);
router.get('/api/getReminderList', reminderListsController.getReminderList);
router.get('/api/searchReminderByEmail', reminderListsController.searchReminderByEmail);


router.put('/api/users', adminController.updateUserInfo);
router.put('/api/userspassword', adminController.updateUserPass);

// Survey Management routers
router.put('/api/addTextQuestion',surveyManageController.addTextQuestion); 
router.put('/api/addYesNoQuestion',surveyManageController.addYesNoQuestion);
router.put('/api/addNumQuestion',surveyManageController.addNumQuestion);
router.put('/api/addRatingQuestion',surveyManageController.addRatingQuestion);
router.put('/api/addDropDownQuestion',surveyManageController.addDropDownQuestion);

router.delete('/api/deleteItem/:id', adminController.deleteItem);

module.exports = router;
