/**
 * <Description> This is all react routes
 * @author {YIJUN GUO, ZIXIAN LI}
 * @version 2.0
 * @date {2023}/{Sep}/{24}
 * 
 */

// Import the necessary modules for setting up routes and controllers
const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const reminderListsController = require('../controllers/reminderListsController');
const UnregisterListsController = require('../controllers/adminManageController');
const surveyManageController = require('../controllers/surveyManageController');
const dataReviewController = require('../controllers/dataReviewController');

/** 
 * All routes realted to the functions of dashbaord when admin has logged in
 * 
*/
router.get('/api/user', adminController.verifyToken, adminController.getUserName);
router.get('/api/getIsManger', adminController.verifyToken, adminController.getIsManger);
router.get('/api/getSurveyQuesTable', adminController.getSurveyQuesTable);
router.get('/api/getGroups', adminController.getGroups);
router.get('/api/getReminderList', adminController.verifyToken, reminderListsController.getReminderList);
router.get('/api/searchReminderByEmail', reminderListsController.searchReminderByEmail);
router.get('/api/getUnregisterList', UnregisterListsController.getUnregisterList);
router.get('/api/getAnswerData', dataReviewController.getAnswerList);
router.get('/api/getQuestionsAnswer', dataReviewController.getQuestionsAnswer);


router.put('/api/users', adminController.updateUserInfo);
router.put('/api/userspassword', adminController.updateUserPass);

// Admin Management routers
router.put('/api/approveEmail',UnregisterListsController.approveEmail);
router.put('/api/disapproveEmail',UnregisterListsController.disapproveEmail);
router.put('/api/updateGroups', UnregisterListsController.updateGroups);
router.get('/api/searchGroupName', UnregisterListsController.searchGroupName);

// Survey Management routers
router.put('/api/addTextQuestion',surveyManageController.addTextQuestion); 
router.put('/api/addYesNoQuestion',surveyManageController.addYesNoQuestion);
router.put('/api/addNumQuestion',surveyManageController.addNumQuestion);
router.put('/api/addRatingQuestion',surveyManageController.addRatingQuestion);
router.put('/api/addDropDownQuestion',surveyManageController.addDropDownQuestion);

router.delete('/api/deleteItem/:id', adminController.deleteItem);
router.delete('/api/deleteEmail/:email', reminderListsController.deleteItem);

// send email
router.post('/api/sendEmail',UnregisterListsController.sendEmail);

module.exports = router;
